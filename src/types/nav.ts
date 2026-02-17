export interface NavItem {
    name: string;
    path: string;
}

export interface NavSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    rootPath: string;
    items: NavItem[];
}
