import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, Dog } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GUIDE_ARTICLES } from '../data/mockData';

export const GuidePage: React.FC = () => {
  const { navigate } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sizing', 'Training', 'Hygiene', 'Safety', 'Puppy Care'];

  const filteredArticles =
    selectedCategory === 'All'
      ? GUIDE_ARTICLES
      : GUIDE_ARTICLES.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          CANINE KNOWLEDGE & ADVICE
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          The DoggyBhai Guide
        </h1>
        <p className="text-sm text-zinc-600">
          Practical advice from professional dog trainers, veterinarians, and experienced Indian pet parents.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-orange-50 border border-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate('article-detail', { slug: article.slug })}
            className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 bg-zinc-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-zinc-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-zinc-950 group-hover:text-orange-600 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
