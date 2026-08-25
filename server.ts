import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_PRODUCTS,
  CATEGORIES,
  COMBO_OFFERS,
  DEMO_REVIEWS,
  COUPONS,
  GUIDE_ARTICLES,
  INITIAL_SETTINGS,
  INITIAL_CAMERAS,
  INITIAL_SCAN_HISTORY,
  INITIAL_SMART_ALERTS,
  INITIAL_SMART_CARE_SETTINGS
} from './src/data/mockData';
import {
  Product,
  Order,
  Review,
  Coupon,
  WebsiteSettings,
  OrderStatus,
  SmartCamera,
  TickScanRecord,
  SmartCareAlert,
  SmartCareSettings,
  TickScanArea,
  TickDetectionResult
} from './src/types';

// In-Memory state with pre-populated real-world demo data
let products: Product[] = [...INITIAL_PRODUCTS];
let reviews: Review[] = [...DEMO_REVIEWS];
let coupons: Coupon[] = [...COUPONS];
let websiteSettings: WebsiteSettings = { ...INITIAL_SETTINGS };

let smartCameras: SmartCamera[] = [...INITIAL_CAMERAS];
let smartScans: TickScanRecord[] = [...INITIAL_SCAN_HISTORY];
let smartAlerts: SmartCareAlert[] = [...INITIAL_SMART_ALERTS];
let smartCareSettings: SmartCareSettings = { ...INITIAL_SMART_CARE_SETTINGS };

