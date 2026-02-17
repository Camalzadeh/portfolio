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
        'academic.insight': 'Project Insight',
        'academic.verified': 'Certificate Verified',
        'academic.location': 'Location',
        'academic.select': 'Select an achievement to view verification',
        'preview.mhtml_title': 'Archived Documentation (.MHTML)',
        'preview.mhtml_desc': 'This is a packaged web archive. For full rendering, click the button below.',
        'preview.mhtml_btn': 'View Archive',
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
        'academic.insight': 'Layihə İcmalı',
        'academic.verified': 'Sertifikat Təsdiqlənib',
        'academic.location': 'Məkan',
        'academic.select': 'Təsdiqi görmək üçün nailiyyət seçin',
        'preview.mhtml_title': 'Arxivləşdirilmiş Sənədlər (.MHTML)',
        'preview.mhtml_desc': 'Bu, paketlənmiş veb arxivdir. Tam baxış üçün aşağıdakı düyməni sıxın.',
        'preview.mhtml_btn': 'Arxivə Bax',
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
