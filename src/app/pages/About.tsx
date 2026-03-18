import { motion } from 'framer-motion';
import { TruckIcon, Headset, ShieldCheck, Users, Store, DollarSign, ShoppingBag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { gradients } from '../utils/gradients';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const { theme } = useTheme();
  
  const stats = [
    { icon: Store, value: '10.5k', label: 'Sellers active our site', color: 'from-red-500 to-pink-500' },
    { icon: DollarSign, value: '33k', label: 'Monthly Product Sale', color: 'from-blue-500 to-cyan-500' },
    { icon: ShoppingBag, value: '45.5k', label: 'Customer active in our site', color: 'from-green-500 to-emerald-500' },
    { icon: Users, value: '25k', label: 'Annual gross sale in our site', color: 'from-purple-500 to-pink-500' },
  ];

  const team = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
    { name: 'Emma Watson', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { name: 'Will Smith', role: 'Product Designer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          Home / <span className="text-gray-900 dark:text-white">About</span>
        </motion.div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Launched in 2015, ShopX is South Asia's premier online shopping marketplace with an active presence in Bangladesh. 
                Supported by wide range of tailored marketing, data and service solutions, ShopX has 10,500 sellers and 300 brands 
                and serves 3 millions customers across the region.
              </p>
              <p>
                ShopX has more than 1 Million products to offer, growing at a very fast. ShopX offers a diverse assortment in 
                categories ranging from consumer.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative h-[400px] rounded-2xl overflow-hidden ${gradients.hero[theme]}`}
          >
            <ImageWithFallback
              src="src/assets/about-right.png"
              alt="Shopping"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${gradients.glass[theme]} p-8 rounded-xl shadow-lg text-center group cursor-pointer`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gray-900 dark:text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Team */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Our Team
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href="#"
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <span className="text-sm">in</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: TruckIcon,
              title: 'FREE AND FAST DELIVERY',
              description: 'Free delivery for all orders over $140',
            },
            {
              icon: Headset,
              title: '24/7 CUSTOMER SERVICE',
              description: 'Friendly 24/7 customer support',
            },
            {
              icon: ShieldCheck,
              title: 'MONEY BACK GUARANTEE',
              description: 'We return money within 30 days',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}