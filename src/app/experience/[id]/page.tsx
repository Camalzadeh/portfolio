"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceDetailPage() {
    const { id } = useParams();
    const { t } = useLanguage();
    const expData = data.experience as any;

    // Filter to ONLY the requested item
    const item = expData.items.find((i: any) => i.id === id);
    const filteredItems = item ? [item] : [];

    const categories = [{
        id: 'selected-experience',
        title: item?.title || t('experience.title_main'),
        items: filteredItems
    }];

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.experience')}
            titleMain={item?.title || t('experience.title_main')}
            titleSub={""}
            categories={categories}
            initialSelectedItem={item}
        />
    );
}
