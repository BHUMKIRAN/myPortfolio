/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
      },
      boxShadow: {
        neo: "var(--shadow-neo)",
        soft: "var(--shadow-soft)",
        primary: "var(--shadow-primary)",
        // Custom inset shadow for the "pressed" neumorphic state
        'neo-inset': 'inset 4px 4px 8px rgba(0, 0, 0, 0.07), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      keyframes: {
        btnGradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-slow': 'btnGradient 3s ease-in-out infinite',
      },
      backgroundImage: {
        'primary-gradient': "linear-gradient(120deg, var(--primary), var(--primary-dark), var(--primary), var(--primary-dark), var(--primary))",
      },
    },
  },
  plugins: [
    // Component-level styles that are awkward to express as a long utility list.
    function ({ addComponents, theme }) {
      addComponents({
        ".btn-neumorphic": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${theme("spacing.3")} ${theme("spacing.7")}`,
          borderRadius: theme("borderRadius.md"),
          fontWeight: theme("fontWeight.semibold"),
          fontSize: "14px",
          lineHeight: theme("lineHeight.snug"),
          userSelect: "none",
          cursor: "pointer",
          border: "none",
          backgroundColor: theme("colors.bg"),
          color: theme("colors.primary.DEFAULT"),
          boxShadow: theme("boxShadow.neo-inset"),
          transitionProperty: "all",
          transitionDuration: theme("transitionDuration.200"),
          transitionTimingFunction: theme("transitionTimingFunction.DEFAULT"),
          "&:hover": {
            transform: "translateY(-2px) scale(1.02)",
            color: theme("colors.white"),
            boxShadow: theme("boxShadow.soft"),
            backgroundImage: theme("backgroundImage.primary-gradient"),
            backgroundSize: "300% 300%",
            animation: theme("animation.gradient-slow"),
          },
          "&:active": {
            transform: "translateY(1px)",
            boxShadow: theme("boxShadow.neo-inset"),
          },
        },
      });
    },

    // 3D flip helpers used by the memory game card UI.
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": { perspective: "1000px" },
        ".transform-preserve": {
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        },
        ".rotate-y-180": { transform: "rotateY(180deg)" },
      });
    },
  ],
};
