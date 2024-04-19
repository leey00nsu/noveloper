import { Nanum_Myeongjo } from 'next/font/google';
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const namumMyeongjo = Nanum_Myeongjo({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nanum-myeongjo',
});
