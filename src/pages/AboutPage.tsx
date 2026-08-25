import React from 'react';
import { Heart, ShieldCheck, Dog, Award, Sparkles, Truck, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200/80">
          THE DOGGYBHAI STORY
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950 leading-tight">
          Built with Love for India’s Happiest Dogs & Their Humans
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">
          DoggyBhai was founded with one heartfelt belief: our dogs deserve gear crafted with the same uncompromising standards of ergonomics, safety, and durability that humans expect from their own everyday essentials.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-zinc-100">
          <img
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1000&q=80"
            alt="Pet Parent with dog wearing DoggyBhai collar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-950">
            From Bangalore Parks to Homes Across India
          </h2>
          <p>
            Like many pet parents in India, we grew frustrated with mass-market imported dog accessories. Cheap plastic clips snapped mid-walk, synthetic collar edges caused neck chafing, and bowls rusted after a few weeks of use.
          </p>
          <p>
            We partnered with Indian textile artisans, veterinary orthopedists, and canine behavior experts to design accessories specifically tailored for India's climate, urban walking challenges, and diverse dog breeds — from beloved local Indies to Labradors and Golden Retrievers.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <span className="font-heading font-extrabold text-2xl text-orange-600">10,000+</span>
              <p className="text-xs font-bold text-zinc-800 mt-1">Dogs Equipped</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <span className="font-heading font-extrabold text-2xl text-orange-600">100%</span>
              <p className="text-xs font-bold text-zinc-800 mt-1">Made in India Craft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
            OUR CORE VALUES
          </span>
          <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            What Drives Every DoggyBhai Design
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-800/80 rounded-2xl border border-zinc-700 space-y-2">
            <ShieldCheck className="w-6 h-6 text-orange-400" />
            <h4 className="font-heading font-extrabold text-base text-white">Safety Above All</h4>
            <p className="text-xs text-zinc-400">
              Military-spec high-density webbing, break-proof zinc alloy d-rings, and heavy 304 food-grade stainless steel.
            </p>
          </div>

          <div className="p-6 bg-zinc-800/80 rounded-2xl border border-zinc-700 space-y-2">
            <Dog className="w-6 h-6 text-orange-400" />
            <h4 className="font-heading font-extrabold text-base text-white">Canine Comfort First</h4>
            <p className="text-xs text-zinc-400">
              Breathable neoprene padding prevents matting, irritation, and friction burns during long walks.
            </p>
          </div>

          <div className="p-6 bg-zinc-800/80 rounded-2xl border border-zinc-700 space-y-2">
            <Heart className="w-6 h-6 text-orange-400" />
            <h4 className="font-heading font-extrabold text-base text-white">Pet Parent Care</h4>
            <p className="text-xs text-zinc-400">
              Free doorstep size swaps, 30-day returns, and friendly support from real dog parents in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
