/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: "#328AF1",
                dark: {
                    bg: "#171923",
                    card: "#222630",
                },
            },
        },
    },
    plugins: [],
};
