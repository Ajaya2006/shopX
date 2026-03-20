import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { gradients } from '../utils/gradients';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  discount,
  rating = 4.5,
  reviews = 0,
  isNew = false,
}: ProductCardProps) {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: title,
        price,
        originalPrice,
        image,
        rating,
        reviews,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name: title,
      price,
      originalPrice,
      image,
      inStock: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${gradients.glass[theme]} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isWishlisted
                ? 'bg-red-600 text-white'
                : gradients.glassStrong[theme] + ' text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
          <button
            className={`p-2 ${gradients.glassStrong[theme]} rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart button on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md text-white py-2 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-red-600 transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
          )}
        </div>

        {reviews > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-300 text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}