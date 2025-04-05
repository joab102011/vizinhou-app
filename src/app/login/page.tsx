'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login realizado com sucesso!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Cadastro realizado com sucesso!');
      }
      router.push('/');
    } catch (error) {
      toast.error(isLogin ? 'Erro ao fazer login' : 'Erro ao criar conta');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error) {
      toast.error('Erro ao fazer login com Google');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error) {
      toast.error('Erro ao fazer login com Facebook');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link 
        href="/"
        className="absolute top-4 left-4 text-white hover:text-white/80 transition-colors text-sm flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </Link>

      <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-8">
            <Image
              src="/images/logo.png"
              alt="Vizinhou"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold text-white text-center">
            {isLogin ? 'Bem-vindo ao Vizinhou' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-sm text-white/80 text-center">
            {isLogin ? 'Entre para acessar sua conta' : 'Preencha os dados para criar sua conta'}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="mt-8 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
          >
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/60">ou continue com</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-3 bg-white hover:bg-gray-50 text-gray-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="w-5 h-5 mr-3">
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <span className="font-medium">Continuar com Google</span>
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center px-4 py-3 bg-[#1877F2] hover:bg-[#1864D6] text-white rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            <div className="w-5 h-5 mr-3">
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <span className="font-medium">Continuar com Facebook</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/80 hover:text-white text-sm"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
          </button>
        </div>
      </div>
    </div>
  );
} 