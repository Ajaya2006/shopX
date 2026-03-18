import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

export function Loader() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
          : 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-950'
      }`}>
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-pink-400 to-yellow-400'
              : 'bg-gradient-to-r from-pink-600 to-purple-700'
          }`}
        />
      </div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl ${
            theme === 'light'
              ? 'bg-white/30 border-white/50 shadow-purple-200/50'
              : 'bg-black/30 border-white/10 shadow-purple-900/50'
          }`}
        >
          {/* Day/Night icon animation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative mb-6"
          >
            {theme === 'light' ? (
              <div className="relative">
                <Sun className="w-20 h-20 text-yellow-500" />
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-40px)`,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <Moon className="w-20 h-20 text-blue-300" fill="currentColor" />
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -20, -40],
                      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.6,
                    }}
                    className="absolute top-0 left-0"
                  >
                    <Sparkles className="w-3 h-3 text-blue-200" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ShopX logo text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl font-bold mb-4 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
            }`}
          >
            ShopX
          </motion.h1>

          {/* Loading dots */}
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className={`w-3 h-3 rounded-full ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 text-lg font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          Loading your shopping experience...
        </motion.p>
      </div>
    </div>
  );
}
