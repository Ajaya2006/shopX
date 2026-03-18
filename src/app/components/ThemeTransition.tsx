import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeTransition() {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {theme === 'dark' ? (
        <motion.div
          key="dark-transition"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 100, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background: 'radial-gradient(circle, rgba(30,27,75,0.95) 0%, rgba(0,0,0,0) 70%)',
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Moon className="w-8 h-8 text-blue-300" fill="currentColor" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="light-transition"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 100, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background: 'radial-gradient(circle, rgba(255,230,109,0.95) 0%, rgba(255,255,255,0) 70%)',
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sun className="w-8 h-8 text-yellow-500" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
