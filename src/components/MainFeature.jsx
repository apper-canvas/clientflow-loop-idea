import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

function MainFeature() {
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'Marketing Director',
      status: 'active',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Innovate Solutions',
      position: 'CEO',
      status: 'prospect',
      createdAt: new Date('2024-01-20')
    }
  ])

  const [deals, setDeals] = useState([
    {
      id: '1',
      title: 'TechCorp Enterprise Package',
      contactId: '1',
      value: 45000,
      stage: 'negotiation',
      probability: 75,
      expectedCloseDate: new Date('2024-02-15'),
      description: 'Enterprise software licensing deal'
    },
    {
      id: '2',
      title: 'Innovate Solutions Consulting',
      contactId: '2',
      value: 25000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: new Date('2024-02-28'),
      description: 'Strategic consulting engagement'
    }
  ])

  const [activities, setActivities] = useState([
    {
      id: '1',
      contactId: '1',
      dealId: '1',
      type: 'call',
      subject: 'Follow-up call with Sarah',
      description: 'Discussed implementation timeline and requirements',
      dueDate: new Date('2024-01-25'),
      completed: true,
      createdAt: new Date('2024-01-24')
    },
    {
      id: '2',
      contactId: '2',
      dealId: '2',
      type: 'meeting',
      subject: 'Strategy presentation meeting',
      description: 'Present consulting proposal and pricing',
      dueDate: new Date('2024-01-30'),
      completed: false,
      createdAt: new Date('2024-01-25')
    }
  ])

  const [showContactForm, setShowContactForm] = useState(false)
  const [showDealForm, setShowDealForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'prospect'
  })

  const [newDeal, setNewDeal] = useState({
    title: '',
    contactId: '',
    value: '',
    stage: 'lead',
    probability: 25,
    expectedCloseDate: '',
    description: ''
  })

  const [newActivity, setNewActivity] = useState({
    contactId: '',
    dealId: '',
    type: 'call',
    subject: '',
    description: '',
    dueDate: '',
    completed: false
  })

  const handleAddContact = (e) => {
    e.preventDefault()
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      toast.error('Please fill in all required fields')
      return
    }

    const contact = {
      id: Date.now().toString(),
      ...newContact,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setContacts([...contacts, contact])
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      status: 'prospect'
    })
    setShowContactForm(false)
    toast.success('Contact added successfully!')
  }

  const handleAddDeal = (e) => {
    e.preventDefault()
    if (!newDeal.title || !newDeal.contactId || !newDeal.value) {
      toast.error('Please fill in all required fields')
      return
    }

    const deal = {
      id: Date.now().toString(),
      ...newDeal,
      value: parseFloat(newDeal.value),
      expectedCloseDate: newDeal.expectedCloseDate ? new Date(newDeal.expectedCloseDate) : null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setDeals([...deals, deal])
    setNewDeal({
      title: '',
      contactId: '',
      value: '',
      stage: 'lead',
      probability: 25,
      expectedCloseDate: '',
      description: ''
    })
    setShowDealForm(false)
    toast.success('Deal added successfully!')
  }

  const handleAddActivity = (e) => {
    e.preventDefault()
    if (!newActivity.contactId || !newActivity.subject) {
      toast.error('Please fill in all required fields')
      return
    }

    const activity = {
      id: Date.now().toString(),
      ...newActivity,
      dueDate: newActivity.dueDate ? new Date(newActivity.dueDate) : null,
      createdAt: new Date()
    }

    setActivities([...activities, activity])
    setNewActivity({
      contactId: '',
      dealId: '',
      type: 'call',
      subject: '',
      description: '',
      dueDate: '',
      completed: false
    })
    setShowActivityForm(false)
    toast.success('Activity added successfully!')
  }

  const toggleActivityComplete = (activityId) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: !activity.completed }
        : activity
    ))
    toast.success('Activity status updated!')
  }

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId)
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown'
  }

  const getStageColor = (stage) => {
    const colors = {
      lead: 'bg-surface-100 text-surface-700',
      qualified: 'bg-blue-100 text-blue-700',
      proposal: 'bg-yellow-100 text-yellow-700',
      negotiation: 'bg-orange-100 text-orange-700',
      closed: 'bg-green-100 text-green-700'
    }
    return colors[stage] || colors.lead
  }

  const getStatusColor = (status) => {
    const colors = {
      prospect: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-surface-100 text-surface-700'
    }
    return colors[status] || colors.prospect
  }

  const tabs = [
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'deals', label: 'Deals', icon: 'TrendingUp' },
    { id: 'activities', label: 'Activities', icon: 'Calendar' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft p-4 sm:p-6 lg:p-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
              CRM Dashboard
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Manage your customer relationships and sales pipeline
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-surface-50 dark:bg-surface-700 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-surface-600 text-primary shadow-soft'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Contact Management
                  </h4>
                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-200 hover:scale-105"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Contact</span>
                  </button>
                </div>

                {showContactForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddContact}
                    className="bg-surface-50 dark:bg-surface-700 rounded-2xl p-4 sm:p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={newContact.firstName}
                        onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name *"
                        value={newContact.lastName}
                        onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={newContact.email}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={newContact.company}
                        onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={newContact.position}
                        onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select
                        value={newContact.status}
                        onChange={(e) => setNewContact({...newContact, status: e.target.value})}
                        className="w-full sm:w-auto px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      >
                        <option value="prospect">Prospect</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <button
                        type="submit"
                        className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                      >
                        <ApperIcon name="Check" className="w-4 h-4" />
                        <span>Save Contact</span>
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {contacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-white to-surface-50 dark:from-surface-800 dark:to-surface-700 rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-surface-100 dark:border-surface-600"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                            <span className="text-white font-semibold text-sm sm:text-base">
                              {contact.firstName[0]}{contact.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-semibold text-surface-900 dark:text-surface-100">
                              {contact.firstName} {contact.lastName}
                            </h5>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Mail" className="w-4 h-4" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Phone" className="w-4 h-4" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                        {contact.company && (
                          <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Building" className="w-4 h-4" />
                            <span>{contact.company}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-surface-500 dark:text-surface-500 text-xs">
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <span>Added {format(contact.createdAt, 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Deals Tab */}
            {activeTab === 'deals' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Sales Pipeline
                  </h4>
                  <button
                    onClick={() => setShowDealForm(!showDealForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-200 hover:scale-105"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Deal</span>
                  </button>
                </div>

                {showDealForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddDeal}
                    className="bg-surface-50 dark:bg-surface-700 rounded-2xl p-4 sm:p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Deal Title *"
                        value={newDeal.title}
                        onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      />
                      <select
                        value={newDeal.contactId}
                        onChange={(e) => setNewDeal({...newDeal, contactId: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      >
                        <option value="">Select Contact *</option>
                        {contacts.map(contact => (
                          <option key={contact.id} value={contact.id}>
                            {contact.firstName} {contact.lastName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Deal Value *"
                        value={newDeal.value}
                        onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      />
                      <select
                        value={newDeal.stage}
                        onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      >
                        <option value="lead">Lead</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="closed">Closed</option>
                      </select>
                      <input
                        type="date"
                        placeholder="Expected Close Date"
                        value={newDeal.expectedCloseDate}
                        onChange={(e) => setNewDeal({...newDeal, expectedCloseDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newDeal.probability}
                        onChange={(e) => setNewDeal({...newDeal, probability: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      Probability: {newDeal.probability}%
                    </div>
                    <textarea
                      placeholder="Description"
                      value={newDeal.description}
                      onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      rows="3"
                    />
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                      <ApperIcon name="Check" className="w-4 h-4" />
                      <span>Save Deal</span>
                    </button>
                  </motion.form>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {deals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-white to-surface-50 dark:from-surface-800 dark:to-surface-700 rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-surface-100 dark:border-surface-600"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h5 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                            {deal.title}
                          </h5>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                              {deal.stage}
                            </span>
                            <span className="text-sm text-surface-600 dark:text-surface-400">
                              {deal.probability}% probability
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            ${deal.value.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                          <ApperIcon name="User" className="w-4 h-4" />
                          <span>{getContactName(deal.contactId)}</span>
                        </div>
                        {deal.expectedCloseDate && (
                          <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Calendar" className="w-4 h-4" />
                            <span>Expected: {format(deal.expectedCloseDate, 'MMM d, yyyy')}</span>
                          </div>
                        )}
                        {deal.description && (
                          <p className="text-surface-600 dark:text-surface-400 text-xs mt-3">
                            {deal.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Activity Tracking
                  </h4>
                  <button
                    onClick={() => setShowActivityForm(!showActivityForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-200 hover:scale-105"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Activity</span>
                  </button>
                </div>

                {showActivityForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddActivity}
                    className="bg-surface-50 dark:bg-surface-700 rounded-2xl p-4 sm:p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select
                        value={newActivity.contactId}
                        onChange={(e) => setNewActivity({...newActivity, contactId: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                        required
                      >
                        <option value="">Select Contact *</option>
                        {contacts.map(contact => (
                          <option key={contact.id} value={contact.id}>
                            {contact.firstName} {contact.lastName}
                          </option>
                        ))}
                      </select>
                      <select
                        value={newActivity.dealId}
                        onChange={(e) => setNewActivity({...newActivity, dealId: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      >
                        <option value="">Select Deal (Optional)</option>
                        {deals.map(deal => (
                          <option key={deal.id} value={deal.id}>
                            {deal.title}
                          </option>
                        ))}
                      </select>
                      <select
                        value={newActivity.type}
                        onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      >
                        <option value="call">Call</option>
                        <option value="meeting">Meeting</option>
                        <option value="email">Email</option>
                        <option value="task">Task</option>
                      </select>
                      <input
                        type="datetime-local"
                        value={newActivity.dueDate}
                        onChange={(e) => setNewActivity({...newActivity, dueDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject *"
                      value={newActivity.subject}
                      onChange={(e) => setNewActivity({...newActivity, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary transition-colors"
                      rows="3"
                    />
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                      <ApperIcon name="Check" className="w-4 h-4" />
                      <span>Save Activity</span>
                    </button>
                  </motion.form>
                )}

                <div className="space-y-4">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`bg-gradient-to-r ${activity.completed ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' : 'from-white to-surface-50 dark:from-surface-800 dark:to-surface-700'} rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 border ${activity.completed ? 'border-green-200 dark:border-green-700' : 'border-surface-100 dark:border-surface-600'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <button
                            onClick={() => toggleActivityComplete(activity.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              activity.completed 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-surface-300 dark:border-surface-600 hover:border-green-400'
                            }`}
                          >
                            {activity.completed && (
                              <ApperIcon name="Check" className="w-3 h-3 text-white" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h5 className={`font-semibold ${activity.completed ? 'text-green-800 dark:text-green-200 line-through' : 'text-surface-900 dark:text-surface-100'}`}>
                                {activity.subject}
                              </h5>
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {activity.type}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                                <ApperIcon name="User" className="w-4 h-4" />
                                <span>{getContactName(activity.contactId)}</span>
                              </div>
                              {activity.dueDate && (
                                <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                                  <ApperIcon name="Calendar" className="w-4 h-4" />
                                  <span>Due: {format(activity.dueDate, 'MMM d, yyyy h:mm a')}</span>
                                </div>
                              )}
                              {activity.description && (
                                <p className="text-surface-600 dark:text-surface-400 mt-2">
                                  {activity.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default MainFeature