#!/usr/bin/env python3
"""
Lint Persona & Anti-Jargon Scanner - TugasMu
Enforces brand-lexicon.md rules:
- Persona: "Kakak kelas yang pintar, sabar, dan selalu siap bantu"
- Target Audience: Siswa SD, SMP, SMA/SMK
- Eliminates doctoral/academic jargon & robotic AI cliches
"""

import os
import sys
import glob
import re

if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Resolve blog directory relative to script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
BLOG_DIR = os.path.join(PROJECT_ROOT, 'src', 'content', 'blog')

# Strict forbidden phrases that sound like doctoral dissertation or AI robotics
FORBIDDEN_PATTERNS = [
    # Academic/Doctoral Jargon (Unsuitable for School Students)
    (r'\bcivitas academica\b', 'Ganti dengan "siswa", "pelajar", atau "warga sekolah"'),
    (r'\binventarisasi bibliografi\b', 'Ganti dengan "daftar referensi" atau "sumber bacaan"'),
    (r'\bmanipulasi linguistik\b', 'Ganti dengan "penyesuaian kalimat" atau "teknik parafrase"'),
    (r'\beskalasi kemampuan\b', 'Ganti dengan "peningkatan kemampuan" atau "mengasah keahlian"'),
    (r'\bketergantungan patologis\b', 'Ganti dengan "kebiasaan buruk" atau "kebiasaan menyontek"'),
    (r'\bsecara komprehensif\b', 'Ganti dengan "secara tuntas", "secara mendalam", atau "lengkap"'),
    (r'\barsitektur sintaksis\b', 'Ganti dengan "struktur susunan kalimat"'),
    (r'\bkonstruksi gramatikal\b', 'Ganti dengan "tata bahasa" atau "susunan kata"'),
    (r'\bwacana linguistik\b', 'Ganti dengan "teks wacana" atau "paragraf bacaan"'),
    (r'\bdisposisi intelektual\b', 'Ganti dengan "sikap kritis" atau "daya nalar"'),
    (r'\bkapabilitas kognitif\b', 'Ganti dengan "kemampuan berpikir" atau "daya tangkap"'),
    (r'\bkeberlakuan imperatif\b', 'Ganti dengan "sifat mengikat / wajib"'),
    
    # Robotic AI Fillers
    (r'\bdalam era digital saat ini\b', 'Hapus pembukaan klise AI ini, langsung masuk ke topik inti'),
    (r'\bdalam era globalisasi ini\b', 'Hapus pembukaan klise AI ini, langsung masuk ke topik inti'),
    (r'\btidak dapat dipungkiri bahwa\b', 'Ganti dengan bahasa lugas langsung'),
    (r'\bseperti yang kita ketahui bersama\b', 'Hapus klise AI ini'),
    (r'\bmerupakan hal yang sangat penting untuk diperhatikan\b', 'Sederhanakan menjadi "ini penting karena..."'),
    (r'\bmemiliki peranan yang sangat krusial\b', 'Sederhanakan menjadi "sangat berpengaruh" atau "berperan besar"'),
    (r'\btidak boleh dianggap remeh\b', 'Ganti dengan bahasa yang lebih komunikatif'),
    
    # Brand Anti-Joki Policy (Strict enforcement unless explicitly anti-joki educational warning)
    (r'\balat joki\b', 'Dilarang menggunakan istilah joki secara positif'),
    (r'\bcheat sheet\b', 'Ganti dengan "ringkasan rumus" atau "catatan praktis"'),
]

def run_lint(strict=False):
    files = glob.glob(os.path.join(BLOG_DIR, '**', '*.mdx'), recursive=True)
    if not files:
        print(f"Error: Tidak ada file .mdx ditemukan di {BLOG_DIR}")
        sys.exit(1)

    total_violations = 0
    violating_files = {}

    for fpath in files:
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        file_issues = []
        is_anti_joki_article = 'bahaya-joki-tugas-sekolah' in fpath

        for line_no, line in enumerate(lines, 1):
            # Skip YAML frontmatter
            if line_no < 8 and line.strip().startswith(('---', 'title:', 'description:', 'date:', 'kategori:')):
                continue

            for pattern, suggestion in FORBIDDEN_PATTERNS:
                if re.search(pattern, line, re.IGNORECASE):
                    # Exclude anti-joki educational article when warning students
                    if is_anti_joki_article and ('joki' in pattern):
                        continue
                    file_issues.append((line_no, pattern, suggestion, line.strip()))

        if file_issues:
            violating_files[fpath] = file_issues
            total_violations += len(file_issues)

    print("=" * 70)
    print(" LINTER PERSONA & ANTI-JARGON TUGASMU (SSOT BRAND LEXICON)")
    print("=" * 70)
    print(f"Total file dipindai : {len(files)}")
    print(f"File bermasalah     : {len(violating_files)}")
    print(f"Total temuan kata   : {total_violations}")
    print("-" * 70)

    if violating_files:
        for fpath, issues in sorted(violating_files.items(), key=lambda x: len(x[1]), reverse=True):
            rel_path = os.path.relpath(fpath, BLOG_DIR)
            print(f"\n📁 [{len(issues)} temuan] {rel_path}:")
            for line_no, pat, sug, snip in issues:
                clean_pat = pat.replace(r'\b', '')
                print(f"   • Baris {line_no} [{clean_pat}]: {sug}")
                print(f"     \"{snip[:90]}...\"")
        print("\n" + "=" * 70)
        if strict:
            print("❌ LINTER GAGAL: Masih ditemukan pelanggaran persona akademis/AI!")
            sys.exit(1)
        else:
            print("⚠️ Peringatan persona aktif. Selesaikan refactor sebelum deploy.")
    else:
        print("\n✅ SEMUA ARTIKEL BERSIH DARI JARGON AKADEMIS KAKU & KLISE AI!")
        print("   Gaya bahasa sesuai standar 'Kakak Kelas yang Ramah'.")
        print("=" * 70)

if __name__ == '__main__':
    strict_mode = '--strict' in sys.argv
    run_lint(strict=strict_mode)
