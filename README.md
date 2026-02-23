# Portfolio System

A high-performance, modular portfolio engine built with **Next.js 15**, **Tailwind CSS**, and a decentralized data architecture. This project features an intelligent tag aggregation system that automatically synchronizes folder-based assets with a premium frontend Experience.

## 🚀 Key Features

-   **Decentralized Tag Architecture**: Manage tags and their visual assets directly within the file system (`public/tags/{category}/about.json`).
-   **Automated Data Aggregation**: Custom Node.js scripts (`init.js`, `rebuild_all_tags.js`) orchestrate the synchronization between raw data and the frontend registry.
-   **Premium Skill Matrix**: An interactive, categorizable skill interface with real-time usage counting and cross-referencing.
-   **Academic & Experience Timeline**: Deeply integrated timeline components for displaying professional and academic milestones.
-   **Dynamic Media Previews**: High-performance previews for PDFs, Images, and specialized media types.
-   **SEO Optimized**: Semantic HTML structure and optimized metadata for maximum visibility.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```bash
├── public/
│   ├── fixed_data/    # Raw JSON data for items (Experience, Projects, Academic)
│   └── tags/          # Decentralized tag categories and image assets
├── scripts/           # Aggregation and maintenance automation
│   ├── init.js        # Master initialization entry point
│   ├── aggregate_tags.js # Local metadata merger
│   └── rebuild_all_tags.js # Intelligent asset discovery
├── src/
│   ├── components/    # Premium UI components
│   └── data/          # Generated JSON registries (Ignored by Git)
└── package.json       # Task orchestration
```

## ⚙️ Workflow & Scripts

### Initialization
Before running for the first time or after adding new assets, run:
```bash
npm run dev
# This triggers: node scripts/init.js; next dev
```

### Tag Management
To add a new tag:
1. Drop the logo (`.png`, `.svg`, `.webp`) into the relevant folder in `public/tags/`.
2. Run the rebuild script to update metadata:
```bash
node scripts/rebuild_all_tags.js
```

### Production Build
```bash
npm run build
```

## 🎨 Design System
The project uses a curated color palette and semantic iconography to distinguish between different technology domains (e.g., **Fuchsia** for AI, **Teal** for Programming, **Amber** for Services).

---