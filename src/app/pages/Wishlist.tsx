import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { SectionButton } from '../components/SectionButton';
import { useTheme } from '../contexts/ThemeContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { gradients } from '../utils/gradients';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

// Import all product images
import gamepadFlash from '@/assets/products/flash/gamepad.png';
import keyboardFlash from '@/assets/products/flash/keyboard.png';
import monitorFlash from '@/assets/products/flash/monitor.png';
import chairFlash from '@/assets/products/flash/chair.png';
import coolerFlash from '@/assets/products/flash/cooler.png';
import coatBest from '@/assets/products/best/coat.png';
import bagBest from '@/assets/products/best/bag.png';
import coolerBest from '@/assets/products/best/cooler.png';
import bookshelfBest from '@/assets/products/best/bookshelf.png';
import dogFoodExplore from '@/assets/products/explore/dog-food.png';
import cameraExplore from '@/assets/products/explore/camera.png';
import laptopExplore from '@/assets/products/explore/laptop.png';
import skincareExplore from '@/assets/products/explore/skincare.png';
import electricCarExplore from '@/assets/products/explore/electric-car.png';
import cleatsExplore from '@/assets/products/explore/cleats.png';
import gamepadExplore from '@/assets/products/explore/gamepad.png';
import jacketExplore from '@/assets/products/explore/jacket.png';
import ps5New from '@/assets/new-arrival/ps5_slim-l.png';
import womenNew from '@/assets/new-arrival/women-fashion.png';
import speakersNew from '@/assets/new-arrival/s_speaker.png';
import perfumeNew from '@/assets/new-arrival/perfume.png';

// Product database for recommendations
const allProducts = [
  { id: '1', title: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: gamepadFlash, category: 'Gaming' },
  { id: '2', title: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: keyboardFlash, category: 'Electronics' },
  { id: '3', title: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: monitorFlash, category: 'Electronics' },
  { id: '4', title: 'S-Series Comfort Chair', price: 375, originalPrice: 400, discount: 25, rating: 4.5, reviews: 99, image: chairFlash, category: 'Furniture' },
  { id: '5', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, discount: 25, rating: 4.5, reviews: 65, image: coolerFlash, category: 'Electronics' },
  { id: '6', title: 'The north coat', price: 260, originalPrice: 360, rating: 5, reviews: 65, image: coatBest, category: 'Fashion' },
  { id: '7', title: 'Gucci duffle bag', price: 960, originalPrice: 1160, rating: 4.5, reviews: 65, image: bagBest, category: 'Fashion' },
  { id: '8', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, rating: 5, reviews: 65, image: coolerBest, category: 'Electronics' },
  { id: '9', title: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: bookshelfBest, category: 'Furniture' },
  { id: '10', title: 'Breed Dry Dog Food', price: 100, rating: 3, reviews: 35, image: dogFoodExplore, category: 'Pets' },
  { id: '11', title: 'CANON EOS DSLR Camera', price: 360, rating: 4, reviews: 95, image: cameraExplore, category: 'Electronics' },
  { id: '12', title: 'ASUS FHD Gaming Laptop', price: 700, rating: 5, reviews: 325, image: laptopExplore, category: 'Electronics' },
  { id: '13', title: 'Curology Product Set', price: 500, rating: 4, reviews: 145, image: skincareExplore, category: 'Beauty' },
  { id: '14', title: 'Kids Electric Car', price: 960, rating: 5, reviews: 65, isNew: true, image: electricCarExplore, category: 'Toys' },
  { id: '15', title: 'Jr. Zoom Soccer Cleats', price: 1160, rating: 5, reviews: 35, image: cleatsExplore, category: 'Sports' },
  { id: '16', title: 'GP11 Shooter USB Gamepad', price: 660, rating: 4.5, reviews: 55, isNew: true, image: gamepadExplore, category: 'Gaming' },
  { id: '17', title: 'Quilted Satin Jacket', price: 660, rating: 4.5, reviews: 55, image: jacketExplore, category: 'Fashion' },
  { id: '18', title: 'PlayStation 5', price: 499, originalPrice: 599, rating: 5, reviews: 128, image: ps5New, isNew: true, category: 'Gaming' },
  { id: '19', title: 'Women\'s Collection', price: 199, rating: 4.5, reviews: 89, image: womenNew, isNew: true, category: 'Fashion' },
  { id: '20', title: 'Speakers', price: 299, rating: 4.5, reviews: 67, image: speakersNew, isNew: true, category: 'Electronics' },
  { id: '21', title: 'Perfume', price: 89, rating: 4, reviews: 45, image: perfumeNew, isNew: true, category: 'Beauty' },
];

export function Wishlist() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleRemove = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product: typeof wishlist[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      inStock: true,
    });
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(product => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        inStock: true,
      });
    });
    alert(`Added ${wishlist.length} items to cart`);
  };

  // Get recommendations (Just For You)
  const getJustForYouProducts = () => {
    const wishlistCategories = wishlist
      .map(item => allProducts.find(p => p.id === item.id)?.category)
      .filter((category): category is string => category !== undefined);
    
    let recommendations = allProducts.filter(product => 
      !wishlist.some(item => item.id === product.id) &&
      product.category && 
      wishlistCategories.includes(product.category)
    );

    if (recommendations.length < 4) {
      const otherProducts = allProducts.filter(product => 
        !wishlist.some(item => item.id === product.id) &&
        !recommendations.some(rec => rec.id === product.id)
      );
      recommendations = [...recommendations, ...otherProducts].slice(0, 4);
    }

    return recommendations.slice(0, 4);
  };

  const justForYouProducts = getJustForYouProducts();

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
          {wishlist.length > 0 && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-600 dark:text-gray-400">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
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
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          {wishlist.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SectionButton variant="primary" onClick={handleMoveAllToCart}>
                Move All To Cart ({wishlist.length})
              </SectionButton>
            </motion.div>
          )}
        </motion.div>

        {/* Wishlist Products */}
        {wishlist.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Remove button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleRemove(product.id, e)}
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

                <ProductCard 
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  rating={product.rating || 4.5}
                  reviews={product.reviews || 0}
                />
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
                  <ProductCard 
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews}
                    isNew={product.isNew}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}