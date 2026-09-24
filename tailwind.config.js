module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#9E1B1E', dark: '#7A1013', light: '#B3282C' },
        cream: { DEFAULT: '#F6EFE0', card: '#FFFBF2' },
        leaf: { DEFAULT: '#17703C', dark: '#0E5A2E' },
        gold: '#D9A92F',
        ink: '#26211C',
        muted: '#645A4B',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
        ui: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(90,60,20,0.10)',
      },
    },
  },
  plugins: [],
};
