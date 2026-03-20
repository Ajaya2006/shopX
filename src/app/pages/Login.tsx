import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { SectionButton } from '../components/SectionButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Login() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className={`relative h-[600px] rounded-2xl overflow-hidden ${gradients.hero[theme]}`}>
              <ImageWithFallback
                src="src/assets/login-left.png"
                alt="Shopping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-purple-600/30" />
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${gradients.glass[theme]} rounded-2xl shadow-2xl p-8 md:p-12`}
          >
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Log in to ShopX
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Enter your details below
            </p>

            <form className="space-y-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  required
                  className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500`}
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500`}
                />
              </motion.div>

              <div className="flex items-center justify-between">
                <SectionButton variant="checkout" type="submit">
                  Log In
                </SectionButton>

                <Link
                  to="/forgot-password"
                  className="text-red-600 dark:text-red-500 hover:underline"
                >
                  Forget Password?
                </Link>
              </div>
            </form>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-red-600 dark:text-red-500 hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}