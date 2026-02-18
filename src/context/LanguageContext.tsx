"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'az';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        'nav.personal': 'Personal',
        'nav.academic': 'Academic',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'academic.pillar': 'Academic Pillar',
        'academic.title_main': 'Academic',
        'academic.title_sub': 'Journey',
        'experience.title_main': 'Work',
        'experience.title_sub': 'Experience',
        'projects.title_main': 'Featured',
        'projects.title_sub': 'Projects',
        'academic.insight': 'Project Insight',
        'academic.verified': 'Certificate Verified',
        'academic.location': 'Location',
        'academic.select': 'Select an item to view details',
        'preview.external_title': 'External Verification Portal',
        'preview.external_desc': 'Resource is verified on a 3rd party platform',
        'preview.external_btn': 'Visit Source',
        'preview.zoom_hint': 'Click to zoom',
        'preview.no_media': 'Physical verification required for this entry',
        'preview.expand': 'Open Full'
    },
    az: {
        'nav.personal': 'Şəxsi',
        'nav.academic': 'Akademik',
        'nav.experience': 'Təcrübə',
        'nav.projects': 'Layihələr',
        'academic.pillar': 'Akademik Sütun',
        'academic.title_main': 'Akademik',
        'academic.title_sub': 'Yolculuq',
        'experience.title_main': 'İş',
        'experience.title_sub': 'Təcrübəsi',
        'projects.title_main': 'Seçilmiş',
        'projects.title_sub': 'Layihələr',
        'academic.insight': 'Layihə İcmalı',
        'academic.verified': 'Sertifikat Təsdiqlənib',
        'academic.location': 'Məkan',
        'academic.select': 'Təfərrüatları görmək üçün bir element seçin',
        'preview.external_title': 'Xarici Təsdiq Portalı',
        'preview.external_desc': 'Resurs 3-cü tərəf platformasında təsdiqlənib',
        'preview.external_btn': 'Mənbəyə Bax',
        'preview.zoom_hint': 'Böyütmək üçün sıxın',
        'preview.no_media': 'Bu giriş üçün fiziki təsdiq tələb olunur',
        'preview.expand': 'Böyüt'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
