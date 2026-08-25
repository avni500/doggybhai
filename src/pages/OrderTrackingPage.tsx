import React from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  ArrowLeft,
  Phone,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackingPage: React.FC = () => {
  const { orders, routeParams, navigate } = useShop();

  const orderId = routeParams?.orderId || orders[0]?.id;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">No active orders found</h2>
        <button onClick={() => navigate('shop')} className="text-orange-600 font-bold underline">
          Shop Accessories
        </button>
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', desc: 'Received & Verified', date: order.orderDate, done: true },
    {
      label: 'Packed & Quality Tested',
      desc: 'DoggyBhai Fulfillment Center',
      date: 'Next Day',
      done: ['confirmed', 'packed', 'shipped', 'delivered'].includes(order.orderStatus)
    },
    {
      label: 'In Transit',
      desc: `${order.courierPartner || 'BlueDart Express'} (AWB: ${order.trackingNumber || 'DBX-782910'})`,
      date: '2 Days',
      done: ['shipped', 'delivered'].includes(order.orderStatus)
    },
    {
      label: 'Delivered',
      desc: 'Delivered to your doorstep',
      date: order.estimatedDelivery,
      done: order.orderStatus === 'delivered'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in">
      <button
        onClick={() => navigate('account', { tab: 'orders' })}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-wider transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <span className="text-[11px] font-extrabold text-orange-600 uppercase tracking-widest">
              LIVE COURIER TRACKING
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-950 mt-1">
              Order {order.id}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Courier: <strong className="text-zinc-800">{order.courierPartner || 'BlueDart Express'}</strong> • Tracking AWB: <strong className="text-zinc-800">{order.trackingNumber || 'DBX-98271034'}</strong>
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 px-4 py-2.5 rounded-2xl text-xs text-right">
            <span className="text-zinc-500 block font-medium">Estimated Arrival</span>
            <strong className="text-sm font-extrabold text-orange-700">
              {order.estimatedDelivery}
            </strong>
          </div>
        </div>

        {/* Visual Timeline Stepper */}
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="flex md:flex-col items-start gap-3 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-colors ${
                    s.done
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-300'
                  }`}
                >
                  {s.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="text-left space-y-0.5">
                  <h4 className="text-xs font-extrabold text-zinc-900">{s.label}</h4>
                  <p className="text-[11px] text-zinc-500">{s.desc}</p>
                  <span className="text-[10px] font-semibold text-orange-600 block">{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Contents Details */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-2xs">
        <h3 className="font-heading font-extrabold text-base text-zinc-950">Package Items</h3>
        <div className="space-y-3 divide-y divide-zinc-100">
          {order.items.map((item, i) => (
            <div key={i} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-200"
                />
                <div>
                  <h4 className="font-bold text-zinc-900">{item.product.name}</h4>
                  <p className="text-[11px] text-zinc-500">
                    Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="font-extrabold text-zinc-900">
                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
