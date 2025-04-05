import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/Layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vizinhou',
  description: 'Conectando vizinhos, fortalecendo comunidades',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 