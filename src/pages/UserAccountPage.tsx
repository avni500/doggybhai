import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Dog,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Truck,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';

export const UserAccountPage: React.FC = () => {
  const {
    user,
    logout,
    orders,
    wishlist,
    products,
    routeParams,
    navigate,
    openAuthModal,
    addToast
  } = useShop();

  const initialTab = (routeParams?.tab as any) || 'orders';
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'dog'>(
    initialTab
  );

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-zinc-950">
          Sign In to Access Your Account
        </h2>
        <p className="text-xs text-zinc-500">
          Track active orders, manage your DoggyBhai wishlist, and update your dog’s size profile.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header Profile Bar */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-zinc-950">{user.name}</h1>
            <p className="text-xs text-zinc-500">{user.email} • {user.phone}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Dog className="w-3 h-3 text-orange-600" />
                {user.dogProfile?.name ? `${user.dogProfile.name}'s Parent` : 'Pet Parent'}
              </span>
              {user.isAdmin && (
                <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Admin Staff
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs & Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Tabs Nav */}
        <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-zinc-200 shadow-2xs space-y-1">
          {[
            { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length },
            { id: 'dog', label: 'My Dog Profile', icon: Dog },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'profile', label: 'Personal Info', icon: UserIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'dog') {
                    navigate('my-dog');
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 text-orange-700 font-extrabold'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-orange-600 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          {user.isAdmin && (
            <div className="pt-2 border-t border-zinc-100">
              <button
                onClick={() => navigate('admin')}
                className="w-full text-left px-4 py-3 rounded-2xl font-extrabold text-xs text-orange-700 bg-orange-50 hover:bg-orange-100 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side Content Panel */}
        <div className="lg:col-span-9 space-y-6">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-zinc-950">
                Order History ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-zinc-200 p-10 text-center space-y-3">
                  <Package className="w-10 h-10 text-zinc-300 mx-auto" />
                  <h4 className="font-bold text-zinc-900 text-sm">No orders yet</h4>
                  <p className="text-xs text-zinc-500">Your past purchases will appear here.</p>
                  <button
                    onClick={() => navigate('shop')}
                    className="px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 text-xs">
                      <div>
                        <span className="font-mono font-bold text-zinc-900 text-sm">
                          {order.id}
                        </span>
                        <p className="text-zinc-500">Placed on {order.orderDate}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-orange-100 text-orange-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">
                          {order.orderStatus}
                        </span>
                        <button
                          onClick={() => navigate('order-tracking', { orderId: order.id })}
                          className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-xl object-cover border border-zinc-200"
                            />
                            <div>
                              <h4 className="font-bold text-zinc-900">{item.product.name}</h4>
                              <p className="text-zinc-500">
                                Size: {item.selectedSize} • {item.selectedColor.name} • Qty:{' '}
                                {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-extrabold text-zinc-900">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900">
                      <span>Total Amount:</span>
                      <span className="text-sm text-orange-600 font-extrabold">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-zinc-950">
                My Saved Wishlist ({wishlistProducts.length})
              </h3>

              {wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-zinc-200 p-10 text-center space-y-3">
                  <Heart className="w-10 h-10 text-zinc-300 mx-auto" />
                  <h4 className="font-bold text-zinc-900 text-sm">Your wishlist is empty</h4>
                  <p className="text-xs text-zinc-500">Save products to easily find them later.</p>
                  <button
                    onClick={() => navigate('shop')}
                    className="px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold"
                  >
                    Browse Catalogue
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-lg text-zinc-950">
                  Saved Delivery Addresses
                </h3>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{user.name}</span>
                  <span className="bg-orange-100 text-orange-800 font-extrabold text-[10px] px-2 py-0.5 rounded">
                    Default
                  </span>
                </div>
                <p className="text-zinc-600">Flat 402, Sunshine Meadows, 14th Main, Indiranagar</p>
                <p className="text-zinc-600">Bengaluru, Karnataka - 560038</p>
                <p className="text-zinc-500">Phone: {user.phone}</p>
              </div>
            </div>
          )}

          {/* PERSONAL PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="font-heading font-extrabold text-lg text-zinc-950">
                Personal Information
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled
                    value={user.name}
                    className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3 text-zinc-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3 text-zinc-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    disabled
                    value={user.phone}
                    className="w-full bg-zinc-100 border border-zinc-200 rounded-xl p-3 text-zinc-800 font-semibold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
