import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, TruckIcon, Headset, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SectionButton } from '../components/SectionButton';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// ==================== HERO IMAGES ====================
import hero1 from '../../assets/hero/hero1.png';
import hero2 from '../../assets/hero/hero2.png';
import hero3 from '../../assets/hero/hero3.png';

// ==================== FLASH SALE PRODUCTS ====================
import gamepadFlash from '../../assets/products/flash/gamepad.png';
import keyboardFlash from '../../assets/products/flash/keyboard.png';
import monitorFlash from '../../assets/products/flash/monitor.png';
import chairFlash from '../../assets/products/flash/chair.png';
import coolerFlash from '../../assets/products/flash/cooler.png';
// Alternative if you want to use gpad_wb.png instead:
// import gamepadFlash from '../../assets/products/flash/gpad_wb.png';

// ==================== BEST SELLING PRODUCTS ====================
import coatBest from '../../assets/products/best/coat.png';
import bagBest from '../../assets/products/best/bag.png';
import coolerBest from '../../assets/products/best/cooler.png';
import bookshelfBest from '../../assets/products/best/bookshelf.png';

// ==================== EXPLORE PRODUCTS ====================
import dogFoodExplore from '../../assets/products/explore/dog-food.png';
import cameraExplore from '../../assets/products/explore/camera.png';
import laptopExplore from '../../assets/products/explore/laptop.png';
import skincareExplore from '../../assets/products/explore/skincare.png';
import electricCarExplore from '../../assets/products/explore/electric-car.png';
import cleatsExplore from '../../assets/products/explore/cleats.png';
import gamepadExplore from '../../assets/products/explore/gamepad.png';
import jacketExplore from '../../assets/products/explore/jacket.png';

// ==================== NEW ARRIVAL IMAGES ====================
import ps5New from '../../assets/new-arrival/ps5_slim-l.png';
// For the women collection image - note the space in filename, you may want to rename it to avoid issues
import womenNew from '../../assets/new-arrival/women-fashion.png';
import speakersNew from '../../assets/new-arrival/s_speaker.png';
import perfumeNew from '../../assets/new-arrival/perfume.png';

// ==================== PROMO BANNER IMAGE ====================
import jblSpeaker from '../../assets/JBL.png';

