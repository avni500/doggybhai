import React from 'react';
import { ArrowRight, Sparkles, Dog, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/mockData';

export const CategoriesPage: React.FC = () => {
  const { navigate } = useShop();

  const activeCategories = CATEGORIES.filter((c) => !c.isUpcoming);
  const upcomingCategories = CATEGORIES.filter((c) => c.isUpcoming);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          EXPLORE COLLECTIONS
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          Shop by Dog Category
        </h1>
        <p className="text-sm text-zinc-600">
          Every DoggyBhai accessory is engineered with canine comfort, tensile durability, and modern aesthetics.
        </p>
      </div>

      {/* Core Active Categories */}
      <div className="space-y-6">
        <h2 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
          Available Collections ({activeCategories.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('shop', { category: cat.slug })}
              className="group relative rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-4/3 flex flex-col justify-end p-8"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 text-white space-y-2">
                <span className="bg-orange-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {cat.badge || 'Available'}
                </span>
                <h3 className="font-heading font-extrabold text-3xl text-white uppercase tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{cat.description}</p>
                <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-orange-400 group-hover:text-orange-300">
                  <span>Explore All {cat.itemCount} Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Categories */}
      <div className="pt-10 border-t border-zinc-200 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-2xl text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Expanding the DoggyBhai Universe
            </h2>
            <p className="text-xs text-zinc-500">
              We are crafting new categories tailored to Indian dog breeds and weather conditions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200/80 flex items-start justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-100/60 text-orange-600 flex items-center justify-center font-bold">
                  <Dog className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-base text-zinc-900">{cat.name}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{cat.description}</p>
                <span className="inline-block bg-zinc-200 text-zinc-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Dropping Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
