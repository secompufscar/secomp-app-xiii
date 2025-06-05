/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/screens/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                white: "#FFFFFF",
                black: "#000000",

                // Versão antiga do app, remover quando finalizar nova versão
                "neutral": {
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                },

                "green-old": {
                    50: "#F7FDFA",
                    100: "#EFFBF6",
                    200: "#DBF6EB",
                    300: "#CAF1E2",
                    400: "#B6ECD6",
                    500: "#9FE6CA",
                    600: "#69D8AC",
                    700: "#51B68D",
                },

                "blue-old": "#445BE6",

                // Versão nova do app
                // Accent
                "blue": {
                    100: "#C5CCF7",
                    200: "#A9B4F4",
                    500: "#4153DF",
                    700: "#3141A3",
                    900: "#1C212C",
                },

                green: "#4CEDB9",

                // Feedback
                warning: "#F1C21B",
                danger: "#F05D6C",
                success: "#0FB842",

                // Text color
                default: "#E0E0E0",

                // Text input, elements bg
                border: "#536080",
                background: "#212735",
                iconbg: "#29303F",
            },
            fontFamily: {
                inter: 'Inter_400Regular',
                poppins: 'Poppins_400Regular',
                poppinsMedium: 'Poppins_500Medium',
                poppinsSemiBold: 'Poppins_600SemiBold',
            },
            screens: {
                'xxs': '420px',
            },
        }
    },
    plugins: [],
};

