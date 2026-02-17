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

export enum TagType {
    FRAMEWORK = 'framework',
    PROGRAMMING_LANGUAGE = 'programming_language',
    TOOL = 'tool',
    SKILL = 'skill',
    OTHER = 'other'
}

export class DateInfo {
    year: number | null = null;
    month: number | null = null;
    day: number | null = null;

    constructor(data?: Partial<DateInfo>) {
        if (data) {
            this.year = data.year ?? null;
            this.month = data.month ?? null;
            this.day = data.day ?? null;
        }
    }
}

export class Media {
    type: MediaType = MediaType.OTHER;
    url_text: string | null = null; // if type is url/external
    title: string = "";
    path: string | null = null; // internal path in public folder

    constructor(data?: Partial<Media>) {
        if (data) {
            this.type = data.type ?? MediaType.OTHER;
            this.url_text = data.url_text ?? null;
            this.title = data.title ?? "";
            this.path = data.path ?? null;
        }
    }
}

export class Tag {
    id: string = "";
    title: string = "";
    type: TagType = TagType.OTHER;

    constructor(data?: Partial<Tag>) {
        if (data) {
            this.id = data.id ?? "";
            this.title = data.title ?? "";
            this.type = data.type ?? TagType.OTHER;
        }
    }
}

export class PortfolioItem {
    id: string = "";
    title: string = "";
    path: string = ""; // resource path / data folder
    organization: string | null = null;
    description: string = "";
    type: ItemType = ItemType.EXPERIENCE;
    subtype: string | null = null; // e.g., 'courses', 'certifications'
    position: string | null = null; // e.g., 'Software Engineer'
    award: string | null = null;
    score: string | null = null; // e.g., '98%', 'GPA 4.0'
    duration: string | null = null; // e.g., '3 months'
    place: string | null = null; // e.g., 'Baku, Azerbaijan'
    date: DateInfo = new DateInfo();
    media: Media[] = [];
    tags: Tag[] = [];

    constructor(data?: Partial<PortfolioItem>) {
        if (data) {
            this.id = data.id ?? "";
            this.title = data.title ?? "";
            this.path = data.path ?? "";
            this.organization = data.organization ?? null;
            this.description = data.description ?? "";
            this.type = data.type ?? ItemType.EXPERIENCE;
            this.subtype = data.subtype ?? null;
            this.position = data.position ?? null;
            this.award = data.award ?? null;
            this.score = data.score ?? null;
            this.duration = data.duration ?? null;
            this.place = data.place ?? null;
            this.date = new DateInfo(data.date);
            this.media = (data.media ?? []).map(m => new Media(m));
            this.tags = (data.tags ?? []).map(t => new Tag(t));
        }
    }
}
