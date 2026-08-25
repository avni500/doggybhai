import React from 'react';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Dog,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, routeParams, navigate } = useShop();

  const orderId = routeParams?.orderId;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Order not found</h2>
        <button onClick={() => navigate('home')} className="text-orange-600 font-bold underline">
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Order Placed Successfully
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-zinc-950">
            Thank You for Shopping at DoggyBhai!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
            Your best friend's gear is being packed with care. Order confirmation and updates have been sent to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Order Meta Strip */}
        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-left">
          <div>
            <span className="text-zinc-400 font-medium block">Order Number</span>
            <strong className="text-zinc-900 font-mono font-bold text-sm">{order.id}</strong>
          </div>
          <div>
            <span className="text-zinc-400 font-medium block">Date</span>
            <strong className="text-zinc-900 font-bold">{order.orderDate}</strong>
          </div>
          <div>
            <span className="text-zinc-400 font-medium block">Total Paid</span>
            <strong className="text-orange-600 font-extrabold text-sm">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </strong>
          </div>
          <div>
            <span className="text-zinc-400 font-medium block">Est. Delivery</span>
            <strong className="text-zinc-900 font-bold">{order.estimatedDelivery}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('order-tracking', { orderId: order.id })}
            className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>TRACK PACKAGE</span>
          </button>

          <button
            onClick={() => navigate('shop')}
            className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-heading font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Package Items & Address Breakdown */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <h3 className="font-heading font-extrabold text-lg text-zinc-950">Package Items</h3>

        <div className="space-y-3 divide-y divide-zinc-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-200"
                />
                <div>
                  <h4 className="font-bold text-zinc-900">{item.product.name}</h4>
                  <p className="text-zinc-500">
                    Size: {item.selectedSize} • {item.selectedColor.name} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="font-extrabold text-zinc-900">
                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-200 text-xs space-y-1 text-zinc-600">
          <p className="font-bold text-zinc-900">Shipping Address:</p>
          <p>{order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
          <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
            {order.shippingAddress.pincode}
          </p>
        </div>
      </div>
    </div>
  );
};
