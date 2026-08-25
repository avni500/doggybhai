import React from 'react';
import { Tag, Copy, Check, Sparkles, Percent, Gift, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COUPONS } from '../data/mockData';

export const OffersPage: React.FC = () => {
  const { navigate, addToast, applyCouponCode } = useShop();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    addToast(`Coupon code ${code} copied & applied to your cart! 🎉`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          SPECIAL SAVINGS
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-950">
          Offers & Discount Coupons
        </h1>
        <p className="text-sm text-zinc-600">
          Save on premium collars, leashes, and bowls. Copy your coupon and apply it during checkout.
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COUPONS.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-3xl border-2 border-dashed border-orange-300 p-6 space-y-4 shadow-2xs hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {coupon.discountType === 'percentage'
                  ? `${coupon.discountValue}% OFF`
                  : `₹${coupon.discountValue} OFF`}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium">
                Min Order: ₹{coupon.minOrderAmount}
              </span>
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-xl text-zinc-950">
                {coupon.code}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{coupon.description}</p>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED & APPLIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-zinc-400 font-medium">
                Expires {coupon.expiryDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Free Shipping & Bank Offers Strip */}
      <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-base text-white">Free Pan-India Shipping</h3>
          <p className="text-xs text-zinc-400">
            Automatically unlocked on all orders of ₹499 or more. No coupon required!
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-base text-white">Free DoggyBhai Collar Tag</h3>
          <p className="text-xs text-zinc-400">
            Receive a complimentary brass ID tag with every collar + leash combo purchase.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Percent className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-base text-white">Instant UPI Cashback</h3>
          <p className="text-xs text-zinc-400">
            Get an instant ₹50 cashback when paying via Google Pay, PhonePe, or Paytm UPI.
          </p>
        </div>
      </div>
    </div>
  );
};
