const fs = require('fs');
const path = require('path');

const FIXED_DATA_DIR = path.join(process.cwd(), 'public/fixed_data');
const TAGS_DIR = path.join(process.cwd(), 'public/tags');

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

// 1. Collect all used Tag IDs from fixed_data
const usedTags = new Set();
const itemFiles = findAboutFiles(FIXED_DATA_DIR);
itemFiles.forEach(f => {
    const content = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (content.tagIds) {
        content.tagIds.forEach(id => usedTags.add(id));
    }
});

// 2. Collect all defined Tag IDs from public/tags subfolders
const definedTags = new Map();
const tagFolders = fs.readdirSync(TAGS_DIR);
tagFolders.forEach(folder => {
    const folderPath = path.join(TAGS_DIR, folder);
    if (fs.statSync(folderPath).isDirectory()) {
        const aboutPath = path.join(folderPath, 'about.json');
        if (fs.existsSync(aboutPath)) {
            const content = JSON.parse(fs.readFileSync(aboutPath, 'utf8'));
            if (content.tags) {
                content.tags.forEach(tag => {
                    definedTags.set(tag.id, { ...tag, folder });
                });
            }
        }
    }
});

console.log('--- 🔍 Checking Tag Integrity ---');

// Check for used but not defined
const missingInDefinitions = [];
usedTags.forEach(id => {
    if (!definedTags.has(id)) {
        missingInDefinitions.push(id);
    }
});

if (missingInDefinitions.length > 0) {
    console.log('❌ USED in items but NOT DEFINED in tags structure:');
    console.log(missingInDefinitions.join(', '));
} else {
    console.log('✅ All used tags are defined.');
}

// Check for defined but not used
const unusedTags = [];
definedTags.forEach((tag, id) => {
    if (!usedTags.has(id)) {
        unusedTags.push(id);
    }
});

if (unusedTags.length > 0) {
    console.log('⚠️ DEFINED but NOT USED anywhere in items:');
    console.log(unusedTags.join(', '));
}

// Check for image path validity
console.log('\n--- 🖼️ Checking Image Paths ---');
definedTags.forEach((tag, id) => {
    if (tag.path) {
        // Path is usually like "tags/folder/image.png"
        // We need to check "public/tags/folder/image.png"
        const relativeToPublic = tag.path; // e.g. "tags/math/math.png"
        const fullImagePath = path.join(process.cwd(), 'public', relativeToPublic);

        if (!fs.existsSync(fullImagePath)) {
            console.log(`❌ Image NOT FOUND for tag [${id}]: ${tag.path}`);
            // Check if it exists with different separator
            const suggestedPath = tag.path.replace(/_/g, '-');
            const suggestedFull = path.join(process.cwd(), 'public', suggestedPath);
            if (fs.existsSync(suggestedFull)) {
                console.log(`   💡 Suggested fix: ${suggestedPath}`);
            }
        }
    }
});
