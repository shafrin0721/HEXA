/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
=======
        // Core tokens (used by `client/src/index.css`)
>>>>>>> 72d6b3b (Updated Contact page and Profile page with bug fixes)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
<<<<<<< HEAD
=======
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
>>>>>>> 72d6b3b (Updated Contact page and Profile page with bug fixes)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
<<<<<<< HEAD
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
=======
>>>>>>> 72d6b3b (Updated Contact page and Profile page with bug fixes)
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
<<<<<<< HEAD
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        cardWhite: {
          DEFAULT: "hsl(var(--card-white))",
          foreground: "hsl(var(--card-white-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
=======
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Project-specific tokens present in `:root`
        surface: "hsl(var(--surface))",
        "surface-foreground": "hsl(var(--surface-foreground))",
        "card-white": "hsl(var(--card-white))",
        "card-white-foreground": "hsl(var(--card-white-foreground))",

        sidebar: {
          background: "hsl(var(--sidebar-background))",
>>>>>>> 72d6b3b (Updated Contact page and Profile page with bug fixes)
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
<<<<<<< HEAD
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
=======
        // Matches `--radius` from `client/src/index.css`
        DEFAULT: "var(--radius)",
>>>>>>> 72d6b3b (Updated Contact page and Profile page with bug fixes)
      },
    },
  },
  plugins: [],
}
