import { Inter, Montserrat, Manrope, DM_Sans } from 'next/font/google';

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

const DMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const fonts = [inter, montserrat, manrope, DMSans];

const font_variables = fonts.map((font) => font.variable);
const font_string = font_variables.join(' ');
export default font_string;
