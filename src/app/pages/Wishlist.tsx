import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { SectionButton } from '../components/SectionButton';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

// ✅ CLEAN IMPORTS USING ALIAS

// Hero images
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

// ✅ IMAGE MAP FIX
const imageMap = {
  // Flash
  gamepadFlash,
  keyboardFlash,
  monitorFlash,
  chairFlash,
  coolerFlash,

  // Best
  coatBest,
  bagBest,
  coolerBest,
  bookshelfBest,

  // Explore
  dogFoodExplore,
  cameraExplore,
  laptopExplore,
  skincareExplore,
  electricCarExplore,
  cleatsExplore,
  gamepadExplore,
  jacketExplore,

  // New
  ps5New,
  womenNew,
  speakersNew,
  perfumeNew,
};

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

// Complete product database (same as ProductDetail.tsx)
const allProducts: Product[] = [
  // Flash Sale Products
  { id: '1', title: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: imageMap.gamepadFlash, inStock: true, category: 'Gaming' },
  { id: '2', title: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: imageMap.keyboardFlash, inStock: true, category: 'Electronics' },
  { id: '3', title: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: imageMap.monitorFlash, inStock: true, category: 'Electronics' },
  { id: '4', title: 'S-Series Comfort Chair', price: 375, originalPrice: 400, discount: 25, rating: 4.5, reviews: 99, image: imageMap.chairFlash, inStock: true, category: 'Furniture' },
  { id: '5', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, discount: 25, rating: 4.5, reviews: 65, image: imageMap.coolerFlash, inStock: true, category: 'Electronics' },
  
  // Best Selling Products
  { id: '6', title: 'The north coat', price: 260, originalPrice: 360, rating: 5, reviews: 65, image: imageMap.coatBest, inStock: true, category: 'Fashion' },
  { id: '7', title: 'Gucci duffle bag', price: 960, originalPrice: 1160, rating: 4.5, reviews: 65, image: imageMap.bagBest, inStock: true, category: 'Fashion' },
  { id: '8', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, rating: 5, reviews: 65, image: imageMap.coolerBest, inStock: true, category: 'Electronics' },
  { id: '9', title: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: imageMap.bookshelfBest, inStock: true, category: 'Furniture' },
  
  // Explore Products
  { id: '10', title: 'Breed Dry Dog Food', price: 100, rating: 3, reviews: 35, image: imageMap.dogFoodExplore, inStock: true, category: 'Pets' },
  { id: '11', title: 'CANON EOS DSLR Camera', price: 360, rating: 4, reviews: 95, image: imageMap.cameraExplore, inStock: true, category: 'Electronics' },
  { id: '12', title: 'ASUS FHD Gaming Laptop', price: 700, rating: 5, reviews: 325, image: imageMap.laptopExplore, inStock: true, category: 'Electronics' },
  { id: '13', title: 'Curology Product Set', price: 500, rating: 4, reviews: 145, image: imageMap.skincareExplore, inStock: true, category: 'Beauty' },
  { id: '14', title: 'Kids Electric Car', price: 960, rating: 5, reviews: 65, isNew: true, image: imageMap.electricCarExplore, inStock: true, category: 'Toys' },
  { id: '15', title: 'Jr. Zoom Soccer Cleats', price: 1160, rating: 5, reviews: 35, image: imageMap.cleatsExplore, inStock: true, category: 'Sports' },
  { id: '16', title: 'GP11 Shooter USB Gamepad', price: 660, rating: 4.5, reviews: 55, isNew: true, image: imageMap.gamepadExplore, inStock: true, category: 'Gaming' },
  { id: '17', title: 'Quilted Satin Jacket', price: 660, rating: 4.5, reviews: 55, image: imageMap.jacketExplore, inStock: true, category: 'Fashion' },
  
  // New Arrival Products
  { id: '18', title: 'PlayStation 5', price: 499, originalPrice: 599, rating: 5, reviews: 128, image: imageMap.ps5New, isNew: true, inStock: true, category: 'Gaming' },
  { id: '19', title: 'Women\'s Collection', price: 199, rating: 4.5, reviews: 89, image: imageMap.womenNew, isNew: true, inStock: true, category: 'Fashion' },
  { id: '20', title: 'Speakers', price: 299, rating: 4.5, reviews: 67, image: imageMap.speakersNew, isNew: true, inStock: true, category: 'Electronics' },
  { id: '21', title: 'Perfume', price: 89, rating: 4, reviews: 45, image: imageMap.perfumeNew, isNew: true, inStock: true, category: 'Beauty' },
];

