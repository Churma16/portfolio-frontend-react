/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // 1. Setup Font Family
            fontFamily: {
                // Body: Kanit (Medium 500, Bold 700)
                body: ["Kanit", "sans-serif"],
                // Title: Hanken Grotesk
                heading: ["Hanken Grotesk", "sans-serif"],
            },

            // 2. Setup Warna Lengkap Laracasts
            colors: {
                lara: {
                    dark: "#010618", // Background Utama
                    border: "#1b293d", // Outline Navbar/Card
                    blue: "#328AF1", // Primary Blue
                    sky: "#BAD9FC", // Elements & Icons
                },

                // Kategori Warna (Untuk Badge/Icon)
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
            },
        },
    },
    plugins: [],
};
