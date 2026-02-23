const fs = require('fs');
const path = require('path');

const TAGS_DIR = path.join(process.cwd(), 'public/tags');
const MASTER_ABOUT_PATH = path.join(TAGS_DIR, 'about.json');

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif'];

// Common ID overrides based on filename
const ID_OVERRIDES = {
    'js': 'javascript',
    'ts': 'typescript',
    'cpp': 'c++',
    'c_sharp': 'c-sharp',
    'hibernate_logo': 'hibernate',
    'spring_boot': 'spring-boot',
    'clean-architecture': 'clean-architecture',
    'standford-university': 'stanford-university',
    'baku-engineering-university': 'beu',
    'e-olymp': 'eolymp',
    'bir_konullu': 'bir-konullu',
    'buta_group': 'buta-group',
    'no_code': 'no-code',
    'content-creation': 'content-creation',
    'computer_vision': 'computer-vision',
    'machine_learning': 'machine-learning',
    'artificial_intelligence': 'artificial-intelligence',
    'sign_language': 'sign-language',
    'pest_detection': 'pest-detection',
    'data_science': 'data-science',
    'data_structures': 'data-structures',
    'software_engineering': 'software-engineering',
    'software_architecture': 'software-architecture',
    'mobile_development': 'mobile-development',
    'design_patterns': 'design-patterns',
    'solid-principles': 'solid-principles',
    'game-theory': 'game-theory',
    'number-theory': 'number-theory',
    'greedy-algorithms': 'greedy-algorithms',
    'dynamic-programming': 'dynamic-programming',
    'problem-solving': 'problem-solving',
    'functional-programming': 'functional-programming',
    'cloud_run': 'cloud-run'
};

const NAME_OVERRIDES = {
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'cpp': 'C++',
    'c++': 'C++',
    'c-sharp': 'C Sharp',
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'html': 'HTML',
    'css': 'CSS',
    'php': 'PHP',
    'sql': 'SQL',
    'miuul': 'Miuul',
    'ufaz': 'UFAZ',
    'beu': 'Baku Engineering University',
    'bhos': 'BHOS',
    'icpc': 'ICPC',
    'idda': 'IDDA',
    'ada-university': 'Ada University',
    'siemens': 'Siemens',
    'resend': 'Resend',
    'vercel': 'Vercel',
    'ghcr': 'GHCR',
    'ably': 'Ably',
    'aws': 'AWS',
    'crm': 'CRM',
    'erp': 'ERP',
    'next-js': 'Next.js',
    'nextjs': 'Next.js',
    'react': 'React',
    'spring-boot': 'Spring Boot',
    'spring': 'Spring',
    'solid-principles': 'SOLID Principles',
    'oop': 'OOP',
    'api': 'API',
    'no-code': 'No Code'
};

function titlize(str) {
    if (NAME_OVERRIDES[str]) return NAME_OVERRIDES[str];
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function rebuild() {
    console.log('🔄 Rebuilding all tag about.json files...');

    const masterAbout = JSON.parse(fs.readFileSync(MASTER_ABOUT_PATH, 'utf8'));
    const tagTypes = masterAbout.tagTypes || [];
    const foundFolders = fs.readdirSync(TAGS_DIR).filter(f => fs.statSync(path.join(TAGS_DIR, f)).isDirectory());

    foundFolders.forEach(folder => {
        const folderPath = path.join(TAGS_DIR, folder);
        const files = fs.readdirSync(folderPath);
        const tags = [];

        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
                const base = path.basename(file, ext);
                const id = ID_OVERRIDES[base] || base.replace(/_/g, '-');
                const name = titlize(id);

                tags.push({
                    id,
                    name,
                    type: folder,
                    path: `tags/${folder}/${file}`
                });
            }
        });

        if (tags.length > 0) {
            const subAboutPath = path.join(folderPath, 'about.json');
            fs.writeFileSync(subAboutPath, JSON.stringify({ tags }, null, 4), 'utf8');
            console.log(`✅ Generated ${subAboutPath} with ${tags.length} tags.`);
        }
    });

    // Update master about.json to match folders
    const updatedTagTypes = tagTypes.filter(type => foundFolders.includes(type.id));

    // Add missing types if folders exist but not in master
    foundFolders.forEach(folder => {
        if (!updatedTagTypes.some(t => t.id === folder)) {
            updatedTagTypes.push({
                id: folder,
                name: titlize(folder),
                icon: "tag",
                color: "#94a3b8"
            });
        }
    });

    masterAbout.tagTypes = updatedTagTypes;
    fs.writeFileSync(MASTER_ABOUT_PATH, JSON.stringify(masterAbout, null, 4), 'utf8');
    console.log('✅ Updated master about.json.');
}

rebuild();
