import React, { useState } from 'react';
import {
  Search,
  Heart,
  User as UserIcon,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Dog,
  Sparkles,
  Tag,
  BookOpen
} from 'lucide-react';
import { useShop, NavigationRoute } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigate,
    cartCount,
    wishlist,
    openCart,
    openSearch,
    user,
    openAuthModal,
    settings
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks: { label: string; route: NavigationRoute; params?: any; isNew?: boolean }[] = [
    { label: 'HOME', route: 'home' },
    { label: 'SHOP', route: 'shop' },
    { label: 'CATEGORIES', route: 'categories' },
    { label: 'SMART CARE', route: 'smart-care', isNew: true },
    { label: 'OFFERS', route: 'offers' },
    { label: 'DOGGYBHAI GUIDE', route: 'guide' },
    { label: 'ABOUT US', route: 'about' }
  ];

  const handleNavClick = (route: NavigationRoute, params?: any) => {
    navigate(route, params);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      {/* 1. Promotional Announcement Bar */}
      <div id="announcement-bar" className="bg-[#18181B] text-zinc-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span className="inline-flex items-center gap-1.5 text-orange-400 font-semibold uppercase tracking-wider text-[11px] bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
          <Tag className="w-3 h-3" /> Special
        </span>
        <span className="truncate max-w-[80vw] sm:max-w-none">
          {settings.announcementText}
        </span>
        <button
          onClick={() => navigate('offers')}
          className="hidden sm:inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-bold ml-2 underline underline-offset-2 transition-colors cursor-pointer"
        >
          View Offers <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2. Main Desktop / Tablet Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* BRAND LOGO: EXACT RULE: The word "doggybhai" must remain BLACK. */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tighter text-black font-heading select-none uppercase">
                  doggybhai
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-600 uppercase select-none -mt-1">
                  PREMIUM PET ACCESSORIES
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.route, link.params)}
                  className={`px-3 py-2 text-xs font-bold tracking-wider transition-all rounded-md cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'text-orange-600 bg-orange-50 font-extrabold'
                      : 'text-zinc-700 hover:text-orange-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-orange-500 text-white tracking-wider uppercase shadow-xs">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={openSearch}
              className="p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/60 rounded-full transition-colors relative cursor-pointer group"
              title="Search accessories"
              aria-label="Search"
            >
              <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
            </button>

            {/* "My Dog" Quick Access Pill (Desktop) */}
            <button
              id="header-mydog-btn"
              onClick={() => handleNavClick('my-dog')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-full text-xs font-bold transition-colors cursor-pointer"
              title="My Dog Profile & Recommendations"
            >
              <Dog className="w-3.5 h-3.5 text-orange-600" />
              <span>{user?.dogProfile?.name ? user.dogProfile.name : 'My Dog'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            </button>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => handleNavClick('account', { tab: 'wishlist' })}
              className="p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/60 rounded-full transition-colors relative cursor-pointer group"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Profile Button */}
            <div className="relative">
              <button
                id="header-account-btn"
                onClick={() => {
                  if (user) {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  } else {
                    openAuthModal();
                  }
                }}
                className="p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/60 rounded-full transition-colors relative cursor-pointer group flex items-center gap-1.5"
                title={user ? `Logged in as ${user.name}` : 'Sign In / Account'}
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {user && (
                  <span className="hidden xl:inline-block text-xs font-bold text-zinc-800 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && user && (
                <div
                  id="user-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-200 py-2 z-50 text-xs"
                >
                  <div className="px-4 py-2.5 border-b border-zinc-100">
                    <p className="font-bold text-zinc-900 text-sm truncate">{user.name}</p>
                    <p className="text-zinc-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => handleNavClick('account', { tab: 'profile' })}
                    className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 font-medium text-zinc-700 flex items-center justify-between"
                  >
                    <span>My Profile</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  <button
                    onClick={() => handleNavClick('account', { tab: 'orders' })}
                    className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 font-medium text-zinc-700 flex items-center justify-between"
                  >
                    <span>My Orders</span>
                    <span className="bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded text-[10px]">Active</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('my-dog')}
                    className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 font-medium text-zinc-700 flex items-center justify-between"
                  >
                    <span>My Dog Profile</span>
                    <Dog className="w-3.5 h-3.5 text-orange-600" />
                  </button>

                  <button
                    onClick={() => handleNavClick('account', { tab: 'addresses' })}
                    className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 font-medium text-zinc-700 flex items-center justify-between"
                  >
                    <span>Saved Addresses</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  {user.isAdmin && (
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 font-bold text-orange-700 flex items-center justify-between border-t border-zinc-100"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Admin Dashboard
                      </span>
                      <span className="bg-orange-600 text-white font-bold px-1.5 py-0.5 rounded text-[9px]">Staff</span>
                    </button>
                  )}

                  <div className="border-t border-zinc-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        handleNavClick('account');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-500 font-medium"
                    >
                      Account Overview
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2.5 rounded-full font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer ml-1"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-extrabold">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Responsive Navigation Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              onClick={() => handleNavClick('my-dog')}
              className="flex items-center justify-center gap-2 p-2.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold"
            >
              <Dog className="w-4 h-4 text-orange-600" />
              <span>{user?.dogProfile?.name || 'My Dog Profile'}</span>
            </button>

            <button
              onClick={() => handleNavClick('combos')}
              className="flex items-center justify-center gap-2 p-2.5 bg-orange-50 text-orange-900 border border-orange-200 rounded-xl text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Combo Bundles</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.route, link.params)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex items-center justify-between ${
                  currentRoute === link.route
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            ))}
          </div>

          {/* Category Fast Shortcuts */}
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">Shop Categories</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleNavClick('shop', { category: 'collars' })}
                className="p-2 text-center bg-zinc-50 hover:bg-orange-50 rounded-lg text-xs font-semibold text-zinc-800 border border-zinc-100"
              >
                Collars
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'leashes' })}
                className="p-2 text-center bg-zinc-50 hover:bg-orange-50 rounded-lg text-xs font-semibold text-zinc-800 border border-zinc-100"
              >
                Leashes
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'bowls' })}
                className="p-2 text-center bg-zinc-50 hover:bg-orange-50 rounded-lg text-xs font-semibold text-zinc-800 border border-zinc-100"
              >
                Bowls
              </button>
            </div>
          </div>

          {/* Account Shortcut */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            {user ? (
              <button
                onClick={() => handleNavClick('account')}
                className="text-xs font-bold text-zinc-800 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <span>Hi, {user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 bg-zinc-900 text-white rounded-lg text-xs font-bold text-center"
              >
                Sign In / Create Account
              </button>
            )}

            {user?.isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
