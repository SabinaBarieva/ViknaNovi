import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A32AF',     
        secondary: '#061027',   
        accent: '#0055FF',      
        bluelight: '#0092FF',        
        bluemorelight: '#94C4FF',       
        bg: 'EDEEEF'
      },
            fontFamily: {
        mont: ["var(--font-montserrat)", "sans-serif"],
        opensans: ["var(--font-openSans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

