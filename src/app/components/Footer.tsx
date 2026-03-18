import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'light' ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-950 to-black'} text-white mt-20`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Subscribe Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="ShopX" className="h-8 w-8" />
              <h3 className="text-xl font-bold">ShopX</h3>
            </div>
            <p className="mb-4">Subscribe</p>
            <p className="text-sm text-gray-400 mb-4">Get 10% off your first order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 pr-12 rounded-lg ${gradients.glassLight[theme]} border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
              />
              <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-red-600 rounded transition-colors`}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh</p>
              <p>shopx@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login / Register</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms Of Use</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-4">Download App</h4>
            <p className="text-xs text-gray-400 mb-3">Save $3 with App New User Only</p>
            <div className="space-y-2 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-4 py-2 ${gradients.glassLight[theme]} border-gray-700 rounded-lg text-xs hover:bg-gray-900 transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-4 py-2 ${gradients.glassLight[theme]} border-gray-700 rounded-lg text-xs hover:bg-gray-900 transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </motion.button>
            </div>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.2, color: '#3b82f6' }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#1d9bf0' }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#e4405f' }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#0a66c2' }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© Copyright ShopX 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}