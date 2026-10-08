import os
import re

tools_dir = r"e:\general workspace\tugasmu.com\frontend\src\app\tools"

badges_html = """
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 mb-8 mt-6">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Gratis
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" /> AI Super Cepat
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-slate-700" /> Privasi Aman
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            <Users className="w-4 h-4 text-sky-600" /> Dipakai 10.000+ Pelajar
          </span>
        </div>
"""

def patch_page(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    if 'Trust Badges' not in content:
        p_end_idx = content.find('</p>')
        if p_end_idx != -1:
            content = content[:p_end_idx + 4] + badges_html + content[p_end_idx + 4:]
            
    icons = ['CheckCircle', 'Zap', 'ShieldCheck', 'Users']
    if 'lucide-react' in content:
        for icon in icons:
            if icon not in content:
                content = re.sub(r'(import \{.*)( \} from [\'"]lucide-react[\'"])', r'\1, ' + icon + r'\2', content)
    else:
        content = "import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';\n" + content

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched badges: {os.path.basename(os.path.dirname(filepath))}")

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == 'page.tsx' and 'grammar-checker' not in root:
            patch_page(os.path.join(root, file))

print("Done patching badges.")
