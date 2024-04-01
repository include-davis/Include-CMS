import { Inter, Montserrat, Manrope } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const fonts = [inter, montserrat, manrope];

const font_variables = fonts.map((font) => font.variable);
const font_string = font_variables.join(' ');
export default font_string;
