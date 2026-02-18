"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicCategoryPage() {
    const { category } = useParams();
    const { t } = useLanguage();
    const academicData = data.academic as any;

    // Filter to show ONLY the requested category
    const filteredCategories = academicData.categories
        .filter((c: any) => c.id === category)
        .map((cat: any) => ({
            ...cat,
            items: [...cat.items].sort((a: any, b: any) => {
                const yearA = a.date?.year || 0;
                const yearB = b.date?.year || 0;
                return yearB - yearA;
            })
        }));

    const categoryTitle = filteredCategories[0]?.title || "";

    return (
        <PortfolioDetailLayout
            categoryLabel={t('nav.academic')}
            titleMain={categoryTitle}
            titleSub={""}
            categories={filteredCategories}
        />
    );
}
