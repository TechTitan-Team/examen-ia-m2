import puppeteer from 'puppeteer';
import fs from 'fs';

const BASE_URL = 'https://tenymalagasy.org/bins/alphaLists?lang=mg&range=';
const MAIN_URL = 'https://tenymalagasy.org/bins/alphaLists?lang=mg';
const CONCURRENCY = 4;

/* -----------------------------
   Utils
-------------------------------- */
function normalizeText(text) {
  return text
    ?.replace(/<u>|<\/u>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseWordAndLemma(text) {
  const match = text.match(/^(.+?)(?:\s*\((.+?)\))?$/);
  return {
    word: normalizeText(match?.[1]),
    lemma: normalizeText(match?.[2] || ''),
  };
}

/* -----------------------------
   Async Queue
-------------------------------- */
async function asyncQueue(items, worker, limit = 4) {
  const results = [];
  const executing = [];

  for (const item of items) {
    const p = Promise.resolve().then(() => worker(item));
    results.push(p);

    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

/* -----------------------------
   Scrape one range
-------------------------------- */
async function scrapeRange(browser, range) {
  const page = await browser.newPage();
  const url = BASE_URL + range;

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Attendre que le tableau principal soit chargé
    await page.waitForSelector('table[width="100%"] td[width="80%"] table', { timeout: 10000 });

    const entries = await page.evaluate(() => {
      const results = [];
      
      // Sélectionner le tableau dans la colonne de 80%
      const mainTable = document.querySelector('table[width="100%"] td[width="80%"] table');
      if (!mainTable) return results;

      // Récupérer toutes les lignes du tableau
      const rows = mainTable.querySelectorAll('tr.menuLink');

      for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) continue;

        // Première colonne : mot malagasy
        const wordCell = cells[0];
        const wordLink = wordCell.querySelector('a');
        if (!wordLink) continue;
        
        const word = wordLink.innerText.trim();

        // Deuxième colonne : traduction anglaise
        const englishCell = cells[1];
        const englishLinks = englishCell.querySelectorAll('a');
        const englishTranslations = Array.from(englishLinks).map(a => a.innerText.trim());

        // Troisième colonne : traduction française
        const frenchCell = cells[2];
        const frenchLinks = frenchCell.querySelectorAll('a');
        const frenchTranslations = Array.from(frenchLinks).map(a => a.innerText.trim());

        results.push({
          word,
          englishTranslations,
          frenchTranslations
        });
      }

      return results;
    });

    await page.close();

    return entries.map(e => {
      const { word, lemma } = parseWordAndLemma(e.word);
      return {
        word,
        lemma,
        translations: {
          en: e.englishTranslations,
          fr: e.frenchTranslations
        },
        ranges: [range],
      };
    });
  } catch (error) {
    console.error(`❌ Erreur lors du scraping de ${range}:`, error.message);
    await page.close();
    return [];
  }
}

/* -----------------------------
   Deduplication intelligente
-------------------------------- */
function deduplicate(entries) {
  const map = new Map();

  for (const item of entries) {
    const key = `${item.word}|${item.lemma}`;

    if (!map.has(key)) {
      map.set(key, {
        word: item.word,
        lemma: item.lemma,
        translations: {
          en: new Set(item.translations.en),
          fr: new Set(item.translations.fr)
        },
        ranges: new Set(item.ranges),
      });
    } else {
      const existing = map.get(key);
      item.translations.en.forEach(t => existing.translations.en.add(t));
      item.translations.fr.forEach(t => existing.translations.fr.add(t));
      item.ranges.forEach(r => existing.ranges.add(r));
    }
  }

  return Array.from(map.values()).map(v => ({
    word: v.word,
    lemma: v.lemma,
    translations: {
      en: Array.from(v.translations.en),
      fr: Array.from(v.translations.fr)
    },
    ranges: Array.from(v.ranges),
  }));
}

/* -----------------------------
   Get ranges from main page
-------------------------------- */
async function getRanges(browser) {
  const page = await browser.newPage();
  await page.goto(MAIN_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Attendre le tableau avec les ranges (colonne 20%)
  await page.waitForSelector('table[width="100%"] td[width="20%"] table');

  const ranges = await page.evaluate(() => {
    const rangeTable = document.querySelector('table[width="100%"] td[width="20%"] table');
    if (!rangeTable) return [];

    const links = rangeTable.querySelectorAll('a[href*="range="]');
    const set = new Set();
    
    links.forEach(a => {
      const match = a.href.match(/range=([^&]+)/);
      if (match) {
        set.add(decodeURIComponent(match[1]));
      }
    });
    
    return Array.from(set);
  });

  await page.close();
  return ranges;
}

/* -----------------------------
   Main
-------------------------------- */
export async function scrapeAllAlphabet() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log('🔍 Récupération des ranges...');
  const ranges = await getRanges(browser);
  console.log(`✅ ${ranges.length} ranges trouvés:`, ranges);

  const allResults = [];

  await asyncQueue(
    ranges,
    async range => {
      console.log(`🔤 Scraping range: ${range}`);
      const data = await scrapeRange(browser, range);
      console.log(`   ✓ ${data.length} mots extraits`);
      allResults.push(...data);
    },
    CONCURRENCY
  );

  await browser.close();

  console.log('🔄 Déduplication...');
  const cleanData = deduplicate(allResults);

  fs.writeFileSync(
    'teny_malagasy_clean.json',
    JSON.stringify(cleanData, null, 2),
    'utf-8'
  );

  console.log(`✅ Terminé: ${cleanData.length} mots uniques sauvegardés`);
}

scrapeAllAlphabet();