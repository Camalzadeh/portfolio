import os
import json

def generate_about_json():
    base_dir = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public\fixed_data"
    portfolio_path = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\src\data\portfolio.json"
    
    if not os.path.exists(portfolio_path):
        print(f"Portfolio file not found: {portfolio_path}")
        return

    with open(portfolio_path, 'r', encoding='utf-8') as f:
        portfolio = json.load(f)

    # Flatten portfolio items for easy lookup
    items_map = {}
    
    # Experience
    if 'experience' in portfolio:
        for item in portfolio['experience'].get('items', []):
            items_map[item['id']] = item
    
    # Academic Categories
    if 'academic' in portfolio:
        for cat in portfolio['academic'].get('categories', []):
            for item in cat.get('items', []):
                items_map[item['id']] = item

    # Projects
    if 'projects' in portfolio:
        for item in portfolio['projects'].get('items', []):
            items_map[item['id']] = item

    # Manual mapping based on folder names in fixed_data
    # Folder paths relative to fixed_data -> ID in portfolio.json
    folder_to_id = {
        "experience/graph_company": "graph-company",
        "experience/startup_school": "totter-startup",
        "experience/sustainable_design_hackathon": "hackathon-erp",
        "experience/buta_group": "buta-group",
        "academic/researchs/sign_language": "sign-language-ai-research",
        "academic/researchs/ml_andrew_ng": "stanford-ml",
        "academic/extra_activities/icpc_republican_2025": "icpc-republican-2025",
        "academic/extra_activities/hackathon_erp": "hackathon-erp",
        "academic/certifications/php_testdome": "php-testdome",
        "academic/certifications/software_engineering": "software-engineering-rec",
    }

    count = 0
    for root, dirs, files in os.walk(base_dir):
        # Determine the relative path from fixed_data
        rel_path = os.path.relpath(root, base_dir).replace('\\', '/')
        
        # Check if we have a mapping for this folder
        target_id = folder_to_id.get(rel_path)
        
        # If not explicitly mapped, try using the last part of the path (converted to dash)
        if not target_id:
            last_part = rel_path.split('/')[-1]
            target_id = last_part.replace('_', '-')
            
        item_data = items_map.get(target_id)
        
        # We only care about leaf folders that are meant to hold item data
        if item_data:
            # Delete old about.txt or other json if named about
            for f in files:
                if f == "about.txt" or (f.startswith("about") and f.endswith(".json") and f != "about.json"):
                    try:
                        os.remove(os.path.join(root, f))
                        print(f"Deleted {f} in {rel_path}")
                    except Exception as e:
                        print(f"Error deleting {f}: {e}")
            
            # Create the about.json structure
            about_data = {
                "id": item_data.get('id'),
                "title": item_data.get('title'),
                "organization": item_data.get('organization') or item_data.get('provider', ''),
                "date": item_data.get('date'),
                "description": item_data.get('full_detail') or item_data.get('description'),
                "media": item_data.get('media', []),
                "metadata": {
                    "role": item_data.get('role'),
                    "award": item_data.get('award'),
                    "sort_date": item_data.get('sort_date'),
                    "folder": rel_path
                }
            }
            
            about_json_path = os.path.join(root, "about.json")
            with open(about_json_path, 'w', encoding='utf-8') as f:
                json.dump(about_data, f, indent=4)
            
            print(f"Generated about.json for: {rel_path} (ID: {target_id})")
            count += 1

    print(f"\nSuccessfully generated {count} about.json files.")

if __name__ == "__main__":
    generate_about_json()