let orders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'DB-89241',
    createdAt: '2026-08-22T10:30:00Z',
    customerName: 'Rohan Sharma',
    customerEmail: 'rohan.sharma@example.com',
    customerPhone: '+91 98765 12345',
    shippingAddress: {
      id: 'addr-1',
      name: 'Rohan Sharma',
      phone: '+91 98765 12345',
      houseFlat: 'Flat 402, Palm Heights',
      street: '12th Main Road, Indiranagar',
      area: 'Near Defence Colony Playground',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      type: 'Home'
    },
    items: [
      {
        productId: 'prod-collar-1',
        name: 'DoggyBhai Classic Collar',
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80',
        size: 'M',
        color: 'Amber Orange',
        quantity: 1,
        price: 499,
        mrp: 699
      },
      {
        productId: 'prod-leash-1',
        name: 'DoggyBhai Everyday Leash',
        image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
        size: 'One Size',
        color: 'Amber Orange',
        quantity: 1,
        price: 599,
        mrp: 849
      }
    ],
    subtotal: 1098,
    discountAmount: 110,
    couponCode: 'DOGGY10',
    shippingFee: 0,
    totalAmount: 988,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    trackingNumber: 'BLUEDART-DB782194',
    courierName: 'Blue Dart Express',
    estimatedDelivery: '25 Aug 2026',
    statusHistory: [
      { status: 'Confirmed', timestamp: '2026-08-22T10:32:00Z', note: 'Payment verified via UPI' },
      { status: 'Processing', timestamp: '2026-08-22T14:10:00Z', note: 'Order assigned to fulfillment team' },
      { status: 'Packed', timestamp: '2026-08-23T09:00:00Z', note: 'Packed with eco-packaging in Bengaluru warehouse' },
      { status: 'Shipped', timestamp: '2026-08-23T16:45:00Z', note: 'Dispatched via Blue Dart Air' }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'DB-89242',
    createdAt: '2026-08-23T15:20:00Z',
    customerName: 'Ananya Roy',
    customerEmail: 'ananya.roy@example.com',
    customerPhone: '+91 99887 65432',
    shippingAddress: {
      id: 'addr-2',
      name: 'Ananya Roy',
      phone: '+91 99887 65432',
      houseFlat: 'B-14, Greenview Residency',
      street: 'Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
      type: 'Home'
    },
    items: [
      {
        productId: 'prod-bowl-1',
        name: 'DoggyBhai Stainless Steel Bowl',
        image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80',
        size: 'L',
        color: 'Brushed Silver',
        quantity: 2,
        price: 549,
        mrp: 799
      }
    ],
    subtotal: 1098,
    discountAmount: 100,
    couponCode: 'FIRST10',
    shippingFee: 0,
    totalAmount: 998,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Confirmed',
    trackingNumber: 'DELHIVERY-7749120',
    courierName: 'Delhivery Surface',
    estimatedDelivery: '27 Aug 2026',
    statusHistory: [
      { status: 'Confirmed', timestamp: '2026-08-23T15:22:00Z', note: 'Payment processed securely' }
    ]
  }
];

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (process.env.GEMINI_API_KEY) {
    if (!geminiClient) {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return geminiClient;
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ================= API ROUTES =================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'DoggyBhai', timestamp: new Date().toISOString() });
  });

  // GET Products (with search, category, filter, sort)
  app.get('/api/products', (req, res) => {
    try {
      let result = [...products];
      const { category, search, minPrice, maxPrice, size, color, sort, inStockOnly } = req.query;

      if (category && category !== 'all') {
        result = result.filter((p) => p.category === category);
      }

      if (search && typeof search === 'string') {
        const query = search.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.shortDescription.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query)) ||
            p.categoryLabel.toLowerCase().includes(query)
        );
      }

      if (minPrice) {
        result = result.filter((p) => p.price >= Number(minPrice));
      }

      if (maxPrice) {
        result = result.filter((p) => p.price <= Number(maxPrice));
      }

      if (size && typeof size === 'string') {
        result = result.filter((p) => p.availableSizes.includes(size as any));
      }

      if (color && typeof color === 'string') {
        result = result.filter((p) =>
          p.availableColors.some((c) => c.name.toLowerCase().includes((color as string).toLowerCase()))
        );
      }

      if (inStockOnly === 'true') {
        result = result.filter((p) => p.stock > 0);
      }

      // Sorting
      if (sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'newest') {
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      } else if (sort === 'best-selling') {
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      }

      res.json({ success: true, count: result.length, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET Product by Slug or ID
  app.get('/api/products/:slugOrId', (req, res) => {
    const { slugOrId } = req.params;
    const product = products.find((p) => p.slug === slugOrId || p.id === slugOrId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Include reviews and matching items
    const productReviews = reviews.filter((r) => r.productId === product.id);
    const relatedProducts = products
      .filter((p) => p.id !== product.id && (p.category === product.category || product.matchingProductIds?.includes(p.id)))
      .slice(0, 4);

    res.json({
      success: true,
      data: product,
      reviews: productReviews,
      relatedProducts
    });
  });

  // POST Product (Admin CRUD)
  app.post('/api/products', (req, res) => {
    try {
      const newProductData = req.body;
      const slug = (newProductData.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const newProduct: Product = {
        id: 'prod-' + Date.now(),
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        name: newProductData.name || 'New DoggyBhai Product',
        category: newProductData.category || 'collars',
        categoryLabel: newProductData.categoryLabel || 'Dog Collars',
        shortDescription: newProductData.shortDescription || '',
        description: newProductData.description || '',
        features: newProductData.features || ['Premium DoggyBhai craftsmanship', 'Tested for strength and durability'],
        specifications: newProductData.specifications || [{ label: 'Material', value: 'High grade dog-safe composite' }],
        material: newProductData.material || 'Premium Nylon, Zinc Alloy',
        careInstructions: newProductData.careInstructions || 'Wipe with damp cloth or hand wash gentle.',
        sizeGuide: newProductData.sizeGuide || 'Refer to sizing chart before ordering.',
        shippingInfo: newProductData.shippingInfo || 'Ships within 24 hours across India.',
        returnPolicy: newProductData.returnPolicy || '30-day hassle-free returns.',
        price: Number(newProductData.price) || 499,
        mrp: Number(newProductData.mrp) || 699,
        discountPercentage: Math.round(
          (((Number(newProductData.mrp) || 699) - (Number(newProductData.price) || 499)) /
            (Number(newProductData.mrp) || 699)) *
            100
        ),
        rating: 4.8,
        reviewCount: 0,
        stock: Number(newProductData.stock) || 20,
        lowStockThreshold: Number(newProductData.lowStockThreshold) || 5,
        isBestSeller: Boolean(newProductData.isBestSeller),
        isFeatured: Boolean(newProductData.isFeatured),
        isNewArrival: true,
        images:
          newProductData.images && newProductData.images.length > 0
            ? newProductData.images
            : ['https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80'],
        availableSizes: newProductData.availableSizes || ['S', 'M', 'L'],
        availableColors: newProductData.availableColors || [{ name: 'Amber Orange', hex: '#FF6B00' }],
        tags: newProductData.tags || ['New Arrival']
      };

      products.unshift(newProduct);
      res.status(201).json({ success: true, data: newProduct });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // PUT Product (Admin CRUD)
  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const updated = { ...products[index], ...req.body };
    if (updated.mrp && updated.price) {
      updated.discountPercentage = Math.round(((updated.mrp - updated.price) / updated.mrp) * 100);
    }
    products[index] = updated;

    res.json({ success: true, data: products[index] });
  });

  // DELETE Product (Admin)
  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const initialLen = products.length;
    products = products.filter((p) => p.id !== id);

    if (products.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // GET Categories
  app.get('/api/categories', (req, res) => {
    res.json({ success: true, data: CATEGORIES });
  });

  // GET Combos
  app.get('/api/combos', (req, res) => {
    res.json({ success: true, data: COMBO_OFFERS });
  });

  // GET Guides / Articles
  app.get('/api/guides', (req, res) => {
    res.json({ success: true, data: GUIDE_ARTICLES });
  });

  // GET Single Guide
  app.get('/api/guides/:slug', (req, res) => {
    const article = GUIDE_ARTICLES.find((g) => g.slug === req.params.slug || g.id === req.params.slug);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, data: article });
  });

  // GET Coupons
  app.get('/api/coupons', (req, res) => {
    res.json({ success: true, data: coupons });
  });

  // POST Validate Coupon
  app.post('/api/coupons/validate', (req, res) => {
    const { code, cartSubtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Coupon code is required' });
    }

    const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Invalid or expired coupon code' });
    }

    const subtotal = Number(cartSubtotal) || 0;
    if (subtotal < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        error: `Coupon ${coupon.code} requires a minimum cart value of ₹${coupon.minOrderValue}`
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discountAmount,
        description: coupon.description
      }
    });
  });

  // GET Orders (with search and status filters)
  app.get('/api/orders', (req, res) => {
    const { email, status, search } = req.query;
    let result = [...orders];

    if (email && typeof email === 'string') {
      result = result.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
    }

    if (status && typeof status === 'string' && status !== 'all') {
      result = result.filter((o) => o.orderStatus.toLowerCase() === status.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: result.length, data: result });
  });

  // GET Single Order by ID or Order Number
  app.get('/api/orders/:idOrNumber', (req, res) => {
    const { idOrNumber } = req.params;
    const order = orders.find(
      (o) => o.id === idOrNumber || o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    );

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, data: order });
  });

  // POST Create Order (Server-Side Price Validation & Stock Update)
  app.post('/api/orders', (req, res) => {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items,
        couponCode,
        paymentMethod
      } = req.body;

      if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Missing required order fields' });
      }

      // Recalculate price server-side from product catalogue
      let subtotal = 0;
      const validatedItems = items.map((cartItem: any) => {
        const product = products.find((p) => p.id === cartItem.productId);
        const unitPrice = product ? product.price : cartItem.price;
        const mrp = product ? product.mrp : cartItem.mrp || unitPrice;
        subtotal += unitPrice * cartItem.quantity;

        // Deduct in-memory stock
        if (product) {
          product.stock = Math.max(0, product.stock - cartItem.quantity);
        }

        return {
          productId: cartItem.productId,
          name: product ? product.name : cartItem.name,
          image: cartItem.image || (product ? product.images[0] : ''),
          size: cartItem.size || 'M',
          color: cartItem.color || 'Amber Orange',
          quantity: cartItem.quantity,
          price: unitPrice,
          mrp: mrp
        };
      });

      // Calculate coupon discount
      let discountAmount = 0;
      if (couponCode) {
        const coupon = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.isActive);
        if (coupon && subtotal >= coupon.minOrderValue) {
          if (coupon.discountType === 'percentage') {
            discountAmount = Math.round((subtotal * coupon.discountValue) / 100);
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
              discountAmount = coupon.maxDiscount;
            }
          } else {
            discountAmount = coupon.discountValue;
          }
        }
      }

      const shippingFee = subtotal >= websiteSettings.freeShippingThreshold ? 0 : websiteSettings.standardShippingFee;
      const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

      const orderNumber = 'DB-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber,
        createdAt: new Date().toISOString(),
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items: validatedItems,
        subtotal,
        discountAmount,
        couponCode: couponCode || undefined,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethod || 'UPI',
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'Confirmed',
        trackingNumber: 'DB-EXP-' + Math.floor(1000000 + Math.random() * 9000000),
        courierName: 'Blue Dart Express',
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        statusHistory: [
          {
            status: 'Confirmed',
            timestamp: new Date().toISOString(),
            note: paymentMethod === 'Cash on Delivery' ? 'Order confirmed (Cash on Delivery)' : 'Payment verified successfully'
          }
        ]
      };

      orders.unshift(newOrder);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PUT Update Order Status (Admin)
  app.put('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, note, trackingNumber, courierName } = req.body;

    const order = orders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    if (status) {
      order.orderStatus = status as OrderStatus;
      order.statusHistory.push({
        status: status as OrderStatus,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${status}`
      });
    }

    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courierName) order.courierName = courierName;

    res.json({ success: true, data: order });
  });

  // POST Reviews
  app.post('/api/reviews', (req, res) => {
    const { productId, authorName, dogName, dogBreed, rating, title, comment } = req.body;

    if (!productId || !authorName || !rating || !comment) {
      return res.status(400).json({ success: false, error: 'Missing required review fields' });
    }

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      productId,
      authorName,
      dogName: dogName || undefined,
      dogBreed: dogBreed || undefined,
      rating: Number(rating),
      title: title || 'Verified Purchase',
      comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      isVerified: true,
      helpfulCount: 0
    };

    reviews.unshift(newReview);

    // Update product rating and review count
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      const prodReviews = reviews.filter((r) => r.productId === productId);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    res.status(201).json({ success: true, data: newReview });
  });

  // GET Analytics (Admin)
  app.get('/api/analytics', (req, res) => {
    const totalRevenue = orders
      .filter((o) => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const totalOrders = orders.length;
    const uniqueEmails = new Set(orders.map((o) => o.customerEmail));
    const totalCustomers = uniqueEmails.size;
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const lowStockProducts = products
      .filter((p) => p.stock <= p.lowStockThreshold)
      .map((p) => ({ name: p.name, stock: p.stock, category: p.categoryLabel }));

    const topProducts = [
      { name: 'DoggyBhai Classic Collar', category: 'Dog Collars', unitsSold: 142, revenue: 70858 },
      { name: 'DoggyBhai Everyday Leash', category: 'Dog Leashes', unitsSold: 184, revenue: 110216 },
      { name: 'DoggyBhai Stainless Steel Bowl', category: 'Dog Bowls', unitsSold: 162, revenue: 88938 },
      { name: 'DoggyBhai Anti-Slip Bowl', category: 'Dog Bowls', unitsSold: 89, revenue: 62211 },
      { name: 'DoggyBhai Rope Leash', category: 'Dog Leashes', unitsSold: 92, revenue: 73508 }
    ];

    const salesData = [
      { date: '18 Aug', revenue: 4200, orders: 4 },
      { date: '19 Aug', revenue: 5800, orders: 6 },
      { date: '20 Aug', revenue: 7400, orders: 8 },
      { date: '21 Aug', revenue: 6900, orders: 7 },
      { date: '22 Aug', revenue: 9200, orders: 11 },
      { date: '23 Aug', revenue: 8600, orders: 9 },
      { date: '24 Aug', revenue: 11400, orders: 13 }
    ];

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        revenueChange: 18.4,
        ordersChange: 14.2,
        salesData,
        topProducts,
        lowStockProducts
      }
    });
  });

  // GET Settings & PUT Settings
  app.get('/api/settings', (req, res) => {
    res.json({ success: true, data: websiteSettings });
  });

  app.put('/api/settings', (req, res) => {
    websiteSettings = { ...websiteSettings, ...req.body };
    res.json({ success: true, data: websiteSettings });
  });

  // AI Paw-Advisor (Breed advice & tailored accessory recommendation)
  app.post('/api/ai/paw-advisor', async (req, res) => {
    const { breed, ageYears, weightKg, activityLevel } = req.body;

    try {
      const ai = getGeminiClient();
      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are the DoggyBhai Master Canine Sizing & Accessory Expert.
Provide a concise, friendly, personalized 3-point recommendation for a dog with these details:
Breed: ${breed || 'Unknown'}
Age: ${ageYears || 2} years
Weight: ${weightKg || 15} kg
Activity level: ${activityLevel || 'Active'}

Return strict JSON with keys:
"recommendedCollarSize": "S" | "M" | "L" | "XL",
"collarAdvice": "1 sentence advice on collar material & fit for this breed",
"leashAdvice": "1 sentence advice on leash length & type",
"bowlAdvice": "1 sentence advice on bowl material/elevation for this breed",
"funGreeting": "Friendly 1-line compliment for the dog"
`
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({ success: true, data: parsed });
        }
      }

      // Rule-based high-quality fallback
      const weight = Number(weightKg) || 15;
      let size: 'S' | 'M' | 'L' | 'XL' = 'M';
      if (weight < 8) size = 'S';
      else if (weight <= 18) size = 'M';
      else if (weight <= 35) size = 'L';
      else size = 'XL';

      res.json({
        success: true,
        data: {
          recommendedCollarSize: size,
          collarAdvice: `For a ${breed || 'dog'} of ~${weight}kg, a Size ${size} Padded Collar ensures zero friction on sensitive neck fur.`,
          leashAdvice: `Our 5ft Everyday Leash with dual traffic handles is ideal for navigating busy Indian streets.`,
          bowlAdvice: `Food-grade 304 Stainless Steel or weighted ceramic prevents chin acne and bowl tipping.`,
          funGreeting: `Give your wonderful ${breed || 'buddy'} extra belly rubs from the DoggyBhai pack!`
        }
      });
    } catch (err: any) {
      res.json({
        success: true,
        data: {
          recommendedCollarSize: 'M',
          collarAdvice: 'Choose our neoprene padded collar for breathable daily comfort.',
          leashAdvice: 'The 5ft Everyday Leash offers the perfect balance of sniffing room and control.',
          bowlAdvice: 'SS304 food-grade stainless steel is non-porous and bacteria-resistant.',
          funGreeting: 'Tail wags and love to your furry best friend!'
        }
      });
    }
  });

  // ================= DOGGYBHAI SMART CARE API ROUTES =================

  // 1. AI Tick Screening Endpoint
  app.post('/api/smart-care/tick-scan', async (req, res) => {
    try {
      const { imageUrl, area, dogName, dogBreed, source, forceOutcome } = req.body;
      const targetArea: TickScanArea = area || 'BACK';
      const targetDog = dogName || 'Your Dog';

      // Check if user forced an outcome or test image heuristic applies
      let status: 'detected' | 'clear' | 'low_quality' = forceOutcome || 'detected';
      if (!forceOutcome && typeof imageUrl === 'string') {
        if (imageUrl.includes('test-unclear') || imageUrl.includes('518717758536')) {
          status = 'low_quality';
        } else if (imageUrl.includes('test-clean') || imageUrl.includes('587300003388')) {
          status = 'clear';
        } else {
          status = 'detected';
        }
      }

      // Try calling Gemini Vision if API key is present and imageUrl is base64 or valid
      const ai = getGeminiClient();
      if (ai && typeof imageUrl === 'string' && imageUrl.startsWith('data:image')) {
        try {
          const base64Data = imageUrl.split(',')[1];
          const mimeType = imageUrl.split(';')[0].split(':')[1] || 'image/jpeg';

          const prompt = `You are the visual screening engine for DoggyBhai Smart Care. Analyze this photo of a dog's coat (${targetArea} area) to screen for visible, suspicious dark tick-like spots, nodules, or ectoparasites.
CRITICAL SAFETY RULE: You are an assistive visual screening tool, NEVER give a definitive medical diagnosis. Use wording like "Possible tick-like object", "Suspicious object detected", "Requires visual confirmation".

Output pure JSON conforming to this schema:
{
  "status": "detected" | "clear" | "low_quality",
  "confidencePercentage": number (0-100),
  "locationLabel": string,
  "boundingBox": { "x": number (0-100), "y": number (0-100), "width": number (0-100), "height": number (0-100) },
  "title": string,
  "summaryText": string,
  "details": string,
  "recommendedActions": [string, string, string],
  "imageQualityScore": number (0-100),
  "qualityTips": [string],
  "isDemoModel": false,
  "modelConfidenceLevel": "High" | "Moderate" | "Low",
  "veterinaryNote": "AI Tick Check is designed to assist with visual screening only. It cannot confirm whether an object is a tick and should not replace professional veterinary examination."
}`;

          const visionResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
              {
                role: 'user',
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType, data: base64Data } }
                ]
              }
            ]
          });

          const responseText = visionResponse.text || '';
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]) as TickDetectionResult;
            return res.json({ success: true, result: parsed });
          }
        } catch (visionErr) {
          console.warn('Gemini vision processing fallback:', visionErr);
        }
      }

      // Robust structured screening response
      let result: TickDetectionResult;
      if (status === 'detected') {
        result = {
          status: 'detected',
          confidencePercentage: 82,
          locationLabel: `Near the upper ${targetArea.toLowerCase()} coat zone`,
          boundingBox: {
            x: 48,
            y: 36,
            width: 15,
            height: 15
          },
          title: 'POSSIBLE TICK-LIKE OBJECT DETECTED',
          summaryText: 'We found an object in the image that visually resembles a tick.',
          details: `Visual screening identified a dark, rounded nodular structure resting against the fur follicles near the ${targetArea.toLowerCase()} area with distinct contrast against the coat.`,
          recommendedActions: [
            `Gently part ${targetDog}'s fur around the ${targetArea.toLowerCase()} using clean fingers or a fine-tooth comb.`,
            'Visually inspect the area under bright natural lighting to determine if it is a tick, skin tag, seed, or dried debris.',
            'If confirmed to be a tick, use a sanitized fine-tipped tick removal tool to extract gently without squeezing the body.',
            'Consult a certified veterinarian for appropriate tick prevention treatments and parasite screening.'
          ],
          imageQualityScore: 92,
          isDemoModel: true,
          modelConfidenceLevel: 'Moderate',
          veterinaryNote: 'AI Tick Check is designed to assist with visual screening only. It cannot confirm whether an object is a tick and should not replace professional veterinary examination.'
        };
      } else if (status === 'clear') {
        result = {
          status: 'clear',
          confidencePercentage: 96,
          locationLabel: `${targetArea} coat region`,
          title: 'NO OBVIOUS TICK-LIKE OBJECT FOUND',
          summaryText: "We didn't identify an obvious tick-like object in this image.",
          details: `The submitted photo for ${targetDog}'s ${targetArea.toLowerCase()} was analyzed across all visible fur strands. No dark protruding clusters matching tick contours were observed.`,
          recommendedActions: [
            'AI screening cannot guarantee that your dog is tick-free.',
            'Check your dog’s coat manually by running your hands along the fur folds, especially after walks in tall grass.',
            'Scan other high-risk zones including ears, neck, belly, and between paw pads.'
          ],
          imageQualityScore: 95,
          isDemoModel: true,
          modelConfidenceLevel: 'High',
          veterinaryNote: 'AI screening cannot guarantee that your dog is tick-free. Check your dog’s coat manually and consult a veterinarian if you notice anything unusual.'
        };
      } else {
        result = {
          status: 'low_quality',
          confidencePercentage: 38,
          locationLabel: `${targetArea} region (Low Clarity)`,
          title: 'IMAGE TOO UNCLEAR',
          summaryText: 'We need a clearer image to perform the visual screening.',
          details: 'The captured image has high motion blur, insufficient lighting, or low contrast against the dog coat.',
          recommendedActions: [
            'Turn on room lights or take the photo near a window in natural daylight.',
            'Hold camera steady 15-20 cm away from the dog’s coat.',
            'Gently hold your dog still or offer a treat while snapping the frame.',
            'Ensure the camera focus is locked directly on the fur follicles.'
          ],
          imageQualityScore: 42,
          qualityTips: [
            'Use good lighting',
            'Move closer',
            'Keep the dog still',
            'Focus on the coat',
            'Avoid blurry images'
          ],
          isDemoModel: true,
          modelConfidenceLevel: 'Low',
          veterinaryNote: 'AI Tick Check requires clear, sharp imagery to assist with visual screening. Always consult a veterinarian for health assessments.'
        };
      }

      res.json({ success: true, result });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Tick screening failed' });
    }
  });

  // 2. Camera Management Endpoints
  app.get('/api/smart-care/cameras', (req, res) => {
    res.json({ success: true, data: smartCameras });
  });

  app.post('/api/smart-care/cameras', (req, res) => {
    const { name, location, isWired, demoVideoType } = req.body;
    const newCamera: SmartCamera = {
      id: 'cam-' + Date.now().toString(36),
      name: name || 'DoggyBhai Smart Cam',
      location: location || 'Living Room',
      isOnline: true,
      lastActive: 'Just now',
      resolution: '1080p Full HD',
      batteryLevel: isWired ? undefined : 100,
      isWired: Boolean(isWired),
      demoVideoType: demoVideoType || 'resting',
      remoteAccessEnabled: true,
      nightVisionMode: 'auto',
      twoWayAudioEnabled: true,
      motionAlertsEnabled: true,
      isDemoStream: true,
      firmwareVersion: 'v2.4.1-doggy-pro',
      ipAddress: '192.168.1.' + Math.floor(100 + Math.random() * 90)
    };
    smartCameras.unshift(newCamera);
    res.json({ success: true, data: newCamera });
  });

  app.put('/api/smart-care/cameras/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = smartCameras.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Camera not found' });
    }
    smartCameras[index] = { ...smartCameras[index], ...updates };
    res.json({ success: true, data: smartCameras[index] });
  });

  app.delete('/api/smart-care/cameras/:id', (req, res) => {
    const { id } = req.params;
    smartCameras = smartCameras.filter((c) => c.id !== id);
    res.json({ success: true, message: 'Camera removed' });
  });

  // 3. Scan History Endpoints
  app.get('/api/smart-care/scans', (req, res) => {
    res.json({ success: true, data: smartScans });
  });

  app.post('/api/smart-care/scans', (req, res) => {
    const newRecord: TickScanRecord = {
      ...req.body,
      id: 'scan-' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      timestamp: new Date().toISOString()
    };
    smartScans.unshift(newRecord);
    res.json({ success: true, data: newRecord });
  });

  app.delete('/api/smart-care/scans/:id', (req, res) => {
    const { id } = req.params;
    smartScans = smartScans.filter((s) => s.id !== id);
    res.json({ success: true, message: 'Scan deleted' });
  });

  // 4. Alerts Endpoints
  app.get('/api/smart-care/alerts', (req, res) => {
    res.json({ success: true, data: smartAlerts });
  });

  app.post('/api/smart-care/alerts/read', (req, res) => {
    const { id } = req.body;
    if (id) {
      smartAlerts = smartAlerts.map((a) => (a.id === id ? { ...a, isRead: true } : a));
    } else {
      smartAlerts = smartAlerts.map((a) => ({ ...a, isRead: true }));
    }
    res.json({ success: true, data: smartAlerts });
  });

  // 5. Smart Care Settings & Admin Health
  app.get('/api/smart-care/settings', (req, res) => {
    res.json({ success: true, data: smartCareSettings });
  });

  app.put('/api/smart-care/settings', (req, res) => {
    smartCareSettings = { ...smartCareSettings, ...req.body };
    res.json({ success: true, data: smartCareSettings });
  });

  app.get('/api/smart-care/admin-stats', (req, res) => {
    const totalCameras = smartCameras.length;
    const onlineCameras = smartCameras.filter((c) => c.isOnline).length;
    const totalScans = smartScans.length;
    const detectedScans = smartScans.filter((s) => s.result.status === 'detected').length;
    const clearScans = smartScans.filter((s) => s.result.status === 'clear').length;

    res.json({
      success: true,
      data: {
        totalCameras,
        onlineCameras,
        offlineCameras: totalCameras - onlineCameras,
        totalScans,
        detectedScans,
        clearScans,
        detectionRate: totalScans > 0 ? Math.round((detectedScans / totalScans) * 100) : 0,
        streamingServerStatus: 'Operational (Low Latency 14ms)',
        aiVisionModelStatus: process.env.GEMINI_API_KEY ? 'Gemini 2.5 Flash Vision (Active)' : 'Development Simulation Mode (Active)',
        encryptionStandard: 'AES-256 Cloud Gateway',
        activeUsersMonitoring: 142
      }
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DoggyBhai full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
