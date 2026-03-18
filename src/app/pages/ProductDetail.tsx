import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, TruckIcon, RotateCcw, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SectionButton } from '../components/SectionButton';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// ✅ CLEAN IMPORTS USING ALIAS

// Hero images
import hero1 from '../assets/hero/hero1.png';
import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';

// Flash sale products
import gamepadFlash from '@/assets/products/flash/gamepad.png';
import keyboardFlash from '@/assets/products/flash/keyboard.png';
import monitorFlash from '@/assets/products/flash/monitor.png';
import chairFlash from '@/assets/products/flash/chair.png'; // ✅ FIXED
import coolerFlash from '@/assets/products/flash/cooler.png';

// Best selling products
import coatBest from '@/assets/products/best/coat.png';
import bagBest from '@/assets/products/best/bag.png';
import coolerBest from '@/assets/products/best/cooler.png';
import bookshelfBest from '@/assets/products/best/bookshelf.png';

// Explore products
import dogFoodExplore from '@/assets/products/explore/dog-food.png';
import cameraExplore from '@/assets/products/explore/camera.png';
import laptopExplore from '@/assets/products/explore/laptop.png';
import skincareExplore from '@/assets/products/explore/skincare.png';
import electricCarExplore from '@/assets/products/explore/electric-car.png';
import cleatsExplore from '@/assets/products/explore/cleats.png';
import gamepadExplore from '@/assets/products/explore/gamepad.png';
import jacketExplore from '@/assets/products/explore/jacket.png';

// New arrival images
import ps5New from '@/assets/new-arrival/ps5_slim-l.png';
import womenNew from '@/assets/new-arrival/women-fashion.png';
import speakersNew from '@/assets/new-arrival/s_speaker.png';
import perfumeNew from '@/assets/new-arrival/perfume.png';

// Define interfaces
interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  description?: string;
  colors?: { name: string; color: string }[];
  sizes?: string[];
  inStock?: boolean;
  category?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock?: boolean;
}

