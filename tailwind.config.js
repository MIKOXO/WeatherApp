module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        s1: "#080D27",
        s2: "#0C1838",
        s3: "#334679",
        s4: "#1959AD",
        s5: "#263466",
      },
      boxShadow: {
        400: "inset 0px 2px 2px 0 rgba(255, 255, 255, 0.05)",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translate(3px, 0)",
          },
          "50%": {
            transform: "translate(-3px, 0)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
      animation: {
        shake: "shake 150ms 2 linear",
      },
    },
  },
  plugins: [],
};
