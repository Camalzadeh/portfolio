const fs = require('fs');
const path = require('path');

const mainTagsPath = path.join(process.cwd(), 'public/tags/about.json');
const mainTagsData = JSON.parse(fs.readFileSync(mainTagsPath, 'utf8'));

const missingTagIds = [
    "c-sharp", "database_administration", "web", "olympiad", "abb", "apache-tomcat",
    "spring", "spring-boot", "maven", "data-structures", "hibernate", "backend",
    "api", "software-engineering", "competitive-programming", "graphs",
    "ada-university", "constructor-university", "idda", "c++", "oop",
    "design-patterns", "codestar", "machine-learning", "artificial-intelligence",
    "4sim", "coursera", "software-architecture", "mobile-development", "udemy",
    "aegee", "icpc", "icsc", "bir-konullu", "math-camp", "ufaz", "bhos", "miull",
    "data-camp", "data-science", "conference", "scientific", "world-skills",
    "programming", "design", "photoshop", "computer-vision", "sign-language",
    "azerbaijani", "ieee", "computer-science", "buta-group", "internship",
    "no-code", "crm", "frontend", "erp", "hackathon", "siemens", "erp-systems",
    "sustainable-design", "pest-detection", "guardian-x", "startup"
];

// Simple mapping for common types
const typeMap = {
    "c-sharp": "languages",
    "c++": "languages",
    "spring": "frameworks",
    "spring-boot": "frameworks",
    "hibernate": "frameworks",
    "maven": "other",
    "machine-learning": "ai_ml",
    "artificial-intelligence": "ai_ml",
    "computer-vision": "ai_ml",
    "data-science": "ai_ml",
    "database_administration": "databases",
    "software-engineering": "academic_research",
    "computer-science": "academic_research",
    "data-structures": "academic_research",
    "graphs": "academic_research",
    "design-patterns": "academic_research",
    "oop": "academic_research",
    "software-architecture": "academic_research",
    "competitive-programming": "academic_research",
    "olympiad": "academic_research",
    "math-camp": "academic_research",
    "scientific": "academic_research",
    "conference": "academic_research"
};

const existingIds = new Set(mainTagsData.tags.map(t => t.id));

missingTagIds.forEach(id => {
    if (!existingIds.has(id)) {
        mainTagsData.tags.push({
            id: id,
            name: id.split(/[-_]/).map(word => {
                if (word === "c" && id === "c++") return "C++";
                if (word === "oop") return "OOP";
                if (word === "erp") return "ERP";
                if (word === "crm") return "CRM";
                if (word === "api") return "API";
                if (word === "icpc") return "ICPC";
                if (word === "icsc") return "ICSC";
                if (word === "ufaz") return "UFAZ";
                if (word === "bhos") return "BHOS";
                if (word === "ieee") return "IEEE";
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' '),
            type: typeMap[id] || "other",
            path: `tags/${id}.png`
        });
    }
});

// Remove potential C++ vs c++ duplicates if any
mainTagsData.tags = mainTagsData.tags.filter((tag, index, self) =>
    index === self.findIndex((t) => t.id === tag.id)
);

fs.writeFileSync(mainTagsPath, JSON.stringify(mainTagsData, null, 4), 'utf8');
console.log(`Added ${missingTagIds.length} new tags to public/tags/about.json`);
