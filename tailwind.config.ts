const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#0CB6CC",
          50: "#D9F7FA",
          100: "#B3EAF4",
          200: "#8ADCEC",
          300: "#61CBE4",
          400: "#3FB2DA",
          500: "#0CB6CC",
          600: "#0A9DB3",
          700: "#08849A",
          800: "#066B82",
          900: "#055A70",
        },
      },                      
      spacing: {
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
}
