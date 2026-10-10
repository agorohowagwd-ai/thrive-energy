/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#000000",
        paper: "#ffffff",
        inkstone: "#181818",
        felt: "#6d6d6d",
        slatepill: "#636363",
        pewter: "#808080",
        ash: "#9a9a9a",
        mint: "#a0e0ab",
        amber: "#ffac2e",
        oxblood: "#a52d25",
      },
      fontFamily: {
        sans: ["Roobert", "Inter", "Söhne", "system-ui", "sans-serif"],
        accent: ["Raleway", "Montserrat", "Jost", "sans-serif"],
      },
      borderRadius: {
        pill: "75px",
      },
      maxWidth: {
        page: "1078px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        800: "800ms",
        1250: "1250ms",
      },
    },
  },
  plugins: [],
}