// Complete product database
const allProducts: Product[] = [
  // Flash Sale Products
  { id: '1', title: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: gamepadFlash, description: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.', colors: [{ name: 'red', color: '#EF4444' }, { name: 'blue', color: '#3B82F6' }, { name: 'green', color: '#10B981' }], sizes: ['XS', 'S', 'M', 'L', 'XL'], inStock: true, category: 'Gaming' },
  { id: '2', title: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: keyboardFlash, description: 'Mechanical gaming keyboard with RGB backlighting and programmable keys.', colors: [{ name: 'black', color: '#1E1E1E' }, { name: 'white', color: '#FFFFFF' }], sizes: ['Standard'], inStock: true, category: 'Electronics' },
  { id: '3', title: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: monitorFlash, description: '27-inch IPS gaming monitor with 144Hz refresh rate and 1ms response time.', colors: [{ name: 'black', color: '#1E1E1E' }], sizes: ['27"'], inStock: true, category: 'Electronics' },
  { id: '4', title: 'S-Series Comfort Chair', price: 375, originalPrice: 400, discount: 25, rating: 4.5, reviews: 99, image: chairFlash, description: 'Ergonomic gaming chair with lumbar support and adjustable armrests.', colors: [{ name: 'black', color: '#1E1E1E' }, { name: 'red', color: '#EF4444' }, { name: 'blue', color: '#3B82F6' }], sizes: ['Standard'], inStock: true, category: 'Furniture' },
  { id: '5', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, discount: 25, rating: 4.5, reviews: 65, image: coolerFlash, description: '240mm liquid CPU cooler with RGB fans for optimal cooling performance.', colors: [{ name: 'black', color: '#1E1E1E' }], sizes: ['240mm'], inStock: true, category: 'Electronics' },
  
  // Best Selling Products
  { id: '6', title: 'The north coat', price: 260, originalPrice: 360, rating: 5, reviews: 65, image: coatBest, description: 'Premium winter coat with water-resistant material and warm lining.', colors: [{ name: 'black', color: '#1E1E1E' }, { name: 'brown', color: '#8B4513' }], sizes: ['S', 'M', 'L', 'XL'], inStock: true, category: 'Fashion' },
  { id: '7', title: 'Gucci duffle bag', price: 960, originalPrice: 1160, rating: 4.5, reviews: 65, image: bagBest, description: 'Luxury duffle bag with premium leather and gold-plated hardware.', colors: [{ name: 'brown', color: '#8B4513' }, { name: 'black', color: '#1E1E1E' }], sizes: ['One Size'], inStock: true, category: 'Fashion' },
  { id: '8', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, rating: 5, reviews: 65, image: coolerBest, description: 'High-performance liquid cooler with RGB lighting for gaming PCs.', colors: [{ name: 'black', color: '#1E1E1E' }], sizes: ['240mm'], inStock: true, category: 'Electronics' },
  { id: '9', title: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: bookshelfBest, description: 'Compact bookshelf perfect for small spaces, made from premium wood.', colors: [{ name: 'oak', color: '#D2B48C' }, { name: 'walnut', color: '#5C4033' }], sizes: ['3-Tier', '4-Tier'], inStock: true, category: 'Furniture' },
  
  // Explore Products
  { id: '10', title: 'Breed Dry Dog Food', price: 100, rating: 3, reviews: 35, image: dogFoodExplore, description: 'Premium dry dog food with natural ingredients and essential nutrients.', inStock: true, category: 'Pets' },
  { id: '11', title: 'CANON EOS DSLR Camera', price: 360, rating: 4, reviews: 95, image: cameraExplore, description: 'Professional DSLR camera with 24.1MP sensor and 4K video recording.', colors: [{ name: 'black', color: '#1E1E1E' }], inStock: true, category: 'Electronics' },
  { id: '12', title: 'ASUS FHD Gaming Laptop', price: 700, rating: 5, reviews: 325, image: laptopExplore, description: 'Gaming laptop with RTX 3060, 16GB RAM, and 144Hz display.', colors: [{ name: 'black', color: '#1E1E1E' }], inStock: true, category: 'Electronics' },
  { id: '13', title: 'Curology Product Set', price: 500, rating: 4, reviews: 145, image: skincareExplore, description: 'Complete skincare set with cleanser, moisturizer, and treatment.', inStock: true, category: 'Beauty' },
  { id: '14', title: 'Kids Electric Car', price: 960, rating: 5, reviews: 65, isNew: true, image: electricCarExplore, description: 'Ride-on electric car for kids with remote control and LED lights.', colors: [{ name: 'red', color: '#EF4444' }, { name: 'blue', color: '#3B82F6' }], inStock: true, category: 'Toys' },
  { id: '15', title: 'Jr. Zoom Soccer Cleats', price: 1160, rating: 5, reviews: 35, image: cleatsExplore, description: 'Professional soccer cleats for junior players with superior grip.', colors: [{ name: 'black', color: '#1E1E1E' }, { name: 'white', color: '#FFFFFF' }], sizes: ['30', '31', '32', '33', '34'], inStock: true, category: 'Sports' },
  { id: '16', title: 'GP11 Shooter USB Gamepad', price: 660, rating: 4.5, reviews: 55, isNew: true, image: gamepadExplore, description: 'Wired gamepad with programmable buttons and ergonomic design.', colors: [{ name: 'black', color: '#1E1E1E' }], inStock: true, category: 'Gaming' },
  { id: '17', title: 'Quilted Satin Jacket', price: 660, rating: 4.5, reviews: 55, image: jacketExplore, description: 'Stylish quilted satin jacket with lightweight insulation.', colors: [{ name: 'black', color: '#1E1E1E' }, { name: 'navy', color: '#000080' }], sizes: ['S', 'M', 'L', 'XL'], inStock: true, category: 'Fashion' },
  
  // New Arrival Products
  { id: '18', title: 'PlayStation 5', price: 499, originalPrice: 599, rating: 5, reviews: 128, image: ps5New, isNew: true, description: 'Next-gen gaming console with lightning-fast loading and immersive gaming.', colors: [{ name: 'white', color: '#FFFFFF' }, { name: 'black', color: '#1E1E1E' }], inStock: true, category: 'Gaming' },
  { id: '19', title: 'Women\'s Collection', price: 199, rating: 4.5, reviews: 89, image: womenNew, isNew: true, description: 'Trendy women\'s fashion collection with modern designs.', colors: [{ name: 'various', color: '#FF69B4' }], sizes: ['XS', 'S', 'M', 'L', 'XL'], inStock: true, category: 'Fashion' },
  { id: '20', title: 'Speakers', price: 299, rating: 4.5, reviews: 67, image: speakersNew, isNew: true, description: 'Premium wireless speakers with crystal clear sound and deep bass.', colors: [{ name: 'black', color: '#1E1E1E' }], inStock: true, category: 'Electronics' },
  { id: '21', title: 'Perfume', price: 89, rating: 4, reviews: 45, image: perfumeNew, isNew: true, description: 'Luxury fragrance with notes of vanilla, musk, and sandalwood.', inStock: true, category: 'Beauty' },
];

// Mock user ID
const USER_ID = 'current-user';

// Local storage keys
const CART_STORAGE_KEY = 'user_cart';
const WISHLIST_STORAGE_KEY = 'user_wishlist';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Find the product by ID
  const product = allProducts.find(p => p.id === id);

  // Check if product is in wishlist on load
  useEffect(() => {
    if (product) {
      // Check wishlist status
      const wishlist = localStorage.getItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`);
      if (wishlist) {
        const wishlistIds = JSON.parse(wishlist) as string[];
        setIsWishlisted(wishlistIds.includes(product.id));
      }

      // Set default selections
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  // Generate mock images array
  const images = [
    product?.image || '',
    product?.image || '',
    product?.image || '',
  ];

  // Get related products with safe category handling
  const getRelatedProducts = (): Product[] => {
    if (!product) return [];
    
    // Use optional chaining and nullish coalescing
    const productCategory = product.category;
    
    if (productCategory) {
      return allProducts
        .filter(p => p.category === productCategory && p.id !== product.id)
        .slice(0, 4);
    }
    
    // If no category, return random products
    return allProducts
      .filter(p => p.id !== product.id)
      .slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

  const handleAddToCart = () => {
    if (!product) return;

    // Get existing cart
    const existingCart = localStorage.getItem(`${CART_STORAGE_KEY}_${USER_ID}`);
    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Update quantity
      cart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: quantity,
        image: product.image,
        inStock: product.inStock
      });
    }

    // Save to localStorage
    localStorage.setItem(`${CART_STORAGE_KEY}_${USER_ID}`, JSON.stringify(cart));
    
    // Show success message
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    // Get existing wishlist
    const existingWishlist = localStorage.getItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`);
    let wishlist: string[] = existingWishlist ? JSON.parse(existingWishlist) : [];

    if (isWishlisted) {
      // Remove from wishlist
      wishlist = wishlist.filter(id => id !== product.id);
    } else {
      // Add to wishlist
      wishlist.push(product.id);
    }

    // Save to localStorage
    localStorage.setItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`, JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Get the appropriate gradient class based on theme
  const getGradientClass = () => {
    if (theme === 'light') {
      return gradients.page.light;
    } else {
      return gradients.page.dark;
    }
  };

  // Safe category display function
  const getCategorySlug = (category: string | undefined): string => {
    return category ? category.toLowerCase() : 'products';
  };

  return (
    <div className={`min-h-screen ${getGradientClass()}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex flex-wrap items-center"
        >
          <button onClick={() => navigate('/')} className="hover:text-red-600 transition-colors">
            Home
          </button>
          <span className="mx-2">/</span>
          
          {/* Safely render category with type guard */}
          {product.category && product.category.trim() !== '' && (
            <>
              <button 
                onClick={() => navigate(`/category/${getCategorySlug(product.category)}`)} 
                className="hover:text-red-600 transition-colors"
              >
                {product.category}
              </button>
              <span className="mx-2">/</span>
            </>
          )}
          
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </motion.div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`${gradients.glass.light} ${gradients.glass.dark} rounded-2xl p-8 mb-4`}>
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-[500px] object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`${gradients.glass.light} ${gradients.glass.dark} rounded-xl p-4 ${
                    selectedImage === index ? 'ring-2 ring-red-600' : ''
                  }`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-24 object-contain" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : product.rating - i >= 0.5
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">({product.reviews} Reviews)</span>
              <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.isNew && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  {product.discount && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              {product.description || 'No description available for this product.'}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <span className="text-gray-900 dark:text-white font-semibold mb-3 block">Colors:</span>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color.name ? 'border-gray-900 dark:border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.color }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-gray-900 dark:text-white font-semibold mb-3 block">Size:</span>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border-2 font-semibold transition-colors ${
                        selectedSize === size
                          ? 'bg-red-600 text-white border-red-600'
                          : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-red-600'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex gap-4 mb-8 flex-wrap">
              <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <span className="px-8 py-3 font-semibold text-gray-900 dark:text-white">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`flex-1 min-w-[200px] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={`p-3 border-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-red-600 text-white border-red-600'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-white' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="flex-1 min-w-[200px] bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Delivery Info */}
            <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${gradients.glassLight.light} ${gradients.glassLight.dark}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <TruckIcon className="w-10 h-10 text-gray-900 dark:text-white" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Free Delivery</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <RotateCcw className="w-10 h-10 text-gray-900 dark:text-white" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Return Delivery</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-8 bg-red-600 rounded" />
              <span className="text-red-600 font-semibold">Related Item</span>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">You May Also Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}