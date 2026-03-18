import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { ThemeTransition } from './ThemeTransition';

export function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen transition-all duration-500 ${gradients.page[theme]}`}>
      <ThemeTransition />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}