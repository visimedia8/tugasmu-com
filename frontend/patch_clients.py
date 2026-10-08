import os
import glob
import re

tools_dir = r"e:\general workspace\tugasmu.com\frontend\src\app\tools"

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Update textareas
    textarea_pattern = r'(<textarea[^>]*className=")([^"]+)("[^>]*>)'
    
    def textarea_replacer(match):
        pre = match.group(1)
        post = match.group(3)
        new_class = "w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10 outline-none transition-all resize-none disabled:opacity-50"
        return pre + new_class + post

    content = re.sub(textarea_pattern, textarea_replacer, content)

    # 2. Update submit buttons
    button_pattern = r'(<button[^>]*type="submit"[^>]*className=")([^"]+)("[^>]*>)'
    def button_replacer(match):
        pre = match.group(1)
        post = match.group(3)
        new_class = "w-full h-14 rounded-2xl bg-brand-navy hover:bg-slate-800 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        return pre + new_class + post

    content = re.sub(button_pattern, button_replacer, content)

    # 3. Wrap form in white card
    if '<form' in content and 'bg-white p-6 md:p-8 rounded-3xl' not in content:
        content = re.sub(r'(<form[^>]*>)', r'<div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mb-12">\n      \1', content, count=1)
        if content.count('</form>') == 1:
            content = content.replace('</form>', '</form>\n    </div>')

    # 4. Fix labels
    content = content.replace('className="block font-label-md text-label-md text-on-surface"', 'className="block text-sm font-semibold text-slate-800 mb-2"')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched: {os.path.basename(filepath)}")

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file.endswith('Client.tsx'):
            patch_file(os.path.join(root, file))

print("Done patching clients.")
