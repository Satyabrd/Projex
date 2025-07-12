/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            conceptualize: '#3B82F6', //blue
            initialize: '#F97316',    //orange
            sprint: '#10B981',        //green
            lightGrayBg: '#f0f2f5'
        }
      },
    },
    plugins: [],
}