/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#061A33",
          secondary: "#0B2140",
          surface: "#102B4D",
          deep: "#041225"
        },
        cyan: {
          DEFAULT: "#08B9F2",
          light: "#35C7F5"
        },
        orange: {
          DEFAULT: "#FF7800",
          hover: "#FF8A1F"
        },
        light: {
          DEFAULT: "#F4F6FA",
          alt: "#EEF2F7",
          border: "#DCE3EC"
        },
        slateText: "#52627A"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
      },
      maxWidth: {
        container: "1280px"
      }
    }
  },
  plugins: []
};

