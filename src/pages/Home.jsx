import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

import Reports from './Reports'

function Home() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'deals', label: 'Deals', icon: 'TrendingUp' },
    { id: 'activities', label: 'Activities', icon: 'Calendar' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ]

  const metrics = [
    { icon: 'Users', value: '2,847', label: 'Total Contacts', change: '+12%', color: 'text-blue-600' },
    { icon: 'DollarSign', value: '$125,430', label: 'Revenue This Month', change: '+8%', color: 'text-green-600' },
    { icon: 'TrendingUp', value: '23', label: 'Active Deals', change: '+5%', color: 'text-purple-600' },
    { icon: 'Target', value: '89%', label: 'Conversion Rate', change: '+3%', color: 'text-orange-600' }
  ]

  const recentActivities = [
    { type: 'deal', title: 'New deal added', subtitle: 'TechCorp Enterprise Package', time: '2 minutes ago', icon: 'Plus' },
    { type: 'contact', title: 'Contact updated', subtitle: 'Sarah Johnson profile', time: '15 minutes ago', icon: 'Edit' },
    { type: 'meeting', title: 'Meeting completed', subtitle: 'Strategy presentation', time: '1 hour ago', icon: 'Check' },
    { type: 'call', title: 'Follow-up call scheduled', subtitle: 'Michael Chen', time: '2 hours ago', icon: 'Phone' }
  ]

  return (
    <div className={`min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 sidebar ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } lg:translate-x-0 ${sidebarCollapsed && 'lg:w-16'}`}>
        <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">ClientFlow</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <ApperIcon name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 nav-item ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-surface-800/95 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <ApperIcon name="Menu" className="w-5 h-5" />
              </button>
              
              <div>
                <nav className="breadcrumb">
                  <span>CRM</span>
                  <ApperIcon name="ChevronRight" className="w-4 h-4 breadcrumb-separator" />
                  <span className="capitalize font-medium text-surface-900 dark:text-surface-100">
                    {activeSection}
                  </span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
                        Dashboard
                      </h1>
                      <p className="text-surface-600 dark:text-surface-400 mt-1">
                        Welcome back! Here's what's happening with your CRM today.
                      </p>
                    </div>
                    <button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-200">
                      <ApperIcon name="Plus" className="w-4 h-4" />
                      <span>New Contact</span>
                    </button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="dashboard-grid">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="metric-card rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color} bg-opacity-10`}>
                            <ApperIcon name={metric.icon} className={`w-6 h-6 ${metric.color}`} />
                          </div>
                          <span className="text-sm font-medium text-green-600">{metric.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-surface-600 dark:text-surface-400">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                      Recent Activities
                    </h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ApperIcon name={activity.icon} className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-surface-900 dark:text-surface-100">
                              {activity.title}
                            </div>
                            <div className="text-xs text-surface-600 dark:text-surface-400">
                              {activity.subtitle}
                            </div>
                          </div>
                          <div className="text-xs text-surface-500 dark:text-surface-500">
                            {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(activeSection === 'contacts' || activeSection === 'deals' || activeSection === 'activities') && (
                <MainFeature initialTab={activeSection} />
              )}

              {activeSection === 'reports' && (
                <Reports />
              )}


              {activeSection === 'settings' && (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-soft text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Settings" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    Settings
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    Customize your CRM experience. Manage user preferences, integrations, and system configurations.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}


export default Home