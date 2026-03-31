import os
import re

def pascal_to_kebab(name):
    # Handle cases like Loader2 -> loader-2
    name = re.sub('([a-z0-9])([A-Z])', r'\1-\2', name)
    name = re.sub('([a-zA-Z])([0-9])', r'\1-\2', name)
    return name.lower()

# Known exceptions where the icon name isn't a direct conversion
exceptions = {
    'ArchiveIcon': 'archive',
}

def refactor_icons(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Handle destructured imports: import { Icon1, Icon2 } from 'lucide-react';
    pattern = r"import\s+\{\s*([^}]+)\s*\}\s*from\s*['\"]lucide-react['\"];?"
    matches = list(re.finditer(pattern, content))
    
    if matches:
        new_content = content
        for match in reversed(matches):
            icons_str = match.group(1)
            icons = [i.strip() for i in icons_str.split(',')]
            
            new_imports = []
            for icon in icons:
                if not icon: continue
                if ' as ' in icon:
                    orig, alias = [part.strip() for part in icon.split(' as ')]
                    kebab = exceptions.get(orig, pascal_to_kebab(orig))
                    new_imports.append(f"import {alias} from 'lucide-react/dist/esm/icons/{kebab}';")
                else:
                    kebab = exceptions.get(icon, pascal_to_kebab(icon))
                    new_imports.append(f"import {icon} from 'lucide-react/dist/esm/icons/{kebab}';")
            
            new_content = new_content[:match.start()] + "\n".join(new_imports) + new_content[match.end():]
        content = new_content
        modified = True

    # 2. Handle existing individual imports with potentially missing hyphens
    # Example: import Loader2 from 'lucide-react/dist/esm/icons/loader2';
    # Into: import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
    indiv_pattern = r"(import\s+([A-Za-z0-9]+)\s+from\s+['\"]lucide-react/dist/esm/icons/)([a-z0-9-]+)(['\"];?)"
    
    def indiv_replace(match):
        prefix = match.group(1)
        icon_var = match.group(2)
        icon_path = match.group(3)
        suffix = match.group(4)
        
        expected_path = exceptions.get(icon_var, pascal_to_kebab(icon_var))
        if icon_path != expected_path:
            return f"{prefix}{expected_path}{suffix}"
        return match.group(0)

    new_content = re.sub(indiv_pattern, indiv_replace, content)
    if new_content != content:
        content = new_content
        modified = True

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Scan components and pages
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.tsx', '.jsx', '.ts')):
            path = os.path.join(root, file)
            if refactor_icons(path):
                print(f"Refactored: {path}")
