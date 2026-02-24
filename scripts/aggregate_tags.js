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

    // --- ENRICH PORTFOLIO.JSON WITH FULL TAG OBJECTS ---
    const PORTFOLIO_JSON_PATH = path.join(process.cwd(), 'src/data/portfolio.json');
    if (fs.existsSync(PORTFOLIO_JSON_PATH)) {
        console.log('🔄 Enriching Portfolio items with full tag data...');
        const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_JSON_PATH, 'utf8'));
        const tagMap = new Map(allTags.map(t => [t.id, t]));

        const enrichItem = (item) => {
            if (item.tagIds) {
                item.tags = item.tagIds
                    .map(id => tagMap.get(id))
                    .filter(t => t !== undefined)
                    .map(t => ({
                        id: t.id,
                        name: t.name,
                        path: t.path
                    }));
            }
        };

        // Enrich Experience
        if (portfolio.experience?.items) {
            portfolio.experience.items.forEach(enrichItem);
        }

        // Enrich Projects
        if (portfolio.projects?.items) {
            portfolio.projects.items.forEach(enrichItem);
        }

        // Enrich Academic
        if (portfolio.academic?.categories) {
            portfolio.academic.categories.forEach(cat => {
                if (cat.items) cat.items.forEach(enrichItem);
            });
        }

        fs.writeFileSync(PORTFOLIO_JSON_PATH, JSON.stringify(portfolio, null, 4), 'utf8');
        console.log('✅ Portfolio enrichment complete. (Experience, Projects, Academic items now have full tag objects)');
    }
}

module.exports = { aggregateTags };
