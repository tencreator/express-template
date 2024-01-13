/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/**.ejs",
  ],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: ["dracula", "cupcake"],
    darkTheme: "dracula",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
  plugins: [require("daisyui")],
}