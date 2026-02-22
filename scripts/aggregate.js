const fs = require('fs');
const path = require('path');

const FIXED_DATA_DIR = path.join(process.cwd(), 'public/fixed_data');
const TAGS_DIR = path.join(process.cwd(), 'public/tags');
const CV_DIR = path.join(process.cwd(), 'public/cv');

const PORTFOLIO_JSON_PATH = path.join(process.cwd(), 'src/data/portfolio.json');
const TAGS_JSON_PATH = path.join(process.cwd(), 'src/data/tags.json');
const CV_CONFIG_PATH = path.join(process.cwd(), 'src/data/cv_config.json');

const TAGS_METADATA_PATH = path.join(TAGS_DIR, 'about.json');
const CV_METADATA_PATH = path.join(CV_DIR, 'about.json');

// Re-map subtypes or folder names to portfolio.json category IDs
const CATEGORY_MAP = {
    'certifications': 'certifications',
    'courses': 'courses',
    'extra_activities': 'extra_activities',
    'achievements': 'extra_activities',
    'research': 'research',
    'researchs': 'research',
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
    console.log('🚀 Starting Deep Data Aggregation...');

    // 0. Ensure target directory exists
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    // 1. Fresh start for portfolio structure
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

    // 2. Load Tags Metadata
    let globalTags = [];
    let tagTypes = [];
    if (fs.existsSync(TAGS_METADATA_PATH)) {
        const tagsSource = JSON.parse(fs.readFileSync(TAGS_METADATA_PATH, 'utf8'));
        globalTags = tagsSource.tags || [];
        tagTypes = tagsSource.tagTypes || [];
    }

    // 3. Sync CV Configuration
    if (fs.existsSync(CV_METADATA_PATH)) {
        const cvConfig = fs.readFileSync(CV_METADATA_PATH, 'utf8');
        fs.writeFileSync(CV_CONFIG_PATH, cvConfig, 'utf8');
        console.log('📄 CV configuration synced.');
    }

    // 4. Process Fixed Data and Count Tags
    const tagCounts = {};
    const aboutFiles = findAboutFiles(FIXED_DATA_DIR);

    aboutFiles.forEach(filePath => {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const folderDir = path.dirname(filePath);
        const relPath = path.relative(FIXED_DATA_DIR, folderDir).replace(/\\/g, '/');
        const folderPath = `fixed_data/${relPath}`;

        content.path = folderPath;
        content.data_folder = folderPath;

        // Auto-sync local media files
        const filesInFolder = fs.readdirSync(folderDir);
        const mediaList = [];

        // Keep existing external URLs
        if (content.media) {
            content.media.forEach(m => {
                if (m.type === 'url' || m.type === 'external' || (m.path && m.path.startsWith('http'))) {
                    mediaList.push(m);
                }
            });
        }

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

        // Resolve and Count Tags
        let tagIds = content.tagIds || (content.tags ? content.tags.map(t => typeof t === 'string' ? t : t.id) : []);
        content.tagIds = [...new Set(tagIds.filter(Boolean))];

        content.tagIds.forEach(id => {
            tagCounts[id] = (tagCounts[id] || 0) + 1;
        });

        // Attach full tag objects for aggregated JSON
        content.tags = content.tagIds.map(id => {
            const found = globalTags.find(t => t.id === id);
            return found || { id, name: id.charAt(0).toUpperCase() + id.slice(1), path: null };
        });

        // Clean sub-file about.json
        const subFileClean = { ...content };
        delete subFileClean.tags; // Sub-files only need IDs
        fs.writeFileSync(filePath, JSON.stringify(subFileClean, null, 4), 'utf8');

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

    // 5. Update Global Tags with counts and sort
    const finalTags = globalTags.map(tag => ({
        ...tag,
        count: tagCounts[tag.id] || 0
    }));

    // Re-build Skill Categories with sorted tags
    const skillCategories = tagTypes.map(typeDef => {
        const catTags = finalTags.filter(tag => tag.type === typeDef.id);
        // Sort tags by count (descending)
        catTags.sort((a, b) => (b.count || 0) - (a.count || 0));

        return {
            ...typeDef,
            tags: catTags
        };
    }).filter(cat => cat.tags.length > 0);

    // 6. Sorting Items Logic
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

    // 7. Write Final Files
    fs.writeFileSync(PORTFOLIO_JSON_PATH, JSON.stringify(portfolio, null, 4), 'utf8');
    fs.writeFileSync(TAGS_JSON_PATH, JSON.stringify({ tags: finalTags, skillCategories }, null, 4), 'utf8');

    console.log(`✅ Aggregation complete! Found ${finalTags.length} tags.`);
    console.log(`📦 Portfolio: ${PORTFOLIO_JSON_PATH}`);
    console.log(`🏷️  Tags: ${TAGS_JSON_PATH}`);
    console.log(`📄 CV Config: ${CV_CONFIG_PATH}`);
}

aggregate();
