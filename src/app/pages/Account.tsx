import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Account() {
  const location = useLocation();

  const sidebarLinks = [
    {
      section: 'Manage My Account',
      items: [
        { label: 'My Profile', path: '/account' },
        { label: 'Address Book', path: '/account/address' },
        { label: 'My Payment Options', path: '/account/payment' },
      ],
    },
    {
      section: 'My Orders',
      items: [
        { label: 'My Returns', path: '/account/returns' },
        { label: 'My Cancellations', path: '/account/cancellations' },
      ],
    },
    {
      section: 'My Wishlist',
      items: [{ label: 'Wishlist', path: '/wishlist' }],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          Home / <span className="text-gray-900 dark:text-white">My Account</span>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {sidebarLinks.map((section, sectionIndex) => (
                <div key={section.section} className={sectionIndex > 0 ? 'mt-6' : ''}>
                  <h3 className="font-bold mb-3 text-gray-900 dark:text-white">{section.section}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`block py-2 px-3 rounded-lg transition-colors ${
                            location.pathname === item.path
                              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-500">
                Edit Your Profile
              </h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Md"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Rimel"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="rimellll@gmail.com"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="Kingston, 5236, United State"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Password Changes</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
