import { Manrope, DM_Sans } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const DMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const fonts = [manrope, DMSans];

const font_variables = fonts.map((font) => font.variable);
const font_string = font_variables.join(' ');
export default font_string;
