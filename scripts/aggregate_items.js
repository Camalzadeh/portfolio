const fs = require('fs');
const path = require('path');

const FIXED_DATA_DIR = path.join(process.cwd(), 'public/fixed_data');
const PORTFOLIO_JSON_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

const CATEGORY_MAP = {
    'university': 'university',
    'courses': 'courses',
    'certifications': 'certifications',
    'extra_activities': 'extra_activities',
    'achievements': 'extra_activities',
    'research': 'research',
    'researchs': 'research'
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

function aggregateItems() {
    console.log('📦 Aggregating Items (Experience, Projects, Academic)...');

    const portfolio = {
        experience: { items: [] },
        projects: { items: [] },
        academic: {
            categories: [
                { id: "university", title: "University", items: [] },
                { id: "courses", title: "Courses", items: [] },
                { id: "certifications", title: "Certifications", items: [] },
                { id: "extra_activities", title: "Achievements & Activities", items: [] },
                { id: "research", title: "Research", items: [] }
            ]
        }
    };

    const tagCounts = {};
    const aboutFiles = findAboutFiles(FIXED_DATA_DIR);

    aboutFiles.forEach(filePath => {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const folderDir = path.dirname(filePath);
        const relPath = path.relative(FIXED_DATA_DIR, folderDir).replace(/\\/g, '/');
        const folderPath = `fixed_data/${relPath}`;

        content.path = folderPath;

        // Auto-sync local media files
        const filesInFolder = fs.readdirSync(folderDir);
        const mediaList = content.media ? [...content.media] : [];

        filesInFolder.forEach(f => {
            const fLower = f.toLowerCase();
            const validExts = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.mhtml'];
            if (validExts.some(ext => fLower.endsWith(ext)) && !fLower.startsWith('about')) {
                const fPath = `${folderPath}/${f}`;
                if (!mediaList.some(m => m.path === fPath)) {
                    let mType = "other";
                    if (fLower.endsWith('.pdf')) mType = "pdf";
                    else if (['.png', '.jpg', '.jpeg', '.webp'].some(ext => fLower.endsWith(ext))) mType = "image";
                    else if (fLower.endsWith('.mhtml')) mType = "mhtml";

                    mediaList.push({
                        type: mType,
                        url_text: null,
                        title: f.split('.').slice(0, -1).join('.').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        path: fPath
                    });
                }
            }
        });
        content.media = mediaList;

        // Count Tags
        const tagIds = content.tagIds || [];
        tagIds.forEach(id => {
            tagCounts[id] = (tagCounts[id] || 0) + 1;
        });

        // Add to main structure
        if (content.type === 'experience') {
            portfolio.experience.items.push(content);
        } else if (content.type === 'projects') {
            portfolio.projects.items.push(content);
        } else if (content.type === 'academic') {
            const catId = CATEGORY_MAP[content.subtype] || content.subtype;
            const targetCat = portfolio.academic.categories.find(c => c.id === catId);
            if (targetCat) targetCat.items.push(content);
            else console.warn(`⚠️  Unknown academic subtype: ${content.subtype} at ${relPath}`);
        }
    });

    // Sort items by date
    const sortByDate = (a, b) => {
        const yearA = a.date?.year || 0;
        const yearB = b.date?.year || 0;
        const monthA = a.date?.month || 0;
        const monthB = b.date?.month || 0;
        if (yearA !== yearB) return yearB - yearA;
        return monthB - monthA;
    };

    portfolio.experience.items.sort(sortByDate);
    portfolio.projects.items.sort(sortByDate);
    portfolio.academic.categories.forEach(c => c.items.sort(sortByDate));

    fs.writeFileSync(PORTFOLIO_JSON_PATH, JSON.stringify(portfolio, null, 4), 'utf8');
    console.log(`✅ Items aggregated. Portfolio saved to ${PORTFOLIO_JSON_PATH}`);

    return tagCounts;
}

module.exports = { aggregateItems };
