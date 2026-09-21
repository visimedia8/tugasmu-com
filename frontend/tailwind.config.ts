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
  			sans: ['var(--font-inter)', 'sans-serif'],
  			heading: ['var(--font-plus-jakarta)', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Custom Stitch Material Tokens
        "tertiary": "#855300",
        "error-container": "#ffdad6",
        "surface-variant": "#dae2fd",
        "surface-bright": "#faf8ff",
        "on-tertiary-fixed-variant": "#653e00",
        "outline-variant": "#bec8d2",
        "surface": "#faf8ff",
        "error": "#ba1a1a",
        "primary-container": "#0ea5e9",
        "primary-fixed": "#c9e6ff",
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#005321",
        "on-tertiary-fixed": "#2a1700",
        "on-primary-fixed": "#001e2f",
        "on-secondary-container": "#007432",
        "inverse-surface": "#283044",
        "on-error": "#ffffff",
        "on-primary-container": "#003751",
        "on-secondary-fixed": "#002109",
        "inverse-primary": "#89ceff",
        "tertiary-fixed-dim": "#ffb95f",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed": "#6bff8f",
        "surface-dim": "#d2d9f4",
        "secondary-container": "#6bff8f",
        "surface-container-highest": "#dae2fd",
        "on-surface-variant": "#3e4850",
        "inverse-on-surface": "#eef0ff",
        "surface-container-high": "#e2e7ff",
        "primary-fixed-dim": "#89ceff",
        "tertiary-container": "#d88a00",
        "on-primary": "#ffffff",
        "tertiary-fixed": "#ffddb8",
        "surface-tint": "#006591",
        "outline": "#6e7881",
        "on-background": "#131b2e",
        "surface-container": "#eaedff",
        "surface-container-low": "#f2f3ff",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#004c6e",
        "secondary-fixed-dim": "#4ae176",
        "on-surface": "#131b2e",
        "on-tertiary-container": "#4a2c00"
  		},
      spacing: { "space-xl": "1.5rem", "margin": "1rem", "gutter-tablet": "1.25rem", "gutter": "1rem", "margin-desktop": "2rem", "margin-tablet": "1.5rem", "space-xs": "0.25rem", "space-sm": "0.5rem", "gutter-desktop": "1.5rem", "space-md": "0.75rem", "space-lg": "1rem" },
      fontSize: { "label-md": [ "13px", { "lineHeight": "18px", "fontWeight": "600" } ], "headline-sm": [ "18px", { "lineHeight": "24px", "fontWeight": "600" } ], "body-sm": [ "12px", { "lineHeight": "18px", "fontWeight": "400" } ], "label-sm": [ "11px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "700" } ], "label-lg": [ "15px", { "lineHeight": "20px", "fontWeight": "600" } ], "display-lg": [ "40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "headline-lg": [ "32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" } ], "headline-md": [ "22px", { "lineHeight": "28px", "fontWeight": "600" } ], "body-md": [ "14px", { "lineHeight": "22px", "fontWeight": "400" } ], "body-lg": [ "16px", { "lineHeight": "26px", "fontWeight": "400" } ], "display-lg-mobile": [ "30px", { "lineHeight": "38px", "letterSpacing": "-0.015em", "fontWeight": "700" } ], "headline-lg-mobile": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" } ] },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
