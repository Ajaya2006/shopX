import { Link, useLocation } from 'react-router';
import { Search, Heart, ShoppingCart, User, Menu, Moon, Sun, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.png';
import { gradients } from '../utils/gradients';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setCategoryMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' },
    { path: '/about', label: 'About' },
    { path: '/signup', label: 'Sign Up' },
  ];

  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    'Electronics',
    'Home & Lifestyle',
    'Medicine',
    'Sports & Outdoor',
    "Baby's & Toys",
    'Groceries & Pets',
    'Health & Beauty',
  ];

  return (
    <header className={`sticky top-0 z-50 ${gradients.glassStrong[theme]} shadow-lg transition-all duration-300`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 text-white py-2 transition-all duration-300">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="font-semibold underline cursor-pointer hover:scale-105 inline-block transition-transform">ShopNow</span></p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img 
              src={logo} 
              alt="ShopX Logo" 
              className="h-10 w-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              ShopX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${
                  isActive(link.path)
                    ? 'text-red-600 dark:text-red-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Categories Dropdown Button */}
            <div 
              className="relative" 
              ref={categoryMenuRef}
              onMouseEnter={() => setCategoryMenuOpen(true)}
              onMouseLeave={() => setCategoryMenuOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute left-0 mt-2 w-56 ${gradients.glassStrong[theme]} rounded-lg shadow-xl overflow-hidden`}
                  >
                    {categories.map((category, index) => (
                      <motion.a
                        key={category}
                        href="#"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm"
                      >
                        {category}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`w-full px-4 py-2 pr-10 rounded-lg ${gradients.glass[theme]} focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-300`}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${gradients.glassLight[theme]} hover:scale-110 transition-all`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <Link to="/wishlist" className={`p-2 rounded-full ${gradients.glassLight[theme]} transition-all relative group hover:scale-110`}>
              <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">4</span>
            </Link>

            <Link to="/cart" className={`p-2 rounded-full ${gradients.glassLight[theme]} transition-all relative group hover:scale-110`}>
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </Link>

            {/* Account Menu */}
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className={`p-2 rounded-full ${gradients.glassLight[theme]} hover:scale-110 transition-all`}
              >
                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 ${gradients.glassStrong[theme]} rounded-lg shadow-xl overflow-hidden`}
                  >
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      My Account
                    </Link>
                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      My Wishlist
                    </Link>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600">
                      Logout
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full ${gradients.glassLight[theme]} hover:scale-110 transition-all`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 md:hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full px-4 py-2 rounded-lg ${gradients.glass[theme]} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}