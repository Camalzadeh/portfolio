const fs = require('fs');
const path = require('path');

const mainTagsPath = path.join(process.cwd(), 'public/tags/about.json');
const data = JSON.parse(fs.readFileSync(mainTagsPath, 'utf8'));

// 1. Update tagTypes
data.tagTypes = [
    { id: "languages", name: "Languages", icon: "code", color: "#2dd4bf" },
    { id: "frameworks", name: "Frameworks & Libs", icon: "layers", color: "#818cf8" },
    { id: "databases", name: "Databases", icon: "database", color: "#fb7185" },
    { id: "ai_ml", name: "AI & Intelligence", icon: "brain", color: "#e879f9" },
    { id: "cloud_devops", name: "Cloud & DevOps", icon: "server", color: "#fbbf24" },
    { id: "concepts", name: "Concepts & Methods", icon: "book", color: "#94a3b8" },
    { id: "organizations", name: "Organizations", icon: "building", color: "#4ade80" },
    { id: "experience", name: "Events & Roles", icon: "award", color: "#f472b6" }
];

// 2. Map tags to new types
const ORGS = ["abb", "ada-university", "constructor-university", "idda", "ufaz", "bhos", "siemens", "4sim", "buta-group", "miull", "codestar", "turkcell", "aegee", "bir-konullu", "idda"];
const CONCEPTS = ["algorithms", "data-structures", "graphs", "oop", "design-patterns", "software-architecture", "software-engineering", "computer-science", "competitive-programming", "olympiad", "scientific", "programming"];
const EVENTS = ["hackathon", "internship", "startup", "conference", "math-camp", "data-camp", "world-skills", "icpc", "icsc"];
const CLOUD = ["docker", "aws", "firebase", "vercel", "github", "ghcr", "cloudrun", "namecheap", "alwaysdata", "maven", "apache-tomcat"];
const AI = ["ai", "ml", "gemini", "machine-learning", "artificial-intelligence", "data-science", "computer-vision", "sign-language", "pest-detection"];
const FRAMEWORKS = ["flutter", "django", "react", "nextjs", "tailwind", "bootstrap", "spring", "spring-boot", "hibernate", "resend", "ably"];
const DATABASES = ["postgresql", "mysql", "oracle", "mongodb", "database_administration", "crm", "erp", "erp-systems"];

data.tags.forEach(tag => {
    if (ORGS.includes(tag.id)) tag.type = "organizations";
    else if (CONCEPTS.includes(tag.id)) tag.type = "concepts";
    else if (EVENTS.includes(tag.id)) tag.type = "experience";
    else if (CLOUD.includes(tag.id)) tag.type = "cloud_devops";
    else if (AI.includes(tag.id)) tag.type = "ai_ml";
    else if (FRAMEWORKS.includes(tag.id)) tag.type = "frameworks";
    else if (DATABASES.includes(tag.id)) tag.type = "databases";
    else if (["python", "javascript", "html", "css", "php", "c", "cpp", "c++", "typescript", "java", "dart", "c-sharp"].includes(tag.id)) tag.type = "languages";
    else tag.type = "organizations"; // fallback for university names or tools
});

// Post-cleaning falls through
data.tags.forEach(tag => {
    if (tag.id === "design" || tag.id === "photoshop" || tag.id === "unsplash") tag.type = "concepts";
    if (tag.id === "no-code") tag.type = "frameworks";
    if (tag.id === "api" || tag.id === "backend" || tag.id === "frontend" || tag.id === "web" || tag.id === "mobile-development") tag.type = "concepts";
});

fs.writeFileSync(mainTagsPath, JSON.stringify(data, null, 4), 'utf8');
console.log("Successfully refined tag categories.");
