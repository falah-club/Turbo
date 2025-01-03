import { Config } from 'tailwindcss';
// @ts-ignore
import forms from '@tailwindcss/forms';
// @ts-ignore
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [forms, typography],
} satisfies Config;
