import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { SectionButton } from '../components/SectionButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, TruckIcon, Shield, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Hero images
import hero1 from '../assets/hero/hero1.png';
import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';

// Flash sale products
import gamepadFlash from '@/assets/products/flash/gamepad.png';
import keyboardFlash from '@/assets/products/flash/keyboard.png';
import monitorFlash from '@/assets/products/flash/monitor.png';
import chairFlash from '@/assets/products/flash/chair.png'; // ✅ FIXED
import coolerFlash from '@/assets/products/flash/cooler.png';

// Best selling products
import coatBest from '@/assets/products/best/coat.png';
import bagBest from '@/assets/products/best/bag.png';
import coolerBest from '@/assets/products/best/cooler.png';
import bookshelfBest from '@/assets/products/best/bookshelf.png';

// Explore products
import dogFoodExplore from '@/assets/products/explore/dog-food.png';
import cameraExplore from '@/assets/products/explore/camera.png';
import laptopExplore from '@/assets/products/explore/laptop.png';
import skincareExplore from '@/assets/products/explore/skincare.png';
import electricCarExplore from '@/assets/products/explore/electric-car.png';
import cleatsExplore from '@/assets/products/explore/cleats.png';
import gamepadExplore from '@/assets/products/explore/gamepad.png';
import jacketExplore from '@/assets/products/explore/jacket.png';

// New arrival images
import ps5New from '@/assets/new-arrival/ps5_slim-l.png';
import womenNew from '@/assets/new-arrival/women-fashion.png';
import speakersNew from '@/assets/new-arrival/s_speaker.png';
import perfumeNew from '@/assets/new-arrival/perfume.png';

// Define interfaces
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  maxQuantity?: number;
  inStock?: boolean;
}

interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  saveInfo: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

// Mock user ID (in real app, this would come from auth context)
const USER_ID = 'current-user';

// Local storage key for cart
const CART_STORAGE_KEY = 'user_cart';

export function Checkout() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BillingDetails, string>>>({});

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    email: '',
    saveInfo: false
  });

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem(`${CART_STORAGE_KEY}_${USER_ID}`);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart) as CartItem[];
          setCartItems(parsedCart);
        } else {
          // Redirect to cart if empty
          navigate('/cart');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  // Load saved billing info from localStorage
  useEffect(() => {
    const savedBilling = localStorage.getItem('billing_details');
    if (savedBilling) {
      try {
        const parsed = JSON.parse(savedBilling);
        setBillingDetails(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading billing details:', error);
      }
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 140 ? 0 : 10;
  const discount = couponApplied && couponDiscount > 0 ? subtotal * couponDiscount : 0;
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal + shipping + tax - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setBillingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (formErrors[name as keyof BillingDetails]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof BillingDetails, string>> = {};

    if (!billingDetails.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!billingDetails.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!billingDetails.streetAddress.trim()) {
      errors.streetAddress = 'Street address is required';
    }
    if (!billingDetails.city.trim()) {
      errors.city = 'City is required';
    }
    if (!billingDetails.state.trim()) {
      errors.state = 'State is required';
    }
    if (!billingDetails.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    }
    if (!billingDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(billingDetails.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!billingDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(billingDetails.email)) {
      errors.email = 'Invalid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCoupon = () => {
    // Mock coupon codes
    if (couponCode.toUpperCase() === 'SAVE10') {
      setCouponDiscount(0.1);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setCouponDiscount(0.2);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setCouponDiscount(0);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // Save billing info if requested
      if (billingDetails.saveInfo) {
        const { saveInfo, ...billingToSave } = billingDetails;
        localStorage.setItem('billing_details', JSON.stringify(billingToSave));
      }

      // Clear cart
      localStorage.removeItem(`${CART_STORAGE_KEY}_${USER_ID}`);
      
      setOrderPlaced(true);
      setIsProcessing(false);

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/order-success');
      }, 3000);
    }, 2000);
  };

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'paypal', name: 'PayPal', icon: <span className="text-blue-600 font-bold">P</span> },
    { id: 'cod', name: 'Cash on Delivery', icon: <TruckIcon className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add some items to your cart before checking out.</p>
          <SectionButton variant="primary" onClick={() => navigate('/')}>
            Continue Shopping
          </SectionButton>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Order Placed Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. We'll send you an email with your order details shortly.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Redirecting to order confirmation...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`min-h-screen ${gradients.checkout[theme]}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex flex-wrap items-center gap-2"
        >
          <button onClick={() => navigate('/')} className="hover:text-red-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/cart')} className="hover:text-red-600 transition-colors">Cart</button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Checkout</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className={`${gradients.glass[theme]} rounded-xl shadow-lg p-6 md:p-8`}>
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Billing Details</h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={billingDetails.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.firstName ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={billingDetails.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.lastName ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={billingDetails.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Street Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={billingDetails.streetAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="House number and street name"
                    className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                      formErrors.streetAddress ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {formErrors.streetAddress && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.streetAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Apartment, floor, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={billingDetails.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, etc."
                    className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={billingDetails.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.city ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      State <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={billingDetails.state}
                      onChange={handleInputChange}
                      required
                      placeholder="State / Province"
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.state ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      ZIP Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={billingDetails.zipCode}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.zipCode ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="country"
                      value={billingDetails.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white`}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingDetails.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 234 567 8900"
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.phone ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={billingDetails.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                        formErrors.email ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="save-info"
                    name="saveInfo"
                    checked={billingDetails.saveInfo}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="save-info" className="text-sm text-gray-700 dark:text-gray-300">
                    Save this information for faster check-out next time
                  </label>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className={`${gradients.glass[theme]} rounded-xl shadow-lg p-6 md:p-8 sticky top-24`}>
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Your Order</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping:</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Free shipping on orders over $140
                  </p>
                )}

                {couponApplied && couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({couponDiscount * 100}%):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                      {method.icon}
                      {method.name}
                    </span>
                  </label>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className={`flex-1 px-4 py-3 ${gradients.glassLight[theme]} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white ${
                    couponApplied ? 'opacity-50' : ''
                  }`}
                />
                <motion.button
                  whileHover={{ scale: couponApplied ? 1 : 1.05 }}
                  whileTap={{ scale: couponApplied ? 1 : 0.95 }}
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode}
                  className={`bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold ${
                    couponApplied ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </motion.button>
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your information is secure and encrypted
                </p>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}