export function Home() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const [speakerTimeLeft, setSpeakerTimeLeft] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35
  });

  // Countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeakerTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Data
  const categoryIcons = [
    { icon: Smartphone, label: 'Phones' },
    { icon: Monitor, label: 'Computers' },
    { icon: Watch, label: 'SmartWatch' },
    { icon: Camera, label: 'Camera' },
    { icon: Headphones, label: 'Headphones' },
    { icon: Gamepad2, label: 'Gaming' },
  ];

  const flashSaleProducts = [
    { id: '1', title: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, discount: 40, rating: 5, reviews: 88, image: gamepadFlash },
    { id: '2', title: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, discount: 35, rating: 4, reviews: 75, image: keyboardFlash },
    { id: '3', title: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, discount: 30, rating: 5, reviews: 99, image: monitorFlash },
    { id: '4', title: 'S-Series Comfort Chair', price: 375, originalPrice: 400, discount: 25, rating: 4.5, reviews: 99, image: chairFlash },
    { id: '5', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, discount: 25, rating: 4.5, reviews: 65, image: coolerFlash },
  ];

  const bestSellingProducts = [
    { id: '6', title: 'The north coat', price: 260, originalPrice: 360, rating: 5, reviews: 65, image: coatBest },
    { id: '7', title: 'Gucci duffle bag', price: 960, originalPrice: 1160, rating: 4.5, reviews: 65, image: bagBest },
    { id: '8', title: 'RGB liquid CPU Cooler', price: 160, originalPrice: 170, rating: 5, reviews: 65, image: coolerBest },
    { id: '9', title: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: bookshelfBest },
  ];

  const exploreProducts = [
    { id: '10', title: 'Breed Dry Dog Food', price: 100, rating: 3, reviews: 35, image: dogFoodExplore },
    { id: '11', title: 'CANON EOS DSLR Camera', price: 360, rating: 4, reviews: 95, image: cameraExplore },
    { id: '12', title: 'ASUS FHD Gaming Laptop', price: 700, rating: 5, reviews: 325, image: laptopExplore },
    { id: '13', title: 'Curology Product Set', price: 500, rating: 4, reviews: 145, image: skincareExplore },
    { id: '14', title: 'Kids Electric Car', price: 960, rating: 5, reviews: 65, isNew: true, image: electricCarExplore },
    { id: '15', title: 'Jr. Zoom Soccer Cleats', price: 1160, rating: 5, reviews: 35, image: cleatsExplore },
    { id: '16', title: 'GP11 Shooter USB Gamepad', price: 660, rating: 4.5, reviews: 55, isNew: true, image: gamepadExplore },
    { id: '17', title: 'Quilted Satin Jacket', price: 660, rating: 4.5, reviews: 55, image: jacketExplore },
  ];

  const heroSlides = [
    { title: 'iPhone 14 Series', subtitle: 'Up to 10% off Voucher', image: hero1, cta: 'Shop Now' },
    { title: 'Summer Collection', subtitle: 'New Arrivals 50% Off', image: hero2, cta: 'Shop Now' },
    { title: 'Gaming Gear', subtitle: 'Level Up Your Game', image: hero3, cta: 'Shop Now' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Hero Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] rounded-2xl overflow-hidden mb-4 md:mb-8 group ${gradients.hero[theme]}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12">
            <div className="text-white max-w-lg">
              <motion.h2
                key={`title-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-3 md:mb-4"
              >
                {heroSlides[currentSlide].title}
              </motion.h2>
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl mb-4 md:mb-6"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <SectionButton variant="hero">
                  {heroSlides[currentSlide].cta} →
                </SectionButton>
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 ${gradients.glassLight[theme]} hover:scale-110 p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100`}
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 ${gradients.glassLight[theme]} hover:scale-110 p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100`}
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-red-600' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Flash Sales */}
        <motion.section 
          className={`mb-12 md:mb-16 p-4 md:p-8 rounded-2xl ${gradients.flashSales[theme]}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
                <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 rounded" />
                <span className="text-red-600 font-semibold text-sm md:text-base">Today's</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Flash Sales
              </motion.h2>
            </div>

            {/* Countdown Timer */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 md:gap-4">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-1 md:gap-2">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                    <div className="relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={item.value}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-white ${gradients.glass[theme]} px-2 md:px-3 py-1 md:py-2 rounded-lg shadow min-w-[40px] md:min-w-[50px] text-center`}
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  {index < 3 && <span className="text-lg md:text-2xl text-red-600 font-bold">:</span>}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Flash Sale Products */}
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6" variants={containerVariants}>
            {flashSaleProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-center mt-6 md:mt-8">
            <SectionButton variant="flash">View All Products</SectionButton>
          </motion.div>
        </motion.section>

        {/* Browse by Category */}
        <motion.section 
          className={`mb-12 md:mb-16 p-4 md:p-8 rounded-2xl ${gradients.categories[theme]}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
            <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 rounded" />
            <span className="text-red-600 font-semibold text-sm md:text-base">Categories</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
            Browse By Category
          </motion.h2>

          <motion.div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6" variants={containerVariants}>
            {categoryIcons.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${gradients.glass[theme]} p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group`}
                >
                  <Icon className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{category.label}</p>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Best Selling Products */}
        <motion.section 
          className={`mb-12 md:mb-16 p-4 md:p-8 rounded-2xl ${gradients.products[theme]}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
            <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 rounded" />
            <span className="text-red-600 font-semibold text-sm md:text-base">This Month</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Best Selling Products
            </motion.h2>
            <motion.div variants={itemVariants}>
              <SectionButton variant="product">View All</SectionButton>
            </motion.div>
          </div>

          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6" variants={containerVariants}>
            {bestSellingProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Music/Speaker Featured Section */}
        <motion.section
          className={`mb-12 md:mb-16 rounded-2xl overflow-hidden ${gradients.hero[theme]}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-black text-white p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-green-500 font-semibold mb-4 block">Categories</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Enhance Your<br />Music Experience</h2>
                <div className="flex gap-3 md:gap-4 mb-8">
                  {[
                    { label: 'Days', value: speakerTimeLeft.days },
                    { label: 'Hours', value: speakerTimeLeft.hours },
                    { label: 'Minutes', value: speakerTimeLeft.minutes },
                    { label: 'Seconds', value: speakerTimeLeft.seconds },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="relative overflow-hidden bg-white text-black rounded-full w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center shadow-lg">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={item.value}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-bold text-base md:text-lg"
                          >
                            {String(item.value).padStart(2, '0')}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      <div className="text-xs mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                <SectionButton variant="cart">Buy Now!</SectionButton>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(245,245,245,0.8)] to-transparent rounded-full blur-3xl" />
                <ImageWithFallback src={jblSpeaker} alt="Speaker" className="relative z-10 w-full h-auto" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Explore Our Products */}
        <motion.section 
          className={`mb-12 md:mb-16 p-4 md:p-8 rounded-2xl ${gradients.products[theme]}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
            <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 rounded" />
            <span className="text-red-600 font-semibold text-sm md:text-base">Our Products</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
            Explore Our Products
          </motion.h2>

          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6" variants={containerVariants}>
            {exploreProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mt-6 md:mt-8">
            <SectionButton variant="product">View All Products</SectionButton>
          </motion.div>
        </motion.section>

        {/* New Arrival */}
        <motion.section
          className="mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
            <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 rounded" />
            <span className="text-red-600 font-semibold text-sm md:text-base">Featured</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
            New Arrival
          </motion.h2>

          <motion.div className="grid md:grid-cols-2 gap-4 md:gap-6" variants={containerVariants}>
            {/* Large Featured Item */}
            <motion.div 
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl ${gradients.glass[theme]} group cursor-pointer`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-[400px] md:h-[600px]">
                <ImageWithFallback src={ps5New} alt="PlayStation 5" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">PlayStation 5</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4">Black and White version of the PS5 coming out on sale.</p>
                  <button className="text-white font-semibold underline hover:no-underline transition-all">Shop Now</button>
                </div>
              </div>
            </motion.div>

            {/* Grid of smaller items */}
            <div className="grid grid-rows-2 gap-4 md:gap-6">
              <motion.div 
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl ${gradients.glass[theme]} group cursor-pointer`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-[200px] md:h-[285px]">
                  <ImageWithFallback src={womenNew} alt="Women's Collections" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-1">Women's Collections</h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-2">Featured woman collections that give you another vibe.</p>
                    <button className="text-white font-semibold underline hover:no-underline transition-all text-sm">Shop Now</button>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <motion.div 
                  variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl ${gradients.glass[theme]} group cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-[200px] md:h-[285px]">
                    <ImageWithFallback src={speakersNew} alt="Speakers" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg md:text-xl font-bold mb-1">Speakers</h3>
                      <p className="text-xs text-gray-300 mb-2">Amazon wireless speakers</p>
                      <button className="text-white font-semibold underline hover:no-underline transition-all text-xs">Shop Now</button>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className={`relative overflow-hidden rounded-2xl ${gradients.glass[theme]} group cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-[200px] md:h-[285px]">
                    <ImageWithFallback src={perfumeNew} alt="Perfume" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg md:text-xl font-bold mb-1">Perfume</h3>
                      <p className="text-xs text-gray-300 mb-2">GUCCI INTENSE OUD EDP</p>
                      <button className="text-white font-semibold underline hover:no-underline transition-all text-xs">Shop Now</button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Feature Banners */}
        <motion.section
          className="mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: TruckIcon, title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
              { icon: Headset, title: '24/7 CUSTOMER SERVICE', desc: 'Friendly 24/7 customer support' },
              { icon: ShieldCheck, title: 'MONEY BACK GUARANTEE', desc: 'We return money within 30 days' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`text-center p-6 md:p-8 ${gradients.glass[theme]} rounded-xl`}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="bg-gray-300/50 dark:bg-gray-700/50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
                <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}