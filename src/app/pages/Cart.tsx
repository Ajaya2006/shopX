import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { SectionButton } from '../components/SectionButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Product image URLs (using placeholder CDN)
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

// Define CartItem interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  maxQuantity?: number;
  inStock?: boolean;
}

// Define Product interface (matching ProductDetail.tsx)
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

// Complete product database (same as ProductDetail.tsx and Wishlist.tsx)
const allProducts: Product[] = [
  // Flash Sale Products
  { id: '1', title: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: gamepadFlash, inStock: true, category: 'Gaming' },
  { id: '2', title: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: keyboardFlash, inStock: true, category: 'Electronics' },
  { id: '3', title: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: monitorFlash, inStock: true, category: 'Electronics' },
  { id: '4', title: 'S-Series Comfort Chair', price: 375, originalPrice: 400, discount: 25, rating: 4.5, reviews: 99, image: chairFlash, inStock: true, category: 'Furniture' },
  { id: '5', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, discount: 25, rating: 4.5, reviews: 65, image: coolerFlash, inStock: true, category: 'Electronics' },
  
  // Best Selling Products
  { id: '6', title: 'The north coat', price: 260, originalPrice: 360, rating: 5, reviews: 65, image: coatBest, inStock: true, category: 'Fashion' },
  { id: '7', title: 'Gucci duffle bag', price: 960, originalPrice: 1160, rating: 4.5, reviews: 65, image: bagBest, inStock: true, category: 'Fashion' },
  { id: '8', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, rating: 5, reviews: 65, image: coolerBest, inStock: true, category: 'Electronics' },
  { id: '9', title: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: bookshelfBest, inStock: true, category: 'Furniture' },
  
  // Explore Products
  { id: '10', title: 'Breed Dry Dog Food', price: 100, rating: 3, reviews: 35, image: dogFoodExplore, inStock: true, category: 'Pets' },
  { id: '11', title: 'CANON EOS DSLR Camera', price: 360, rating: 4, reviews: 95, image: cameraExplore, inStock: true, category: 'Electronics' },
  { id: '12', title: 'ASUS FHD Gaming Laptop', price: 700, rating: 5, reviews: 325, image: laptopExplore, inStock: true, category: 'Electronics' },
  { id: '13', title: 'Curology Product Set', price: 500, rating: 4, reviews: 145, image: skincareExplore, inStock: true, category: 'Beauty' },
  { id: '14', title: 'Kids Electric Car', price: 960, rating: 5, reviews: 65, isNew: true, image: electricCarExplore, inStock: true, category: 'Toys' },
  { id: '15', title: 'Jr. Zoom Soccer Cleats', price: 1160, rating: 5, reviews: 35, image: cleatsExplore, inStock: true, category: 'Sports' },
  { id: '16', title: 'GP11 Shooter USB Gamepad', price: 660, rating: 4.5, reviews: 55, isNew: true, image: gamepadExplore, inStock: true, category: 'Gaming' },
  { id: '17', title: 'Quilted Satin Jacket', price: 660, rating: 4.5, reviews: 55, image: jacketExplore, inStock: true, category: 'Fashion' },
  
  // New Arrival Products
  { id: '18', title: 'PlayStation 5', price: 499, originalPrice: 599, rating: 5, reviews: 128, image: ps5New, isNew: true, inStock: true, category: 'Gaming' },
  { id: '19', title: 'Women\'s Collection', price: 199, rating: 4.5, reviews: 89, image: womenNew, isNew: true, inStock: true, category: 'Fashion' },
  { id: '20', title: 'Speakers', price: 299, rating: 4.5, reviews: 67, image: speakersNew, isNew: true, inStock: true, category: 'Electronics' },
  { id: '21', title: 'Perfume', price: 89, rating: 4, reviews: 45, image: perfumeNew, isNew: true, inStock: true, category: 'Beauty' },
];

// Mock user ID (in real app, this would come from auth context)
const USER_ID = 'current-user';

// Local storage key for cart
const CART_STORAGE_KEY = 'user_cart';

