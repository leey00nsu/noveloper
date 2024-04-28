import { Noto_Serif_KR } from 'next/font/google';
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const notoSerif = Noto_Serif_KR({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
});
