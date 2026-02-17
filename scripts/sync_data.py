import os
import json

def sync_data():
    base_dir = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public\fixed_data"
    portfolio_path = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\src\data\portfolio.json"
    
    if not os.path.exists(portfolio_path):
        print(f"Portfolio file not found: {portfolio_path}")
        return

    with open(portfolio_path, 'r', encoding='utf-8') as f:
        portfolio = json.load(f)

    # Tracker for what we've already matched in portfolio.json
    # We'll map folder paths (relative to fixed_data) to items
    existing_folders = {}
    
    def catalog_item(item, category_path):
        if 'data_folder' in item:
            # Normalize path
            folder = item['data_folder'].replace('fixed_data/', '').replace('\\', '/')
            existing_folders[folder] = item

    # Catalog existing items
    if 'experience' in portfolio:
        for item in portfolio['experience'].get('items', []):
            catalog_item(item, 'experience')
    
    if 'academic' in portfolio:
        for cat in portfolio['academic'].get('categories', []):
            for item in cat.get('items', []):
                catalog_item(item, f"academic/{cat['id']}")

    if 'projects' in portfolio:
        for item in portfolio['projects'].get('items', []):
            catalog_item(item, 'projects')

    # Mapping from fixed_data subfolders to portfolio categories
    path_to_cat = {
        "experience": ("experience", "items"),
        "academic/certifications": ("academic", "certifications", "items"),
        "academic/courses": ("academic", "courses", "items"),
        "academic/extra_activities": ("academic", "achievements", "items"),
        "academic/recommendations": ("academic", "certifications", "items"),
        "academic/researchs": ("academic", "research", "items"),
        "academic/university": ("academic", "university", "items"), # need to make sure this cat exists
        "projects": ("projects", "items"),
    }

    # Ensure academic categories exist
    academic_cats = {cat['id']: cat for cat in portfolio['academic'].get('categories', [])}
    required_cats = ["research", "achievements", "certifications", "courses", "university"]
    for cat_id in required_cats:
        if cat_id not in academic_cats:
            new_cat = {
                "id": cat_id,
                "title": cat_id.capitalize().replace('_', ' '),
                "items": []
            }
            portfolio['academic']['categories'].append(new_cat)
            academic_cats[cat_id] = new_cat

    # Scan fixed_data
    for root, dirs, files in os.walk(base_dir):
        # We only care about leaf folders (containing files)
        if not files:
            continue
            
        rel_path = os.path.relpath(root, base_dir).replace('\\', '/')
        
        # Determine target category
        target_path = None
        for p in path_to_cat:
            if rel_path.startswith(p):
                target_path = path_to_cat[p]
                break
        
        if not target_path:
            # Check for deeper nesting (e.g. academic/courses/udemy)
            # Find the longest matching prefix
            prefixes = sorted([p for p in path_to_cat if rel_path.startswith(p)], key=len, reverse=True)
            if prefixes:
                target_path = path_to_cat[prefixes[0]]
            else:
                continue

        # Check if item exists
        item = existing_folders.get(rel_path)
        
        # List media files
        media = []
        for f in files:
            if f.lower().endswith(('.pdf', '.png', '.jpg', '.jpeg', '.webp')) and not f.startswith('about'):
                media.append({
                    "type": "pdf" if f.lower().endswith('.pdf') else "image",
                    "url": f"fixed_data/{rel_path}/{f}",
                    "title": f.replace('.pdf', '').replace('_', ' ').capitalize()
                })

        # If it also has external links in current media, preserve them
        if item:
            for m in item.get('media', []):
                if m['type'] == 'external':
                    media.append(m)

        if not item:
            # Create new item
            folder_name = rel_path.split('/')[-1]
            item_id = folder_name.replace('_', '-')
            
            # Simple title generation
            title = folder_name.replace('_', ' ').capitalize()
            if "hackerrank" in rel_path.lower(): title = f"HackerRank: {title}"
            elif "udemy" in rel_path.lower(): title = f"Udemy: {title}"
            
            item = {
                "id": item_id,
                "title": title,
                "organization": "Various",
                "date": "2024 - 2025",
                "sort_date": "20240101", # Default sort date
                "description": f"Detailed documentation and proof for {title}.",
                "media": media,
                "data_folder": f"fixed_data/{rel_path}"
            }
            
            # Add to portfolio
            if target_path[0] == 'academic':
                academic_cats[target_path[1]]['items'].append(item)
            else:
                portfolio[target_path[0]]['items'].append(item)
                
            existing_folders[rel_path] = item
            print(f"Added new item to portfolio.json: {title} ({rel_path})")
        else:
            # Update existing item
            item['media'] = media
            item['data_folder'] = f"fixed_data/{rel_path}"
            if 'sort_date' not in item:
                item['sort_date'] = "20240101"

        # Generate about.json
        about_data = {
            "id": item.get('id'),
            "title": item.get('title'),
            "organization": item.get('organization'),
            "date": item.get('date'),
            "description": item.get('full_detail') or item.get('description'),
            "media": item.get('media', []),
            "metadata": {
                "role": item.get('role'),
                "award": item.get('award'),
                "folder": rel_path
            }
        }
        
        with open(os.path.join(root, "about.json"), 'w', encoding='utf-8') as f:
            json.dump(about_data, f, indent=4)
        
        # Clean up old about.txt
        if os.path.exists(os.path.join(root, "about.txt")):
            os.remove(os.path.join(root, "about.txt"))

    # Save portfolio.json
    with open(portfolio_path, 'w', encoding='utf-8') as f:
        json.dump(portfolio, f, indent=4)
    
    print("\nSync complete! All folders have about.json and are cataloged in portfolio.json.")

if __name__ == "__main__":
    sync_data()
