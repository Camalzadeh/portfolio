const fs = require('fs');
const path = require('path');
const { aggregateItems } = require('./aggregate_items');
const { aggregateTags } = require('./aggregate_tags');

const CV_DIR = path.join(process.cwd(), 'public/cv');
const CV_METADATA_PATH = path.join(CV_DIR, 'about.json');
const CV_CONFIG_PATH = path.join(process.cwd(), 'src/data/cv_config.json');

async function main() {
    console.log('🚀 Finalizing Vault Aggregation...');

    // 1. Sync CV
    if (fs.existsSync(CV_METADATA_PATH)) {
        const cvConfig = fs.readFileSync(CV_METADATA_PATH, 'utf8');
        fs.writeFileSync(CV_CONFIG_PATH, cvConfig, 'utf8');
        console.log('📄 CV configuration synced.');
    }

    // 2. Aggregate Items and get tag usage counts
    const tagCounts = aggregateItems();

    // 3. Aggregate Tags with counts
    aggregateTags(tagCounts);

    console.log('✨ All data synchronized successfully.');
}

main().catch(console.error);
