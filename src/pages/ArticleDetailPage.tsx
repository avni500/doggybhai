import React from 'react';
import { Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles, Dog } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GUIDE_ARTICLES } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';

export const ArticleDetailPage: React.FC = () => {
  const { routeParams, navigate, products, addToast } = useShop();

  const article =
    GUIDE_ARTICLES.find((a) => a.slug === routeParams?.slug) || GUIDE_ARTICLES[0];

  const relatedProducts = products.slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Article link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Back to Guides */}
      <button
        onClick={() => navigate('guide')}
        className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-600 hover:text-orange-600 uppercase tracking-wider transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to DoggyBhai Guide
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-orange-100 text-orange-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-zinc-400 font-medium">{article.publishDate}</span>
          <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between pt-2 border-y border-zinc-200 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">{article.author}</p>
              <p className="text-[10px] text-zinc-500">DoggyBhai Pet Wellness Team</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-2 text-zinc-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
            title="Share article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-16/9 rounded-3xl overflow-hidden bg-zinc-100 shadow-md">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Article Body Content */}
      <article className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-sm sm:text-base space-y-6">
        <p className="font-medium text-lg text-zinc-900 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="space-y-4">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-zinc-950 mt-6">
            1. Why Proper Gear Choice Matters
          </h2>
          <p>
            Dogs communicate with the world through physical sensations and body cues. When a collar pinches, chafes, or constricts the trachea, it causes unnecessary stress and defensive reactions during outdoor walks. Similarly, an unweighted or porous plastic food bowl can harbor harmful micro-bacteria and cause chin acne in short-haired breeds.
          </p>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-zinc-950 mt-6">
            2. The Science Behind DoggyBhai Materials
          </h2>
          <p>
            At DoggyBhai, we focus exclusively on high-tensile nylon webbing padded with breathable neoprene, rust-proof SS304 stainless steel, and vegetable-tanned full-grain leather. These materials are non-toxic, lead-free, and resistant to Indian monsoon humidity and high tropical temperatures.
          </p>

          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-2">
            <h4 className="font-extrabold uppercase tracking-wide flex items-center gap-1.5 text-orange-800">
              <Sparkles className="w-4 h-4" /> Pro Tip for Pet Parents:
            </h4>
            <p>
              Always test the collar fit after your dog runs and cools down. For growing puppies, check neck tightness weekly and loosen as your puppy grows.
            </p>
          </div>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-zinc-950 mt-6">
            3. Summary & Best Practices
          </h2>
          <p>
            Equipping your dog with thoughtfully designed, durable gear ensures every morning walk and feeding time is an enjoyable, bonding experience. Explore our recommended products below to see matching accessories for your pup.
          </p>
        </div>
      </article>

      {/* Recommended Gear for this topic */}
      <div className="pt-10 border-t border-zinc-200 space-y-6">
        <h3 className="font-heading font-extrabold text-2xl text-zinc-950">
          Recommended DoggyBhai Gear
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
