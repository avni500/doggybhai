import {
  Product,
  CategoryItem,
  ComboOffer,
  GuideArticle,
  Coupon,
  WebsiteSettings,
  Review,
  SmartCamera,
  TickScanRecord,
  SmartCareAlert,
  SmartCareSettings
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ================= COLLARS (5 items) =================
  {
    id: 'prod-collar-1',
    slug: 'doggybhai-classic-collar',
    name: 'DoggyBhai Classic Collar',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    shortDescription: 'Comfortable adjustable collar with soft neoprene padding designed for everyday walks.',
    description: 'The DoggyBhai Classic Collar is crafted with military-grade high-density nylon webbing, lined with ultra-breathable neoprene padding to prevent chafing and fur matting. Featuring a quick-release zinc-alloy buckle and reinforced D-ring for leash attachment, this collar provides unmatched comfort, durability, and control during daily walks.',
    features: [
      'Soft breathable neoprene padding prevents skin irritation',
      'High-tensile nylon webbing tested up to 250kg pull force',
      'Rust-proof matte black zinc-alloy quick-release buckle',
      'Dual reinforced leash attachment D-rings',
      'Dedicated ID tag loop with noise silencer sleeve'
    ],
    specifications: [
      { label: 'Material', value: 'High-density nylon + Neoprene padding' },
      { label: 'Hardware', value: 'Zinc-alloy matte coated buckle & D-ring' },
      { label: 'Adjustability', value: 'Fully adjustable sliding triglide' },
      { label: 'Recommended Dog Size', value: 'Puppies to Large breeds (S, M, L, XL)' },
      { label: 'Closure Type', value: 'Heavy-duty quick release side buckle' },
      { label: 'Country of Origin', value: 'Handcrafted in India' }
    ],
    material: 'Premium Nylon Webbing, Closed-Cell Neoprene Padding, Zinc Alloy',
    careInstructions: 'Hand wash with mild pet-safe detergent in lukewarm water. Air dry away from direct heat.',
    sizeGuide: 'Small: 28-38 cm (Beagle, Pug, Shih Tzu) | Medium: 36-50 cm (Indie, Cocker Spaniel, Frenchie) | Large: 46-62 cm (Labrador, Golden Retriever, Boxer) | XL: 56-72 cm (German Shepherd, Rottweiler, Great Dane)',
    shippingInfo: 'Ships within 24 hours. Free express delivery across India on orders above ₹499.',
    returnPolicy: '30-day hassle-free exchange & returns if unworn with original tags attached.',
    price: 499,
    mrp: 699,
    discountPercentage: 29,
    rating: 4.8,
    reviewCount: 142,
    stock: 28,
    lowStockThreshold: 5,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Amber Orange', hex: '#FF6B00' },
      { name: 'Midnight Black', hex: '#18181B' },
      { name: 'Olive Green', hex: '#4D6B53' },
      { name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    tags: ['Best Seller', 'Everyday Wear', 'Padded', 'Adjustable'],
    recommendedBreeds: ['Indie', 'Labrador Retriever', 'Golden Retriever', 'Beagle', 'German Shepherd'],
    matchingProductIds: ['prod-leash-1', 'prod-bowl-2']
  },
  {
    id: 'prod-collar-2',
    slug: 'doggybhai-premium-leather-collar',
    name: 'DoggyBhai Premium Collar',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    shortDescription: 'Handcrafted artisan full-grain leather collar with solid antique brass hardware.',
    description: 'Elevate your dog’s look with our heirloom-quality DoggyBhai Premium Leather Collar. Individually handcrafted using full-grain vegetable-tanned harness leather that softens with age, creating a rich natural patina. Fitted with solid brass hardware that never tarnishes or rusts.',
    features: [
      '100% full-grain vegetable-tanned genuine leather',
      'Solid forged antique brass buckle and welded D-ring',
      'Hand-burnished and wax-sealed edges for anti-rubbing',
      'Laser-engraved DoggyBhai signature insignia',
      'Includes complementary custom brass nameplate tag'
    ],
    specifications: [
      { label: 'Material', value: 'Full-Grain Vegetable-Tanned Leather' },
      { label: 'Hardware', value: 'Solid Forged Brass (Corrosion-resistant)' },
      { label: 'Thickness', value: '4.2 mm heavy-duty double-layered' },
      { label: 'Buckle Type', value: 'Traditional roller pin buckle' },
      { label: 'Recommended Dog Size', value: 'Medium to Extra Large breeds' }
    ],
    material: 'Full-Grain Genuine Leather, Solid Brass',
    careInstructions: 'Wipe clean with a damp cloth. Apply pet-safe leather conditioner twice a year.',
    sizeGuide: 'Medium: 35-48 cm | Large: 45-60 cm | XL: 55-70 cm',
    shippingInfo: 'Custom boxed in premium canvas pouch. Express 2-day delivery.',
    returnPolicy: '30-day return policy. Lifetime warranty on brass hardware.',
    price: 999,
    mrp: 1499,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 96,
    stock: 15,
    lowStockThreshold: 4,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: [
      { name: 'Tan Brown', hex: '#8B4513' },
      { name: 'Vintage Mocha', hex: '#4A2E18' },
      { name: 'Jet Black', hex: '#111827' }
    ],
    tags: ['Luxury', 'Leather', 'Handcrafted', 'Heirloom'],
    recommendedBreeds: ['Golden Retriever', 'Labrador', 'Husky', 'German Shepherd', 'Doberman'],
    matchingProductIds: ['prod-leash-5', 'prod-bowl-1']
  },
  {
    id: 'prod-collar-3',
    slug: 'doggybhai-reflective-safety-collar',
    name: 'DoggyBhai Reflective Collar',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    shortDescription: 'High-visibility 3M Scotchlite reflective collar engineered for safe evening & night walks.',
    description: 'Keep your best buddy safe during early morning and late night strolls. The DoggyBhai Reflective Collar integrates double-woven 3M Scotchlite reflective stripes visible from over 300 meters away in vehicle headlights. Built with lightweight honeycomb air-mesh lining and a safety lock switch on the buckle.',
    features: [
      '360-degree high-intensity 3M Scotchlite reflective visibility',
      'Buckle-lock safety toggle prevents accidental unclipping',
      'Ultra-light breathable air-mesh padding for tropical comfort',
      'Waterproof nylon that resists dirt, rain, and mud',
      'Quick-dry antibacterial lining'
    ],
    specifications: [
      { label: 'Material', value: 'Scotchlite 3M Reflective Thread + Air-Mesh' },
      { label: 'Visibility Range', value: 'Up to 320 meters (1050 ft)' },
      { label: 'Buckle Safety', value: 'Integrated Slide-Lock safety switch' },
      { label: 'Weight', value: 'Ultralight 65g' }
    ],
    material: 'Reflective Polymer, Breathable Sandwich Mesh, POM Safety Clasp',
    careInstructions: 'Machine wash in laundry bag or hand wash cold. Dries within 20 minutes.',
    sizeGuide: 'Small: 26-36 cm | Medium: 34-48 cm | Large: 44-58 cm | XL: 54-68 cm',
    shippingInfo: 'Dispatched same day. Delivered in 2-4 business days.',
    returnPolicy: '30-day money-back guarantee.',
    price: 549,
    mrp: 799,
    discountPercentage: 31,
    rating: 4.7,
    reviewCount: 118,
    stock: 42,
    lowStockThreshold: 8,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Neon Safety Orange', hex: '#FF5722' },
      { name: 'Electric Lime', hex: '#84CC16' },
      { name: 'Stealth Black', hex: '#27272A' }
    ],
    tags: ['Night Safety', '3M Reflective', 'Breathable', 'Locking Buckle'],
    recommendedBreeds: ['Indie', 'Beagle', 'Pug', 'Labrador', 'Cocker Spaniel'],
    matchingProductIds: ['prod-leash-4', 'prod-bowl-3']
  },
  {
    id: 'prod-collar-4',
    slug: 'doggybhai-all-weather-adjustable-collar',
    name: 'DoggyBhai Adjustable Collar',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    shortDescription: '100% waterproof, odor-free TPU Biothane collar designed for beach, mud, and monsoons.',
    description: 'For active pups who love puddles, beach waves, and muddy parks. Made from premium coated Biothane webbing that is completely impervious to water, bacteria, and funky smells. Simply rinse with water and wipe dry in 5 seconds.',
    features: [
      '100% waterproof and mud-resistant coated webbing',
      'Zero odor retention – guaranteed never to stink',
      'Smooth flexible texture mimics soft leather without maintenance',
      'Electrophoresis coated black alloy hardware',
      'Extensive adjustability with 7 precision-punched holes'
    ],
    specifications: [
      { label: 'Material', value: 'High-grade TPU Coated Biothane Webbing' },
      { label: 'Waterproof Rating', value: '100% Submersible Waterproof' },
      { label: 'Odor Resistance', value: 'Zero pore bacteria absorption' },
      { label: 'Tensile Strength', value: '380 kg' }
    ],
    material: 'TPU Coated Polyester Biothane, Matte Coated Zinc',
    careInstructions: 'Simply wipe clean with water or soapy sponge. Dries instantly.',
    sizeGuide: 'Small: 25-35 cm | Medium: 35-48 cm | Large: 45-62 cm',
    shippingInfo: 'Fast dispatch within 24h. Pan-India shipping.',
    returnPolicy: '30-day exchange available.',
    price: 649,
    mrp: 899,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 74,
    stock: 19,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L'],
    availableColors: [
      { name: 'Pastel Coral', hex: '#FB7185' },
      { name: 'Forest Green', hex: '#15803D' },
      { name: 'Slate Grey', hex: '#64748B' }
    ],
    tags: ['Waterproof', 'Odor-Free', 'Monsoon Ready', 'Biothane'],
    recommendedBreeds: ['Golden Retriever', 'Labrador', 'Indie', 'Beagle', 'Husky'],
    matchingProductIds: ['prod-leash-1', 'prod-bowl-3']
  },
  {
    id: 'prod-collar-5',
    slug: 'doggybhai-puppy-comfort-collar',
    name: 'DoggyBhai Puppy Collar',
    category: 'collars',
    categoryLabel: 'Dog Collars',
    shortDescription: 'Featherlight ultra-soft organic cotton padded collar specially designed for growing pups.',
    description: 'Introduce your puppy to their very first collar with maximum gentleness. The DoggyBhai Puppy Collar features lightweight organic cotton weave with a quick-release breakaway safety clasp that ensures zero pressure on delicate neck muscles.',
    features: [
      'Ultra-soft brushed organic cotton webbing',
      'Weighs under 28 grams – barely noticeable for young puppies',
      'Breakaway safety release clip for accidental snag protection',
      'Includes gentle bell (removable) to locate your adventurous pup',
      'Expandable sizing fits throughout the first 6 months'
    ],
    specifications: [
      { label: 'Material', value: '100% Organic Soft Cotton Webbing' },
      { label: 'Target Age', value: '8 weeks to 9 months' },
      { label: 'Buckle', value: 'Safety Quick-Release Plastic Clasp' },
      { label: 'Weight', value: '28g (Featherweight)' }
    ],
    material: 'Brushed Organic Cotton, Eco-Friendly Polymer Hardware',
    careInstructions: 'Gentle hand wash in cold water.',
    sizeGuide: 'Puppy XS: 18-28 cm | Puppy S: 24-34 cm',
    shippingInfo: 'Includes free Puppy Onboarding Guidebook. Express delivery.',
    returnPolicy: '30-day returns accepted.',
    price: 399,
    mrp: 599,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 65,
    stock: 35,
    lowStockThreshold: 6,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M'],
    availableColors: [
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Blossom Pink', hex: '#F472B6' },
      { name: 'Buttercup Yellow', hex: '#FACC15' }
    ],
    tags: ['Puppy Special', 'Ultra Gentle', 'Lightweight', 'Breakaway'],
    recommendedBreeds: ['Shih Tzu', 'Pug', 'Indie Puppy', 'Golden Puppy', 'Lab Puppy'],
    matchingProductIds: ['prod-leash-1', 'prod-bowl-4']
  },

  // ================= LEASHES (5 items) =================
  {
    id: 'prod-leash-1',
    slug: 'doggybhai-everyday-comfort-leash',
    name: 'DoggyBhai Everyday Leash',
    category: 'leashes',
    categoryLabel: 'Dog Leashes',
    shortDescription: '5-foot heavy-duty nylon leash with dual neoprene padded handles for maximum comfort.',
    description: 'Engineered for seamless neighborhood walks and park runs. The DoggyBhai Everyday Leash features a primary padded handle plus a secondary close-control "traffic handle" situated 1.5 ft from the clip for crowded crossings, elevators, and passing other dogs.',
    features: [
      'Dual handles: standard 5ft walk handle + close-control traffic grip',
      'High-grade neoprene lining on both handles prevents leash burn',
      '360-degree anti-tangle swivel heavy-duty zinc alloy clip',
      'Reflective stitching on both sides for night visibility',
      'Built-in D-ring on handle to clip poop bag dispenser'
    ],
    specifications: [
      { label: 'Length', value: '5 Feet (1.5 Meters)' },
      { label: 'Width', value: '2.5 cm (1 Inch)' },
      { label: 'Tensile Load', value: 'Up to 280 kg force' },
      { label: 'Clip Type', value: '360° Rotating Tangle-Free Lobster Snap' },
      { label: 'Reflective', value: 'Dual-sided woven 3M reflective threads' }
    ],
    material: 'High-Density Reinforced Nylon, Neoprene Foam, Zinc Alloy',
    careInstructions: 'Spot clean with soapy sponge or gentle hand wash.',
    sizeGuide: 'Standard 5ft length (optimal balance of dog freedom and parent control)',
    shippingInfo: 'Dispatched within 24 hours. Express shipping available.',
    returnPolicy: '30-day exchange and returns.',
    price: 599,
    mrp: 849,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 184,
    stock: 32,
    lowStockThreshold: 6,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Amber Orange', hex: '#FF6B00' },
      { name: 'Midnight Black', hex: '#18181B' },
      { name: 'Army Green', hex: '#3F4E3C' },
      { name: 'Electric Cyan', hex: '#06B6D4' }
    ],
    tags: ['Best Seller', 'Dual Handle', 'Traffic Control', 'Padded Grip'],
    recommendedBreeds: ['Indie', 'Labrador', 'Golden Retriever', 'Beagle', 'German Shepherd'],
    matchingProductIds: ['prod-collar-1', 'prod-bowl-2']
  },
  {
    id: 'prod-leash-2',
    slug: 'doggybhai-mountain-rope-leash',
    name: 'DoggyBhai Rope Leash',
    category: 'leashes',
    categoryLabel: 'Dog Leashes',
    shortDescription: '6-foot climbing-grade braided mountain rope leash with genuine leather joint covers.',
    description: 'Inspired by alpine rock climbing ropes, this leash is virtually indestructible. Hand-stitched full-grain leather wraps protect the rope joints, while the dynamic braided core provides slight elastic shock absorption when energetic dogs pull.',
    features: [
      '1/2-inch thick rock-climbing braided dynamic rope',
      'Natural shock absorption cushions joint impact from sudden pulls',
      'Handmade leather caps cover reinforced machine-stitched splices',
      'Aviation-grade heavy duty 360° swivel carabiner with screw lock',
      'Comfortable rounded grip that sits naturally in your palm'
    ],
    specifications: [
      { label: 'Length', value: '6 Feet (1.8 Meters)' },
      { label: 'Rope Diameter', value: '12 mm (1/2 Inch)' },
      { label: 'Hardware', value: 'Aviation Aluminum Locking Carabiner' },
      { label: 'Joint Wrap', value: 'Genuine Vegetable-Tanned Cowhide Leather' }
    ],
    material: 'Polypropylene Braided Climbing Rope, Real Leather, Aluminum Alloy',
    careInstructions: 'Wipe rope with warm damp cloth. Keep leather wraps away from prolonged soaking.',
    sizeGuide: '6ft Length / 12mm thickness (Suitable for Medium & Large Breeds)',
    shippingInfo: 'Ships in eco-friendly cotton drawstring bag.',
    returnPolicy: '30-day return policy. 1-year anti-snap guarantee.',
    price: 799,
    mrp: 1199,
    discountPercentage: 33,
    rating: 4.8,
    reviewCount: 92,
    stock: 22,
    lowStockThreshold: 4,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Crimson Rust', hex: '#DC2626' },
      { name: 'Desert Sand', hex: '#D4B996' },
      { name: 'Onyx Charcoal', hex: '#27272A' }
    ],
    tags: ['Climbing Rope', 'Shock Absorbing', 'Heavy Duty', 'Leather Accent'],
    recommendedBreeds: ['Husky', 'German Shepherd', 'Labrador', 'Rottweiler', 'Indie'],
    matchingProductIds: ['prod-collar-2', 'prod-bowl-1']
  },
  {
    id: 'prod-leash-3',
    slug: 'doggybhai-long-line-training-leash',
    name: 'DoggyBhai Training Leash',
    category: 'leashes',
    categoryLabel: 'Dog Leashes',
    shortDescription: '15-foot recall and obedience training long line leash with anti-drag coating.',
    description: 'Perfect for recall training, open park freedom, beach exploration, and tracking drills. Gives your dog the sensation of being off-leash while keeping you in total control. The smooth flat webbing glides through grass and shrubs without snagging.',
    features: [
      '15-foot extended length for recall commands and distance training',
      'Ultra-lightweight yet tested to 200kg tensile pull strength',
      'Snag-free smooth gliding edge weave prevents brush entanglements',
      'Includes roll-up velcro storage strap for easy packing in your bag',
      'Bright high-contrast safety color scheme'
    ],
    specifications: [
      { label: 'Length', value: '15 Feet (4.5 Meters)' },
      { label: 'Webbing Width', value: '2.0 cm' },
      { label: 'Weight', value: '180g' },
      { label: 'Ideal For', value: 'Recall training, puppy schooling, field tracking' }
    ],
    material: 'Reinforced Polypropylene, Zinc Alloy Snap',
    careInstructions: 'Rinse off dirt under tap and air dry.',
    sizeGuide: '15ft Length (Universal for all training levels)',
    shippingInfo: 'Fast dispatch within 24h.',
    returnPolicy: '30-day satisfaction guarantee.',
    price: 699,
    mrp: 999,
    discountPercentage: 30,
    rating: 4.7,
    reviewCount: 57,
    stock: 18,
    lowStockThreshold: 4,
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Safety Orange', hex: '#FF6B00' },
      { name: 'Tactical Black', hex: '#18181B' }
    ],
    tags: ['Training', 'Recall Leash', '15 Feet', 'Field Freedom'],
    recommendedBreeds: ['Beagle', 'Indie', 'Golden Retriever', 'Pug', 'Cocker Spaniel'],
    matchingProductIds: ['prod-collar-3', 'prod-bowl-3']
  },
  {
    id: 'prod-leash-4',
    slug: 'doggybhai-reflective-night-leash',
    name: 'DoggyBhai Reflective Leash',
    category: 'leashes',
    categoryLabel: 'Dog Leashes',
    shortDescription: 'High-glow dual-sided 3M reflective leash with padded shock-absorbing bungee section.',
    description: 'Designed specifically for urban nighttime walking in Indian cities. Features full-length luminous 3M Scotchlite reflective stripes, plus an integrated bungee buffer section that absorbs sudden lunges towards cats or other street distractions.',
    features: [
      'Integrated heavy-duty elastic bungee absorbs sudden jerks and pull shock',
      'Double-sided 3M Scotchlite reflective stitching glow in headlights',
      'Soft padded neoprene handle protects wrists and knuckles',
      'Extra sturdy aviation snap lock mechanism',
      'Built-in car seatbelt buckle clip for safe car rides'
    ],
    specifications: [
      { label: 'Length', value: '4.5 ft static, extends to 6.0 ft on pull' },
      { label: 'Shock Absorption', value: 'Integrated heavy-duty bungee cord' },
      { label: 'Bonus Feature', value: 'Car safety seatbelt latch included' },
      { label: 'Reflective Area', value: 'Both edges, continuous 3M thread' }
    ],
    material: 'Scotchlite Reflective Nylon, Latex Bungee, Metal Hardware',
    careInstructions: 'Wipe clean with moist cloth.',
    sizeGuide: 'One Size / 4.5ft to 6ft Bungee extension',
    shippingInfo: 'Express delivery 2-3 business days.',
    returnPolicy: '30-day exchange window.',
    price: 649,
    mrp: 899,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 83,
    stock: 25,
    lowStockThreshold: 5,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Glow Orange', hex: '#FF5722' },
      { name: 'Neon Green', hex: '#84CC16' },
      { name: 'Stealth Grey', hex: '#475569' }
    ],
    tags: ['Anti-Shock Bungee', '3M Reflective', 'Car Seatbelt Clip', 'Night Walk'],
    recommendedBreeds: ['Labrador', 'Indie', 'Boxer', 'Golden Retriever', 'Husky'],
    matchingProductIds: ['prod-collar-3', 'prod-bowl-3']
  },
  {
    id: 'prod-leash-5',
    slug: 'doggybhai-artisan-leather-leash',
    name: 'DoggyBhai Premium Leash',
    category: 'leashes',
    categoryLabel: 'Dog Leashes',
    shortDescription: 'Mastercrafted top-grain leather leash with burnished edges and solid brass hardware.',
    description: 'The pinnacle of pet walking accessories. Built from a single continuous cut of thick top-grain harness leather with hand-stitched reinforcements at all stress points. Finished with solid antiqued brass hardware that exudes timeless luxury.',
    features: [
      'Single continuous cut of 4mm thick top-grain leather',
      'Hand-burnished, waxed edges for smooth feel against your skin',
      'Solid antique brass 360-degree swivel trigger clasp',
      'Ages gracefully, developing a gorgeous personalized patina',
      'Supple and comfortable from day one, no break-in needed'
    ],
    specifications: [
      { label: 'Length', value: '5 Feet (1.5 Meters)' },
      { label: 'Leather Thickness', value: '4.0 mm' },
      { label: 'Hardware', value: 'Solid Forged Brass (Tarnish-Proof)' },
      { label: 'Load Rating', value: '300 kg' }
    ],
    material: '100% Top-Grain Leather, Solid Antique Brass',
    careInstructions: 'Condition with beeswax leather balm every 3-6 months.',
    sizeGuide: '5ft Classic Length / 3/4" width',
    shippingInfo: 'Packed in signature DoggyBhai protective sleeve. Express courier.',
    returnPolicy: '30-day return policy. Lifetime hardware guarantee.',
    price: 1199,
    mrp: 1699,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 68,
    stock: 12,
    lowStockThreshold: 3,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Tan Brown', hex: '#8B4513' },
      { name: 'Mocha Coffee', hex: '#3E2723' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    tags: ['Luxury Leather', 'Solid Brass', 'Handcrafted', 'Heirloom'],
    recommendedBreeds: ['Golden Retriever', 'German Shepherd', 'Labrador', 'Doberman', 'Great Dane'],
    matchingProductIds: ['prod-collar-2', 'prod-bowl-1']
  },

  // ================= BOWLS (5 items) =================
  {
    id: 'prod-bowl-1',
    slug: 'doggybhai-stainless-steel-bowl',
    name: 'DoggyBhai Stainless Steel Bowl',
    category: 'bowls',
    categoryLabel: 'Dog Bowls',
    shortDescription: 'Heavyweight food-grade 304 stainless steel bowl with silicone bonded non-slip base.',
    description: 'The cleanest, most hygienic bowl for your dog. Made from premium non-porous food-grade 304 stainless steel that prevents chin acne and bacteria buildup. Features a double-wall weighted base fused with a molded silicone ring that stays firmly in place while eating.',
    features: [
      'Certified Food-Grade SS304 Stainless Steel (100% Lead & BPA Free)',
      'Bonded non-skid silicone ring base protects floors and stops sliding',
      'Non-porous mirror polish prevents bacterial growth and odor',
      'Dishwasher safe and rust-proof for life',
      'Stackable design for effortless storage and travel'
    ],
    specifications: [
      { label: 'Material', value: 'Food-Grade SS304 Stainless Steel + Silicone' },
      { label: 'Capacity', value: 'Medium: 800ml | Large: 1600ml | XL: 2400ml' },
      { label: 'Base Diameter', value: 'Medium: 20cm | Large: 24cm | XL: 28cm' },
      { label: 'Dishwasher Safe', value: 'Yes (Top and Bottom Rack Safe)' },
      { label: 'Anti-Slip Info', value: 'Full circumference bonded non-slip base' }
    ],
    material: 'Food-Grade 18/8 (304) Stainless Steel, Food-Grade Silicone',
    careInstructions: 'Dishwasher safe. Or rinse with warm water and pet-safe dish soap.',
    sizeGuide: 'Medium: 800ml (Pug, Beagle, Shih Tzu) | Large: 1600ml (Lab, Indie, Golden) | XL: 2400ml (German Shepherd, Mastiff, Giant breeds)',
    shippingInfo: 'Individually boxed in protective recyclable craft packaging.',
    returnPolicy: '30-day returns. Lifetime anti-rust guarantee.',
    price: 549,
    mrp: 799,
    discountPercentage: 31,
    rating: 4.9,
    reviewCount: 162,
    stock: 45,
    lowStockThreshold: 8,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['M', 'L', 'XL'],
    availableColors: [
      { name: 'Brushed Silver', hex: '#D1D5DB' },
      { name: 'Matte Matte Black', hex: '#1F2937' },
      { name: 'Amber Glow Coated', hex: '#EA580C' }
    ],
    tags: ['Food Grade 304', 'Anti-Bacterial', 'Non-Slip', 'Dishwasher Safe'],
    recommendedBreeds: ['All Breeds', 'Labrador', 'Indie', 'Golden Retriever', 'German Shepherd'],
    matchingProductIds: ['prod-collar-1', 'prod-leash-1']
  },
  {
    id: 'prod-bowl-2',
    slug: 'doggybhai-anti-slip-ceramic-bowl',
    name: 'DoggyBhai Anti-Slip Bowl',
    category: 'bowls',
    categoryLabel: 'Dog Bowls',
    shortDescription: 'Weighted heavy ceramic feeding bowl with built-in non-skid silicone base sleeve.',
    description: 'Say goodbye to flipped bowls and spilled kibble. The DoggyBhai Anti-Slip Bowl pairs artisanal heavy ceramic stoneware with an ergonomic tapered design. Its substantial weight prevents dogs from pushing it across tiles or marble floors.',
    features: [
      'Ultra-heavy ceramic construction prevents knocking and tipping',
      'Smooth high-fire glaze prevents kibble oil absorption and bacterial film',
      'Removable anti-slip bottom silicone boot for easy cleaning',
      'Microwave safe for gently warming wet food or bone broth',
      'Ergonomic shallow rim reduces whisker and neck fatigue'
    ],
    specifications: [
      { label: 'Material', value: 'High-Fired Stoneware Ceramic + Silicone Boot' },
      { label: 'Weight', value: '1.2 kg (Weighted anti-flip stability)' },
      { label: 'Capacity', value: 'Medium: 850ml | Large: 1700ml' },
      { label: 'Microwave Safe', value: 'Yes (Remove silicone boot before microwaving)' }
    ],
    material: 'Artisanal Ceramic, Food-Grade Silicone Boot',
    careInstructions: 'Dishwasher safe. Hand washing preserves high-gloss glaze sheen.',
    sizeGuide: 'Medium: 850ml (Small & Medium Dogs) | Large: 1700ml (Medium & Large Dogs)',
    shippingInfo: 'Double-bubble protected packaging with zero breakage guarantee.',
    returnPolicy: '30-day replacement in case of transit damage.',
    price: 699,
    mrp: 999,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 89,
    stock: 24,
    lowStockThreshold: 5,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['M', 'L'],
    availableColors: [
      { name: 'Warm Cream White', hex: '#FDFBF7' },
      { name: 'Charcoal Slate', hex: '#334155' },
      { name: 'Terracotta Orange', hex: '#EA580C' }
    ],
    tags: ['Heavyweight Ceramic', 'Anti-Tip', 'Microwave Safe', 'Whisker-Friendly'],
    recommendedBreeds: ['Pug', 'Frenchie', 'Indie', 'Beagle', 'Golden Retriever'],
    matchingProductIds: ['prod-collar-1', 'prod-leash-1']
  },
  {
    id: 'prod-bowl-3',
    slug: 'doggybhai-collapsible-travel-bowl',
    name: 'DoggyBhai Travel Bowl',
    category: 'bowls',
    categoryLabel: 'Dog Bowls',
    shortDescription: 'Collapsible food-grade silicone bowl with aluminum carabiner for walks, hikes & road trips.',
    description: 'Never leave home without fresh water for your dog. The DoggyBhai Travel Bowl collapses flat down to just 1.5 cm thick. Clip it onto your leash, backpack, or belt loop using the included rust-resistant carabiner.',
    features: [
      '100% BPA-Free food grade flexible platinum silicone',
      'Folds flat in seconds – fits easily into pockets or backpacks',
      'Includes sturdy aluminum carabiner clip',
      'Double-tier expansion: half open for small snacks, fully open for water',
      'Rigid top rim prevents messy water spills when carried'
    ],
    specifications: [
      { label: 'Material', value: '100% Platinum Cured Food Silicone' },
      { label: 'Folded Height', value: '1.5 cm (Ultra-compact)' },
      { label: 'Expanded Capacity', value: '650 ml' },
      { label: 'Weight', value: '75 grams' }
    ],
    material: 'Food-Grade Platinum Silicone, Aluminum Carabiner',
    careInstructions: 'Rinse with clean water or place on top rack of dishwasher.',
    sizeGuide: 'Universal 650ml (Expands in 2 volume steps)',
    shippingInfo: 'Dispatched within 24 hours.',
    returnPolicy: '30-day hassle free returns.',
    price: 349,
    mrp: 499,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 110,
    stock: 50,
    lowStockThreshold: 10,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'DoggyBhai Orange', hex: '#FF6B00' },
      { name: 'Sky Blue', hex: '#0EA5E9' },
      { name: 'Forest Moss', hex: '#16A34A' }
    ],
    tags: ['Travel Essential', 'Collapsible', 'Carabiner Included', 'Pocket Sized'],
    recommendedBreeds: ['All Dogs', 'Indie', 'Labrador', 'Beagle', 'Pug'],
    matchingProductIds: ['prod-leash-1', 'prod-collar-3']
  },
  {
    id: 'prod-bowl-4',
    slug: 'doggybhai-elevated-ergonomic-feeding-bowl',
    name: 'DoggyBhai Feeding Bowl',
    category: 'bowls',
    categoryLabel: 'Dog Bowls',
    shortDescription: '15-degree tilted elevated ergonomic feeding bowl to protect spine, neck & aid digestion.',
    description: 'Veterinarian recommended design that reduces neck strain and bloating. The 15-degree tilt and raised stand allow your dog to swallow kibble and water naturally without bending their spine at unnatural angles.',
    features: [
      '15° optimal ergonomic slant promotes healthy digestive transit',
      'Raised 10cm height relieves neck arthritis and joint tension',
      'Removable stainless steel inner bowl for easy daily washing',
      'Durable ABS base with non-marking anti-skid silicone pads',
      'Spill-catching rim keeps food off your clean floor tiles'
    ],
    specifications: [
      { label: 'Elevation Height', value: '10 cm front, 14 cm rear' },
      { label: 'Tilt Angle', value: '15 Degrees Veterinarian Optimal' },
      { label: 'Inner Bowl Material', value: 'Food-Grade Stainless Steel 304' },
      { label: 'Base Material', value: 'BPA-Free Eco ABS with non-skid feet' }
    ],
    material: 'Stainless Steel Inner Bowl + Heavy BPA-Free ABS Stand',
    careInstructions: 'Inner steel bowl is dishwasher safe. Wipe stand with damp cloth.',
    sizeGuide: 'Medium: Suitable for Small/Medium breeds | Large: Suitable for Medium/Large breeds',
    shippingInfo: 'Carefully packaged with shock absorption cushion.',
    returnPolicy: '30-day returns accepted.',
    price: 799,
    mrp: 1199,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 95,
    stock: 20,
    lowStockThreshold: 4,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['M', 'L'],
    availableColors: [
      { name: 'Warm Cream White', hex: '#FFFBF5' },
      { name: 'Modern Charcoal', hex: '#1F2937' }
    ],
    tags: ['Ergonomic 15°', 'Orthopedic Relief', 'Digestion Helper', 'Elevated'],
    recommendedBreeds: ['Indie', 'Golden Retriever', 'Labrador', 'French Bulldog', 'Pug'],
    matchingProductIds: ['prod-collar-1', 'prod-leash-1']
  },
  {
    id: 'prod-bowl-5',
    slug: 'doggybhai-splash-free-slow-water-bowl',
    name: 'DoggyBhai Water Bowl',
    category: 'bowls',
    categoryLabel: 'Dog Bowls',
    shortDescription: 'Zero-splash floating disk slow-water bowl that stops wet beards, choking, and floor puddles.',
    description: 'Keep your floors dry and your dog’s beard clean. The DoggyBhai Water Bowl features an ingenious floating disk that dispenses water only when your dog presses their tongue against it. Slows down fast drinkers to prevent vomiting and choking.',
    features: [
      'Patented floating disk regulates water dispensing automatically',
      'Stops 99% of floor splashes and keeps dog beards completely dry',
      'Slows down hurried gulping to prevent vomiting, gas, and choking',
      'Keeps dust, fur, and airborne debris out of the fresh water reservoir',
      'Large 1.5-liter capacity keeps medium and large dogs hydrated all day'
    ],
    specifications: [
      { label: 'Capacity', value: '1.5 Liters (50 oz)' },
      { label: 'Mechanism', value: 'Self-regulating floating buoyant plate' },
      { label: 'Anti-Splash Rim', value: 'Curved spill-proof edge border' },
      { label: 'Anti-Slip Info', value: '4 non-marking rubber base pads' }
    ],
    material: 'Food-Grade ABS & PP Polymer (Non-Toxic, BPA-Free)',
    careInstructions: 'Disassemble floating disk weekly and wash with warm soapy water.',
    sizeGuide: '1.5L Capacity (Ideal for all dog breeds and multi-pet homes)',
    shippingInfo: 'Express delivery 2-4 days.',
    returnPolicy: '30-day money-back guarantee.',
    price: 649,
    mrp: 899,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 124,
    stock: 28,
    lowStockThreshold: 5,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Pure White & Orange', hex: '#FF6B00' },
      { name: 'Soft Grey', hex: '#6B7280' }
    ],
    tags: ['Zero Splash', 'Dry Beard', 'Slow Drinker', 'Anti-Choke'],
    recommendedBreeds: ['Golden Retriever', 'Labrador', 'Shih Tzu', 'Indie', 'Saint Bernard'],
    matchingProductIds: ['prod-bowl-1', 'prod-collar-1']
  },
  // ================= SMART CARE TECH (2 items) =================
  {
    id: 'prod-smart-cam-1',
    slug: 'doggybhai-smart-care-camera',
    name: 'DoggyBhai Smart Care Camera',
    category: 'travel',
    categoryLabel: 'Smart Care Tech',
    shortDescription: '1080p HD pet monitor with live streaming, two-way audio, night vision, and AI-assisted visual screening compatibility.',
    description: 'The DoggyBhai Smart Care Camera connects seamlessly with your DoggyBhai account to give pet parents peace of mind while away. Features wide-angle 1080p Full HD video, infrared night vision, crystal-clear two-way audio to soothe anxious pups, smart motion alerts, and seamless integration with DoggyBhai AI Tick Check for remote coat screenings.',
    features: [
      'Live 1080p Full HD crystal-clear video streaming with 130° wide-angle view',
      'Two-Way Audio with noise cancellation — talk and listen to your dog',
      'Infrared Night Vision up to 8 meters in total darkness',
      'Smart Motion & Sound Alerts pushed directly to your phone and dashboard',
      'Direct Smart Live Check button for AI coat screening from live video frames',
      'End-to-End Encrypted private stream accessible only through your account'
    ],
    specifications: [
      { label: 'Resolution', value: '1080p Full HD (1920 x 1080 @ 30fps)' },
      { label: 'Field of View', value: '130° Ultra-Wide Diagonal Lens' },
      { label: 'Audio', value: 'Built-in high sensitivity mic and 2W speaker' },
      { label: 'Connectivity', value: '2.4 GHz Wi-Fi (802.11 b/g/n) + BLE 5.0' },
      { label: 'Power Source', value: '5V/2A USB-C Cable + Wall Adapter (Included)' },
      { label: 'Night Vision', value: '6 High-Power 850nm IR LEDs with Auto-Filter' },
      { label: 'Mounting Options', value: 'Magnetic base + Wall-mount bracket included' }
    ],
    material: 'Matte ABS Polycarbonate, Scratch-Resistant Optical Glass',
    careInstructions: 'Wipe lens with clean microfiber cloth. Keep away from water submersion (indoor use).',
    sizeGuide: 'Compact Form Factor: 9.5 cm x 6.2 cm x 6.2 cm | Weight: 180 grams',
    shippingInfo: 'Ships within 24 hours. Includes 1-Year Comprehensive Warranty and Free Cloud Setup Assistance.',
    returnPolicy: '30-day money-back guarantee with free doorstep pickup.',
    price: 2999,
    mrp: 4499,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 89,
    stock: 42,
    lowStockThreshold: 8,
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Pure White & Amber Accent', hex: '#FF6B00' },
      { name: 'Midnight Charcoal', hex: '#18181B' }
    ],
    tags: ['Smart Care', '1080p HD', 'Two-Way Audio', 'Night Vision', 'AI Check Compatible'],
    recommendedBreeds: ['All Breeds', 'Puppies', 'Anxious Dogs', 'Solo Home Dogs'],
    matchingProductIds: ['prod-collar-1', 'prod-leash-1', 'prod-bowl-1']
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-collars',
    slug: 'collars',
    name: 'Dog Collars',
    description: 'Handcrafted padded, leather & reflective collars built for everyday comfort & security.',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
    isAvailable: true,
    badge: 'Popular'
  },
  {
    id: 'cat-leashes',
    slug: 'leashes',
    name: 'Dog Leashes',
    description: 'Durable nylon, climbing rope & leather leashes with traffic handles & shock absorption.',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
    isAvailable: true,
    badge: 'Top Rated'
  },
  {
    id: 'cat-bowls',
    slug: 'bowls',
    name: 'Dog Bowls',
    description: 'Food-grade stainless steel, weighted ceramic, anti-slip & ergonomic feeding bowls.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
    isAvailable: true,
    badge: 'Hygienic'
  },
  // Future categories (Coming Soon)
  {
    id: 'cat-toys',
    slug: 'toys',
    name: 'Dog Toys',
    description: 'Ultra-durable natural rubber chew toys, rope tuggers, and interactive puzzle treats.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  },
  {
    id: 'cat-treats',
    slug: 'treats',
    name: 'Dog Treats',
    description: 'Single-ingredient dehydrated meat treats, training bites, and dental wellness chews.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  },
  {
    id: 'cat-clothes',
    slug: 'clothes',
    name: 'Dog Clothes',
    description: 'Breathable monsoon raincoats, cozy winter fleece vests, and celebration bowties.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  },
  {
    id: 'cat-beds',
    slug: 'beds',
    name: 'Dog Beds',
    description: 'Orthopedic memory foam mattresses with waterproof washable linen covers.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  },
  {
    id: 'cat-grooming',
    slug: 'grooming',
    name: 'Grooming',
    description: 'Ayurvedic coat shampoos, silicone deshedding brushes, and organic paw balms.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  },
  {
    id: 'cat-travel',
    slug: 'travel',
    name: 'Travel Accessories',
    description: 'Waterproof car seat protectors, airline-approved carriers, and portable travel kits.',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    itemCount: 0,
    isAvailable: false,
    badge: 'Coming Soon'
  }
];

export const COMBO_OFFERS: ComboOffer[] = [
  {
    id: 'combo-walk-essentials',
    title: 'WALK ESSENTIALS BUNDLE',
    tagline: 'Collar + Leash Pairing',
    description: 'Pair our best-selling DoggyBhai Classic Padded Collar with the matching Everyday Traffic Leash for ultimate daily walk confidence.',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[5]],
    productIds: ['prod-collar-1', 'prod-leash-1'],
    originalPrice: 1098,
    bundlePrice: 899,
    savings: 199,
    savingsPercentage: 18,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Save ₹199'
  },
  {
    id: 'combo-feeding-essentials',
    title: 'FEEDING ESSENTIALS BUNDLE',
    tagline: 'Food Bowl + Water Bowl Duo',
    description: 'Keep your feeding station clean and hygienic with our SS304 Stainless Steel Food Bowl and Zero-Splash Slow Water Bowl.',
    products: [INITIAL_PRODUCTS[10], INITIAL_PRODUCTS[14]],
    productIds: ['prod-bowl-1', 'prod-bowl-5'],
    originalPrice: 1198,
    bundlePrice: 999,
    savings: 199,
    savingsPercentage: 17,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Save ₹199'
  },
  {
    id: 'combo-puppy-starter',
    title: 'PUPPY STARTER KIT',
    tagline: 'Collar + Leash + Travel Bowl Trio',
    description: 'Everything a new puppy parent needs on day one: Featherlight Puppy Collar, Everyday Leash, and Collapsible Travel Bowl.',
    products: [INITIAL_PRODUCTS[4], INITIAL_PRODUCTS[5], INITIAL_PRODUCTS[12]],
    productIds: ['prod-collar-5', 'prod-leash-1', 'prod-bowl-3'],
    originalPrice: 1347,
    bundlePrice: 1099,
    savings: 248,
    savingsPercentage: 18,
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Complete Kit'
  }
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-collar-1',
    authorName: 'Rohan Sharma',
    dogBreed: 'Golden Retriever (2 yrs)',
    rating: 5,
    title: 'Super soft padding, my dog loves it!',
    comment: 'The neoprene lining is a game changer. Previous collars caused neck chafing, but this DoggyBhai collar has kept my dog comfortable on 5km daily walks. The orange color looks stunning on golden fur!',
    date: '12 Aug 2026',
    isVerified: true,
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    productId: 'prod-collar-1',
    authorName: 'Priya Nambiar',
    dogBreed: 'Indie Dog (1.5 yrs)',
    rating: 5,
    title: 'Top notch quality & quick delivery in Bengaluru',
    comment: 'Adjustability is smooth and the metal buckle feels heavy-duty. Received the package within 2 days. Highly recommend to all pet parents!',
    date: '18 Aug 2026',
    isVerified: true,
    helpfulCount: 19
  },
  {
    id: 'rev-3',
    productId: 'prod-leash-1',
    authorName: 'Amitav Sengupta',
    dogBreed: 'Labrador (3 yrs)',
    rating: 5,
    title: 'The traffic handle gives so much peace of mind',
    comment: 'Living in an apartment with busy elevators and street dogs outside, the short traffic handle lets me pull my dog close instantly. Padded grip prevents burns.',
    date: '05 Aug 2026',
    isVerified: true,
    helpfulCount: 31
  },
  {
    id: 'rev-4',
    productId: 'prod-bowl-1',
    authorName: 'Dr. Ananya Roy',
    dogBreed: 'Medium Breed (4 yrs)',
    rating: 5,
    title: 'Genuine food grade steel, zero slip on marble',
    comment: 'As a vet, I always advise clients to avoid cheap plastic bowls that breed bacteria. This DoggyBhai SS304 bowl is heavy, solid, and the silicone base stays put.',
    date: '28 Jul 2026',
    isVerified: true,
    helpfulCount: 42
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'DOGGY10',
    description: '10% instant discount on all orders',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 300,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'FIRST10',
    description: 'Flat ₹100 off on your very first order',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 699,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'PACK20',
    description: '20% off on orders above ₹1499',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 1499,
    maxDiscount: 600,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'FREESHIP',
    description: 'Free standard shipping on any cart value',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 299,
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: 'guide-1',
    slug: 'how-to-choose-the-right-dog-collar',
    title: 'How to Choose the Right Dog Collar for Your Dog',
    excerpt: 'Explore the key differences between padded nylon, genuine leather, waterproof biothane, and reflective night collars.',
    content: `Choosing the right collar for your dog is one of the most important decisions you will make as a pet parent. A collar is not just a fashion accessory — it holds identification tags, provides leash control, and stays against your dog’s skin 24 hours a day.

### 1. Padded Nylon for Daily Comfort
If you have an active dog who loves daily park walks, padded nylon collars with breathable neoprene lining are the golden standard. The soft neoprene prevents friction burns, especially for short-haired breeds like Beagles, Pugs, and Indies.

### 2. Full-Grain Leather for Classic Longevity
Leather collars age with beauty. Handcrafted vegetable-tanned leather softens with your dog’s natural body heat and oils, creating a customized fit that can last for years. Avoid cheap bonded "PU leather" which cracks and absorbs sweat.

### 3. Waterproof Biothane for Monsoons & Beach Lovers
If your dog loves swimming or running through muddy puddles during Indian monsoons, Biothane collars are 100% waterproof and odor-free. They wipe dry in 5 seconds and prevent bacterial skin dampness.

### 4. The Two-Finger Rule
Always ensure you can comfortably slip two fingers between your dog’s neck and the collar. If it is too tight, it will restrict breathing; if too loose, your dog might back out of it during loud traffic.`,
    category: 'Sizing & Fitting',
    readTime: '4 min read',
    author: 'DoggyBhai Canine Care Team',
    publishDate: 'Aug 15, 2026',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'collars',
    keyTakeaways: [
      'Use the 2-finger rule to ensure optimal neck fit',
      'Neoprene padding prevents chafing on short-coated breeds',
      'Choose waterproof Biothane for monsoon walks',
      'Inspect buckle integrity every 3 months'
    ]
  },
  {
    id: 'guide-2',
    slug: 'how-to-measure-your-dog-for-a-collar',
    title: 'How to Accurately Measure Your Dog’s Neck Size',
    excerpt: 'Step-by-step sizing guide using a flexible measuring tape or string to guarantee zero returns.',
    content: `Getting the right collar size on your first order saves you the hassle of exchanges. Here is the foolproof 3-step measuring routine used by professional canine trainers.

### Step 1: Locate the Base of the Neck
Measure around the lowest part of your dog’s neck, right where their collar naturally rests above the shoulders.

### Step 2: Apply the Two-Finger Breathing Buffer
Take a soft tailor’s tape measure and wrap it around the neck. Slip two flat fingers beneath the tape. The measurement you read with your fingers in place is your dog's true collar size.

### What If You Do Not Have a Measuring Tape?
Use a piece of string or phone charging cable. Wrap it around their neck, mark the meeting point with a pen, and lay it flat against a standard 30cm ruler.

### Typical Size Benchmarks by Breed:
* **Small (28-38 cm):** Beagle, Shih Tzu, French Bulldog, Pug, Lhasa Apso
* **Medium (36-50 cm):** Indie / Desi Dog, Cocker Spaniel, Border Collie
* **Large (46-62 cm):** Labrador Retriever, Golden Retriever, Boxer, Doberman
* **Extra Large (56-72 cm):** German Shepherd, Rottweiler, Great Dane, Mastiff`,
    category: 'Sizing & Fitting',
    readTime: '3 min read',
    author: 'DoggyBhai Sizing Specialist',
    publishDate: 'Aug 10, 2026',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'collars',
    keyTakeaways: [
      'Measure at the natural lower resting point of the neck',
      'Always add 2 fingers of breathing room',
      'If in between sizes, choose the larger size for adjustability'
    ]
  },
  {
    id: 'guide-3',
    slug: 'how-to-choose-the-right-dog-leash',
    title: 'How to Choose the Right Leash for Urban Walking',
    excerpt: 'Standard 5ft vs Climbing Rope vs 15ft Long Lines: Which leash matches your dog’s walking temperament?',
    content: `A leash is your lifeline to your dog in public spaces. In Indian cities with bustling traffic, stray dogs, and narrow sidewalks, leash choice is critical for safety.

### 1. The 5-Foot Everyday Leash with Traffic Handle
For regular city walks, a 5-foot leash is the sweet spot. It provides adequate sniffing freedom while keeping your dog within arm’s reach. The secondary traffic handle positioned near the clasp is invaluable when passing aggressive street dogs or crossing busy roads.

### 2. Mountain Braided Rope Leash
For strong pullers and large breeds like German Shepherds and Huskies, braided dynamic climbing ropes provide slight shock elasticity that cushions your wrists and shoulders.

### 3. Why Trainers Avoid Retractable Flexi-Leashes
Thin cord retractable leashes can snap under sudden lunges, burn human fingers, and encourage pulling by constantly exerting tension on the dog’s neck. Fixed-length padded leashes foster calm leash manners.`,
    category: 'Dog Walking',
    readTime: '5 min read',
    author: 'Dr. Kabir Verma (Certified Dog Behaviorist)',
    publishDate: 'Aug 04, 2026',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'leashes',
    keyTakeaways: [
      '5-foot length provides optimal control in urban environments',
      'Dual handles prevent leash burn during sudden street crossings',
      'Climbing rope absorbs shock from heavy lungers'
    ]
  },
  {
    id: 'guide-4',
    slug: 'how-to-choose-the-right-dog-bowl',
    title: 'How to Choose the Right Dog Bowl: Steel, Ceramic, or Elevated?',
    excerpt: 'Prevent canine chin acne, gulping, and spinal strain with the right feeding bowl design.',
    content: `Did you know that black spots or bumps on your dog’s chin (canine acne) are frequently caused by microscopic bacteria living inside tiny scratches on plastic bowls?

### 1. Food-Grade 304 Stainless Steel: The Gold Standard
Stainless steel is non-porous, rust-free, and dishwasher sterilizable. Pair it with a bonded non-slip base so your dog does not push their dinner across the living room.

### 2. Weighted Ceramic for Tippers
If your puppy loves flipping bowls or pawing at their water dish, a heavy stoneware ceramic bowl with a silicone boot provides unshakeable stability.

### 3. Elevated Ergonomic Bowls for Senior Dogs & Deep-Chested Breeds
Deep-chested breeds (Labradors, Boxers, Golden Retrievers) and senior dogs with arthritis benefit immensely from 15-degree tilted raised bowls. Raising food reduces air swallowing (aerophagia) and eases esophageal digestion.

### 4. Zero-Splash Slow Water Dispensers
If your dog leaves a trail of dripping slobber after every drink, floating disk bowls only release water upon tongue pressure, keeping beards and floors bone dry.`,
    category: 'Health & Nutrition',
    readTime: '4 min read',
    author: 'DoggyBhai Nutrition & Wellness Team',
    publishDate: 'Jul 29, 2026',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'bowls',
    keyTakeaways: [
      'Ditch scratched plastic bowls to eliminate bacterial chin acne',
      'Food-grade 304 stainless steel is the most hygienic material',
      'Elevated bowls protect aging necks and promote healthy digestion'
    ]
  },
  {
    id: 'guide-5',
    slug: 'puppy-essentials-checklist',
    title: 'The Ultimate Puppy Essentials Checklist for Indian Homes',
    excerpt: 'Everything you need before bringing your new puppy home: from safe collars to feeding setups.',
    content: `Welcoming a new puppy into your family is pure joy! To avoid last-minute panic, here is the complete checklist of essentials every puppy parent needs on Day 1.

### 1. Ultra-Light Puppy Collar
Start with a lightweight breakaway cotton collar. Let the puppy wear it around the house for 10 minutes at a time with praise and treats so they associate it with positive experiences.

### 2. Feeding & Hydration Station
Set up two separate bowls: one for nutrient-dense puppy meals and one for fresh filtered water. Choose bowls with rubber anti-skid bases.

### 3. 5-Foot Lightweight Leash
Do not use heavy metal chains or thick ropes on young pups under 4 months. Use a soft nylon leash.

### 4. Travel Water Bowl
Puppies dehydrate quickly in warm Indian weather. Always carry a collapsible silicone bowl on car visits to the vet.`,
    category: 'Puppy Care',
    readTime: '4 min read',
    author: 'DoggyBhai Puppy Onboarding Team',
    publishDate: 'Jul 22, 2026',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'collars',
    keyTakeaways: [
      'Introduce lightweight collars gradually with positive reinforcement',
      'Keep fresh water accessible 24/7 in non-tip bowls',
      'Stock a collapsible bowl for vet trips and vaccinations'
    ]
  },
  {
    id: 'guide-6',
    slug: 'dog-walking-safety-tips',
    title: 'Safe Dog Walking Tips in Indian Cities',
    excerpt: 'Handling street dog encounters, hot asphalt pavement, monsoon puddles, and night visibility.',
    content: `Walking your dog in Indian neighborhoods comes with unique challenges: summer pavement heat, monsoon waterlogging, street dog packs, and dark alleys.

### 1. The 7-Second Pavement Heat Test
In summer months, place the back of your palm firmly against the asphalt road for 7 continuous seconds. If it is too hot for your hand, it will burn your dog’s paw pads. Walk early morning before 7:30 AM or late evening.

### 2. How to Handle Street Dog Encounters
Never panic or pull your dog into the air. Keep your leash short using the traffic handle, avoid eye contact with street packs, and walk calmly in a wide curve. Carry a few biscuits to toss as a distraction if needed.

### 3. Night Safety with 3M Reflectors
Most streetlights in residential colonies have dark patches. Equipping your dog with 3M reflective collar and leash ensures autos and two-wheelers spot your pet from 300 meters away.`,
    category: 'Dog Walking',
    readTime: '5 min read',
    author: 'DoggyBhai Pack Safety Squad',
    publishDate: 'Jul 15, 2026',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    relatedProductCategory: 'leashes',
    keyTakeaways: [
      'Always test road temperature with the 7-second palm test',
      'Equip reflective gear for evening walks',
      'Stay calm and use a short traffic handle when near street packs'
    ]
  }
];

export const FAQ_ITEMS = [
  {
    category: 'Orders & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We support all major Indian payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking (over 50 Indian banks), and Cash on Delivery (COD) on eligible pin codes.'
  },
  {
    category: 'Orders & Payments',
    question: 'How do I apply a discount coupon code?',
    answer: 'You can enter your coupon code (such as DOGGY10 or FIRST10) directly on the Cart page or during Step 3 of Checkout. The discount will instantly reflect in your total payable amount.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does delivery take across India?',
    answer: 'Orders are dispatched from our fulfillment center within 24 hours. Metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) typically receive deliveries in 2–3 business days. Other regions take 3–5 business days.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you offer free shipping?',
    answer: 'Yes! All orders of ₹499 and above qualify for Free Standard Delivery across India. For orders below ₹499, a nominal shipping charge of ₹50 applies.'
  },
  {
    category: 'Sizing & Products',
    question: 'How do I know which collar size to order for my dog?',
    answer: 'Measure the circumference of your dog’s neck using a soft tape at the lower resting position, and add 2 fingers of space. Check our detailed interactive Size Guide table on every product page for breed recommendations.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return and exchange policy?',
    answer: 'We offer a 30-day hassle-free exchange & return policy. If the collar size does not fit your dog or if you are not 100% satisfied, simply initiate an exchange from your My Account dashboard. We arrange free reverse doorstep pickup.'
  },
  {
    category: 'Account & Pet Profile',
    question: 'What is the "My Dog" profile feature?',
    answer: 'The "My Dog" feature allows pet parents to save their dog’s breed, age, size, weight, and birthday. Our system then automatically tailors product sizes, bundle recommendations, and birthday treats specifically for your dog!'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    dogName: '@doggybhai_walks',
    caption: 'Sunday morning trail walks with our DoggyBhai Classic Collars! 🐾',
    likes: 428
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    dogName: '@citypups_india',
    caption: 'Looking classy in the artisan leather collar. Quality is 10/10! 🐶✨',
    likes: 612
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80',
    dogName: '@bangalore_dogs',
    caption: 'Ready for the evening walk with safety reflectors glowing! 🧡',
    likes: 389
  },
  {
    id: 'insta-4',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    dogName: '@petparent_club',
    caption: 'Best investment for fast eaters. Zero messes on the floor! 🥣',
    likes: 540
  },
  {
    id: 'insta-5',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=600&q=80',
    dogName: '@pawsome_journeys',
    caption: 'Puppy starter kit unboxed! Our puppy is in love with this soft collar.',
    likes: 715
  },
  {
    id: 'insta-6',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80',
    dogName: '@indie_adventures',
    caption: 'The double traffic handle leash makes city walks so peaceful. 🐾🐕',
    likes: 490
  }
];

export const INITIAL_SETTINGS: WebsiteSettings = {
  announcementText: '🐾 Free Express Delivery across India on orders above ₹499 | Use code DOGGY10 for 10% OFF',
  announcementLink: '/offers',
  freeShippingThreshold: 499,
  standardShippingFee: 50,
  supportPhone: '+91 98765 43210',
  supportEmail: 'support@doggybhai.com',
  whatsappNumber: '+91 98765 43210',
  instagramHandle: '@doggybhai.official',
  trustPoints: [
    {
      title: 'Durable Dog-Grade Craft',
      description: 'Tested materials with military-grade stitching and rust-free hardware.',
      icon: 'ShieldCheck'
    },
    {
      title: '30-Day Hassle-Free Returns',
      description: 'Doorstep pickup & instant exchanges if sizing isn’t 100% perfect.',
      icon: 'RefreshCw'
    },
    {
      title: 'Fast Pan-India Delivery',
      description: 'Dispatched within 24h from our local fulfillment centers.',
      icon: 'Truck'
    },
    {
      title: '100% Secure Checkout',
      description: 'Encrypted UPI, Cards, NetBanking & COD payment options.',
      icon: 'Lock'
    }
  ]
};

// ================= DOGGYBHAI SMART CARE MOCK DATA =================

export const INITIAL_CAMERAS: SmartCamera[] = [
  {
    id: 'cam-bed-area',
    name: 'Pet Bed Area',
    location: 'Master Bedroom / Dog Bed',
    isOnline: true,
    lastActive: 'Just now',
    resolution: '1080p Full HD',
    batteryLevel: 94,
    isWired: false,
    demoVideoType: 'resting',
    remoteAccessEnabled: true,
    nightVisionMode: 'auto',
    twoWayAudioEnabled: true,
    motionAlertsEnabled: true,
    isDemoStream: true,
    firmwareVersion: 'v2.4.1-doggy-pro',
    ipAddress: '192.168.1.142'
  },
  {
    id: 'cam-living-room',
    name: 'Living Room',
    location: 'Main Hall / Balcony Door',
    isOnline: true,
    lastActive: '2 mins ago',
    resolution: '1080p Full HD',
    isWired: true,
    demoVideoType: 'sleeping',
    remoteAccessEnabled: true,
    nightVisionMode: 'auto',
    twoWayAudioEnabled: true,
    motionAlertsEnabled: true,
    isDemoStream: true,
    firmwareVersion: 'v2.4.1-doggy-pro',
    ipAddress: '192.168.1.155'
  },
  {
    id: 'cam-play-area',
    name: 'Play Area',
    location: 'Garden Lawn & Porch',
    isOnline: true,
    lastActive: '5 mins ago',
    resolution: '1080p Full HD',
    batteryLevel: 78,
    isWired: false,
    demoVideoType: 'playing',
    remoteAccessEnabled: true,
    nightVisionMode: 'off',
    twoWayAudioEnabled: true,
    motionAlertsEnabled: false,
    isDemoStream: true,
    firmwareVersion: 'v2.3.8-doggy-pro',
    ipAddress: '192.168.1.189'
  },
  {
    id: 'cam-kennel',
    name: 'Kennel / Backyard',
    location: 'Outdoor Rest Area',
    isOnline: false,
    lastActive: '2 days ago',
    resolution: '1080p Full HD',
    batteryLevel: 0,
    isWired: false,
    demoVideoType: 'resting',
    remoteAccessEnabled: false,
    nightVisionMode: 'auto',
    twoWayAudioEnabled: false,
    motionAlertsEnabled: false,
    isDemoStream: true,
    firmwareVersion: 'v2.2.0',
    ipAddress: '192.168.1.201'
  }
];

export const INITIAL_SCAN_HISTORY: TickScanRecord[] = [
  {
    id: 'scan-101',
    date: 'August 24, 2026',
    timestamp: '2026-08-24T18:45:00Z',
    dogName: 'My Dog',
    dogBreed: 'Labrador Retriever',
    cameraName: 'Living Room Cam',
    source: 'live_camera',
    areaScanned: 'BACK',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    result: {
      status: 'detected',
      confidencePercentage: 82,
      locationLabel: 'Near the upper back (dorsal region)',
      boundingBox: {
        x: 48,
        y: 35,
        width: 14,
        height: 14
      },
      title: 'POSSIBLE TICK-LIKE OBJECT DETECTED',
      summaryText: 'We found an object in the image that visually resembles a tick.',
      details: 'Visual screening detected a dark, rounded nodular structure resting against the fur follicles near the upper thoracic dorsal area with distinct contrast against the coat.',
      recommendedActions: [
        'Gently part the fur around the upper back using clean fingers or a fine-tooth comb.',
        'Visually inspect the area under bright natural lighting to determine if it is a tick, skin tag, seed, or dried debris.',
        'If confirmed to be a tick, use a sanitized fine-tipped tick removal tool to extract gently without squeezing the body.',
        'Consult a certified veterinarian for appropriate tick prevention treatments and parasite screening.'
      ],
      imageQualityScore: 92,
      isDemoModel: true,
      modelConfidenceLevel: 'Moderate',
      veterinaryNote: 'AI Tick Check is designed to assist with visual screening only. It cannot confirm whether an object is a tick and should not replace professional veterinary examination.'
    },
    notes: 'Routine evening check after daily park stroll.'
  },
  {
    id: 'scan-102',
    date: 'August 22, 2026',
    timestamp: '2026-08-22T11:15:00Z',
    dogName: 'My Dog',
    dogBreed: 'Labrador Retriever',
    cameraName: 'Manual Photo Upload',
    source: 'photo_upload',
    areaScanned: 'NECK',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    result: {
      status: 'clear',
      confidencePercentage: 96,
      locationLabel: 'Neck and under-collar region',
      title: 'NO OBVIOUS TICK-LIKE OBJECT FOUND',
      summaryText: "We didn't identify an obvious tick-like object in this image.",
      details: 'The coat in the collar and neck area appeared uniform without localized high-contrast clusters or protruding dark nodules.',
      recommendedActions: [
        'AI screening cannot guarantee that your dog is tick-free.',
        'Check your dog’s coat manually by running your hands along the neck folds and under the collar.',
        'Scan other high-risk zones including ears, paws, and belly.'
      ],
      imageQualityScore: 95,
      isDemoModel: true,
      modelConfidenceLevel: 'High',
      veterinaryNote: 'AI screening cannot guarantee that your dog is tick-free. Check your dog’s coat manually and consult a veterinarian if you notice anything unusual.'
    },
    notes: 'Post-walk collar inspection.'
  },
  {
    id: 'scan-103',
    date: 'August 18, 2026',
    timestamp: '2026-08-18T16:30:00Z',
    dogName: 'My Dog',
    dogBreed: 'Labrador Retriever',
    cameraName: 'Mobile Device Camera',
    source: 'device_camera',
    areaScanned: 'EARS',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    result: {
      status: 'clear',
      confidencePercentage: 94,
      locationLabel: 'Outer and inner ear flaps',
      title: 'NO OBVIOUS TICK-LIKE OBJECT FOUND',
      summaryText: "We didn't identify an obvious tick-like object in this image.",
      details: 'Ear folds and outer ear coat show clear visibility with no visible tick-like dark spots detected.',
      recommendedActions: [
        'Continue routine weekly ear hygiene checks.',
        'Look for redness, frequent head shaking, or scratching.'
      ],
      imageQualityScore: 90,
      isDemoModel: true,
      modelConfidenceLevel: 'High',
      veterinaryNote: 'AI Tick Check is designed to assist with visual screening only. It cannot confirm whether an object is a tick and should not replace professional veterinary examination.'
    }
  }
];

export const INITIAL_SMART_ALERTS: SmartCareAlert[] = [
  {
    id: 'alert-1',
    type: 'tick_detected',
    title: 'Smart Care Alert',
    message: "DoggyBhai Smart Care noticed a possible tick-like object in the latest coat scan.",
    timestamp: 'August 24, 6:45 PM',
    severity: 'alert',
    isRead: false,
    scanId: 'scan-101'
  },
  {
    id: 'alert-2',
    type: 'camera_online',
    title: 'Camera Online',
    message: "Living Room Camera is connected and streaming in 1080p Full HD.",
    timestamp: 'Today, 8:15 AM',
    severity: 'info',
    isRead: true,
    cameraId: 'cam-living-room'
  },
  {
    id: 'alert-3',
    type: 'motion_detected',
    title: 'Motion Detected (Demo)',
    message: 'Active motion detected in Living Room zone.',
    timestamp: 'Today, 2:30 PM',
    severity: 'info',
    isRead: true,
    cameraId: 'cam-living-room'
  }
];

export const INITIAL_SMART_CARE_SETTINGS: SmartCareSettings = {
  enableLiveCam: true,
  enableAiTickCheck: true,
  enableMotionAlerts: true,
  enableCloudRecording: false,
  enableTwoWayAudio: true,
  enableNightVision: true,
  aiModelProvider: 'simulation-demo',
  confidenceThreshold: 75,
  cameraStreamingQuality: '1080p',
  remoteAccessEncryption: true,
  demoMode: true
};

export const SAMPLE_TEST_IMAGES = [
  {
    id: 'test-suspicious',
    name: 'Macro Coat Scan (Spot Detection Test)',
    area: 'BACK' as const,
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    expectedType: 'detected',
    description: 'Macro fur texture crop with a dark focal nodule on upper coat'
  },
  {
    id: 'test-clean',
    name: 'Macro Coat Scan (Clean Fur Baseline)',
    area: 'NECK' as const,
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    expectedType: 'clear',
    description: 'Evenly lit, clear fur texture without spots'
  },
  {
    id: 'test-unclear',
    name: 'Low-Light Motion Blur (Quality Check)',
    area: 'BELLY' as const,
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    expectedType: 'low_quality',
    description: 'Dim lighting with motion blur to test camera quality detector'
  }
];

