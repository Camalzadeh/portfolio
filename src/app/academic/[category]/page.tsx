"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AcademicCategoryRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.push('/academic');
    }, [router]);

    return (
        <div className="container page-header">
            <p>Redirecting to Academic Timeline...</p>
        </div>
    );
}
