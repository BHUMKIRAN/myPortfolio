/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        primary: "var(--primary)",
        'primary-dark': "var(--primary-dark)",
        foreground: "var(--foreground)",
        'text-primary': "var(--text-primary)",
        'text-muted': "var(--text-muted)",
      },
      boxShadow: {
        neo: "var(--shadow-neo)",
        soft: "var(--shadow-soft)",
        primary: "var(--shadow-primary)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};
