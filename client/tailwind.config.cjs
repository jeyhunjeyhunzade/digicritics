/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        customBlue: "0px 9px 13px 0px rgba(3, 78, 107, 0.90)",
        cardShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.07)",
        tableRowShadow: "0px 4px 17px 0px rgba(0, 0, 0, 0.08)",
        reviewImagesShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        gradientBlue: "linear-gradient(135deg, #03425B 0%, #0386BA 100%)",
        gradientBtnBlue: "linear-gradient(135deg, #034159 0%, #0385B9 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
