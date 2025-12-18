import https from 'https';
import axios from 'axios';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import fs from 'fs';

// Créer un agent HTTPS qui ignore les erreurs de certificat
const httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});

const BASE_URL = 'https://tenymalagasy.org/bins/alphaLists?lang=mg&range=';
const MAIN_URL = 'https://tenymalagasy.org/bins/alphaLists?lang=mg';
const WORD_BASE_URL = 'https://tenymalagasy.org';
const CONCURRENCY = 15;

// Configuration axios avec l'agent HTTPS
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

async function extractWordExplanation(wordUrl, word) {
  try {
    const response = await axios.get(WORD_BASE_URL + wordUrl, axiosConfig);
    const $ = cheerio.load(response.data);
    
    const explanations = [];
    
    $('table[width="100%"]').each((_, table) => {
      $(table).find('tr').each((_, row) => {
        const cells = $(row).find('td');
        if (cells.length < 2) return;
        
        const labelCell = $(cells[0]);
        const contentCell = $(cells[1]);
        
        if (labelCell.text().includes('Fanazavàna teny malagasy')) {
          const textContent = contentCell.text().trim();
          const lines = textContent.split('\n');
          const cleanedLines = lines
            .map(line => line.replace(/^\d+\s*/, '').trim())
            .filter(line => line && !line.match(/^\[.*\]$/))
            .map(line => line.replace(/\s*\[.*?\]\s*$/, '').trim())
            .filter(line => line);
          
          const explanation = cleanedLines.join(' ').trim();
          if (explanation) {
            explanations.push(explanation);
          }
        }
      });
    });
    
    return explanations.join(' | ');
    
  } catch (error) {
    console.error(`   ⚠️  Erreur "${word}": ${error.message}`);
    return '';
  }
}

async function scrapeRange(range) {
  try {
    const response = await axios.get(BASE_URL + range, axiosConfig);
    const $ = cheerio.load(response.data);
    
    const wordLinks = [];
    
    $('table[width="100%"] td[width="80%"] table tr.menuLink').each((_, row) => {
      const wordLink = $(row).find('td:first-child a');
      if (wordLink.length) {
        wordLinks.push({
          word: wordLink.text().trim(),
          href: wordLink.attr('href')
        });
      }
    });
    
    console.log(`   📝 ${wordLinks.length} mots trouvés dans ${range}`);
    
    const limit = pLimit(CONCURRENCY);
    
    const results = await Promise.all(
      wordLinks.map((wordLink, index) =>
        limit(async () => {
          if ((index + 1) % 100 === 0) {
            console.log(`   ⏳ ${range}: ${index + 1}/${wordLinks.length}`);
          }
          
          const explanation = await extractWordExplanation(wordLink.href, wordLink.word);
          
          return {
            word: normalizeText(wordLink.word),
            explain: explanation
          };
        })
      )
    );
    
    return results;
    
  } catch (error) {
    console.error(`❌ Erreur ${range}: ${error.message}`);
    return [];
  }
}

async function getRanges() {
  const response = await axios.get(MAIN_URL, axiosConfig);
  const $ = cheerio.load(response.data);
  
  const ranges = new Set();
  
  $('table[width="100%"] td[width="20%"] table a[href*="range="]').each((_, link) => {
    const href = $(link).attr('href');
    const match = href.match(/range=([^&]+)/);
    if (match) {
      ranges.add(decodeURIComponent(match[1]));
    }
  });
  
  return Array.from(ranges);
}

async function scrapeAllAlphabet() {
  const startTime = Date.now();
  
  console.log('🔍 Récupération des ranges...');
  const ranges = await getRanges();
  console.log(`✅ ${ranges.length} ranges trouvés\n`);

  const allResults = [];
  const limit = pLimit(3);

  const rangeResults = await Promise.all(
    ranges.map((range, index) =>
      limit(async () => {
        console.log(`🔤 [${index + 1}/${ranges.length}] Scraping: ${range}`);
        const data = await scrapeRange(range);
        console.log(`✅ [${index + 1}/${ranges.length}] ${range}: ${data.length} mots\n`);
        
        if ((index + 1) % 5 === 0) {
          const tempResults = [...allResults, ...data];
          fs.writeFileSync(
            'teny_malagasy_progress.json',
            JSON.stringify(tempResults, null, 2),
            'utf-8'
          );
          console.log(`💾 Sauvegarde intermédiaire: ${tempResults.length} mots\n`);
        }
        
        return data;
      })
    )
  );

  rangeResults.forEach(data => allResults.push(...data));

  fs.writeFileSync(
    'teny_malagasy_final.json',
    JSON.stringify(allResults, null, 2),
    'utf-8'
  );

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const withExplanation = allResults.filter(w => w.explain).length;
  
  console.log(`\n✅ TERMINÉ en ${duration} minutes`);
  console.log(`📊 Total: ${allResults.length} mots`);
  console.log(`📊 Avec explication: ${withExplanation}/${allResults.length}`);
  console.log(`⚡ Vitesse: ${(allResults.length / (Date.now() - startTime) * 1000).toFixed(2)} mots/seconde`);
}

scrapeAllAlphabet().catch(console.error);