const fs = require('fs');
const path = require('path');

const FIXED_DATA_DIR = path.join(process.cwd(), 'public/fixed_data');
const PORTFOLIO_JSON_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

// Re-map subtypes to portfolio.json category IDs
const CATEGORY_MAP = {
    'certifications': 'certifications',
    'courses': 'courses',
    'achievements': 'achievements_and_activities',
    'research': 'research',
    'university': 'university'
};

function findAboutFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findAboutFiles(filePath, fileList);
        } else if (file === 'about.json') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function aggregate() {
    console.log('🚀 Aggregating portfolio data...');

    if (!fs.existsSync(PORTFOLIO_JSON_PATH)) {
        console.error('Portfolio JSON template not found!');
        return;
    }

    const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_JSON_PATH, 'utf8'));

    // Clear existing items to rebuild from about.json files
    portfolio.experience.items = [];
    portfolio.projects.items = [];
    portfolio.academic.categories.forEach(cat => {
        cat.items = [];
    });

    const aboutFiles = findAboutFiles(FIXED_DATA_DIR);

    aboutFiles.forEach(filePath => {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const folderDir = path.dirname(filePath);

        // Ensure path and data_folder are correctly set
        const relPath = path.relative(FIXED_DATA_DIR, path.dirname(filePath)).replace(/\\/g, '/');
        const folderPath = `fixed_data/${relPath}`;
        content.path = folderPath;
        content.data_folder = folderPath;

        // Sync media files in the folder
        const mediaFiles = fs.readdirSync(folderDir);
        const mediaList = [];

        // Keep external URLs from existing media
        if (content.media) {
            content.media.forEach(m => {
                if (m.type === 'url' || m.type === 'external' || (m.url_text && !m.path) || (m.path && m.path.startsWith('http'))) {
                    mediaList.push(m);
                }
            });
        }

        // Add local files
        mediaFiles.forEach(f => {
            const fLower = f.toLowerCase();
            if (fLower.endsWith('.pdf') || fLower.endsWith('.png') || fLower.endsWith('.jpg') || fLower.endsWith('.jpeg') || fLower.endsWith('.webp') || fLower.endsWith('.mhtml')) {
                if (!fLower.startsWith('about')) {
                    const fPath = `${folderPath}/${f}`;
                    let mType = "other";
                    if (fLower.endsWith('.pdf')) mType = "pdf";
                    else if (['.png', '.jpg', '.jpeg', '.webp'].some(ext => fLower.endsWith(ext))) mType = "image";
                    else if (fLower.endsWith('.mhtml')) mType = "mhtml";

                    // Check if already in list (avoid duplicates)
                    if (!mediaList.some(m => m.path === fPath)) {
                        mediaList.push({
                            type: mType,
                            url_text: null,
                            title: f.split('.').slice(0, -1).join('.').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            path: fPath
                        });
                    }
                }
            }
        });
        content.media = mediaList;

        // Transform tags to tagIds
        let tagIds = [];
        if (content.tags) {
            tagIds = content.tags.map(tag => typeof tag === 'string' ? tag : (tag.id || ''));
            delete content.tags;
        } else if (content.tagIds) {
            tagIds = content.tagIds;
        }
        content.tagIds = tagIds.filter(id => id !== '');

        // Update the about.json file itself with the new format
        fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');

        // Add to aggregate data
        if (content.type === 'experience') {
            portfolio.experience.items.push(content);
        } else if (content.type === 'projects') {
            portfolio.projects.items.push(content);
        } else if (content.type === 'academic') {
            const catId = CATEGORY_MAP[content.subtype] || content.subtype;
            const category = portfolio.academic.categories.find(c => c.id === catId);
            if (category) {
                category.items.push(content);
            } else {
                console.warn(`Unknown academic subtype: ${content.subtype} in ${filePath}`);
            }
        }
    });

    // Optional: Sort items by date if needed
    const sortByDate = (a, b) => {
        const yearA = a.date?.year || 0;
        const yearB = b.date?.year || 0;
        return yearB - yearA; // Newest first
    };

    portfolio.experience.items.sort(sortByDate);
    portfolio.projects.items.sort(sortByDate);
    portfolio.academic.categories.forEach(cat => {
        cat.items.sort(sortByDate);
    });

    fs.writeFileSync(PORTFOLIO_JSON_PATH, JSON.stringify(portfolio, null, 4), 'utf8');
    console.log('✅ Portfolio data aggregated successfully!');
}

aggregate();
