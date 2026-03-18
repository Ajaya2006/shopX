export const gradients = {
  // Page backgrounds
  page: {
    light: 'bg-white',
    dark: 'bg-black'
  },
  
  // Section backgrounds
  hero: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },
  
  flashSales: {
    light: 'bg-white',
    dark: 'bg-gray-950'
  },
  
  categories: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },
  
  products: {
    light: 'bg-white',
    dark: 'bg-gray-950'
  },
  
  cart: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },
  
  checkout: {
    light: 'bg-white',
    dark: 'bg-gray-950'
  },
  
  features: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },

  account: {
    light: 'bg-white',
    dark: 'bg-gray-950'
  },

  wishlist: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },

  // Glass card backgrounds
  glass: {
    light: 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg',
    dark: 'bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-2xl'
  },
  
  glassStrong: {
    light: 'bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl',
    dark: 'bg-gray-900/95 backdrop-blur-2xl border border-gray-800 shadow-2xl'
  },
  
  glassLight: {
    light: 'bg-white/60 backdrop-blur-lg border border-gray-200',
    dark: 'bg-gray-900/60 backdrop-blur-lg border border-gray-800'
  }
};

export function getGradient(section: keyof typeof gradients, theme: 'light' | 'dark') {
  return gradients[section][theme];
}