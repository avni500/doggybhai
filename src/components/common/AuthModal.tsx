import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, Sparkles, Dog, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, addToast } = useShop();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    if (!password || password.length < 4) {
      addToast('Please enter a password of at least 4 characters', 'error');
      return;
    }

    login(email, name || (mode === 'register' ? 'New Pet Parent' : email.split('@')[0]));
  };

  const handleDemoCustomerLogin = () => {
    login('pooja.reddy@example.com', 'Pooja Reddy');
  };

  const handleDemoAdminLogin = () => {
    login('admin@doggybhai.com', 'DoggyBhai Admin');
  };

  const handleGoogleLogin = () => {
    login('petlover@gmail.com', 'Alex Sharma');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200 z-10">
        {/* Modal Header with Black Logo */}
        <div className="p-6 bg-zinc-50 border-b border-zinc-200 text-center relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="font-extrabold text-2xl tracking-tighter text-black font-heading select-none uppercase">
            doggybhai
          </span>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            {mode === 'login' ? 'Welcome back to the Pack' : 'Create your DoggyBhai account'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-zinc-200/80 p-1 rounded-xl mt-4 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'register' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Your Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Verma"
                    className="w-full bg-zinc-50 border border-zinc-300 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 border border-zinc-300 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-300 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Social Sign-In */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 font-semibold text-[10px]">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 rounded-xl text-xs font-bold text-zinc-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Quick Demo Logins for AI Studio Review */}
          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">
              Quick 1-Click Demo Profiles
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDemoCustomerLogin}
                className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Dog className="w-3.5 h-3.5 text-orange-600" />
                <span>Pet Parent (Pooja)</span>
              </button>

              <button
                onClick={handleDemoAdminLogin}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                <span>Admin Staff</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
