import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from '../contexts/ThemeContext';
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${gradients.glass[theme]} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      {/* Image Container */}
      <Link to={`/product/${id}`} className={`block relative aspect-square ${gradients.glassLight[theme]} overflow-hidden`}>
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              -{discount}%
            </motion.span>
          )}
          {isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              NEW
            </motion.span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 ${gradients.glassStrong[theme]} rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
          >
            <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 ${gradients.glassStrong[theme]} rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
          >
            <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Add to Cart - Shows on hover */}
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className={`absolute bottom-0 left-0 right-0 ${theme === 'light' ? 'bg-black/70' : 'bg-white/10'} backdrop-blur-md text-white py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-red-600 dark:hover:text-red-500 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 dark:text-red-500 font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
          )}
        </div>

        {/* Rating */}
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