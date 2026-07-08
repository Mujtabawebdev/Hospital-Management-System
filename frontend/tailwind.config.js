/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        stickyNavbar: {
          "0%": {
            transform: "translateY(-40px)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        }
      },
      colors: {
        dark_theme: "#0f1f44",
        main_theme: "#2563eb",
        light_theme: "#eff6ff",
        pastel_blue: "#dbeafe",
        pastel_yellow: "#eff6ff",
        pastel_pink: "#f8fbff",
        cart_orange: "#2563eb",
        text: "#ffffff",
        text_grey: "#64748b",
        medicine_banner: "#0f1f44",
        testimonial_img_bg: "#bfdbfe",
      },
      // height:{
      //   heroHeihgt:"calc"
      // }
    },
  },
  plugins: [],
}
