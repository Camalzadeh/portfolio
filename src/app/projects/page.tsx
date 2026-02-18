"use client";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPage() {
    const { t } = useLanguage();
    const projectsData = data.projects as any;

    // Sort and wrap in a single category for consistency with DetailLayout
    const items = [...projectsData.items].sort((a: any, b: any) => (b.sort_date || '').localeCompare(a.sort_date || ''));
    const categories = [{
        id: 'all-projects',
        title: t('projects.title_main'),
        items: items
    }];

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.projects')}
            titleMain={t('projects.title_main')}
            titleSub={t('projects.title_sub')}
            categories={categories}
        />
    );
}
