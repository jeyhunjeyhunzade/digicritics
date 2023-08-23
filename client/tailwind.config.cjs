/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        customBlue: "0px 9px 13px 0px rgba(3, 78, 107, 0.90)",
      },
      backgroundImage: {
        gradientBlue: "linear-gradient(135deg, #03425B 0%, #0386BA 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
