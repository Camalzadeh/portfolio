export enum ItemType {
    ACADEMIC = 'academic',
    EXPERIENCE = 'experience',
    PROJECTS = 'projects'
}

export enum MediaType {
    PDF = 'pdf',
    IMAGE = 'image',
    URL = 'url',
    MHTML = 'mhtml',
    OTHER = 'other'
}

export interface DateInfo {
    year: number | null;
    month: number | null;
    day: number | null;
}

export interface Media {
    type: string;
    url_text: string | null;
    title: string;
    path: string | null;
}

export interface Tag {
    id: string;
    name: string;
    type: string;
    path: string | null;
}

export interface TagTypeConfig {
    id: string;
    name: string;
    icon: string;
    color: string;
    tags: Tag[];
}

export interface PortfolioItem {
    id: string;
    title: string;
    path: string;
    organization: string | null;
    description: string;
    type: string;
    subtype: string | null;
    position: string | null;
    role?: string;
    award: string | null;
    score: string | null;
    duration: string | null;
    place: string | null;
    date: DateInfo | string;
    media: Media[];
    tagIds: string[];
    tags?: Tag[];
}

export interface PortfolioData {
    experience: {
        items: PortfolioItem[];
    };
    projects: {
        items: PortfolioItem[];
    };
    academic: {
        categories: {
            id: string;
            title: string;
            items: PortfolioItem[];
        }[];
    };
    skillCategories: TagTypeConfig[];
    tags: Tag[];
}
