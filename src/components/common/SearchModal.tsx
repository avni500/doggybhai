import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Sparkles, Tag, Dog, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, products, navigate } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Reflective Collar',
    'Steel Bowl',
    'Everyday Leash'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const q = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.material.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    // Add to recents
    if (!recentSearches.includes(product.name)) {
      setRecentSearches((prev) => [product.name, ...prev.slice(0, 4)]);
    }
    closeSearch();
    navigate('product-detail', { slug: product.slug, id: product.id });
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  const handleCategoryClick = (categorySlug: string) => {
    closeSearch();
    navigate('shop', { category: categorySlug });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-200 flex items-center gap-3 bg-zinc-50">
          <Search className="w-5 h-5 text-orange-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dog collars, leashes, feeding bowls, puppy gear..."
            className="w-full text-sm sm:text-base font-semibold text-zinc-900 bg-transparent placeholder-zinc-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs font-bold text-zinc-500 hover:text-black px-2 py-1 bg-white border border-zinc-300 rounded-lg cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[65vh] overflow-y-auto p-5">
          {searchTerm.trim() ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                  <span>PRODUCTS ({filteredProducts.length})</span>
                  <span>Press item to view details</span>
                </div>

                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="p-3 rounded-xl border border-zinc-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-100 border border-zinc-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                            {p.categoryLabel}
                          </p>
                          <h4 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="flex items-center text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                              {p.rating}
                            </span>
                            <span>•</span>
                            <span>{p.availableSizes.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-heading font-extrabold text-sm text-zinc-900">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        {p.mrp > p.price && (
                          <span className="block text-[11px] text-zinc-400 line-through">
                            ₹{p.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* No Search Results State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <Dog className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-zinc-900">
                    We couldn't find what you're looking for.
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    Try searching for general terms like "collar", "leash", "steel bowl", or explore our core categories below:
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => handleCategoryClick('collars')}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-orange-100 hover:text-orange-900 text-zinc-800 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Dog Collars
                  </button>
                  <button
                    onClick={() => handleCategoryClick('leashes')}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-orange-100 hover:text-orange-900 text-zinc-800 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Dog Leashes
                  </button>
                  <button
                    onClick={() => handleCategoryClick('bowls')}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-orange-100 hover:text-orange-900 text-zinc-800 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Dog Bowls
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Default Search State: Recent & Popular Searches */
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-zinc-900 uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Reflective Collar',
                    'Leather Collar',
                    'Everyday Leash',
                    'Climbing Rope Leash',
                    'Anti-Slip Steel Bowl',
                    'Puppy Collar',
                    'Slow Water Bowl',
                    'Walk Essentials'
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1.5 bg-zinc-100 hover:bg-orange-50 hover:text-orange-700 text-zinc-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-zinc-900 uppercase tracking-wider mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleTagClick(term)}
                        className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-orange-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Categories Grid */}
              <div className="pt-2 border-t border-zinc-100">
                <p className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider mb-3">
                  Shop by Category
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => handleCategoryClick('collars')}
                    className="p-3 bg-zinc-50 hover:bg-orange-50 rounded-xl border border-zinc-200 text-center cursor-pointer transition-all group"
                  >
                    <p className="text-xs font-extrabold text-zinc-900 group-hover:text-orange-600">
                      Dog Collars
                    </p>
                    <span className="text-[10px] text-zinc-400">Padded & Leather</span>
                  </div>

                  <div
                    onClick={() => handleCategoryClick('leashes')}
                    className="p-3 bg-zinc-50 hover:bg-orange-50 rounded-xl border border-zinc-200 text-center cursor-pointer transition-all group"
                  >
                    <p className="text-xs font-extrabold text-zinc-900 group-hover:text-orange-600">
                      Dog Leashes
                    </p>
                    <span className="text-[10px] text-zinc-400">Traffic & Rope</span>
                  </div>

                  <div
                    onClick={() => handleCategoryClick('bowls')}
                    className="p-3 bg-zinc-50 hover:bg-orange-50 rounded-xl border border-zinc-200 text-center cursor-pointer transition-all group"
                  >
                    <p className="text-xs font-extrabold text-zinc-900 group-hover:text-orange-600">
                      Dog Bowls
                    </p>
                    <span className="text-[10px] text-zinc-400">SS304 & Ceramic</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
