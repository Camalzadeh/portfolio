"use client";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperiencePage() {
    const { t } = useLanguage();
    const expData = data.experience as any;

    // Sort and wrap in a single category for consistency with DetailLayout
    const items = [...expData.items].sort((a: any, b: any) => (b.sort_date || '').localeCompare(a.sort_date || ''));
    const categories = [{
        id: 'all-experience',
        title: t('experience.title_main'),
        items: items
    }];

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.experience')}
            titleMain={t('experience.title_main')}
            titleSub={t('experience.title_sub')}
            categories={categories}
        />
    );
}
