'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { LocationDisplay } from '../Location/LocationDisplay';

const navLinkStyles = "px-4 py-2 text-white hover:text-white/80 transition-colors";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Páginas onde o Navbar não deve ser exibido
  const hideNavbarPaths = ['/login'];
  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Vizinhou"
                fill
                className="object-contain"
                priority
                sizes="40px"
              />
            </div>
          </Link>

          {/* Localização - Desktop */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <LocationDisplay />
          </div>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categorias" className={navLinkStyles}>
              Categorias
            </Link>
            <Link href="/produtos" className={navLinkStyles}>
              Produtos
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className={navLinkStyles}
              >
                Sair
              </button>
            ) : (
              <Link
                href="/login"
                className={navLinkStyles}
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
            >
              <span className="sr-only">Abrir menu principal</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-red-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="py-2 px-4">
              <LocationDisplay />
            </div>
            <Link
              href="/categorias"
              className="block px-3 py-2 text-white hover:bg-red-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Categorias
            </Link>
            <Link
              href="/produtos"
              className="block px-3 py-2 text-white hover:bg-red-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Produtos
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-white hover:bg-red-800 rounded-md"
              >
                Sair
              </button>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 text-white hover:bg-red-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 