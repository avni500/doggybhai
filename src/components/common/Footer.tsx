import React, { useState } from 'react';
import {
  Heart,
  Instagram,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useShop, NavigationRoute } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigate, addToast, settings } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to the DoggyBhai Pack! Check your inbox for a 10% coupon code 🐾', 'success');
    setNewsletterEmail('');
  };

  const handleNav = (route: NavigationRoute, params?: any) => {
    navigate(route, params);
  };

  return (
    <footer className="bg-[#121214] text-zinc-300 border-t border-zinc-800 transition-colors">
      {/* Upper Trust Strip */}
      <div className="border-b border-zinc-800/80 bg-[#18181B]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Durable Dog-Grade Craft</h4>
                <p className="text-xs text-zinc-400 mt-0.5">High-tensile nylon, full-grain leather & rust-proof zinc hardware.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Free Shipping Across India</h4>
                <p className="text-xs text-zinc-400 mt-0.5">On all orders above ₹499. Express dispatch within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">30-Day Easy Exchanges</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Free doorstep pickup if size needs swapping for your pup.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">100% Safe & Pet-Tested</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Food-grade SS304 steel & non-toxic lead-free coatings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white px-3 py-1.5 rounded-lg inline-block shadow-sm">
              <span className="font-extrabold text-2xl tracking-tighter text-black font-heading select-none uppercase">
                doggybhai
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              DoggyBhai is India’s premium modern pet accessories brand crafted around the joyful, unbreakable relationship between dogs and their humans. Handcrafted everyday gear engineered for safety, comfort, and lifelong tail wags.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Follow @doggybhai.official on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleNav('contact')}
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-orange-600 hover:text-white text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Phone Support"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">SHOP</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('shop', { category: 'collars' })}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Dog Collars
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', { category: 'leashes' })}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Dog Leashes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', { category: 'bowls' })}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Dog Bowls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('combos')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Combo Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('offers')}
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                >
                  Offers & Coupons
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: DOGGYBHAI & GUIDES */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase">DOGGYBHAI</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  About DoggyBhai
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guide')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  DoggyBhai Guide & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('my-dog')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  My Dog Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Help & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: NEWSLETTER ("Join the DoggyBhai Pack") */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              JOIN THE PACK
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get 10% off your first order, plus dog parenting tips, breed guides, and secret bundle drops.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-orange-950/60 border border-orange-800/60 rounded-xl text-orange-200 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span>You’re in the Pack! Use code <strong>DOGGY10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-zinc-800/90 border border-zinc-700 focus:border-orange-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-md text-xs font-bold transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500">Zero spam. Only dog love & genuine perks.</p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} DoggyBhai Pet Products Pvt. Ltd. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500 mx-0.5 inline" />
            <span>for Indian Dog Parents.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => handleNav('faqs')} className="hover:text-zinc-300">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('faqs')} className="hover:text-zinc-300">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => handleNav('faqs')} className="hover:text-zinc-300">
              Shipping Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('admin')} className="text-zinc-600 hover:text-orange-400">
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
