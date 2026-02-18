"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsDetailPage() {
    const { id } = useParams();
    const { t } = useLanguage();
    const projectsData = data.projects as any;

    const items = [...projectsData.items].sort((a: any, b: any) => (b.sort_date || '').localeCompare(a.sort_date || ''));
    const initialItem = items.find(i => i.id === id) || null;

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
            initialSelectedItem={initialItem}
        />
    );
}
