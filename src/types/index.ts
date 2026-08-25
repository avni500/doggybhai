export interface ProductVariant {
  id: string;
  name: string;
  size?: 'S' | 'M' | 'L' | 'XL' | 'One Size';
  colorName?: string;
  colorHex?: string;
  sku?: string;
  price: number;
  mrp: number;
  stock: number;
  dimensions?: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  dogName?: string;
  dogBreed?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerified?: boolean;
  verifiedPurchase?: boolean;
  helpfulCount?: number;
  userImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku?: string;
  category: 'collars' | 'leashes' | 'bowls' | 'toys' | 'treats' | 'clothes' | 'beds' | 'grooming' | 'travel';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  features: string[];
  specifications?: Specification[];
  material: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  sizeGuide?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  images: string[];
  availableSizes: ('S' | 'M' | 'L' | 'XL' | 'One Size')[];
  availableColors: { name: string; hex: string }[];
  tags: string[];
  recommendedBreeds?: string[];
  matchingProductIds?: string[];
  customerReviews?: Review[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  isAvailable?: boolean;
  isUpcoming?: boolean;
  badge?: string;
}

export interface ComboOffer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  products: Product[];
  productIds?: string[];
  originalPrice: number;
  bundlePrice: number;
  savings?: number;
  savingsPercentage?: number;
  image: string;
  badgeText: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
  unitPrice: number;
  name?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface ShippingAddress {
  id?: string;
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode?: string;
  isDefault?: boolean;
  name?: string;
  houseFlat?: string;
  street?: string;
  area?: string;
  pinCode?: string;
  type?: 'Home' | 'Work' | 'Other';
}

export interface Address extends ShippingAddress {}

export interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
  mrp?: number;
}

export interface Order {
  id: string;
  orderNumber?: string;
  orderDate?: string;
  createdAt?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: CartItem[] | any[];
  subtotal: number;
  discountAmount?: number;
  couponCode?: string;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'Cash on Delivery' | 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'paid' | 'pending' | 'failed' | 'refunded';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  courierPartner?: string;
  estimatedDelivery: string;
  statusHistory?: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface DogProfile {
  id?: string;
  name: string;
  breed: string;
  ageYears: number;
  ageMonths: number;
  gender: 'Male' | 'Female';
  weightKg: number;
  sizeCategory: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  activityLevel?: 'Low' | 'Moderate' | 'High';
  pullingHabit?: 'Calm Walker' | 'Moderate Puller' | 'Heavy Puller';
  birthday?: string;
  photoUrl?: string;
  favoriteActivity?: string;
  specialNeeds?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isAdmin?: boolean;
  dogProfile?: DogProfile;
  savedAddresses?: ShippingAddress[];
  wishlistProductIds?: string[];
}

export interface Coupon {
  id?: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount?: number;
  minOrderValue?: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive?: boolean;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: string;
  publishDate: string;
  image: string;
  relatedProductCategory?: string;
  keyTakeaways?: string[];
}

export interface WebsiteSettings {
  announcementText: string;
  announcementLink?: string;
  freeShippingThreshold: number;
  standardShippingFee?: number;
  supportPhone?: string;
  supportEmail?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
  trustPoints?: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueChange?: number;
  ordersChange?: number;
  salesData?: { date: string; revenue: number; orders: number }[];
  topProducts?: { name: string; category: string; unitsSold: number; revenue: number }[];
  lowStockProducts: { id?: string; name: string; sku?: string; stock: number; category?: string }[];
}

// ================= DOGGYBHAI SMART CARE TYPES =================
export type TickScanArea =
  | 'HEAD'
  | 'EARS'
  | 'NECK'
  | 'CHEST'
  | 'BACK'
  | 'BELLY'
  | 'LEGS'
  | 'PAWS'
  | 'TAIL';

export interface SmartCamera {
  id: string;
  name: string;
  location: string;
  isOnline: boolean;
  lastActive: string;
  resolution?: string;
  batteryLevel?: number; // 0-100 or undefined if wired
  isWired?: boolean;
  streamUrl?: string;
  demoVideoType?: 'sleeping' | 'playing' | 'eating' | 'resting';
  remoteAccessEnabled: boolean;
  nightVisionMode?: 'auto' | 'on' | 'off';
  twoWayAudioEnabled?: boolean;
  motionAlertsEnabled?: boolean;
  isDemoStream: boolean;
  firmwareVersion?: string;
  ipAddress?: string;
}

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface TickDetectionResult {
  status: 'detected' | 'clear' | 'low_quality';
  confidencePercentage: number; // e.g. 82
  locationLabel: string; // e.g. "Near the upper back"
  boundingBox?: BoundingBox;
  title: string;
  summaryText: string;
  details: string;
  recommendedActions: string[];
  imageQualityScore: number; // 0-100
  qualityTips?: string[];
  isDemoModel: boolean;
  modelConfidenceLevel?: 'High' | 'Moderate' | 'Low';
  veterinaryNote: string;
}

export interface TickScanRecord {
  id: string;
  date: string;
  timestamp: string;
  dogName: string;
  dogBreed?: string;
  cameraName?: string;
  source: 'live_camera' | 'photo_upload' | 'device_camera';
  areaScanned: TickScanArea;
  result: TickDetectionResult;
  imageUrl: string;
  annotatedImageUrl?: string;
  notes?: string;
}

export interface SmartCareAlert {
  id: string;
  type: 'tick_detected' | 'camera_offline' | 'camera_online' | 'motion_detected' | 'scan_complete' | 'unusual_activity';
  title: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'alert';
  isRead: boolean;
  scanId?: string;
  cameraId?: string;
  actionUrl?: string;
}

export interface SmartCareSettings {
  enableLiveCam: boolean;
  enableAiTickCheck: boolean;
  enableMotionAlerts: boolean;
  enableCloudRecording: boolean;
  enableTwoWayAudio: boolean;
  enableNightVision: boolean;
  aiModelProvider: 'gemini-vision' | 'simulation-demo';
  confidenceThreshold: number;
  cameraStreamingQuality: '1080p' | '720p' | 'auto';
  remoteAccessEncryption: boolean;
  demoMode: boolean;
}

