const fs = require('fs');
const path = require('path');

const FIXED_DATA_DIR = path.join(process.cwd(), 'public/fixed_data');
const TAGS_DIR = path.join(process.cwd(), 'public/tags');
const PORTFOLIO_JSON_PATH = path.join(process.cwd(), 'src/data/portfolio.json');
const TAGS_METADATA_PATH = path.join(TAGS_DIR, 'about.json');

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
    console.log('🚀 Aggregating portfolio data...');

    // Ensure the data directory exists
    const dataDir = path.dirname(PORTFOLIO_JSON_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    let portfolio;
    if (fs.existsSync(PORTFOLIO_JSON_PATH)) {
        portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_JSON_PATH, 'utf8'));
    } else {
        console.log('📝 Portfolio JSON not found, creating from template...');
        portfolio = {
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
            },
            tags: [],
            skillCategories: []
        };
    }

    // Define the required categories structure
    const requiredCategories = [
        { id: "university", title: "University" },
        { id: "courses", title: "Courses" },
        { id: "certifications", title: "Certifications" },
        { id: "extra_activities", title: "Achievements & Activities" },
        { id: "research", title: "Research" }
    ];

    // Ensure academic categories are up to date
    if (!portfolio.academic) portfolio.academic = { categories: [] };

    // Create a new categories array based on requiredCategories, merging existing data if IDs match
    const updatedCategories = requiredCategories.map(req => {
        const existing = (portfolio.academic.categories || []).find(c => c.id === req.id);
        return {
            id: req.id,
            title: req.title, // Always use the latest title from template
            items: [] // Clear items to rebuild
        };
    });

    portfolio.academic.categories = updatedCategories;

    // Clear existing items for other sections
    portfolio.experience.items = [];
    portfolio.projects.items = [];

    // Load Tags Metadata
    let globalTags = [];
    if (fs.existsSync(TAGS_METADATA_PATH)) {
        const tagsData = JSON.parse(fs.readFileSync(TAGS_METADATA_PATH, 'utf8'));
        globalTags = tagsData.tags || [];
        console.log(`🏷️ Loaded ${globalTags.length} tags from metadata.`);
    }
    portfolio.tags = globalTags;

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

        // Transform tags to tagIds and resolve to full tag objects
        let tagIds = [];
        if (content.tags) {
            tagIds = content.tags.map(tag => typeof tag === 'string' ? tag : (tag.id || ''));
        } else if (content.tagIds) {
            tagIds = content.tagIds;
        }

        content.tagIds = tagIds.filter(id => id !== '');

        // Resolve full tag objects for the item (for the aggregated portfolio.json)
        const itemTags = content.tagIds.map(id => {
            const found = globalTags.find(t => t.id === id);
            if (found) return found;
            return { id: id, name: id.charAt(0).toUpperCase() + id.slice(1), path: null };
        });

        // Update the about.json file itself (keeping it clean)
        const aboutJsonContent = { ...content };
        delete aboutJsonContent.tags; // Don't save full objects in sub-files
        fs.writeFileSync(filePath, JSON.stringify(aboutJsonContent, null, 4), 'utf8');

        // But use the full tags for the aggregated data
        content.tags = itemTags;

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

    // Group tags by their formal types for the skills section
    let tagTypes = [];
    if (fs.existsSync(TAGS_METADATA_PATH)) {
        const tagsData = JSON.parse(fs.readFileSync(TAGS_METADATA_PATH, 'utf8'));
        tagTypes = tagsData.tagTypes || [];
    }

    const skillCategories = tagTypes.map(typeDef => {
        return {
            ...typeDef,
            tags: globalTags.filter(tag => tag.type === typeDef.id)
        };
    }).filter(cat => cat.tags.length > 0);

    // Fallback for tags with unknown or missing types
    const knownTypeIds = tagTypes.map(t => t.id);
    const otherTags = globalTags.filter(tag => !tag.type || !knownTypeIds.includes(tag.type));
    if (otherTags.length > 0) {
        skillCategories.push({
            id: 'other',
            name: 'Other',
            icon: 'terminal',
            color: '#94a3b8',
            tags: otherTags
        });
    }

    portfolio.skillCategories = skillCategories;
    delete portfolio.skills; // Remove legacy skills object

    fs.writeFileSync(PORTFOLIO_JSON_PATH, JSON.stringify(portfolio, null, 4), 'utf8');
    console.log('✅ Portfolio data aggregated successfully!');
}

aggregate();
