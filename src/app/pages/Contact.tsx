import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          Home / <span className="text-gray-900 dark:text-white">Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
              {/* Call To Us */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Call To Us</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Phone: +8801611112222
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700" />

              {/* Write To Us */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write To Us</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-gray-900 dark:text-white font-semibold mb-1">
                  Emails: customer@shopx.com
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Emails: support@shopx.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      placeholder="Your Email *"
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="tel"
                      placeholder="Your Phone *"
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <textarea
                    placeholder="Your Message"
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none text-gray-900 dark:text-white placeholder-gray-500"
                  ></textarea>
                </motion.div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-red-600 text-white px-12 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Send Message
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
