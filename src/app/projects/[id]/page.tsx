"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsDetailPage() {
    const { id } = useParams();
    const { t } = useLanguage();
    const projectsData = data.projects as any;

    // Filter to ONLY the requested project
    const item = projectsData.items.find((i: any) => i.id === id);
    const filteredItems = item ? [item] : [];

    const categories = [{
        id: 'selected-project',
        title: item?.title || t('projects.title_main'),
        items: filteredItems
    }];

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.projects')}
            titleMain={item?.title || t('projects.title_main')}
            titleSub={""}
            categories={categories}
            initialSelectedItem={item}
        />
    );
}
