/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    100: "#fbfffe",
                    200: "#f7fefe",
                    300: "#f2fefd",
                    400: "#eefdfd",
                    500: "#eafdfc",
                    600: "#bbcaca",
                    700: "#8c9897",
                    800: "#5e6565",
                    900: "#2f3332",
                },
                dark: {
                    100: "#ced4da",
                    200: "#9da8b5",
                    300: "#6c7d91",
                    400: "#3b516c",
                    500: "#0a2647",
                    600: "#081e39",
                    700: "#06172b",
                    800: "#040f1c",
                    900: "#02080e",
                },
                accent: {
                    100: "#cfe5fc",
                    200: "#9fcbf9",
                    300: "#70b0f7",
                    400: "#4096f4",
                    500: "#107cf1",
                    600: "#0d63c1",
                    700: "#0a4a91",
                    800: "#063260",
                    900: "#031930",
                },
            },
        },
    },
    plugins: [],
};
