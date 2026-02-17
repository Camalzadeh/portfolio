import { PortfolioItem } from "@/types/portfolio";

export async function fetchPortfolioItem(dataFolder: string): Promise<PortfolioItem | null> {
    try {
        // Ensure dataFolder doesn't have leading/trailing slashes for consistency
        const cleanPath = dataFolder.startsWith('/') ? dataFolder.slice(1) : dataFolder;
        const res = await fetch(`/${cleanPath}/about.json`);

        if (!res.ok) return null;

        const data = await res.json();
        return new PortfolioItem(data);
    } catch (error) {
        console.error("Error fetching portfolio item:", error);
        return null;
    }
}
