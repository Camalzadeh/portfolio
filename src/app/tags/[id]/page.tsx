"use client";
import { useParams, useRouter } from "next/navigation";
import data from "@/data/portfolio.json";
import PortfolioDetailLayout from "@/components/PortfolioDetailLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function TagFilteredPage() {
    const { id } = useParams();
    const { t } = useLanguage();
    const tagName = (data.tags || []).find((t: any) => t.id === id)?.name || id;

    // Collect all items from all categories
    const allItems = [
        ...(data.experience.items || []),
        ...(data.projects.items || []),
        ...(data.academic.categories.flatMap((c: any) => c.items) || [])
    ];

    // Filter by tagId
    const filteredItems = allItems.filter((item: any) =>
        item.tagIds && item.tagIds.includes(id)
    );

    const categories = [{
        id: 'filtered-results',
        title: `${t('nav.projects')} & ${t('nav.experience')}`,
        items: filteredItems
    }];

    return (
        <PortfolioDetailLayout
            categoryLabel="Filtered by Tech"
            titleMain={tagName as string}
            titleSub={`${filteredItems.length} matching items found`}
            categories={categories}
        />
    );
}
