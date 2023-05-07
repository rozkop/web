/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    screens: {
      xxs: "300px",
      xs: "430px",
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    fontSize: {
      xxs: "0.6rem",
      xs: "0.8rem",
      sm: "0.9rem",
      md: "1rem",
      lg: "1.1rem",
      xl: "1.2rem",
      xxl: "1.3rem",
      xxxl: '1.4rem',
    },
  },
  plugins: [],
};
