import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode } from 'react';

type ButtonVariant = 'hero' | 'flash' | 'category' | 'product' | 'cart' | 'checkout' | 'primary' | 'secondary';

interface SectionButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function SectionButton({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}: SectionButtonProps) {
  const { theme } = useTheme();

  const variants = {
    hero: {
      light: 'bg-white/20 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white hover:text-purple-600 shadow-lg shadow-purple-200/50',
      dark: 'bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 shadow-lg shadow-purple-900/50'
    },
    flash: {
      light: 'bg-gradient-to-r from-red-500 to-pink-500 text-white backdrop-blur-md border border-white/30 hover:from-red-600 hover:to-pink-600 shadow-xl shadow-red-300/50',
      dark: 'bg-gradient-to-r from-red-600 to-pink-600 text-white backdrop-blur-md border border-white/20 hover:from-red-700 hover:to-pink-700 shadow-xl shadow-red-900/50'
    },
    category: {
      light: 'bg-purple-500/20 backdrop-blur-lg border border-purple-300/50 text-purple-700 hover:bg-purple-500/30 shadow-lg shadow-purple-200/30',
      dark: 'bg-purple-500/20 backdrop-blur-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 shadow-lg shadow-purple-900/30'
    },
    product: {
      light: 'bg-blue-500/20 backdrop-blur-lg border border-blue-300/50 text-blue-700 hover:bg-blue-500/30 shadow-lg shadow-blue-200/30',
      dark: 'bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 shadow-lg shadow-blue-900/30'
    },
    cart: {
      light: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white backdrop-blur-md border border-white/30 hover:from-green-600 hover:to-emerald-600 shadow-xl shadow-green-300/50',
      dark: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white backdrop-blur-md border border-white/20 hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-900/50'
    },
    checkout: {
      light: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white backdrop-blur-md border border-white/30 hover:from-indigo-600 hover:to-purple-600 shadow-xl shadow-indigo-300/50',
      dark: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white backdrop-blur-md border border-white/20 hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-900/50'
    },
    primary: {
      light: 'bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 hover:bg-white/50 shadow-lg shadow-gray-200/30',
      dark: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 shadow-lg shadow-gray-900/30'
    },
    secondary: {
      light: 'bg-gray-200/50 backdrop-blur-lg border border-gray-300/50 text-gray-700 hover:bg-gray-300/50 shadow-lg shadow-gray-200/30',
      dark: 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 shadow-lg shadow-gray-900/30'
    }
  };

  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform';
  const variantClasses = variants[variant][theme];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}
