import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Dog,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/mockData';

export const ShopPage: React.FC = () => {
  const { products, routeParams, navigate } = useShop();

  // Filters State
  const initialCategory = routeParams?.category || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(routeParams?.sort || 'featured');

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Available Filter Options
  const sizeOptions = ['S', 'M', 'L', 'XL', 'One Size'];
  const colorOptions = [
    { name: 'Orange', hex: '#FF6B00' },
    { name: 'Black', hex: '#18181B' },
    { name: 'Leather / Brown', hex: '#8B4513' },
    { name: 'Green', hex: '#15803D' },
    { name: 'Blue', hex: '#0EA5E9' },
    { name: 'Silver / Grey', hex: '#94A3B8' }
  ];
  const materialOptions = [
    { label: 'All Materials', value: 'all' },
    { label: 'Padded Nylon', value: 'Nylon' },
    { label: 'Full-Grain Leather', value: 'Leather' },
    { label: 'Food-Grade Stainless Steel', value: 'Stainless Steel' },
    { label: 'Heavy Ceramic', value: 'Ceramic' },
    { label: 'Waterproof Biothane', value: 'Biothane' },
    { label: 'Climbing Rope', value: 'Rope' }
  ];

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(1500);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterial('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    priceRange < 1500 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedMaterial !== 'all' ||
    minRating > 0 ||
    inStockOnly;

  // Filtered & Sorted Products calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (p.price > priceRange) return false;
        if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.availableSizes.includes(s as any)))
          return false;
        if (
          selectedColors.length > 0 &&
          !selectedColors.some((c) =>
            p.availableColors.some((ac) => ac.name.toLowerCase().includes(c.toLowerCase()))
          )
        )
          return false;
        if (selectedMaterial !== 'all' && !p.material.toLowerCase().includes(selectedMaterial.toLowerCase()))
          return false;
        if (minRating > 0 && p.rating < minRating) return false;
        if (inStockOnly && p.stock <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // 'featured'
      });
  }, [
    products,
    selectedCategory,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedMaterial,
    minRating,
    inStockOnly,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-100/80 via-amber-50 to-orange-50 border border-orange-200/70 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold text-orange-700 uppercase tracking-widest">
            DOGGYBHAI CATALOGUE
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-zinc-950 mt-1">
            {selectedCategory === 'collars'
              ? 'Premium Dog Collars'
              : selectedCategory === 'leashes'
              ? 'Durable Dog Leashes'
              : selectedCategory === 'bowls'
              ? 'Hygienic Dog Bowls'
              : 'All Pet Accessories & Gear'}
          </h1>
          <p className="text-sm text-zinc-600 mt-1.5 max-w-xl">
            Explore handcrafted gear engineered with high-tensile nylon, solid brass hardware, and food-grade stainless steel.
          </p>
        </div>

        {/* Category fast filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'collars', 'leashes', 'bowls'].map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === catKey
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-orange-50 border border-zinc-200'
              }`}
            >
              {catKey === 'all' ? 'All Products' : catKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout (Sidebar Filters + Products) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-zinc-200 shadow-2xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <h3 className="font-heading font-extrabold text-sm text-zinc-900 flex items-center gap-2 uppercase tracking-wide">
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider block">
              Category
            </label>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Products', value: 'all' },
                { label: 'Dog Collars', value: 'collars' },
                { label: 'Dog Leashes', value: 'leashes' },
                { label: 'Dog Bowls', value: 'bowls' }
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === c.value
                      ? 'bg-orange-50 text-orange-700 font-bold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>{c.label}</span>
                  {selectedCategory === c.value && <Check className="w-3.5 h-3.5 text-orange-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <div className="flex justify-between text-xs font-extrabold text-zinc-900">
              <span className="uppercase tracking-wider">Max Price</span>
              <span className="text-orange-600 font-extrabold">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="300"
              max="1500"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>₹300</span>
              <span>₹1,500</span>
            </div>
          </div>

          {/* 3. Sizes Filter */}
          <div className="space-y-2.5 pt-4 border-t border-zinc-100">
            <label className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider block">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizeOptions.map((s) => {
                const isSelected = selectedSizes.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => handleToggleSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Color Swatches */}
          <div className="space-y-2.5 pt-4 border-t border-zinc-100">
            <label className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider block">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => handleToggleColor(c.name)}
                    className={`w-6 h-6 rounded-full border border-zinc-300 transition-transform flex items-center justify-center cursor-pointer ${
                      isSelected ? 'ring-2 ring-orange-500 ring-offset-2 scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Material Filter */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <label className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider block">
              Material
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500"
            >
              {materialOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Stock Availability */}
          <div className="pt-4 border-t border-zinc-100">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* ================= PRODUCTS CONTENT (Right Side) ================= */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Mobile Filter Button, Count & Sort Dropdown */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Filter className="w-4 h-4 text-orange-600" />
                <span>Filter Products</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                )}
              </button>

              <span className="text-xs font-bold text-zinc-500">
                Showing <strong className="text-zinc-900">{filteredProducts.length}</strong> Products
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-zinc-400 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="best-selling">Best Selling</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-400 font-medium">Active:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedCategory('all')}
                  />
                </span>
              )}
              {priceRange < 1500 && (
                <span className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1">
                  Under ₹{priceRange}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setPriceRange(1500)}
                  />
                </span>
              )}
              {selectedSizes.map((s) => (
                <span
                  key={s}
                  className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1"
                >
                  Size: {s}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleToggleSize(s)} />
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-zinc-500 hover:text-orange-600 underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center space-y-4 shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto text-orange-600">
                <Dog className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-zinc-900">
                No matching dog accessories found.
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try widening your price range or clearing some filters to see all available collars, leashes, and bowls.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <h3 className="font-heading font-extrabold text-base text-zinc-900 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-orange-600" />
                    Filter Products
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-zinc-900 uppercase">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['all', 'collars', 'leashes', 'bowls'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`p-2 rounded-xl text-xs font-bold capitalize border ${
                          selectedCategory === c
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-zinc-50 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <div className="flex justify-between text-xs font-extrabold text-zinc-900">
                    <span>Max Price</span>
                    <span className="text-orange-600">₹{priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                </div>

                {/* Sizes */}
                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <label className="text-xs font-extrabold text-zinc-900 uppercase">Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleToggleSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                          selectedSizes.includes(s)
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200 flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 bg-zinc-100 text-zinc-800 font-bold text-xs rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-2 py-3 bg-orange-600 text-white font-extrabold text-xs rounded-xl"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
