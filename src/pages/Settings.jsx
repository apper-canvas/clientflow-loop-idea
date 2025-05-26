import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  
  // Profile Settings State
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'Sales Manager',
    timezone: 'America/New_York',
    language: 'en'
  })
  
  // Preferences State
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
    autoSave: true,
    compactView: false,
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  })
  
  // Security State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    passwordExpiry: '90'
  })
  
  // Integration State
  const [integrations, setIntegrations] = useState({
    googleCalendar: { connected: true, lastSync: '2 hours ago' },
    slack: { connected: false, lastSync: 'Never' },
    mailchimp: { connected: true, lastSync: '1 day ago' },
    zapier: { connected: false, lastSync: 'Never' }
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ]

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' }
  ]

  const handleProfileSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePreferenceSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      toast.success('Preferences saved successfully!')
      
      // Apply dark mode immediately
      if (preferences.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (error) {
      toast.error('Failed to save preferences. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      toast.success('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error('Failed to change password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleIntegrationToggle = async (integration) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIntegrations(prev => ({
        ...prev,
        [integration]: {
          ...prev[integration],
          connected: !prev[integration].connected,
          lastSync: prev[integration].connected ? 'Never' : 'Just now'
        }
      }))
      
      const action = integrations[integration].connected ? 'disconnected from' : 'connected to'
      toast.success(`Successfully ${action} ${integration.charAt(0).toUpperCase() + integration.slice(1)}!`)
    } catch (error) {
      toast.error(`Failed to ${integrations[integration].connected ? 'disconnect from' : 'connect to'} ${integration}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleSecuritySave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 900))
      toast.success('Security settings updated successfully!')
    } catch (error) {
      toast.error('Failed to update security settings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
            Settings
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage your account settings and application preferences.
          </p>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft overflow-hidden">
        <div className="border-b border-surface-200 dark:border-surface-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Timezone
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {timezones.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Language
                  </label>
                  <select
                    value={profileData.language}
                    onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleProfileSave}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Save" className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Appearance</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Dark Mode</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Switch to dark theme</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.darkMode}
                      onChange={(e) => setPreferences({...preferences, darkMode: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Compact View</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Use compact layout for lists</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.compactView}
                      onChange={(e) => setPreferences({...preferences, compactView: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">General</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Default Currency
                    </label>
                    <select
                      value={preferences.defaultCurrency}
                      onChange={(e) => setPreferences({...preferences, defaultCurrency: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Date Format
                    </label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Auto Save</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Automatically save form changes</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.autoSave}
                      onChange={(e) => setPreferences({...preferences, autoSave: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handlePreferenceSave}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Save" className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Preferences'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Password</h3>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                    ) : (
                      <ApperIcon name="Key" className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Changing...' : 'Change Password'}</span>
                  </button>
                </form>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Security Settings</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Two-Factor Authentication</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Add an extra layer of security</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Login Alerts</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Get notified of new logins</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.loginAlerts}
                      onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="0">Never</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Password Expiry (days)
                    </label>
                    <select
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="0">Never</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSecuritySave}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Shield" className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Security Settings'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {Object.entries(integrations).map(([key, integration]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        integration.connected ? 'bg-green-100 text-green-600' : 'bg-surface-200 dark:bg-surface-600 text-surface-500'
                      }`}>
                        <ApperIcon name={key === 'googleCalendar' ? 'Calendar' : key === 'slack' ? 'MessageSquare' : key === 'mailchimp' ? 'Mail' : 'Zap'} className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-medium text-surface-900 dark:text-surface-100 capitalize">
                          {key === 'googleCalendar' ? 'Google Calendar' : key === 'mailchimp' ? 'MailChimp' : key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        <div className="text-sm text-surface-600 dark:text-surface-400">
                          Last sync: {integration.lastSync}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleIntegrationToggle(key)}
                      disabled={loading}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 ${
                        integration.connected
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Email Notifications</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Email Notifications</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Receive email updates for important events</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Weekly Reports</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Get weekly summary reports</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.weeklyReports}
                      onChange={(e) => setPreferences({...preferences, weeklyReports: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Marketing Emails</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Receive product updates and tips</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketingEmails}
                      onChange={(e) => setPreferences({...preferences, marketingEmails: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Push Notifications</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <div>
                    <div className="font-medium text-surface-900 dark:text-surface-100">Push Notifications</div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">Receive instant notifications</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.pushNotifications}
                      onChange={(e) => setPreferences({...preferences, pushNotifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handlePreferenceSave}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Bell" className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Notification Settings'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings