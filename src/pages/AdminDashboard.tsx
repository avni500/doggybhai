import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Truck,
  DollarSign,
  ShieldCheck,
  Search,
  Tag,
  ArrowLeft,
  Settings,
  X,
  Sparkles,
  Video,
  Eye,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    analytics,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    settings,
    updateSettings,
    navigate,
    addToast,
    user,
    cameras,
    scanHistory,
    smartAlerts
  } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'settings' | 'smart-care'>('analytics');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Add / Edit Product Modal State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    price: 499,
    mrp: 699,
    stock: 50,
    shortDescription: '',
    description: '',
    material: 'High-Tensile Padded Nylon',
    dimensions: 'Adjustable 35cm - 50cm',
    weight: '120g',
    sku: 'DB-COL-01',
    images: ['https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80'],
    availableSizes: ['S', 'M', 'L'],
    availableColors: [{ name: 'Amber Orange', hex: '#FF6B00' }],
    tags: ['Collar', 'Walk Essentials'],
    features: ['Neoprene padded', 'Rust-proof zinc ring']
  });

  // Settings form state
  const [announcementInput, setAnnouncementInput] = useState(settings.announcementText);
  const [freeShippingThresholdInput, setFreeShippingThresholdInput] = useState(
    settings.freeShippingThreshold
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch)
  );

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: `doggybhai-${Date.now()}`,
      category: 'collars',
      categoryLabel: 'Dog Collars',
      price: 499,
      mrp: 699,
      stock: 45,
      shortDescription: 'Premium handcrafted dog accessory engineered for safety.',
      description: 'Handcrafted accessory tested for Indian dog breeds and weather conditions.',
      material: 'Padded High-Tensile Nylon',
      dimensions: '14" - 20" Neck',
      weight: '140g',
      sku: `DB-NEW-${Math.floor(100 + Math.random() * 900)}`,
      images: [
        'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80'
      ],
      availableSizes: ['S', 'M', 'L'],
      availableColors: [
        { name: 'Amber Orange', hex: '#FF6B00' },
        { name: 'Midnight Black', hex: '#18181B' }
      ],
      tags: ['Accessories', 'New Arrival'],
      features: ['Rust-proof hardware', 'Ergonomic shape'],
      careInstructions: 'Wipe clean with a damp cloth',
      rating: 5.0,
      reviewCount: 1,
      discountPercentage: 28,
      isBestSeller: false,
      isFeatured: true,
      isNewArrival: true,
      lowStockThreshold: 10,
      customerReviews: []
    });
    setIsEditingProduct(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      addToast('Please provide a name and price', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct(productForm as any);
    }
    setIsEditingProduct(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      announcementText: announcementInput,
      freeShippingThreshold: freeShippingThresholdInput
    });
    addToast('Store settings updated!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-orange-600 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> DoggyBhai Merchant Hub
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-950">
            Staff Admin Dashboard
          </h1>
          <p className="text-xs text-zinc-500">
            Real-time management of products, customer orders, stock inventory, and store banners.
          </p>
        </div>

        <button
          onClick={() => navigate('home')}
          className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-zinc-200 overflow-x-auto text-xs font-bold gap-1 shadow-2xs">
        {[
          { id: 'analytics', label: 'ANALYTICS & SALES', icon: TrendingUp },
          { id: 'products', label: `PRODUCTS (${products.length})`, icon: ShoppingBag },
          { id: 'orders', label: `ORDERS (${orders.length})`, icon: Package },
          { id: 'smart-care', label: 'SMART CARE & AI IOT', icon: Sparkles },
          { id: 'settings', label: 'STORE SETTINGS', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-950 text-white font-extrabold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= 1. ANALYTICS TAB ================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>TOTAL STORE REVENUE</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                ₹{analytics.totalRevenue.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded inline-block">
                +18.4% from last month
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>TOTAL ORDERS</span>
                <Package className="w-4 h-4 text-orange-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                {analytics.totalOrders}
              </div>
              <span className="text-[11px] text-orange-700 font-extrabold bg-orange-50 px-2 py-0.5 rounded inline-block">
                100% Pan-India Dispatched
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>ACTIVE CUSTOMERS</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                {analytics.totalCustomers}
              </div>
              <span className="text-[11px] text-indigo-700 font-extrabold bg-indigo-50 px-2 py-0.5 rounded inline-block">
                88% Verified Reviews
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>AVG. ORDER VALUE (AOV)</span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                ₹{analytics.averageOrderValue.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Combo sets boosting basket size</span>
            </div>
          </div>

          {/* Low Stock Alerts */}
          {analytics.lowStockProducts.length > 0 && (
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-heading font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Warehouse Low-Stock Alerts ({analytics.lowStockProducts.length} Items)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {analytics.lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-zinc-900 line-clamp-1">{p.name}</h4>
                      <span className="text-[10px] text-zinc-400">SKU: {p.sku}</span>
                    </div>
                    <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-1 rounded-lg">
                      {p.stock} Left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 2. PRODUCTS MANAGEMENT TAB ================= */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search by name, SKU or category..."
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-sm uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW PRODUCT</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-zinc-200 text-xs">
              <thead className="bg-zinc-50 font-extrabold text-zinc-900 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price / MRP</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover bg-zinc-100 border border-zinc-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-zinc-900 line-clamp-1">{prod.name}</h4>
                        <span className="text-[10px] text-zinc-400">SKU: {prod.sku}</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-zinc-600 capitalize">
                      {prod.category}
                    </td>
                    <td className="p-3 font-bold text-zinc-900">
                      ₹{prod.price} <span className="text-zinc-400 line-through text-[11px]">₹{prod.mrp}</span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          prod.stock <= prod.lowStockThreshold
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-zinc-800">
                      ★ {prod.rating} ({prod.reviewCount})
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="p-1.5 text-zinc-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg cursor-pointer"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 3. ORDERS MANAGEMENT TAB ================= */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search by Order ID, customer name or phone..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-4">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200/80">
                  <div>
                    <span className="font-mono font-bold text-zinc-900 text-sm">{ord.id}</span>
                    <p className="text-zinc-500">
                      Customer: <strong>{ord.customerName}</strong> ({ord.customerPhone}) • {ord.customerEmail}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-medium">Status:</span>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-white border border-zinc-300 rounded-xl px-3 py-1.5 font-extrabold uppercase text-[11px] text-zinc-900"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Items & Shipping Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="font-bold text-zinc-900">Ordered Items:</p>
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-600">
                        <span>
                          {it.product.name} (x{it.quantity}) - {it.selectedSize}
                        </span>
                        <span className="font-bold text-zinc-900">
                          ₹{it.unitPrice * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 text-zinc-600">
                    <p className="font-bold text-zinc-900">Delivery Address:</p>
                    <p>
                      {ord.shippingAddress.addressLine1}, {ord.shippingAddress.addressLine2},{' '}
                      {ord.shippingAddress.city}, {ord.shippingAddress.state} -{' '}
                      {ord.shippingAddress.pincode}
                    </p>
                    <p className="text-orange-700 font-bold">
                      Payment: {ord.paymentMethod.toUpperCase()} • Total: ₹{ord.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. STORE SETTINGS TAB ================= */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs max-w-2xl">
          <h3 className="font-heading font-extrabold text-lg text-zinc-950">Store Configurations</h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={announcementInput}
                onChange={(e) => setAnnouncementInput(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Free Shipping Threshold Amount (₹)
              </label>
              <input
                type="number"
                value={freeShippingThresholdInput}
                onChange={(e) => setFreeShippingThresholdInput(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-heading font-extrabold text-xs rounded-xl uppercase tracking-wider"
            >
              SAVE SETTINGS
            </button>
          </form>
        </div>
      )}

      {/* ================= 5. SMART CARE & AI IOT TAB ================= */}
      {activeTab === 'smart-care' && (
        <div className="space-y-8">
          {/* Smart Care Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>ONLINE CAMERAS</span>
                <Video className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                {cameras.filter((c) => c.isOnline).length} / {cameras.length}
              </div>
              <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded inline-block">
                100% AES-256 Encrypted
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>AI TICK SCANS PROCESSED</span>
                <Sparkles className="w-4 h-4 text-orange-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                {scanHistory.length + 128}
              </div>
              <span className="text-[11px] text-orange-700 font-extrabold bg-orange-50 px-2 py-0.5 rounded inline-block">
                Gemini 2.5 Vision Engine
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>ACTIVE CARE ALERTS</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                {smartAlerts.length}
              </div>
              <span className="text-[11px] text-amber-700 font-extrabold bg-amber-50 px-2 py-0.5 rounded inline-block">
                Triage Notifications
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                <span>HARDWARE STOCK (CAMS)</span>
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div className="font-heading font-extrabold text-3xl text-zinc-950">
                48 Units
              </div>
              <span className="text-[11px] text-blue-700 font-extrabold bg-blue-50 px-2 py-0.5 rounded inline-block">
                Ready for Dispatch
              </span>
            </div>
          </div>

          {/* AI Screening Configuration Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-zinc-950 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-600" />
                  AI Vision & Screening Sensitivity Settings
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Configure visual scanning confidence thresholds and non-diagnostic safety guardrails.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-200">
                Safety Guardrails Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <label className="font-bold text-zinc-800 block">AI Screening Confidence Minimum</label>
                <select className="w-full bg-white border border-zinc-300 rounded-xl p-2.5 font-bold text-zinc-900 focus:outline-none">
                  <option>70% (Standard Pet Screening)</option>
                  <option>80% (High Specificity)</option>
                  <option>60% (High Sensitivity / Early Alert)</option>
                </select>
                <p className="text-[11px] text-zinc-500">Flags potential coat spots for vet review.</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <label className="font-bold text-zinc-800 block">Mandatory Disclaimer Requirement</label>
                <div className="flex items-center gap-2 pt-1 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enforced on All Screening Reports</span>
                </div>
                <p className="text-[11px] text-zinc-500">Explicitly states screening is assistive, not diagnostic.</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <label className="font-bold text-zinc-800 block">Camera Firmware Auto-Update</label>
                <div className="flex items-center gap-2 pt-1 font-bold text-zinc-800">
                  <span className="px-2 py-0.5 bg-zinc-200 rounded font-mono text-[10px]">v2.4.1-doggy-pro</span>
                  <span>Active Release</span>
                </div>
                <p className="text-[11px] text-zinc-500">OTA updates pushed overnight securely.</p>
              </div>
            </div>
          </div>

          {/* Recent Screenings Audit Log */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-2xs space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-zinc-950">
              Recent AI Screening Logs & Audit Trail ({scanHistory.length} records)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Dog Name</th>
                    <th className="p-3">Body Zone</th>
                    <th className="p-3">Result</th>
                    <th className="p-3">Confidence</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {scanHistory.map((scan) => (
                    <tr key={scan.id} className="hover:bg-zinc-50">
                      <td className="p-3 font-bold text-zinc-900">{scan.dogName}</td>
                      <td className="p-3 font-semibold text-orange-600">{scan.areaScanned}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                            scan.result.status === 'detected'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {scan.result.status === 'detected' ? 'POSSIBLE SPOT' : 'COAT CLEAR'}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-zinc-700">
                        {scan.result.confidencePercentage}%
                      </td>
                      <td className="p-3 text-zinc-500">{scan.date}</td>
                      <td className="p-3 text-zinc-500 capitalize">{scan.source.replace('_', ' ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div
            onClick={() => setIsEditingProduct(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-zinc-200 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="font-heading font-extrabold text-xl text-zinc-950">
                {editingProductId ? 'Edit Product' : 'Add New DoggyBhai Product'}
              </h3>
              <button
                onClick={() => setIsEditingProduct(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 font-semibold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as any,
                        categoryLabel:
                          e.target.value === 'collars'
                            ? 'Dog Collars'
                            : e.target.value === 'leashes'
                            ? 'Dog Leashes'
                            : 'Dog Bowls'
                      })
                    }
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 font-semibold text-zinc-900"
                  >
                    <option value="collars">Dog Collars</option>
                    <option value="leashes">Dog Leashes</option>
                    <option value="bowls">Dog Bowls</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 font-semibold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 font-semibold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 font-semibold text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Short Tagline Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) =>
                    setProductForm({ ...productForm, shortDescription: e.target.value })
                  }
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Material Specification</label>
                <input
                  type="text"
                  value={productForm.material}
                  onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-zinc-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2.5 bg-zinc-100 text-zinc-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-xl uppercase tracking-wider"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
