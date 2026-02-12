import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Nav from '@/components/Nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://georgexue.com'),
  title: 'George Xue',
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans">
        <div className="flex flex-col p-4 pb-12 xs:flex-row xs:p-6 sm:p-12 md:p-24 md:pb-24">
          <Nav />
          <main className="relative w-full min-w-0 text-justify hyphens-auto xs:border-l xs:border-neutral-200 xs:pl-8 sm:max-w-2xl sm:pl-10 md:pl-14">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
