import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0] || { name: 'Amber Orange', hex: '#FF6B00' }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isSaved = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  const handleCardClick = () => {
    navigate('product-detail', { slug: product.slug, id: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden">
        {/* Main & Hover Image */}
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-orange-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm cursor-pointer ${
            isSaved
              ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-300'
              : 'bg-white/90 text-zinc-700 hover:text-rose-500 hover:bg-white'
          }`}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Low Stock Pill */}
        {isLowStock && !isOutOfStock && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-zinc-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md tracking-tight shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping"></span>
            Only {product.stock} left in stock!
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Category Label */}
          <div className="text-[11px] font-bold text-orange-600 uppercase tracking-widest mb-1">
            {product.categoryLabel}
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-base text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
            <span className="text-[11px] text-zinc-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Color / Variant Swatches Preview */}
        {product.availableColors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-zinc-400 font-medium mr-0.5">Colors:</span>
            {product.availableColors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-3.5 h-3.5 rounded-full border border-zinc-300 transition-transform ${
                  selectedColor.name === c.name ? 'ring-2 ring-orange-500 scale-110' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.availableColors.length > 4 && (
              <span className="text-[10px] text-zinc-400">+{product.availableColors.length - 4}</span>
            )}
          </div>
        )}

        {/* Pricing & CTA Row */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-lg text-zinc-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-zinc-400 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Add To Cart CTA */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isOutOfStock
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-md'
            }`}
            title="Add to cart"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
