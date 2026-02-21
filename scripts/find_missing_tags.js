const fs = require('fs');
const path = require('path');

const mainTagsPath = path.join(process.cwd(), 'public/tags/about.json');
const fixedDataDir = path.join(process.cwd(), 'public/fixed_data');

const mainTagsData = JSON.parse(fs.readFileSync(mainTagsPath, 'utf8'));
const definedTagIds = new Set(mainTagsData.tags.map(t => t.id));
const foundTagIds = new Set();

function findAboutFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findAboutFiles(fullPath);
        } else if (file === 'about.json') {
            try {
                const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                if (data.tagIds) {
                    data.tagIds.forEach(id => foundTagIds.add(id));
                }
            } catch (e) {
                console.error(`Error parsing ${fullPath}:`, e.message);
            }
        }
    }
}

findAboutFiles(fixedDataDir);

const missingTags = Array.from(foundTagIds).filter(id => !definedTagIds.has(id));
console.log('Detected missing tags:');
missingTags.forEach(tag => console.log(`- ${tag}`));

// Group them for easier addition
const newTags = missingTags.map(id => ({
    id: id,
    name: id.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    type: 'other',
    path: `tags/${id}.png` // Prediction
}));

console.log('\nJSON for about.json:');
console.log(JSON.stringify(newTags, null, 4));
