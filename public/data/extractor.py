import os
import json
from docx import Document
from pypdf import PdfReader

def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception as e:
        return f"Error extracting DOCX: {e}"

def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error extracting PDF: {e}"

def crawl_and_extract(root_dir):
    results = []
    for root, dirs, files in os.walk(root_dir):
        # Skip node_modules, .git, .next etc.
        if any(x in root for x in ["node_modules", ".git", ".next", "portfolio-site"]):
            continue
            
        for file in files:
            file_path = os.path.join(root, file)
            ext = file.lower().split('.')[-1]
            
            if ext in ['docx', 'pdf', 'txt']:
                print(f"Extracting: {file_path}")
                content = ""
                if ext == 'docx':
                    content = extract_text_from_docx(file_path)
                elif ext == 'pdf':
                    content = extract_text_from_pdf(file_path)
                elif ext == 'txt':
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                
                results.append({
                    "path": file_path.replace("\\", "/"),
                    "name": file,
                    "content": content
                })
    return results

if __name__ == "__main__":
    target_dir = r"c:\Users\Humbat\Desktop\Learning\coding\Web\PortfolioSite\data"
    all_data = crawl_and_extract(target_dir)
    
    with open("extracted_data.json", "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"\nDone! Extracted data from {len(all_data)} files.")
