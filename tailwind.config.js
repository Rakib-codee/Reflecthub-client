/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED", // The purple from your "Get Started" button
        secondary: "#ddd6fe", // Light purple
        background: "#F5F3FF", // Very light purple background
        textMain: "#1F2937",
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'), // Optional: I recommend installing daisyui for easy components
  ],
}