import React from 'react';
import { Sparkles, ArrowRight, Check, ShoppingBag, Truck, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COMBO_OFFERS } from '../data/mockData';

export const CombosPage: React.FC = () => {
  const { addToCart, navigate, addToast } = useShop();

  const handleAddBundle = (combo: typeof COMBO_OFFERS[0]) => {
    combo.products.forEach((p) => {
      addToCart(p);
    });
    addToast(`Added "${combo.title}" bundle to your cart! 🐾`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-14 text-white space-y-4 text-center sm:text-left relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            ✨ Value Bundle Packs
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight">
            DoggyBhai Combo Bundles
          </h1>
          <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
            Curated accessories packed together with up to 30% savings. Perfectly matched sets for walking, feeding, and new puppy parents.
          </p>
        </div>
      </div>

      {/* Combos Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMBO_OFFERS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative aspect-16/10 bg-zinc-100 overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-orange-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {combo.badgeText}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest">
                    {combo.tagline}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-zinc-950">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{combo.description}</p>

                  {/* Included Items Checklist */}
                  <div className="pt-2 space-y-1.5">
                    <p className="text-[11px] font-extrabold text-zinc-900 uppercase">
                      Included In This Bundle:
                    </p>
                    {combo.products.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 pt-0 border-t border-zinc-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-heading font-extrabold text-2xl text-zinc-950">
                    ₹{combo.bundlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-400 line-through ml-2">
                    ₹{combo.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => handleAddBundle(combo)}
                  className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD BUNDLE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
