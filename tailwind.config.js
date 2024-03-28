module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    container: {
      center: true,
    },
  },
};
