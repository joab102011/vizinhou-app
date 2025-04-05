import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Layout/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vizinhou - Compre, venda e troque com seus vizinhos',
  description: 'Plataforma para comprar, vender e trocar produtos com seus vizinhos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-right" />
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-white border-t">
              <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                © {new Date().getFullYear()} Vizinhou. Todos os direitos reservados.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
} 