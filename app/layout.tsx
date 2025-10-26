// app/layout.js or pages/_app.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'] 
});

export const metadata = {
  title: 'Malcom Login',
  description: 'Log in to your Malcom account',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}