import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Users" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                ClientFlow
              </h1>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200 shadow-soft"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700 dark:text-surface-300" 
                />
              </button>
              
              <div className="hidden sm:flex items-center space-x-2 bg-white dark:bg-surface-800 rounded-full px-3 py-2 shadow-soft">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-surface-600 dark:text-surface-400">
                  Live CRM
                </span>
              </div>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="gradient-text">Transform</span> Your Customer
                <br className="hidden sm:block" />
                <span className="text-surface-900 dark:text-surface-100"> Relationships</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
                Streamline your sales pipeline, nurture leads, and build lasting customer relationships with our intelligent CRM platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              <div className="flex items-center space-x-2 bg-white dark:bg-surface-800 rounded-full px-4 py-2 shadow-soft">
                <ApperIcon name="TrendingUp" className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Sales Pipeline</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-surface-800 rounded-full px-4 py-2 shadow-soft">
                <ApperIcon name="Calendar" className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Activity Tracking</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-surface-800 rounded-full px-4 py-2 shadow-soft">
                <ApperIcon name="BarChart3" className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Analytics</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
      </section>

      {/* Main Feature Section */}
      <section className="relative py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { icon: "Users", value: "10K+", label: "Active Contacts" },
              { icon: "DollarSign", value: "$2.5M", label: "Revenue Tracked" },
              { icon: "Target", value: "95%", label: "Deal Accuracy" },
              { icon: "Clock", value: "50%", label: "Time Saved" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-600 dark:text-surface-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold gradient-text">ClientFlow</span>
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400 text-center sm:text-right">
              Built for modern sales teams • Transform your customer relationships
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home