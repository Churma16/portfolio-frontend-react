/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                body: ["Kanit", "sans-serif"],
                heading: ["Hanken Grotesk", "sans-serif"],
            },
            colors: {
                "card-bg-lara-admin": "#0f172a",
                "card-border-lara-admin": "rgba(255, 255, 255, 0.1)",
                "field-bg-lara-admin": "rgba(0, 0, 0, 0.2)",
                lara: {
                    dark: "#010618",
                    border: "#1b293d",
                    blue: "#328AF1",
                    sky: "#BAD9FC",
                },
                cat: {
                    framework: {
                        DEFAULT: "#EC454F",
                        light: "#F44881",
                    },
                    technique: {
                        DEFAULT: "#637BFF",
                        light: "#21C8F6",
                    },
                    testing: {
                        DEFAULT: "#1AAB8B",
                        light: "#6EDCC4",
                    },
                    language: {
                        DEFAULT: "#F19A1A",
                        light: "#FFC73C",
                    },
                    tooling: {
                        DEFAULT: "#8B60ED",
                        light: "#B372BD",
                    },
                    devops: {
                        DEFAULT: "#253D63",
                        light: "#A1B6E5",
                    },
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
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
            animation: {
                "infinite-scroll": "infinite-scroll 40s linear infinite",
            },
            keyframes: {
                "infinite-scroll": {
                    from: {
                        transform: "translateX(0)",
                    },
                    to: {
                        transform: "translateX(-100%)",
                    },
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
