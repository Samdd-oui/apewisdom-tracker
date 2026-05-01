import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "../data/history.json");
const API = "https://apewisdom.io/api/v1.0";
const MAX_SNAPSHOTS = 500;
const FILTERS = ["wallstreetbets", "all-stocks"];

async function fetchFilter(filter) {
  const results = [];
  for (let page = 1; page <= 3; page++) {
    const url = `${API}/filter/${filter}/page/${page}`;
    console.log(`  Fetching ${url}`);
    const res = await fetch(url);
    if (!res.ok) break;
    const json = await res.json();
    const items = json.results || [];
    if (items.length === 0) break;
    results.push(...items.map(d => ({
      rank: parseInt(d.rank),
      ticker: d.ticker,
      name: d.name,
      mentions: parseInt(d.mentions || 0),
      upvotes: parseInt(d.upvotes || 0),
      rank_24h_ago: parseInt(d.rank_24h_ago || 0),
      mentions_24h_ago: parseInt(d.mentions_24h_ago || 0),
    })));
    await new Promise(r => setTimeout(r, 400));
  }
  return results;
}

async function main() {
  const ts = new Date().toISOString();
  let history = [];
  if (existsSync(DATA_PATH)) {
    try { history = JSON.parse(readFileSync(DATA_PATH, "utf8")); } catch(e) {}
  }
  const byFilter = {};
  for (const filter of FILTERS) {
    console.log(`\nFetch: ${filter}`);
    try {
      byFilter[filter] = await fetchFilter(filter);
      console.log(`  → ${byFilter[filter].length} stocks`);
    } catch(e) {
      console.error(`  Erreur: ${e.message}`);
      byFilter[filter] = [];
    }
  }
  history.push({ ts, filters: byFilter });
  if (history.length > MAX_SNAPSHOTS) history = history.slice(-MAX_SNAPSHOTS);
  writeFileSync(DATA_PATH, JSON.stringify(history), "utf8");
  console.log(`\n✓ ${history.length} snapshots sauvegardés`);
}

main().catch(e => { console.error(e); process.exit(1); });
