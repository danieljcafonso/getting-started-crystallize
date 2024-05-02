/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'body': ["Gordita", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", "sans-serif"]
    },
    colors: {
      "primary": "#335d92"
    },
    extend: {},
  },
  plugins: [],
}

