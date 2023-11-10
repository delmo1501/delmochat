const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/**/*.{js,jsx,ts,tsx}', 
    // './public/index.html',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // content: [
  //   "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  // ],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

