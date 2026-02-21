const fs = require('fs');
const path = require('path');

const tagsConfigPath = path.join(process.cwd(), 'public/tags/about.json');
const tagsDir = path.join(process.cwd(), 'public/tags');

if (!fs.existsSync(tagsConfigPath)) {
    console.error('Config not found');
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(tagsConfigPath, 'utf8'));
const files = fs.readdirSync(tagsDir);

// 1. Remove "graph" tag
config.tags = config.tags.filter(t => t.id !== 'graph');

// 2. Reconcile paths
config.tags.forEach(tag => {
    const id = tag.id;
    const variants = [
        id,
        id.replace(/-/g, '_'),
        id.replace(/_/g, '-'),
        id.replace(/\+\+/g, 'pp'),
        // Specific mappings
        id === 'nextjs' ? 'next' : null,
        id === 'javascript' ? 'js' : null,
        id === 'typescript' ? 'ts' : null,
        id === 'mongodb' ? 'mongo' : null,
        id === 'c-sharp' ? 'c_sharp' : null,
        id === 'graphs' ? 'graph' : null,
        id === 'miull' ? 'miuul' : null,
        id === 'azerbaijani' ? 'azerbaijan' : null,
        id === 'scientific' ? 'science' : null,
        id === 'cloudrun' ? 'cloud_run' : null,
        id === 'ai' || id === 'ml' ? 'gemini' : null,
        id === 'algorithms' ? 'algorithm' : null
    ].filter(Boolean);

    const extensions = ['.png', '.svg', '.webp', '.jpg', '.jpeg'];
    let foundFile = null;

    for (const variant of variants) {
        for (const ext of extensions) {
            if (files.includes(variant + ext)) {
                foundFile = variant + ext;
                break;
            }
        }
        if (foundFile) break;
    }

    if (!foundFile && id === 'hibernate' && files.includes('hibernate_logo.png')) {
        foundFile = 'hibernate_logo.png';
    }

    if (foundFile) {
        tag.path = `tags/${foundFile}`;
    } else {
        tag.path = null;
    }
});

fs.writeFileSync(tagsConfigPath, JSON.stringify(config, null, 4), 'utf8');
console.log('Successfully synchronized tag images and removed duplicate graph tag.');
