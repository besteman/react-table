import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/NavBar/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Table Exampe',
  description: 'React Table Example with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/table.svg" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="container mx-auto">
          <main className="mx-16 h-full max-w-6xl sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
