import React, { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Ruler,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Dog,
  Plus,
  Minus,
  ArrowRight,
  Share2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Product, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParams, navigate, addToCart, toggleWishlist, isInWishlist, addToast } =
    useShop();

  // Find product by slug or id
  const product =
    products.find(
      (p) => p.slug === routeParams?.slug || p.id === routeParams?.id || p.id === routeParams?.slug
    ) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0] || { name: 'Amber Orange', hex: '#FF6B00' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'size' | 'care' | 'shipping'>('desc');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Review submission state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewBreed, setReviewBreed] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedSize(product.availableSizes[0] || 'M');
      setSelectedColor(product.availableColors[0] || { name: 'Amber Orange', hex: '#FF6B00' });
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  // Frequently bought together item (e.g. matching leash for collar or bowl)
  const complementaryProduct =
    products.find((p) => p.id !== product.id && p.category !== product.category) || products[1];

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) {
      addToast('Please fill out all review fields', 'error');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      authorName: reviewAuthor,
      dogBreed: reviewBreed || 'Dog Parent',
      rating: reviewRating,
      title: reviewTitle || 'Terrific Quality!',
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };

    setLocalReviews([newRev, ...localReviews]);
    setShowReviewModal(false);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setReviewBreed('');
    addToast('Thank you! Your verified review is published 🐾', 'success');
  };

  const allReviews = [...localReviews, ...product.customerReviews];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
        <button onClick={() => navigate('home')} className="hover:text-orange-600">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('shop', { category: product.category })}
          className="hover:text-orange-600 capitalize"
        >
          {product.categoryLabel}
        </button>
        <span>/</span>
        <span className="text-zinc-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase (Left Gallery + Right Purchase Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* ================= LEFT: IMAGE GALLERY ================= */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-4/3 w-full bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-200 shadow-2xs group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.name} - View ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discountPercentage > 0 && (
                <span className="bg-orange-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  {product.discountPercentage}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-zinc-950 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  ★ Best Seller
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-400'
                  : 'bg-white/90 text-zinc-700 hover:text-rose-600 hover:bg-white'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Selectors */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-zinc-50 ${
                  activeImageIndex === idx
                    ? 'border-orange-600 ring-2 ring-orange-200'
                    : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Breed Recommendation Pill */}
          {product.recommendedBreeds && product.recommendedBreeds.length > 0 && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-950">
              <Dog className="w-5 h-5 text-orange-600 shrink-0" />
              <div>
                <strong className="font-extrabold">Recommended For:</strong>{' '}
                <span>{product.recommendedBreeds.join(', ')} and similar dog breeds.</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT: PRODUCT DETAILS & PURCHASE ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
                {product.categoryLabel}
              </span>
              <button
                onClick={handleShare}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-950 tracking-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-extrabold text-zinc-900">{product.rating}</span>
              <span className="text-xs text-zinc-400 font-medium">
                ({allReviews.length} Verified Reviews)
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-heading font-extrabold text-3xl text-zinc-950">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-base text-zinc-400 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="bg-orange-100 text-orange-800 text-xs font-extrabold px-2 py-0.5 rounded-md uppercase">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500">Inclusive of all taxes. Free shipping above ₹499.</p>
          </div>

          {/* Short Description */}
          <p className="text-xs text-zinc-600 leading-relaxed">{product.shortDescription}</p>

          {/* Color Selection */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-extrabold text-zinc-900">
              <span className="uppercase tracking-wider">Color: {selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-orange-500 ring-offset-2 scale-110'
                      : 'border-zinc-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <Check className="w-4 h-4 text-white drop-shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection & Sizing Modal Trigger */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-extrabold text-zinc-900">
              <span className="uppercase tracking-wider">Select Size</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-orange-600 hover:text-orange-700 flex items-center gap-1 underline underline-offset-2 cursor-pointer font-bold"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedSize === size
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                      : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper & Stock Warning */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-zinc-300 rounded-xl bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 rounded-l-xl transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-bold text-xs text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 rounded-r-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {isLowStock && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Hurry! Only {product.stock} units left in stock at our warehouse.</span>
              </div>
            )}
          </div>

          {/* Primary CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="py-4 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-4 bg-zinc-950 hover:bg-black text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <span>BUY NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trust Guarantees Strip */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-200 text-center">
            <div className="p-2.5 bg-zinc-50 rounded-xl">
              <Truck className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-zinc-900">Express Delivery</p>
              <p className="text-[10px] text-zinc-400">2-4 Days India</p>
            </div>
            <div className="p-2.5 bg-zinc-50 rounded-xl">
              <RotateCcw className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-zinc-900">30-Day Exchange</p>
              <p className="text-[10px] text-zinc-400">Doorstep Pickup</p>
            </div>
            <div className="p-2.5 bg-zinc-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-zinc-900">100% Dog Safe</p>
              <p className="text-[10px] text-zinc-400">Rust-Proof Metal</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACCORDION TABS: DETAILS, SPECS, FIT & CARE ================= */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-zinc-200 overflow-x-auto text-xs font-bold bg-zinc-50">
          {[
            { id: 'desc', label: 'DESCRIPTION & BENEFITS' },
            { id: 'specs', label: 'SPECIFICATIONS' },
            { id: 'size', label: 'SIZE & FIT GUIDE' },
            { id: 'care', label: 'CARE INSTRUCTIONS' },
            { id: 'shipping', label: 'SHIPPING & RETURNS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 whitespace-nowrap uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 border-b-2 border-orange-600 font-extrabold'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 text-xs text-zinc-700 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-heading font-extrabold text-base text-zinc-950">
                Engineered for Daily Canine Comfort & Safety
              </h3>
              <p>{product.description}</p>
              <div className="space-y-2 pt-2">
                <h4 className="font-extrabold text-zinc-900 uppercase">Key Features & Highlights:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-600">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200">
                <div className="grid grid-cols-2 p-3 bg-zinc-50 font-bold">
                  <span>Material</span>
                  <span className="text-zinc-900 font-semibold">{product.material}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-bold">Hardware</span>
                  <span className="text-zinc-600">Solid Zinc Alloy / SS304 Rust-Free</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-zinc-50">
                  <span className="font-bold">Dimensions</span>
                  <span className="text-zinc-600">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-bold">Product Weight</span>
                  <span className="text-zinc-600">{product.weight}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-zinc-50">
                  <span className="font-bold">SKU Code</span>
                  <span className="text-zinc-600">{product.sku}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-bold">Country of Origin</span>
                  <span className="text-zinc-600">India 🇮🇳</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'size' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-heading font-extrabold text-base text-zinc-950">
                How to Measure Your Dog
              </h3>
              <p>
                Use a flexible soft tape measure around the base of your dog's neck or chest. Leave room for two fingers between the tape and the neck for a comfortable, secure fit.
              </p>
              <div className="border border-zinc-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left divide-y divide-zinc-200">
                  <thead className="bg-zinc-100 font-extrabold text-zinc-900 uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Size</th>
                      <th className="p-3">Neck / Chest Circumference</th>
                      <th className="p-3">Ideal Breeds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-3 font-bold">Small (S)</td>
                      <td className="p-3">10" – 14" (25 – 35 cm)</td>
                      <td className="p-3">Indie Pups, Shih Tzu, Pug, Pomeranian</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Medium (M)</td>
                      <td className="p-3">14" – 20" (35 – 50 cm)</td>
                      <td className="p-3">Indie Adult, Beagle, Cocker Spaniel</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Large (L)</td>
                      <td className="p-3">18" – 26" (45 – 65 cm)</td>
                      <td className="p-3">Labrador, Golden Retriever, German Shepherd</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Extra Large (XL)</td>
                      <td className="p-3">24" – 32" (60 – 80 cm)</td>
                      <td className="p-3">Rottweiler, Great Dane, Saint Bernard</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3 max-w-2xl">
              <h3 className="font-heading font-extrabold text-base text-zinc-950">
                Care & Maintenance
              </h3>
              <p>{product.careInstructions}</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-600 pl-2">
                <li>Rinse with lukewarm water and mild pet shampoo after muddy park walks.</li>
                <li>Air dry in shade away from direct harsh sunlight.</li>
                <li>Bowls are top-rack dishwasher safe; handwash silicone bases.</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 max-w-2xl">
              <h3 className="font-heading font-extrabold text-base text-zinc-950">
                Pan-India Shipping & 30-Day Returns
              </h3>
              <p>
                We dispatch all orders within 24 hours from our Bangalore & Mumbai fulfillment centers. Standard delivery takes 2–4 business days depending on your PIN code.
              </p>
              <p>
                Need a different size? We offer free doorstep size exchanges. Reach out to our customer care within 30 days of receiving your package.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= FREQUENTLY BOUGHT TOGETHER ================= */}
      {complementaryProduct && (
        <div className="bg-orange-50/60 border border-orange-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <h3 className="font-heading font-extrabold text-lg text-zinc-950">
              Frequently Bought Together
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-zinc-200">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">{product.name}</h4>
                  <p className="text-xs font-extrabold text-orange-600">₹{product.price}</p>
                </div>
              </div>

              <span className="font-extrabold text-zinc-400 text-lg">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-zinc-200">
                <img
                  src={complementaryProduct.images[0]}
                  alt={complementaryProduct.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">
                    {complementaryProduct.name}
                  </h4>
                  <p className="text-xs font-extrabold text-orange-600">
                    ₹{complementaryProduct.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Combined Price and Add Both Button */}
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[11px] text-zinc-500 block font-medium">Combo Price:</span>
                <span className="font-heading font-extrabold text-xl text-zinc-950">
                  ₹{(product.price + complementaryProduct.price).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, 1);
                  addToCart(complementaryProduct);
                  addToast('Bundle added to your cart!', 'success');
                }}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm cursor-pointer"
              >
                ADD BOTH TO CART
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOMER REVIEWS & WRITE A REVIEW ================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              PET PARENT FEEDBACK
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-zinc-950 mt-1">
              Customer Reviews ({allReviews.length})
            </h2>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-extrabold tracking-wider uppercase transition-colors cursor-pointer self-start sm:self-auto"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-400 font-medium">{rev.date}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-900">{rev.title}</h4>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-zinc-900">{rev.authorName}</span>
                  {rev.dogBreed && (
                    <span className="text-[11px] text-orange-600 ml-1.5 font-semibold">
                      ({rev.dogBreed})
                    </span>
                  )}
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WRITE REVIEW MODAL ================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div
            onClick={() => setShowReviewModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-zinc-200 z-10 space-y-4 animate-in zoom-in-95">
            <h3 className="font-heading font-extrabold text-xl text-zinc-900">
              Review: {product.name}
            </h3>
            <p className="text-xs text-zinc-500">Share your experience to help fellow pet parents.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Iyer"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Dog's Breed & Name</label>
                  <input
                    type="text"
                    value={reviewBreed}
                    onChange={(e) => setReviewBreed(e.target.value)}
                    placeholder="e.g. Max (Golden Retriever) or Bella (Indie)"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Super soft neoprene padding, no chafing!"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the fit, durability, walks, and how your dog likes it..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SIZE GUIDE MODAL ================= */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-zinc-200 z-10 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-xl text-zinc-900 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-orange-600" />
                DoggyBhai Sizing Guide
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-zinc-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-600">
              For collars and leashes, measuring accurately ensures your dog enjoys maximum comfort without pulling or slipping out.
            </p>

            <div className="border border-zinc-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-zinc-200">
                <thead className="bg-zinc-100 font-extrabold text-zinc-900 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Neck / Girth</th>
                    <th className="p-2.5">Collar Width</th>
                    <th className="p-2.5">Typical Breeds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="p-2.5 font-bold">Small (S)</td>
                    <td className="p-2.5">25–35 cm</td>
                    <td className="p-2.5">0.75" (1.9 cm)</td>
                    <td className="p-2.5">Indie Pups, Shih Tzu, Pug</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Medium (M)</td>
                    <td className="p-2.5">35–50 cm</td>
                    <td className="p-2.5">1.0" (2.5 cm)</td>
                    <td className="p-2.5">Adult Indie, Beagle, Cocker</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Large (L)</td>
                    <td className="p-2.5">45–65 cm</td>
                    <td className="p-2.5">1.25" (3.2 cm)</td>
                    <td className="p-2.5">Labrador, Golden, GSD</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">60–80 cm</td>
                    <td className="p-2.5">1.5" (3.8 cm)</td>
                    <td className="p-2.5">Rottweiler, Great Dane</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-orange-50 rounded-xl text-[11px] text-orange-950 font-medium">
              💡 <strong>The 2-Finger Rule:</strong> After fastening the collar, you should comfortably slide two fingers between the collar and your dog's neck.
            </div>
          </div>
        </div>
      )}

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="space-y-6 pt-6 border-t border-zinc-200">
        <h2 className="font-heading font-extrabold text-2xl text-zinc-950">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