export function Cart() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem(`${CART_STORAGE_KEY}_${USER_ID}`);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart) as CartItem[];
          // Validate that products still exist in database
          const validCart = parsedCart.filter(item => 
            allProducts.some(product => product.id === item.id)
          );
          setCartItems(validCart);
        } else {
          // Initialize with some default items if cart is empty (for demo)
          const defaultCart: CartItem[] = [
            { 
              id: '3', 
              name: 'IPS LCD Gaming Monitor', 
              price: 370, 
              originalPrice: 400,
              quantity: 1, 
              image: monitorFlash,
              inStock: true 
            },
            { 
              id: '16', 
              name: 'GP11 Shooter USB Gamepad', 
              price: 660, 
              quantity: 2, 
              image: gamepadExplore,
              inStock: true 
            },
          ];
          localStorage.setItem(`${CART_STORAGE_KEY}_${USER_ID}`, JSON.stringify(defaultCart));
          setCartItems(defaultCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(`${CART_STORAGE_KEY}_${USER_ID}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleApplyCoupon = () => {
    // Mock coupon codes
    if (couponCode.toUpperCase() === 'SAVE10') {
      setCouponDiscount(0.1);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setCouponDiscount(0.2);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setCouponDiscount(0);
      setCouponApplied(true);
      alert('Free shipping applied!');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 140 ? 0 : 10;
  const discount = couponApplied && couponDiscount > 0 ? subtotal * couponDiscount : 0;
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal + shipping + tax - discount;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${gradients.cart[theme]}`}>
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
          <span className="text-gray-900 dark:text-white">Cart</span>
          {cartItems.length > 0 && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-600 dark:text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </>
          )}
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6"
            >
              <ShoppingBag className="w-full h-full text-gray-300 dark:text-gray-600" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. 
              Explore our products and find something you'll love!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">
                <SectionButton variant="primary">
                  Continue Shopping
                </SectionButton>
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`${gradients.glass[theme]} rounded-xl shadow-lg overflow-hidden`}
              >
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 dark:border-gray-700 items-center group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Product */}
                    <div className="col-span-6 flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                      <div 
                        className="cursor-pointer flex items-center gap-4 flex-1"
                        onClick={() => handleProductClick(item.id)}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white hover:text-red-600 transition-colors">
                            {item.name}
                          </span>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Was: ${item.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-900 dark:text-white">
                      ${item.price}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className={`flex items-center ${gradients.glassLight[theme]} rounded-lg overflow-hidden`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className={`w-4 h-4 ${item.quantity <= 1 ? 'opacity-50' : ''}`} />
                        </motion.button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-center font-semibold text-red-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}

                {/* Cart Actions */}
                <div className="p-6 flex flex-wrap justify-between gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/">
                      <SectionButton variant="secondary">
                        Continue Shopping
                      </SectionButton>
                    </Link>
                  </motion.div>
                  
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SectionButton variant="secondary" onClick={handleClearCart}>
                        Clear Cart
                      </SectionButton>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SectionButton variant="secondary">
                        Update Cart
                      </SectionButton>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Coupon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`flex-1 px-4 py-3 rounded-lg ${gradients.glass[theme]} focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white`}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SectionButton 
                    variant="cart" 
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? 'Applied' : 'Apply Coupon'}
                  </SectionButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Cart Total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className={`${gradients.glass[theme]} rounded-xl shadow-lg p-6 sticky top-24`}>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Cart Total</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
                      Free shipping on orders over $140
                    </p>
                  )}

                  {couponApplied && couponDiscount > 0 && (
                    <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700 text-green-600">
                      <span>Discount ({couponDiscount * 100}%):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Tax (10%):</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <Link to="/checkout">
                    <SectionButton variant="checkout" className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                    </SectionButton>
                  </Link>
                </motion.div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">We accept:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method, index) => (
                      <motion.span
                        key={method}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {method}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Security Note */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400"
                >
                  🔒 Secure checkout powered by Exclusive
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}