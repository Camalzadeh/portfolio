"use client";
import { useParams } from "next/navigation";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function ExperienceDetailPage() {
    const { id } = useParams();
    const expData = data.pillars.experience as any;
    const item = expData.items.find((i: any) => i.id === id);

    const [selectedItem, setSelectedItem] = useState<any>(item || null);

    if (!item) return <div>Not Found</div>;

    return (
        <main className="container page-header">
            <Link href="/experience" className="btn-secondary" style={{ marginBottom: '2rem' }}>
                <ChevronLeft size={16} /> Back to Experience
            </Link>

            <div className="pillar-layout">
                <div>
                    <ItemCard
                        item={item}
                        index={0}
                        isSelected={true}
                        onSelect={setSelectedItem}
                    />
                </div>
                <aside className="preview-sticky">
                    <IntegratedPreview item={selectedItem} />
                </aside>
            </div>
        </main>
    );
}
