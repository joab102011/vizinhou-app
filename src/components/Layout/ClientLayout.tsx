'use client';

import { Providers } from '@/app/providers';
import { HelpAssistant } from '@/components/Assistant/HelpAssistant';
import { Toaster } from 'react-hot-toast';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <div className="min-h-screen relative">
        {/* Imagem de fundo com película vermelha */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/bg-vizinhou.png")'
          }}
        />
        <div className="fixed inset-0 z-0 bg-red-600/60 backdrop-blur-[2px]" />
        
        {/* Conteúdo */}
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>

        {/* Assistente */}
        <div className="relative z-20">
          <HelpAssistant />
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#22c55e',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </>
  );
} 