// Mock user ID
const USER_ID = 'current-user';

// Local storage keys
const CART_STORAGE_KEY = 'user_cart';
const WISHLIST_STORAGE_KEY = 'user_wishlist';

export function Wishlist() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`);
        if (storedWishlist) {
          const wishlistIds = JSON.parse(storedWishlist) as string[];
          // Get full product details for each wishlist item
          const wishlistProducts = allProducts.filter(product => wishlistIds.includes(product.id));
          setWishlistItems(wishlistProducts);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const wishlistIds = wishlistItems.map(item => item.id);
      localStorage.setItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`, JSON.stringify(wishlistIds));
    }
  }, [wishlistItems, isLoading]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleRemoveFromWishlist = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();

    // Get existing cart
    const existingCart = localStorage.getItem(`${CART_STORAGE_KEY}_${USER_ID}`);
    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Update quantity
      cart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.image,
        inStock: product.inStock
      });
    }

    // Save to localStorage
    localStorage.setItem(`${CART_STORAGE_KEY}_${USER_ID}`, JSON.stringify(cart));
    
    // Show success message
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleMoveAllToCart = () => {
    // Get existing cart
    const existingCart = localStorage.getItem(`${CART_STORAGE_KEY}_${USER_ID}`);
    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Add all wishlist items to cart
    wishlistItems.forEach(product => {
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        cart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cart.push({
          id: product.id,
          name: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.image,
          inStock: product.inStock
        });
      }
    });

    // Save to localStorage
    localStorage.setItem(`${CART_STORAGE_KEY}_${USER_ID}`, JSON.stringify(cart));
    
    // Clear wishlist
    setWishlistItems([]);
    
    alert(`Added ${wishlistItems.length} items to cart`);
  };

  // Just For You products (recommendations)
  const getJustForYouProducts = () => {
    // Get categories from wishlist items
    const wishlistCategories = wishlistItems
      .map(item => item.category)
      .filter((category): category is string => category !== undefined);
    
    // Get products from same categories, excluding wishlist items
    let recommendations = allProducts.filter(product => 
      !wishlistItems.some(item => item.id === product.id) && // Not in wishlist
      product.category && // Has category
      wishlistCategories.includes(product.category) // Same category as wishlist items
    );

    // If not enough recommendations, add random products
    if (recommendations.length < 4) {
      const otherProducts = allProducts.filter(product => 
        !wishlistItems.some(item => item.id === product.id) && // Not in wishlist
        !recommendations.some(rec => rec.id === product.id) // Not already in recommendations
      );
      recommendations = [...recommendations, ...otherProducts].slice(0, 4);
    }

    return recommendations.slice(0, 4);
  };

  const justForYouProducts = getJustForYouProducts();

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
          <p className="text-gray-600 dark:text-gray-400">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${gradients.wishlist[theme]}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex flex-wrap items-center"
        >
          <button onClick={() => navigate('/')} className="hover:text-red-600 transition-colors">Home</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">Wishlist</span>
          {wishlistItems.length > 0 && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-600 dark:text-gray-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </span>
            </>
          )}
        </motion.div>

        {/* Wishlist Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist 
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SectionButton variant="primary" onClick={handleMoveAllToCart}>
                Move All To Cart ({wishlistItems.length})
              </SectionButton>
            </motion.div>
          )}
        </motion.div>

        {/* Wishlist Products */}
        {wishlistItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wishlistItems.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="relative group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Remove button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </motion.button>

                {/* Add to cart button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(product, e)}
                  className={`absolute top-2 left-2 z-10 px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 ${
                    addedToCart[product.id]
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3" />
                  {addedToCart[product.id] ? 'Added!' : 'Add to Cart'}
                </motion.button>

                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty wishlist state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 mb-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6"
            >
              <Heart className="w-full h-full text-gray-300 dark:text-gray-600" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Save your favorite items here and never miss out on great deals!
              Browse our products and click the heart icon to add them to your wishlist.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SectionButton variant="primary" onClick={() => navigate('/')}>
                Start Shopping
              </SectionButton>
            </motion.div>
          </motion.div>
        )}

        {/* Just For You - Recommendations */}
        {justForYouProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="w-4 h-8 bg-red-600 rounded mb-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Just For You</h2>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SectionButton variant="product" onClick={() => navigate('/products')}>
                  See All
                </SectionButton>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {justForYouProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}