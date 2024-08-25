/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      animation: {
        gradientRotation: "gradientrotation 5s ease infinite",
        appear: "appear 1s ease ",
        show: "show 0.3s ease-in-out forwards",
        colorChange: "colorChange 1s infinite",
        animateTop: "3s animateTop linear infinite",
        animateRight: "3s animateRight linear -1.5s infinite",
        animateBottom: "3s animateBottom linear infinite",
        animateLeft: "3s animateLeft linear -1.5s infinite",
      },
      keyframes: {
        gradientrotation: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        appear: {
          "0%": {
            opacity: "0",
            transform: "scale(0.7)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        show: {
          "0%": { opacity: "0" },
          // "5%": { visibility: "visible" },
          "10%": { opacity: "0.1" },
          "30%": { opacity: "0.25" },
          "50%": { opacity: "0.35" },

          "60%": { opacity: "0.45" },
          "70%": { opacity: "0.65" },

          "100%": { opacity: "0.8" },
        },
        colorChange: {
          "0%": {
            fill: "#FF7900",
          },
          "50%": {
            fill: "#E5E7EB",
          },
          "100%": {
            fill: "#FF7900",
          },
        },
        animateTop: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        animateRight: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
        animateBottom: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        animateLeft: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      gridTemplateColumns: {
        "discover-page": "repeat(auto-fit,minmax(280px,2fr))",
      },
    },
  },
  plugins: [
    // require("tailwind-scrollbar")({ nocompatible: true }),
    // require("@tailwindcss/forms")({
    //   strategy: "class",
    // }),
  ],
  variants: {
    // scrollbar: ["rounded"],
  },
  corePlugins: {
    preflight: false,
  },
};
