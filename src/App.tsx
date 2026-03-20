import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeProvider } from './app/contexts/ThemeContext';
import { CartProvider } from './app/contexts/CartContext';
import { WishlistProvider } from './app/contexts/WishlistContext';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}