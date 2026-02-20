/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "#ffffffff",
          50: "#fbfaf9ff",
          100: "#f6f4f3ff",
          200: "#ebe6e5ff",
          300: "#dbd3d1ff",
          400: "#af9f9cff",
          500: "#806f6bff",
          600: "#63514bff",
          700: "#513e37ff",
          800: "#37241fff",
          900: "#271811ff",
          950: "#170e0a",
        },
        accent: {
          50: "#f6ecc2f",
          100: "#ffe066",
          200: "#ffd43b",
          500: "#fcc419",
          600: "#fab005",
          700: "#f59f00",
          800: "#f08c00",
          900: "#e67700",
        },
      },
    },
  },
  plugins: [],
};
