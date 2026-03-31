/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#020408',
                    800: '#062C21',
                },
                emerald: {
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    900: '#064E3B',
                },
                chaos: {
                    purple: '#10B981',
                    violet: '#34D399',
                    orange: '#F97316',
                    green: '#10B981',
                },
                brand: {
                    black: '#020408',
                    gray: '#062C21',
                    yellow: '#10B981',
                    text: '#F3F4F6',
                    muted: '#9CA3AF',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        }
    },
    plugins: [],
}
