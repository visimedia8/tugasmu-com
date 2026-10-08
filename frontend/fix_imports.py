import os
import re

tools_dir = r"e:\general workspace\tugasmu.com\frontend\src\app\tools"

def fix_imports(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    icons = ['CheckCircle', 'Zap', 'ShieldCheck', 'Users']
    
    if 'lucide-react' in content:
        for icon in icons:
            # check if icon is imported
            if icon not in content[:content.find('lucide-react')]:
                content = re.sub(r'(import \{[^\}]+)(\} from [\'"]lucide-react[\'"])', r'\1, ' + icon + r' \2', content, count=1)
    else:
        # if no lucide-react, add at top
        content = "import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';\n" + content

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed imports: {os.path.basename(os.path.dirname(filepath))}")

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == 'page.tsx' and 'grammar-checker' not in root:
            fix_imports(os.path.join(root, file))

print("Done fixing imports.")
