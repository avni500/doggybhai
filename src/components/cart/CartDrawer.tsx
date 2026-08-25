import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  ShieldCheck,
  Dog
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateCartQuantity,
    removeFromCart,
    moveToWishlist,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    shippingFee,
    cartTotal,
    amountForFreeShipping,
    navigate
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    setIsApplyingCoupon(true);

    const res = await applyCouponCode(couponInput);
    setIsApplyingCoupon(false);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('shop');
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / 499) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-zinc-900">
                  Your Cart ({cart.reduce((t, i) => t + i.quantity, 0)})
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium">DoggyBhai Premium Pet Gear</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-orange-50 border-b border-orange-100 px-5 py-3 text-xs">
              <div className="flex items-center justify-between text-orange-950 font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-orange-600" />
                  {amountForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-extrabold">🎉 You unlocked FREE Pan-India Shipping!</span>
                  ) : (
                    <span>
                      Add <strong className="text-orange-600">₹{amountForFreeShipping}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-orange-800">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-orange-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-orange-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center text-orange-500">
                  <Dog className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-lg text-zinc-900">
                    Your cart is waiting for some tail-wagging goodies.
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1.5 max-w-xs leading-relaxed">
                    Explore our handcrafted collars, heavy-duty leashes, and stainless steel feeding bowls.
                  </p>
                </div>
                <button
                  id="empty-cart-shop-btn"
                  onClick={handleContinueShopping}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer uppercase tracking-wider"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-zinc-50/80 rounded-xl border border-zinc-200/80 flex gap-3.5 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-white border border-zinc-200 overflow-hidden shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-extrabold text-zinc-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] bg-white border border-zinc-200 px-2 py-0.5 rounded text-zinc-600 font-bold">
                            Size: {item.selectedSize}
                          </span>
                          <span className="text-[11px] bg-white border border-zinc-200 px-2 py-0.5 rounded text-zinc-600 font-medium flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full inline-block border border-zinc-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-200/60">
                        <div className="flex items-center border border-zinc-300 rounded-lg bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-l transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-zinc-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-r transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-zinc-900">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.product.mrp > item.unitPrice && (
                            <span className="block text-[10px] text-zinc-400 line-through">
                              ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions (Wishlist & Remove) */}
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-500">
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="hover:text-orange-600 flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <Heart className="w-3 h-3" /> Move to Wishlist
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hover:text-red-600 flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
              {/* Coupon Code Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="font-bold">{appliedCoupon.code} Applied</p>
                        <p className="text-[10px] text-emerald-700">You save ₹{cartDiscount}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-red-600 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Coupon (e.g. DOGGY10)"
                          className="w-full bg-zinc-50 border border-zinc-300 focus:border-orange-500 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold uppercase text-zinc-900 placeholder:normal-case placeholder:font-normal focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isApplyingCoupon || !couponInput.trim()}
                        className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isApplyingCoupon ? '...' : 'APPLY'}
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-600 pl-1">{couponError}</p>}
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 border-t border-zinc-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-heading font-extrabold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="text-base text-orange-600">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-400 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Secure Checkout
                </span>
                <span>•</span>
                <span>30-Day Free Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
