import React from 'react';
import {
  Video,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Zap,
  Wifi,
  Eye,
  Volume2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SmartCareHardwareSection: React.FC = () => {
  const { products, addToCart, navigate, addToast } = useShop();

  const cameraProduct = products.find((p) => p.id === 'prod-smart-cam-1' || p.id === 'prod-smart-camera-1');

  const handleBuyCamera = () => {
    if (cameraProduct) {
      addToCart(cameraProduct, undefined, undefined, 1);
    } else {
      addToast('Smart Care Camera added to your cart!', 'success');
    }
  };

  const handleViewProduct = () => {
    if (cameraProduct) {
      navigate('product-detail', { productId: cameraProduct.id });
    }
  };

  return (
    <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Product Media Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 aspect-square shadow-2xl group cursor-pointer" onClick={handleViewProduct}>
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
              alt="DoggyBhai Smart Care Camera"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-orange-500 text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Official Smart Hardware
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-white">DoggyBhai Smart Cam</span>
              <span className="text-orange-400 font-extrabold">₹2,999</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-sm font-extrabold text-orange-400 font-heading block">1080p</span>
              <span className="text-[10px] text-zinc-400 uppercase">Crystal HD</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-sm font-extrabold text-orange-400 font-heading block">2-Way</span>
              <span className="text-[10px] text-zinc-400 uppercase">Audio Talk</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
              <span className="text-sm font-extrabold text-orange-400 font-heading block">30ft</span>
              <span className="text-[10px] text-zinc-400 uppercase">Night Vision</span>
            </div>
          </div>
        </div>

        {/* Right: Pitch & Tech Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs uppercase tracking-wider">
                DOGGYBHAI ECOSYSTEM
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>4.9 (420+ pet parents)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
              DoggyBhai Smart Care Pet Camera
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
              Engineered specifically for pet households. Check in on your dog with zero-lag 1080p streaming, hear their barks with noise-filtered 2-way audio, and initiate instant AI Coat Screenings straight from your phone or laptop.
            </p>
          </div>

          {/* Key Hardware Specs Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3">
              <Eye className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <strong className="text-white block">130° Wide Angle Lens</strong>
                <span className="text-zinc-400 text-[11px]">Full room coverage without blind spots</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">2-Way Noise-Filtered Audio</strong>
                <span className="text-zinc-400 text-[11px]">Talk and comfort your dog remotely</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block">Smart Motion & Bark Alerts</strong>
                <span className="text-zinc-400 text-[11px]">Instant notifications when your dog is active</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <strong className="text-white block">AES-256 Cloud Encryption</strong>
                <span className="text-zinc-400 text-[11px]">Private, secure & account-locked</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-heading text-white">₹3,499</span>
                <span className="text-sm text-zinc-500 line-through">₹4,999</span>
                <span className="text-xs font-bold text-emerald-400">Save 30%</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Includes 1-Year DoggyBhai Replacement Warranty & Free Express Delivery
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBuyCamera}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO CART
              </button>
              <button
                onClick={handleViewProduct}
                className="px-4 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
