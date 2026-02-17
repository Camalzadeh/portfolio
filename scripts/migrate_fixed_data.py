import os
import json
import shutil

def migrate_data():
    base_dir = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public\fixed_data"
    portfolio_path = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\src\data\portfolio.json"
    
    with open(portfolio_path, 'r', encoding='utf-8') as f:
        portfolio = json.load(f)

    def ensure_dir(path):
        if not os.path.exists(path):
            os.makedirs(path)

    # Experience
    for item in portfolio['pillars']['experience']['items']:
        folder_name = item['id'].replace('-', '_')
        if item['id'] == 'totter-startup': folder_name = 'startup_school'
        
        target_path = os.path.join(base_dir, "experience", folder_name)
        ensure_dir(target_path)
        item['data_folder'] = f"fixed_data/experience/{folder_name}"
        
        new_media = []
        for m in item.get('media', []):
            if m['type'] != 'external':
                filename = os.path.basename(m['url'])
                src = os.path.join(r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public", m['url'].replace('/', '\\'))
                dst = os.path.join(target_path, filename)
                if os.path.exists(src) and src != dst:
                    shutil.copy2(src, dst)
                m['url'] = f"fixed_data/experience/{folder_name}/{filename}"
            new_media.append(m)
        item['media'] = new_media
        
        about_text = f"Title: {item['title']}\nRole: {item.get('role', '')}\nDate: {item['date']}\n\nDescription:\n{item.get('full_detail') or item['description']}\n"
        with open(os.path.join(target_path, "about.txt"), 'w', encoding='utf-8') as f:
            f.write(about_text)

    # Academic
    for cat in portfolio['pillars']['academic']['categories']:
        cat_id = cat['id']
        folder_cat = cat_id
        if cat_id == 'research': folder_cat = 'researchs'
        elif cat_id == 'achievements': folder_cat = 'extra_activities'
        
        for item in cat['items']:
            item_folder = item['id'].replace('-', '_')
            if item['id'] == 'sign-language-ai-research': item_folder = 'sign_language'
            elif item['id'] == 'stanford-ml': item_folder = 'ml_andrew_ng'
            elif item['id'] == 'software-engineering-rec': item_folder = 'software_engineering'
            
            target_path = os.path.join(base_dir, "academic", folder_cat, item_folder)
            ensure_dir(target_path)
            item['data_folder'] = f"fixed_data/academic/{folder_cat}/{item_folder}"
            
            new_media = []
            for m in item.get('media', []):
                if m['type'] != 'external':
                    filename = os.path.basename(m['url'])
                    src = os.path.join(r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\public", m['url'].replace('/', '\\'))
                    dst = os.path.join(target_path, filename)
                    if os.path.exists(src) and src != dst:
                        shutil.copy2(src, dst)
                    m['url'] = f"fixed_data/academic/{folder_cat}/{item_folder}/{filename}"
                new_media.append(m)
            item['media'] = new_media
            
            about_text = f"Title: {item['title']}\nDate: {item['date']}\n\nDescription:\n{item['description']}\n"
            with open(os.path.join(target_path, "about.txt"), 'w', encoding='utf-8') as f:
                f.write(about_text)

    with open(portfolio_path, 'w', encoding='utf-8') as f:
        json.dump(portfolio, f, indent=4)
    print("Migration complete with data_folder mappings.")

if __name__ == "__main__":
    migrate_data()
