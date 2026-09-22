import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // New unique fonts
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // Fallback aliases for backward compat
        inter: ['var(--font-dm-sans)', 'sans-serif'],
        'plus-jakarta': ['var(--font-fraunces)', 'serif'],
      },
      colors: {
        // ── Brand palette: TugasMu signature ──
        brand: {
          navy:     '#0f1f3d',  // deep navy — primary text + bg dark
          cream:    '#f7f3ec',  // warm cream — page background
          lime:     '#b8ff57',  // electric lime — primary accent
          'lime-dark': '#8acc30', // darker lime for hover
          coral:    '#ff7c5c',  // warm coral — badge/tag
          gold:     '#f5a623',  // warm gold — stars/highlight
          sky:      '#0ea5e9',  // keep sky for backward compat
        },

        // ── shadcn/ui tokens (mapped to brand) ──
        background:  '#f7f3ec',
        foreground:  '#0f1f3d',
        card: {
          DEFAULT:    '#ffffff',
          foreground: '#0f1f3d',
        },
        popover: {
          DEFAULT:    '#ffffff',
          foreground: '#0f1f3d',
        },
        primary: {
          DEFAULT:    '#0f1f3d',
          foreground: '#f7f3ec',
        },
        secondary: {
          DEFAULT:    '#b8ff57',
          foreground: '#0f1f3d',
        },
        muted: {
          DEFAULT:    '#ede8df',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT:    '#b8ff57',
          foreground: '#0f1f3d',
        },
        destructive: {
          DEFAULT:    '#ef4444',
          foreground: '#ffffff',
        },
        border:  '#e0d9ce',
        input:   '#e0d9ce',
        ring:    '#0f1f3d',

        // ── Material Design 3 tokens (kept for backward compat) ──
        "surface":                  "#f7f3ec",
        "surface-bright":           "#fffdf8",
        "surface-dim":              "#ede8df",
        "surface-container-lowest": "#ffffff",
        "surface-container-low":    "#f2ede5",
        "surface-container":        "#ede8df",
        "surface-container-high":   "#e5dfd7",
        "surface-container-highest":"#ddd7ce",
        "surface-variant":          "#dae2fd",
        "on-surface":               "#0f1f3d",
        "on-surface-variant":       "#4a5568",
        "on-background":            "#0f1f3d",
        "primary-container":        "#0ea5e9",
        "primary-fixed":            "#c9e6ff",
        "primary-fixed-dim":        "#89ceff",
        "on-primary":               "#ffffff",
        "on-primary-container":     "#003751",
        "on-primary-fixed":         "#001e2f",
        "on-primary-fixed-variant": "#004c6e",
        "inverse-primary":          "#89ceff",
        "secondary-container":      "#b8ff57",
        "secondary-fixed":          "#b8ff57",
        "secondary-fixed-dim":      "#8acc30",
        "on-secondary":             "#0f1f3d",
        "on-secondary-container":   "#0f1f3d",
        "on-secondary-fixed":       "#0f1f3d",
        "on-secondary-fixed-variant":"#1a3300",
        "tertiary":                 "#ff7c5c",
        "tertiary-container":       "#ff7c5c",
        "tertiary-fixed":           "#ffddb8",
        "tertiary-fixed-dim":       "#ffb95f",
        "on-tertiary":              "#ffffff",
        "on-tertiary-container":    "#4a2c00",
        "on-tertiary-fixed":        "#2a1700",
        "on-tertiary-fixed-variant":"#653e00",
        "error":                    "#ba1a1a",
        "error-container":          "#ffdad6",
        "on-error":                 "#ffffff",
        "on-error-container":       "#93000a",
        "outline":                  "#8a8079",
        "outline-variant":          "#cdc5bb",
        "inverse-surface":          "#0f1f3d",
        "inverse-on-surface":       "#f7f3ec",
        "surface-tint":             "#0f1f3d",
      },

      spacing: {
        "space-xl": "1.5rem",
        "margin": "1rem",
        "gutter-tablet": "1.25rem",
        "gutter": "1rem",
        "margin-desktop": "2rem",
        "margin-tablet": "1.5rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "gutter-desktop": "1.5rem",
        "space-md": "0.75rem",
        "space-lg": "1rem",
      },

      fontSize: {
        "label-md":           ["13px", { lineHeight: "18px", fontWeight: "600" }],
        "headline-sm":        ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-sm":            ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "label-sm":           ["11px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "700" }],
        "label-lg":           ["15px", { lineHeight: "20px", fontWeight: "600" }],
        "display-lg":         ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg":        ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md":        ["22px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md":            ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-lg":            ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "display-lg-mobile":  ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },

      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-lime': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184,255,87,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(184,255,87,0)' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-lime': 'pulse-lime 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
