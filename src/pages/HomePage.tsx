import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Truck,
  Heart,
  Star,
  Dog,
  ShoppingBag,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Award,
  Video,
  Eye,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES, COMBO_OFFERS, DEMO_REVIEWS, INSTAGRAM_POSTS, GUIDE_ARTICLES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { products, navigate, addToCart, user } = useShop();

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  // Personalized recommendations if user has dog profile
  const recommendedForDog = user?.dogProfile
    ? products
        .filter(
          (p) =>
            p.recommendedBreeds?.some((b) =>
              b.toLowerCase().includes(user.dogProfile?.breed.toLowerCase() || '')
            ) || p.availableSizes.includes(user.dogProfile?.sizeCategory === 'Large' ? 'L' : 'M')
        )
        .slice(0, 4)
    : products.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ================= SECTION 1 & 2 & 3: HERO BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-transparent pt-6 sm:pt-10 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left z-10">
              <div className="inline-flex items-center gap-2 bg-orange-100/90 border border-orange-200/80 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-orange-800 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Handcrafted for Indian Pet Parents</span>
              </div>

              {/* Exact Hero Headline from Prompt */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.1]">
                Everything Your <br />
                <span className="text-orange-600">Dog Loves.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-lg">
                Premium accessories and everyday essentials made for happier dogs. Handcrafted padded collars, ultra-durable leashes, and hygienic feeding bowls designed for lifelong adventures.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-shop-now-btn"
                  onClick={() => navigate('shop')}
                  className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-xl active:scale-98 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-explore-collection-btn"
                  onClick={() => navigate('categories')}
                  className="px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-2xs hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Micro Trust Stats */}
              <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="font-heading font-extrabold text-xl text-zinc-950">10,000+</div>
                  <div className="text-xs text-zinc-500 font-medium">Happy Indian Dogs</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl text-zinc-950">4.9 ★</div>
                  <div className="text-xs text-zinc-500 font-medium">Verified Reviews</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl text-zinc-950">100%</div>
                  <div className="text-xs text-zinc-500 font-medium">Dog-Safe Craft</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo: Joyful Dog with Premium Accessories */}
                <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85"
                    alt="Happy dogs running with DoggyBhai accessories"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating Product Tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=200&q=80"
                        alt="DoggyBhai Classic Collar"
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-200"
                      />
                      <div>
                        <div className="text-[10px] font-extrabold text-orange-600 uppercase">Featured</div>
                        <h4 className="text-xs font-bold text-zinc-900">DoggyBhai Classic Padded Collar</h4>
                        <p className="text-xs font-extrabold text-zinc-950">₹499 <span className="text-[10px] text-zinc-400 line-through">₹699</span></p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('product-detail', { slug: 'doggybhai-classic-collar' })}
                      className="p-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative floating badge */}
                <div className="absolute -top-4 -right-4 bg-zinc-900 text-white p-3.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-extrabold text-xs">
                    ★
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase">Pet Parent Choice</div>
                    <div className="text-xs font-extrabold text-white">100% Rust-Proof</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: SHOP BY CATEGORY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              COLLECTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-zinc-900 mt-1">
              Shop for Your Best Friend
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Handcrafted walking, feeding, and safety gear made for all dog sizes.
            </p>
          </div>
          <button
            onClick={() => navigate('categories')}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Primary 3 Categories (Collars, Leashes, Bowls) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('shop', { category: cat.slug })}
              className="group relative rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-4/3 sm:aspect-4/3 flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {cat.badge || 'Available'}
                </span>
                <h3 className="font-heading font-extrabold text-2xl tracking-tight text-white uppercase">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">{cat.description}</p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                  <span>Explore {cat.itemCount} Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Categories (Toys, Treats, Clothes, Beds, Grooming, Travel) - Marked "Coming Soon" */}
        <div className="mt-8 pt-8 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Expanding Soon: Future DoggyBhai Categories
            </h4>
            <span className="text-[11px] text-zinc-400">Join pack newsletter for early access</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.slice(3).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate('categories')}
                className="p-3 bg-zinc-50 hover:bg-white rounded-2xl border border-zinc-200/80 transition-all text-center group cursor-pointer"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-orange-100/60 text-orange-600 flex items-center justify-center font-bold text-xs mb-2">
                  <Dog className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h5>
                <span className="inline-block mt-1 bg-zinc-200 text-zinc-700 font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: BEST SELLERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> Most Loved by Indian Dogs
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-900 mt-1">
              DoggyBhai Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigate('shop', { sort: 'best-selling' })}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-zinc-900 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= SMART CARE PROMOTIONAL SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Pet Protection</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                  DoggyBhai Smart Care
                </h2>
                <p className="text-lg text-orange-400 font-medium">
                  Keep an eye on your best friend, even when you're away.
                </p>
                <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
                  Live encrypted pet cameras, automated pet activity monitoring, and instant AI-assisted coat screenings for possible tick spots — seamlessly unified with your DoggyBhai account.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Video className="w-4 h-4 text-orange-500" />
                    <span>Live 1080p Pet Cam</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    2-way audio talk, night vision, and low-latency encrypted stream.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI Visual Tick Check</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Screen your dog's ears, neck, and paws for early spot alerts.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('smart-care')}
                  className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg hover:shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>LAUNCH SMART CARE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('smart-care', { tab: 'live-cam' })}
                  className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all border border-zinc-700 cursor-pointer"
                >
                  <span>VIEW LIVE CAM</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-700 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
                  alt="DoggyBhai Smart Cam Live"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ONLINE FEED
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Living Room Cam • 1080p 30fps</span>
                  <span className="text-orange-400 font-extrabold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: COMBO OFFERS & BUNDLES ================= */}
      <section className="bg-[#18181B] text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="bg-orange-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
              Value Bundles
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Tail-Wagging Combo Offers
            </h2>
            <p className="text-sm text-zinc-400">
              Save up to ₹250 when you purchase matching sets and essential starter bundles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMBO_OFFERS.map((combo) => (
              <div
                key={combo.id}
                className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/60 transition-all group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-zinc-800">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-orange-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg uppercase shadow-md">
                      {combo.badgeText}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                      {combo.tagline}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-white mt-0.5">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="font-heading font-extrabold text-xl text-white">
                      ₹{combo.bundlePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-zinc-500 line-through ml-2">
                      ₹{combo.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      combo.products.forEach((p) => addToCart(p));
                      navigate('cart');
                    }}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-heading font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>SHOP COMBO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: WHY DOGGYBHAI (4 PILLARS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
            THE DOGGYBHAI PROMISE
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-zinc-900">
            Why Pet Parents Choose DoggyBhai
          </h2>
          <p className="text-sm text-zinc-500">
            We build accessories worthy of your best friend’s unconditional love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: QUALITY PRODUCTS */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-zinc-900 uppercase tracking-wide">
              QUALITY PRODUCTS
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Engineered with military-grade high-density nylon, food-grade 304 steel, and tarnish-free solid brass hardware.
            </p>
          </div>

          {/* Card 2: MADE FOR DOGS */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Dog className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-zinc-900 uppercase tracking-wide">
              MADE FOR DOGS
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Breathable neoprene padding, anti-choke slow feeders, and shock-absorbing leashes tailored for canine anatomy.
            </p>
          </div>

          {/* Card 3: EASY SHOPPING */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-zinc-900 uppercase tracking-wide">
              EASY SHOPPING
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Free Pan-India shipping above ₹499, instant UPI checkout, and 30-day hassle-free doorstep size exchanges.
            </p>
          </div>

          {/* Card 4: PET PARENT FIRST */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base text-zinc-900 uppercase tracking-wide">
              PET PARENT FIRST
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Friendly Indian customer support, personalized "My Dog" profiles, and educational training guides.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 8: PERSONALIZED / RECOMMENDED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-700 uppercase tracking-widest">
                <Dog className="w-4 h-4 text-orange-600" />
                {user?.dogProfile?.name
                  ? `Recommended for ${user.dogProfile.name} (${user.dogProfile.breed})`
                  : 'Tailored for Your Dog'}
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-900">
                {user?.dogProfile?.name
                  ? `Perfect picks for ${user.dogProfile.name}`
                  : 'Recommended Canine Essentials'}
              </h2>
            </div>

            <button
              onClick={() => navigate('my-dog')}
              className="px-4 py-2.5 bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              {user?.dogProfile?.name ? 'Edit Dog Profile' : 'Create Dog Profile →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedForDog.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: DOGGYBHAI GUIDE (BLOG) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              CANINE KNOWLEDGE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-900 mt-1">
              The DoggyBhai Guide
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Expert advice on collar sizing, leash manners, safe urban walking, and bowl hygiene.
            </p>
          </div>
          <button
            onClick={() => navigate('guide')}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDE_ARTICLES.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => navigate('article-detail', { slug: article.slug })}
              className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-zinc-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-zinc-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-zinc-400 font-medium">
                    {article.publishDate} • {article.readTime}
                  </div>
                  <h3 className="font-heading font-bold text-base text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center text-xs font-bold text-orange-600 group-hover:text-orange-700">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 10: CUSTOMER REVIEWS ================= */}
      <section className="bg-zinc-50 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              COMMUNITY LOVE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-zinc-900">
              Verified Pet Parent Reviews
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-amber-500 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-extrabold text-zinc-800 ml-2">4.9 / 5.0 Rating across India</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-snug">"{rev.title}"</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-zinc-900">{rev.authorName}</p>
                    <p className="text-[11px] text-orange-600 font-semibold">{rev.dogBreed}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: FOLLOW THE PACK (INSTAGRAM) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
            #DOGGYBHAIPACK
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-zinc-900">
            Follow the DoggyBhai Pack
          </h2>
          <p className="text-sm text-zinc-500">
            Tag @doggybhai.official on Instagram with your furry friend to get featured on our store!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-2xs cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.dogName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white text-left">
                <p className="text-xs font-bold text-white">{post.dogName}</p>
                <p className="text-[10px] text-zinc-300 line-clamp-2">{post.caption}</p>
                <span className="text-[10px] text-orange-400 font-bold mt-1">♥ {post.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
