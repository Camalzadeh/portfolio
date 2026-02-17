import { useMemo } from 'react';
import { User, GraduationCap, Briefcase, Layers } from "lucide-react";
import { NavSection } from "@/types/nav";

import { useLanguage } from '@/context/LanguageContext';

export function useNavConfig(data: any): NavSection[] {
    const { t } = useLanguage();
    return useMemo(() => [
        {
            id: "personal",
            title: t('nav.personal'),
            icon: <User size={20} />,
            rootPath: "/",
            items: [
                { name: "Identity", path: "/#identity" },
                { name: "Skills", path: "/#skills" },
                { name: "Contact", path: "/#contact" }
            ]
        },
        {
            id: "academic",
            title: t('nav.academic'),
            icon: <GraduationCap size={20} />,
            rootPath: "/academic",
            items: data.academic.categories.map((c: any) => ({ name: c.title, path: `/academic#${c.id}` }))
        },
        {
            id: "experience",
            title: t('nav.experience'),
            icon: <Briefcase size={20} />,
            rootPath: "/experience",
            items: data.experience.items.slice(0, 5).map((i: any) => ({ name: i.title, path: `/experience/${i.id}` }))
        },
        {
            id: "projects",
            title: t('nav.projects'),
            icon: <Layers size={20} />,
            rootPath: "/projects",
            items: data.projects.items.slice(0, 5).map((i: any) => ({ name: i.title, path: `/projects/${i.id}` }))
        }
    ], [data, t]);
}
