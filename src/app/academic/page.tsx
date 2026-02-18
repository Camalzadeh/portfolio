"use client";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicPage() {
    const { t } = useLanguage();
    const academicData = data.academic as any;

    // Ensure items within each category are sorted newest first
    const sortedCategories = academicData.categories.map((cat: any) => ({
        ...cat,
        items: [...cat.items].sort((a: any, b: any) => {
            const yearA = a.date?.year || 0;
            const yearB = b.date?.year || 0;
            return yearB - yearA;
        })
    }));

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.academic')}
            titleMain={t('academic.title_main')}
            titleSub={t('academic.title_sub')}
            categories={sortedCategories}
        />
    );
}
