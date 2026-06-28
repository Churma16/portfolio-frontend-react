/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // Existing
                body: ["Kanit", "sans-serif"],
                heading: ["Hanken Grotesk", "sans-serif"],

                // NEW: Go Brand Fonts (Make sure to import these in CSS!)
                "go-heading": ["Work Sans", "sans-serif"],
                "go-body": ["Roboto", "sans-serif"],
                "go-code": ["Source Code Pro", "monospace"],
            },
            colors: {
                // ==========================================
                // 1. THE "MAGIC" SWITCHERS (Use these!)
                // ==========================================
                // These point to CSS variables, so they auto-switch
                "admin-card": "rgba(var(--admin-card-bg))",
                "admin-border": "rgba(var(--admin-card-border))",
                "admin-field": "rgba(var(--admin-field-bg))",

                // ==========================================
                // 2. EXISTING LARAVEL THEME (Legacy/Fixed)
                // ==========================================
                "card-bg-lara-admin": "#0f172a",
                "card-border-lara-admin": "rgba(255, 255, 255, 0.1)",
                "field-bg-lara-admin": "rgba(0, 0, 0, 0.2)",
                lara: {
                    dark: "#010618",
                    border: "#1b293d",
                    blue: "#328AF1",
                    sky: "#BAD9FC",
                    "dark-blue": "#0a101f",
                    "glitch-magenta": "#ff00c1",
                    "glitch-cyan": "#00fff9",
                    "neon-green": "#0f0",
                    // Text colors
                    "text-primary": "#ffffff",
                    "text-secondary": "#e2e8f0",
                    "text-tertiary": "#cbd5e1",
                    "text-muted": "#94a3b8",
                    "text-muted-dark": "#64748b",
                    "text-accent-blue": "#3b82f6",
                    "text-accent-blue-light": "#60a5fa",
                    "text-accent-blue-lighter": "#93c5fd",
                    "text-accent-green": "#22c55e",
                    "text-accent-red": "#ef4444",
                    "text-accent-red-light": "#f87171",
                    "text-accent-purple": "#a855f7",
                    "text-accent-yellow": "#eab308",
                },

                // ==========================================
                // 3. NEW GO THEME (Brand Book v1.0)
                // ==========================================
                go: {
                    blue: "#00ADD8",   // Primary Gopher Blue
                    aqua: "#00A29C",   // Secondary Aqua
                    black: "#000000",  // Official Black (High Contrast)
                    white: "#FFFFFF",

                    // Accents
                    sky: "#50C9E2",
                    pink: "#CE3262",   // Error / Glitch
                    yellow: "#FDDD00", // Warning
                    purple: "#402856",

                    // Grays
                    gray: {
                        dark: "#555759",
                        light: "#DBD9D6",
                    }
                },

                // Categories (Keep as is)
                cat: {
                    framework: {DEFAULT: "#EC454F", light: "#F44881"},
                    technique: {DEFAULT: "#637BFF", light: "#21C8F6"},
                    testing: {DEFAULT: "#1AAB8B", light: "#6EDCC4"},
                    language: {DEFAULT: "#F19A1A", light: "#FFC73C"},
                    tooling: {DEFAULT: "#8B60ED", light: "#B372BD"},
                    devops: {DEFAULT: "#253D63", light: "#A1B6E5"},
                },

                // Shadcn UI Variables (The Backbone of Switching)
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))"},
                popover: {DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))"},
                primary: {DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))"},
                "primary-hover": "hsl(var(--primary-hover))",
                "primary-shadow": "hsl(var(--primary-shadow))",
                "hero-start": "hsl(var(--hero-gradient-start))",
                "hero-end": "hsl(var(--hero-gradient-end))",
                "tech-bg": "hsl(var(--tech-bg))",
                "tech-border": "hsl(var(--tech-border))",
                "tech-text": "hsl(var(--tech-text))",
                "tech-hover-border": "hsl(var(--tech-hover-border))",
                secondary: {DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))"},
                muted: {DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))"},
                accent: {DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))"},
                destructive: {DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))"},
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            // ... animation & keyframes ...
            animation: {
                "infinite-scroll": "infinite-scroll 40s linear infinite",
                "infinite-scroll-slow": "infinite-scroll 80s linear infinite"
            },
            keyframes: {
                "infinite-scroll": {
                    from: {transform: "translateX(0)"},
                    to: {transform: "translateX(-100%)"},
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};