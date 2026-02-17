import os
import json
import re

def extract_year(date_str):
    if not date_str:
        return None
    match = re.search(r'\d{4}', str(date_str))
    if match:
        return int(match.group())
    return None

def sync_data():
    base_dir = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public\fixed_data"
    portfolio_path = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\src\data\portfolio.json"
    
    if not os.path.exists(portfolio_path): return

    with open(portfolio_path, 'r', encoding='utf-8') as f:
        portfolio = json.load(f)

    existing_folders = {}
    def catalog_item(item, category, subtype=None):
        if 'data_folder' in item:
            folder = item['data_folder'].replace('fixed_data/', '').replace('\\', '/').strip('/')
            existing_folders[folder] = (item, category, subtype)

    if 'experience' in portfolio:
        for item in portfolio['experience'].get('items', []): catalog_item(item, 'experience')
    if 'academic' in portfolio:
        for cat in portfolio['academic'].get('categories', []):
            for item in cat.get('items', []): catalog_item(item, 'academic', cat['id'])
    if 'projects' in portfolio:
        for item in portfolio['projects'].get('items', []): catalog_item(item, 'projects')

    path_to_cat = {
        "experience": ("experience", None),
        "academic/certifications": ("academic", "certifications"),
        "academic/courses": ("academic", "courses"),
        "academic/extra_activities": ("academic", "achievements"),
        "academic/recommendations": ("academic", "certifications"),
        "academic/researchs": ("academic", "research"),
        "academic/university": ("academic", "university"),
        "projects": ("projects", None),
    }

    # All leaf folders in fixed_data
    for root, dirs, files in os.walk(base_dir):
        # A folder is a leaf if it has no subdirectories
        if dirs: continue 
        
        rel_path = os.path.relpath(root, base_dir).replace('\\', '/').strip('/')
        if not rel_path or rel_path == '.': continue

        target_path_info = None
        for p in path_to_cat:
            if rel_path == p or rel_path.startswith(p + "/"):
                target_path_info = path_to_cat[p]
                break
        
        if not target_path_info: continue

        item_entry = existing_folders.get(rel_path)
        item = item_entry[0] if item_entry else None
        
        # Collect Files
        media_list = []
        found_paths = set()
        for f in files:
            f_lower = f.lower()
            if f_lower.endswith(('.pdf', '.png', '.jpg', '.jpeg', '.webp', '.mhtml')) and not f.startswith('about'):
                f_path = f"fixed_data/{rel_path}/{f}"
                m_type = "pdf" if f_lower.endswith('.pdf') else "image"
                if f_lower.endswith('.mhtml'): m_type = "mhtml"
                
                media_list.append({
                    "type": m_type,
                    "url_text": None,
                    "title": f.rsplit('.', 1)[0].replace('_', ' ').capitalize(),
                    "path": f_path
                })
                found_paths.add(f_path)
        
        if item:
            # Preserve EXTERNAL links only (don't duplicate internal files)
            for m in item.get('media', []):
                m_url = m.get('url') or m.get('url_text')
                
                # If it's a true external link
                if m_url and not m_url.startswith('fixed_data'):
                    media_list.append({
                        "type": "url",
                        "url_text": m_url,
                        "title": m.get('title', 'Link'),
                        "path": None
                    })

        if not item:
            folder_name = rel_path.split('/')[-1]
            item = {
                "id": folder_name.replace('_', '-'),
                "title": folder_name.replace('_', ' ').capitalize(),
                "organization": "Various",
                "description": f"Documentation for {folder_name}",
                "type": target_path_info[0],
                "subtype": target_path_info[1],
                "data_folder": f"fixed_data/{rel_path}",
                "sort_date": "20240101"
            }
            if target_path_info[0] == 'academic':
                # Find cat
                for cat in portfolio['academic']['categories']:
                    if cat['id'] == target_path_info[1]:
                        cat['items'].append(item)
                        break
            else:
                portfolio[target_path_info[0]]['items'].append(item)

        # Standardize for portfolio.json
        item['data_folder'] = f"fixed_data/{rel_path}"
        item['media'] = media_list

        # Date for class
        year = extract_year(item.get('date', '2024'))
        
        # Final about.json structure
        about_data = {
            "id": item.get('id'),
            "title": item.get('title'),
            "path": f"fixed_data/{rel_path}",
            "organization": item.get('organization') or item.get('provider') or None,
            "description": item.get('full_detail') or item.get('description') or "",
            "type": target_path_info[0],
            "subtype": target_path_info[1],
            "position": item.get('role') or item.get('position') or None,
            "award": item.get('award') or None,
            "score": item.get('score') or item.get('gpa') or None,
            "duration": item.get('duration') or None,
            "place": item.get('place') or None,
            "date": {"year": year, "month": None, "day": None},
            "media": media_list,
            "tags": item.get('tags', [])
        }
        
        with open(os.path.join(root, "about.json"), 'w', encoding='utf-8') as f:
            json.dump(about_data, f, indent=4)

    with open(portfolio_path, 'w', encoding='utf-8') as f:
        json.dump(portfolio, f, indent=4)
    print("Sync complete.")

if __name__ == "__main__":
    sync_data()
