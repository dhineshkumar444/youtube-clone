/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        lsm: "550px", // This defines a custom breakpoint for 550px
      },
    },
  },
  plugins: [],
};
