import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import ApperIcon from '../components/ApperIcon'

function Reports() {
  const [activeReport, setActiveReport] = useState('sales')
  const [dateRange, setDateRange] = useState('30')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isExporting, setIsExporting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sample data - in a real app, this would come from an API
  const [reportData, setReportData] = useState({
    sales: {
      totalRevenue: 847250,
      monthlyRevenue: 125430,
      deals: 156,
      avgDealSize: 5432,
      conversionRate: 24.5,
      growth: 12.3
    },
    contacts: {
      total: 2847,
      newThisMonth: 234,
      active: 1923,
      prospects: 678,
      inactive: 246,
      growth: 8.7
    },
    pipeline: {
      totalValue: 1250000,
      stages: {
        lead: { count: 45, value: 187500 },
        qualified: { count: 32, value: 280000 },
        proposal: { count: 28, value: 315000 },
        negotiation: { count: 18, value: 234000 },
        closed: { count: 33, value: 233500 }
      }
    }
  })

  const [chartData, setChartData] = useState({
    salesTrend: [
      { month: 'Jan', revenue: 85000, deals: 12 },
      { month: 'Feb', revenue: 92000, deals: 15 },
      { month: 'Mar', revenue: 78000, deals: 11 },
      { month: 'Apr', revenue: 105000, deals: 18 },
      { month: 'May', revenue: 125430, deals: 23 },
      { month: 'Jun', revenue: 110000, deals: 19 }
    ],
    contactGrowth: [
      { month: 'Jan', contacts: 2156 },
      { month: 'Feb', contacts: 2298 },
      { month: 'Mar', contacts: 2401 },
      { month: 'Apr', contacts: 2589 },
      { month: 'May', contacts: 2734 },
      { month: 'Jun', contacts: 2847 }
    ]
  })

  const reportTypes = [
    { id: 'sales', label: 'Sales Analytics', icon: 'TrendingUp', description: 'Revenue trends and deal performance' },
    { id: 'contacts', label: 'Contact Metrics', icon: 'Users', description: 'Contact growth and engagement data' },
    { id: 'pipeline', label: 'Pipeline Analysis', icon: 'BarChart3', description: 'Deal pipeline and conversion rates' },
    { id: 'activity', label: 'Activity Reports', icon: 'Calendar', description: 'Task completion and team productivity' }
  ]

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ]

  const handleExportReport = async () => {
    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create CSV content
      const csvData = generateCSVData()
      const blob = new Blob([csvData], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${activeReport}-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
      link.click()
      window.URL.revokeObjectURL(url)
      
      toast.success('Report exported successfully!')
    } catch (error) {
      toast.error('Failed to export report')
    } finally {
      setIsExporting(false)
    }
  }

  const generateCSVData = () => {
    const headers = {
      sales: 'Month,Revenue,Deals,Avg Deal Size\n',
      contacts: 'Month,Total Contacts,New Contacts,Growth Rate\n',
      pipeline: 'Stage,Deal Count,Total Value,Avg Value\n',
      activity: 'Date,Tasks Completed,Calls Made,Meetings Held\n'
    }

    const data = {
      sales: chartData.salesTrend.map(item => 
        `${item.month},${item.revenue},${item.deals},${Math.round(item.revenue / item.deals)}`
      ).join('\n'),
      contacts: chartData.contactGrowth.map((item, index) => 
        `${item.month},${item.contacts},${index > 0 ? item.contacts - chartData.contactGrowth[index-1].contacts : 0},${index > 0 ? ((item.contacts - chartData.contactGrowth[index-1].contacts) / chartData.contactGrowth[index-1].contacts * 100).toFixed(1) : 0}%`
      ).join('\n'),
      pipeline: Object.entries(reportData.pipeline.stages).map(([stage, data]) => 
        `${stage},${data.count},${data.value},${Math.round(data.value / data.count)}`
      ).join('\n'),
      activity: [
        'Jun 1,25,45,12',
        'Jun 2,28,38,15',
        'Jun 3,22,42,8',
        'Jun 4,31,51,18',
        'Jun 5,27,39,11'
      ].join('\n')
    }

    return headers[activeReport] + data[activeReport]
  }

  const handleRefreshData = async () => {
    setIsLoading(true)
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update with mock refreshed data
      setReportData(prev => ({
        ...prev,
        sales: {
          ...prev.sales,
          monthlyRevenue: prev.sales.monthlyRevenue + Math.random() * 10000 - 5000
        }
      }))
      
      toast.success('Data refreshed successfully!')
    } catch (error) {
      toast.error('Failed to refresh data')
    } finally {
      setIsLoading(false)
    }
  }

  const getMaxValue = (data, key) => {
    return Math.max(...data.map(item => item[key]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
            Reports & Analytics
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Comprehensive insights into your CRM performance and business metrics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <button
            onClick={handleRefreshData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors disabled:opacity-50"
          >
            <ApperIcon name={isLoading ? 'Loader2' : 'RefreshCw'} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
          >
            <ApperIcon name={isExporting ? 'Loader2' : 'Download'} className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => setActiveReport(type.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              activeReport === type.id
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 hover:border-primary/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activeReport === type.id ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
              }`}>
                <ApperIcon name={type.icon} className="w-5 h-5" />
              </div>
              <h3 className={`font-semibold ${
                activeReport === type.id ? 'text-primary' : 'text-surface-900 dark:text-surface-100'
              }`}>
                {type.label}
              </h3>
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              {type.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Report Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeReport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Sales Analytics */}
          {activeReport === 'sales' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                      <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-600">+{reportData.sales.growth}%</span>
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    ${reportData.sales.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Total Revenue
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <ApperIcon name="TrendingUp" className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-blue-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    {reportData.sales.deals}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Total Deals
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                      <ApperIcon name="Target" className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-purple-600">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    ${reportData.sales.avgDealSize.toLocaleString()}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Avg Deal Size
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                      <ApperIcon name="Percent" className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-orange-600">+3%</span>
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    {reportData.sales.conversionRate}%
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Conversion Rate
                  </div>
                </div>
              </div>

              {/* Sales Trend Chart */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Revenue Trend
                </h3>
                <div className="h-64 flex items-end space-x-4">
                  {chartData.salesTrend.map((item, index) => {
                    const height = (item.revenue / getMaxValue(chartData.salesTrend, 'revenue')) * 100
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-t-lg relative" style={{ height: '200px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg"
                          />
                        </div>
                        <div className="mt-2 text-xs text-surface-600 dark:text-surface-400 text-center">
                          <div className="font-medium">{item.month}</div>
                          <div>${Math.round(item.revenue / 1000)}k</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Contact Metrics */}
          {activeReport === 'contacts' && (
            <div className="space-y-6">
              {/* Contact Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                    {reportData.contacts.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Total Contacts
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {reportData.contacts.newThisMonth}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    New This Month
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {reportData.contacts.active}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Active
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {reportData.contacts.prospects}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Prospects
                  </div>
                </div>
                
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                  <div className="text-2xl font-bold text-surface-500 mb-1">
                    {reportData.contacts.inactive}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Inactive
                  </div>
                </div>
              </div>

              {/* Contact Growth Chart */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Contact Growth Over Time
                </h3>
                <div className="h-64 flex items-end space-x-4">
                  {chartData.contactGrowth.map((item, index) => {
                    const height = (item.contacts / getMaxValue(chartData.contactGrowth, 'contacts')) * 100
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-t-lg relative" style={{ height: '200px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                          />
                        </div>
                        <div className="mt-2 text-xs text-surface-600 dark:text-surface-400 text-center">
                          <div className="font-medium">{item.month}</div>
                          <div>{item.contacts.toLocaleString()}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Pipeline Analysis */}
          {activeReport === 'pipeline' && (
            <div className="space-y-6">
              {/* Pipeline Overview */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    Pipeline by Stage
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                      ${reportData.pipeline.totalValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      Total Pipeline Value
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(reportData.pipeline.stages).map(([stage, data], index) => {
                    const percentage = (data.value / reportData.pipeline.totalValue) * 100
                    const stageColors = {
                      lead: 'bg-surface-400',
                      qualified: 'bg-blue-500',
                      proposal: 'bg-yellow-500',
                      negotiation: 'bg-orange-500',
                      closed: 'bg-green-500'
                    }
                    
                    return (
                      <div key={stage} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${stageColors[stage]}`}></div>
                            <span className="font-medium text-surface-900 dark:text-surface-100 capitalize">
                              {stage}
                            </span>
                            <span className="text-sm text-surface-600 dark:text-surface-400">
                              ({data.count} deals)
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-surface-900 dark:text-surface-100">
                              ${data.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-surface-600 dark:text-surface-400">
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`h-2 rounded-full ${stageColors[stage]}`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Activity Reports */}
          {activeReport === 'activity' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Team Activity Overview
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                      147
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      Tasks Completed
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="Phone" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                      89
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      Calls Made
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="Users" className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                      34
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      Meetings Held
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                    <ApperIcon name="Clock" className="w-5 h-5" />
                    <span className="font-medium">Productivity Insight</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Team productivity is up 15% this month. Most active hours are between 10 AM - 2 PM.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Reports