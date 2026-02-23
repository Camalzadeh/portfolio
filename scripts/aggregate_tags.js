const fs = require('fs');
const path = require('path');

const TAGS_DIR = path.join(process.cwd(), 'public/tags');
const MASTER_TAGS_PATH = path.join(TAGS_DIR, 'about.json');
const TAGS_JSON_PATH = path.join(process.cwd(), 'src/data/tags.json');

function aggregateTags(tagCounts = {}) {
    console.log('🏷️  Aggregating Tags based on Folder Structure...');

    if (!fs.existsSync(MASTER_TAGS_PATH)) {
        console.error('❌ Master tags about.json not found!');
        return;
    }

    const masterData = JSON.parse(fs.readFileSync(MASTER_TAGS_PATH, 'utf8'));
    const tagTypes = masterData.tagTypes || [];
    let allTags = [];

    // Scan subdirectories for tags
    const folders = fs.readdirSync(TAGS_DIR);
    folders.forEach(folder => {
        const folderPath = path.join(TAGS_DIR, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const subAboutPath = path.join(folderPath, 'about.json');
            if (fs.existsSync(subAboutPath)) {
                const subData = JSON.parse(fs.readFileSync(subAboutPath, 'utf8'));
                if (subData.tags) {
                    subData.tags.forEach(tag => {
                        // FORCE type to folder name (User's wish: structure-driven)
                        tag.type = folder;

                        // Auto-correct path if it exists
                        if (tag.path && tag.path.startsWith('tags/')) {
                            const fileName = path.basename(tag.path);
                            tag.path = `tags/${folder}/${fileName}`;
                        }

                        // Add usage count
                        tag.count = tagCounts[tag.id] || 0;
                        allTags.push(tag);
                    });

                    // Optional: Save the corrected sub-about.json back to keep it clean
                    fs.writeFileSync(subAboutPath, JSON.stringify(subData, null, 4), 'utf8');
                }
            }
        }
    });

    // Sort tags globally by count descending
    allTags.sort((a, b) => (b.count || 0) - (a.count || 0));

    // Build skill categories for UI
    const skillCategories = tagTypes.map(typeDef => {
        const catTags = allTags.filter(tag => tag.type === typeDef.id);
        catTags.sort((a, b) => (b.count || 0) - (a.count || 0));
        return {
            ...typeDef,
            tags: catTags
        };
    }).filter(cat => cat.tags.length > 0);

    const result = {
        tags: allTags,
        skillCategories
    };

    fs.writeFileSync(TAGS_JSON_PATH, JSON.stringify(result, null, 4), 'utf8');
    console.log(`✅ Tags aggregated. Found ${allTags.length} tags across ${folders.length} categories.`);
}

module.exports = { aggregateTags };
