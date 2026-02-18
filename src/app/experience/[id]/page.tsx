"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceDetailPage() {
    const { id } = useParams();
    const { t } = useLanguage();
    const expData = data.experience as any;

    const items = [...expData.items].sort((a: any, b: any) => (b.sort_date || '').localeCompare(a.sort_date || ''));
    const initialItem = items.find(i => i.id === id) || null;

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
            initialSelectedItem={initialItem}
        />
    );
}
