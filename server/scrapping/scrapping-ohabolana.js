import https from 'https';
import axios from 'axios';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import fs from 'fs';

// Créer un agent HTTPS qui ignore les erreurs de certificat
const httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});

const BASE_URL = 'https://tenymalagasy.org';
const PROVERB_INDEX_URL = 'https://tenymalagasy.org/bins/proverbIndex';
const CONCURRENCY = 10;

// Configuration axios
const axiosConfig = {
  httpsAgent,
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

function normalizeText(text) {
  return text
    ?.replace(/<u>|<\/u>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extraire les ohabolana d'un mot
async function extractOhabolana(wordUrl, word) {
  try {
    const response = await axios.get(BASE_URL + wordUrl, axiosConfig);
    const $ = cheerio.load(response.data);
    
    const ohabolana = [];
    
    // Trouver toutes les sections contenant les ohabolana
    $('table[width="100%"]').each((_, table) => {
      $(table).find('tr').each((_, row) => {
        const cells = $(row).find('td');
        if (cells.length < 2) return;
        
        const labelCell = $(cells[0]);
        const contentCell = $(cells[1]);
        
        // Vérifier si c'est la section "Ohabolana"
        if (labelCell.text().includes('Ohabolana')) {
          // Extraire chaque ohabolana
          contentCell.find('p, div, span').each((_, elem) => {
            const text = $(elem).text().trim();
            if (text && text.length > 10) { // Filtrer les textes trop courts
              // Nettoyer le texte
              const cleanText = text
                .replace(/^\d+\s*/, '') // Enlever les numéros au début
                .replace(/\s*\[.*?\]\s*$/, '') // Enlever les sources
                .trim();
              
              if (cleanText) {
                ohabolana.push(cleanText);
              }
            }
          });
          
          // Si pas de p/div/span, prendre tout le texte
          if (ohabolana.length === 0) {
            const allText = contentCell.text().trim();
            const lines = allText.split('\n');
            
            lines.forEach(line => {
              const cleanLine = line
                .replace(/^\d+\s*/, '')
                .replace(/\s*\[.*?\]\s*$/, '')
                .trim();
              
              if (cleanLine && cleanLine.length > 10) {
                ohabolana.push(cleanLine);
              }
            });
          }
        }
      });
    });
    
    // Alternative : chercher directement les lignes de texte qui ressemblent à des proverbes
    if (ohabolana.length === 0) {
      $('body').find('*').each((_, elem) => {
        const text = $(elem).text().trim();
        // Les proverbes commencent souvent par des majuscules et contiennent certains mots
        if (text.match(/^[A-Z]/) && text.length > 20 && text.length < 500) {
          const cleanText = text
            .replace(/^\d+\s*/, '')
            .replace(/\s*\[.*?\]\s*$/, '')
            .trim();
          
          if (cleanText && !ohabolana.includes(cleanText)) {
            ohabolana.push(cleanText);
          }
        }
      });
    }
    
    return [...new Set(ohabolana)]; // Supprimer les doublons
    
  } catch (error) {
    console.error(`   ⚠️  Erreur "${word}": ${error.message}`);
    return [];
  }
}

// Récupérer tous les mots d'une lettre
async function getWordsFromLetter(letter) {
  try {
    const url = letter 
      ? `${PROVERB_INDEX_URL}?i=${letter}`
      : PROVERB_INDEX_URL;
    
    const response = await axios.get(url, axiosConfig);
    const $ = cheerio.load(response.data);
    
    const words = [];
    
    // Trouver le tableau contenant les mots
    $('table[width="90%"] a[href*="/bins/ohabolana/"]').each((_, link) => {
      const href = $(link).attr('href');
      const text = $(link).text().trim();
      
      // Extraire le nombre d'ohabolana si présent (ex: "adala (83)")
      const match = text.match(/^(.+?)\s*(?:\((\d+)\))?$/);
      const word = match ? match[1].trim() : text;
      const count = match && match[2] ? parseInt(match[2]) : 0;
      
      words.push({
        word: normalizeText(word),
        href,
        count
      });
    });
    
    return words;
    
  } catch (error) {
    console.error(`❌ Erreur lettre ${letter}:`, error.message);
    return [];
  }
}

// Récupérer toutes les lettres disponibles
async function getLetters() {
  try {
    const response = await axios.get(PROVERB_INDEX_URL, axiosConfig);
    const $ = cheerio.load(response.data);
    
    const letters = [];
    
    $('table[border="1"] a[href*="proverbIndex?i="]').each((_, link) => {
      const href = $(link).attr('href');
      const match = href.match(/i=([a-z])/);
      if (match) {
        letters.push(match[1]);
      }
    });
    
    return [...new Set(letters)];
    
  } catch (error) {
    console.error('❌ Erreur récupération lettres:', error.message);
    return [];
  }
}

// Scraper tous les ohabolana
async function scrapeAllOhabolana() {
  const startTime = Date.now();
  
  console.log('🔍 Récupération des lettres...');
  const letters = await getLetters();
  console.log(`✅ ${letters.length} lettres trouvées: ${letters.join(', ')}\n`);

  const allResults = [];
  let totalWords = 0;

  // Traiter chaque lettre
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    console.log(`📝 [${i + 1}/${letters.length}] Traitement de la lettre: ${letter.toUpperCase()}`);
    
    const words = await getWordsFromLetter(letter);
    console.log(`   ${words.length} mots trouvés`);
    totalWords += words.length;
    
    // Extraire les ohabolana pour chaque mot en parallèle
    const limit = pLimit(CONCURRENCY);
    
    const letterResults = await Promise.all(
      words.map((wordData, index) =>
        limit(async () => {
          if ((index + 1) % 50 === 0) {
            console.log(`   ⏳ ${letter}: ${index + 1}/${words.length}`);
          }
          
          const ohabolana = await extractOhabolana(wordData.href, wordData.word);
          
          return {
            word: wordData.word,
            ohabolana: ohabolana,
            count: ohabolana.length
          };
        })
      )
    );
    
    allResults.push(...letterResults);
    
    console.log(`✅ Lettre ${letter.toUpperCase()} terminée: ${letterResults.length} mots\n`);
    
    // Sauvegarde progressive tous les 3 lettres
    if ((i + 1) % 3 === 0) {
      fs.writeFileSync(
        'ohabolana_progress.json',
        JSON.stringify(allResults, null, 2),
        'utf-8'
      );
      console.log(`💾 Sauvegarde intermédiaire: ${allResults.length} mots\n`);
    }
  }

  // Sauvegarder le résultat final
  fs.writeFileSync(
    'ohabolana_final.json',
    JSON.stringify(allResults, null, 2),
    'utf-8'
  );

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const withOhabolana = allResults.filter(w => w.ohabolana.length > 0).length;
  const totalOhabolana = allResults.reduce((sum, w) => sum + w.ohabolana.length, 0);
  
  console.log(`\n✅ TERMINÉ en ${duration} minutes`);
  console.log(`📊 Total mots: ${allResults.length}`);
  console.log(`📊 Mots avec ohabolana: ${withOhabolana}/${allResults.length}`);
  console.log(`📊 Total ohabolana: ${totalOhabolana}`);
  console.log(`⚡ Vitesse: ${(allResults.length / (Date.now() - startTime) * 1000).toFixed(2)} mots/seconde`);
}

scrapeAllOhabolana().catch(console.error);