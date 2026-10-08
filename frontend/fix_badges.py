import os

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

def fix_page(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    if badges_html in content:
        content = content.replace(badges_html, '')
    elif badges_html.strip() in content:
        content = content.replace(badges_html.strip(), '')
        
    # We also added "import { CheckCircle, Zap, ShieldCheck, Users } from 'lucide-react';\n"
    # But leaving it doesn't hurt if we re-inject properly.
    
    # Let's inject it properly.
    # Proper injection point is right before <[ToolName]Client />
    # E.g. <CeritaPendekClient />
    # We can search for <[A-Za-z]+Client \/>
    import re
    if 'Trust Badges' not in content:
        client_pattern = r'(<[A-Za-z]+Client( \/)?>)'
        def inject_before_client(match):
            return badges_html + "\n      " + match.group(1)
            
        content = re.sub(client_pattern, inject_before_client, content, count=1)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed badges: {os.path.basename(os.path.dirname(filepath))}")

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == 'page.tsx' and 'grammar-checker' not in root:
            fix_page(os.path.join(root, file))

print("Done fixing badges.")
