/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-red': '#EF4444',
                'brand-orange': '#F97316',
                'brand-yellow': '#F59E0B',
                'brand-blue': '#3B82F6',
                'brand-bg': '#FEF3C7',
            },
            fontFamily: {
                sans: ['Fredoka', 'Poppins', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'shake': 'shake 0.5s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                }
            }
        },
    },
    plugins: [],
}
