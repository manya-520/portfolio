/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /** Site-wide corner radius: 8px (`rounded-full` stays circular via default `full`). */
      borderRadius: {
        none: "0",
        sm: "8px",
        DEFAULT: "8px",
        md: "8px",
        lg: "8px",
        xl: "8px",
        "2xl": "8px",
        "3xl": "8px",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        instrument: [
          "var(--font-instrument-sans)",
          "Instrument Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        actual: {
          bg: "#ffffff",
          surface: "#fafafa",
          panel: "#f9fafb",
          subtle: "#f1f5f9",
          muted: "#f4f4f5",
          border: "#e2e8f0",
          divider: "#e4e4e7",
          card: "#dfe4ed",
          ink: "#0f172a",
          text: "#18181b",
          body: "#3f3f47",
          slate: "#334155",
          muted2: "#64748b",
          mute: "#6b7280",
          mute3: "#71717a",
          ghost: "#94a3b8",
          accent: "#0043CE",
          accentInk: "#0043CE",
          /** Brand gradient stops (dark saturated green → blue) */
          brandGreen: "#04EF86",
          brandBlue: "#0043CE",
          accentSoft: "rgba(0, 67, 206, 0.08)",
          accentBorder: "rgba(0, 67, 206, 0.22)",
          welcome: "#1f2328",
          chipPending: "#eff3f8",
        },
      },
      boxShadow: {
        actualCard: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
      },
      letterSpacing: {
        tightish: "-0.02em",
        tighter2: "-0.03em",
      },
      /**
       * Actual UI: three pixel sizes — title 14px / body 12px / helper 10px.
       * (`typ-` prefix avoids clashing with `actual` color keys.)
       */
      fontSize: {
        "typ-header": [
          "0.875rem",
          { lineHeight: "1.35", letterSpacing: "-0.02em" },
        ],
        "typ-body": ["0.75rem", { lineHeight: "1.416667" }],
        "typ-helper": ["0.625rem", { lineHeight: "1.4" }],
      },
      keyframes: {
        "actual-shimmer": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(280%)" },
        },
      },
      animation: {
        "actual-shimmer": "actual-shimmer 1.85s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
