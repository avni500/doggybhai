import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  CheckCircle,
  Tag,
  ArrowRight,
  Lock,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Dog
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    shippingFee,
    cartTotal,
    user,
    placeOrder,
    navigate,
    addToast
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');

  // Shipping Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('petlover@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
          <Dog className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-zinc-900">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-zinc-500">
          Add some handcrafted collars, leashes, or feeding bowls before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      addToast('Please fill out all contact fields', 'error');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1 || !city || !pincode || pincode.length < 6) {
      addToast('Please enter a valid address and 6-digit PIN code', 'error');
      return;
    }
    setStep(3);
  };

  const handleFinalOrderSubmit = async () => {
    setIsPlacingOrder(true);

    const shippingAddress: ShippingAddress = {
      fullName: customerName,
      phone: customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      isDefault: true
    };

    const newOrder = await placeOrder(
      shippingAddress,
      paymentMethod,
      customerEmail,
      customerPhone
    );

    setIsPlacingOrder(false);
    navigate('order-confirmation', { orderId: newOrder.id });
  };

  const indianStates = [
    'Maharashtra',
    'Karnataka',
    'Delhi NCR',
    'Tamil Nadu',
    'Telangana',
    'Gujarat',
    'West Bengal',
    'Kerala',
    'Uttar Pradesh',
    'Rajasthan',
    'Punjab',
    'Haryana',
    'Other State'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Steps Progress Indicator */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-zinc-200 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-orange-600 transition-all duration-300 -z-0"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {/* Step 1 */}
          <button
            onClick={() => setStep(1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs z-10 transition-all ${
              step >= 1
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
            }`}
          >
            1
          </button>

          {/* Step 2 */}
          <button
            onClick={() => customerName && customerPhone && setStep(2)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs z-10 transition-all ${
              step >= 2
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
            }`}
          >
            2
          </button>

          {/* Step 3 */}
          <button
            onClick={() => addressLine1 && pincode && setStep(3)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs z-10 transition-all ${
              step === 3
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
            }`}
          >
            3
          </button>
        </div>

        <div className="flex justify-between text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 mt-2 px-1">
          <span className={step >= 1 ? 'text-orange-600' : ''}>1. Contact</span>
          <span className={step >= 2 ? 'text-orange-600' : ''}>2. Address</span>
          <span className={step >= 3 ? 'text-orange-600' : ''}>3. Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT: STEPS FORMS ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: CONTACT INFORMATION */}
          {step === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-zinc-950">
                    1. Contact Information
                  </h2>
                  <p className="text-xs text-zinc-500">
                    We'll send your invoice and order updates here.
                  </p>
                </div>
                <User className="w-5 h-5 text-orange-600" />
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aditi Rao"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="aditi@example.com"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">
                      10-Digit Mobile Number (For Delivery SMS) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs font-bold text-zinc-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-11 pr-3 py-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>CONTINUE TO DELIVERY ADDRESS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          {step === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-zinc-950">
                    2. Shipping Address
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Doorstep courier delivery across 26,000+ Indian PIN codes.
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>

              <form onSubmit={handleStep2Submit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Flat / House No., Apartment, Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. Flat 402, Sunshine Heights"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Street, Area, Landmark
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="e.g. 14th Main, Indiranagar, Near BDA Complex"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                    >
                      {indianStates.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="560038"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PAYMENT OPTIONS */}
          {step === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-zinc-950">
                    3. Payment Method
                  </h2>
                  <p className="text-xs text-zinc-500">
                    256-bit encrypted secure checkout.
                  </p>
                </div>
                <Lock className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-orange-600 bg-orange-50/50 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900">
                          Instant UPI (GPay, PhonePe, Paytm, QR)
                        </h4>
                        <p className="text-[11px] text-zinc-500">Zero transaction fees • Instant verification</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-orange-200/80 space-y-2 text-xs">
                      <label className="block font-bold text-zinc-700">Enter UPI ID / VPA</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@oksbi"
                          className="flex-1 bg-white border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 font-semibold"
                        />
                        <button
                          type="button"
                          className="px-3 bg-zinc-900 text-white rounded-xl font-bold text-xs"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        A payment request will be triggered to your UPI app.
                      </p>
                    </div>
                  )}
                </div>

                {/* Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-orange-600 bg-orange-50/50 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900">
                        Credit / Debit Card (Visa, MasterCard, RuPay)
                      </h4>
                      <p className="text-[11px] text-zinc-500">Safe OTP-based verification</p>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-orange-200/80 space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-white border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-white border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full bg-white border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-orange-600 bg-orange-50/50 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900">Net Banking</h4>
                      <p className="text-[11px] text-zinc-500">All major Indian banks supported</p>
                    </div>
                  </div>

                  {paymentMethod === 'netbanking' && (
                    <div className="mt-4 pt-3 border-t border-orange-200/80 space-y-2 text-xs">
                      <label className="block font-bold text-zinc-700">Select Your Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-900 font-semibold"
                      >
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-orange-600 bg-orange-50/50 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900">Cash on Delivery (COD)</h4>
                        <p className="text-[11px] text-zinc-500">Pay cash or UPI at your doorstep</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Complete Order Button */}
              <div className="pt-4 border-t border-zinc-200 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalOrderSubmit}
                  disabled={isPlacingOrder}
                  className="flex-1 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isPlacingOrder ? 'Processing Order...' : `PAY & PLACE ORDER (₹${cartTotal})`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT: ORDER SUMMARY STICKY ================= */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <h3 className="font-heading font-extrabold text-base text-zinc-950">
              Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
            </h3>
            <span className="text-xs font-bold text-orange-600">DoggyBhai Care</span>
          </div>

          {/* Cart Item Row Previews */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-zinc-400">
                    Size: {item.selectedSize} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right font-extrabold text-zinc-900">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Display */}
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-900">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Coupon: <strong>{appliedCoupon.code}</strong></span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-600 hover:text-red-700 font-bold underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Promo Code (DOGGY10)"
                className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs font-semibold uppercase focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={() => {
                  applyCouponCode(couponCode);
                  setCouponCode('');
                }}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-zinc-600 border-t border-zinc-100 pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-zinc-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount</span>
                <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 font-extrabold">FREE</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-heading font-extrabold text-zinc-950 pt-3 border-t border-zinc-200">
              <span>Total Payable</span>
              <span className="text-lg text-orange-600">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
