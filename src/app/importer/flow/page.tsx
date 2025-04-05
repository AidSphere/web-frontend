"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaUserMd, 
  FaHandHoldingMedical, 
  FaClipboardList, 
  FaFileInvoiceDollar, 
  FaShippingFast, 
  FaBoxOpen, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaChevronRight,
  FaDatabase,
  FaCode,
  FaNetworkWired,
  FaCubes,
  FaProjectDiagram,
  FaObjectGroup,
  FaTh,
  FaSitemap,
  FaArrowRight,
  FaExchangeAlt,
  FaTasks,
  FaLink
} from 'react-icons/fa';

const ProjectFlowVisualization = () => {
  const [activeTab, setActiveTab] = useState('userFlow');
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  
  // Auto-play through steps
  useEffect(() => {
    let interval;
    if (autoPlay && activeTab === 'userFlow') {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, activeTab]);

  // Define each step in the flow
  const steps = [
    {
      id: 'registration',
      title: 'Registration & Verification',
      description: 'Drug importers register with their credentials, verify their email, and upload required documents for approval.',
      icon: <FaUser className="text-purple-500 size-8" />,
      color: 'bg-purple-100 border-purple-300',
      textColor: 'text-purple-800',
      connectorColor: 'bg-gradient-to-r from-purple-300 to-blue-300'
    },
    {
      id: 'requests',
      title: 'Medicine Requests',
      description: 'Clients and donors submit requests for medicines, which appear in the drug importer\'s dashboard.',
      icon: <FaClipboardList className="text-blue-500 size-8" />,
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      connectorColor: 'bg-gradient-to-r from-blue-300 to-green-300'
    },
    {
      id: 'quotations',
      title: 'Quotations',
      description: 'Drug importers review requests and send quotations to clients/donors with pricing and availability details.',
      icon: <FaFileInvoiceDollar className="text-green-500 size-8" />,
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      connectorColor: 'bg-gradient-to-r from-green-300 to-yellow-300'
    },
    {
      id: 'review',
      title: 'Review & Payment',
      description: 'Clients/donors review quotations and either accept and pay or deny if the medicines don\'t match their needs.',
      icon: <FaHandHoldingMedical className="text-yellow-500 size-8" />,
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      connectorColor: 'bg-gradient-to-r from-yellow-300 to-orange-300'
    },
    {
      id: 'shipping',
      title: 'Medicine Shipping',
      description: 'After payment, the drug importer ships the medicines to the client/donor, updating inventory automatically.',
      icon: <FaShippingFast className="text-orange-500 size-8" />,
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      connectorColor: 'bg-gradient-to-r from-orange-300 to-red-300'
    },
    {
      id: 'tracking',
      title: 'Revenue Tracking',
      description: 'The system tracks all transactions and updates revenue and income reports for the drug importer.',
      icon: <FaBoxOpen className="text-red-500 size-8" />,
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      connectorColor: 'bg-red-300'
    }
  ];

  // Main tabs for navigation
  const tabs = [
    { id: 'userFlow', title: 'User Flow', icon: <FaUser className="mr-2" /> },
    { id: 'entityRelationship', title: 'Entity Relationship', icon: <FaDatabase className="mr-2" /> },
    { id: 'classStructure', title: 'Class Structure', icon: <FaObjectGroup className="mr-2" /> },
    { id: 'apiEndpoints', title: 'API Endpoints', icon: <FaNetworkWired className="mr-2" /> },
    { id: 'componentHierarchy', title: 'Component Hierarchy', icon: <FaSitemap className="mr-2" /> },
    { id: 'dataFlow', title: 'Data Flow', icon: <FaExchangeAlt className="mr-2" /> }
  ];

  // ER Diagram data
  const entities = [
    {
      name: 'User',
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'userType', type: 'string' },
        { name: 'fullName', type: 'string' },
        { name: 'phoneNumber', type: 'string' },
        { name: 'isVerified', type: 'boolean' },
        { name: 'nic', type: 'string' },
        { name: 'licenseNumber', type: 'string' },
        { name: 'createdAt', type: 'date' }
      ]
    },
    {
      name: 'MedicineRequest',
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'userId', type: 'string', isForeign: true },
        { name: 'requestType', type: 'string' },
        { name: 'requestDate', type: 'date' },
        { name: 'status', type: 'string' },
        { name: 'shippingAddress', type: 'string' },
        { name: 'specialInstructions', type: 'string' }
      ]
    },
    {
      name: 'Medicine',
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'name', type: 'string' },
        { name: 'genericName', type: 'string' },
        { name: 'manufacturer', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'dosageForm', type: 'string' },
        { name: 'strength', type: 'string' },
        { name: 'prescriptionRequired', type: 'boolean' },
        { name: 'expiryDate', type: 'date' }
      ]
    },
    {
      name: 'Quotation',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'requestId', type: 'string', isForeign: true },
        { name: 'importerId', type: 'string', isForeign: true },
        { name: 'createdDate', type: 'date' },
        { name: 'validUntil', type: 'date' },
        { name: 'status', type: 'string' },
        { name: 'totalAmount', type: 'float' },
        { name: 'discountAmount', type: 'float' },
        { name: 'taxAmount', type: 'float' },
        { name: 'terms', type: 'string' }
      ]
    },
    {
      name: 'Payment',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'quotationId', type: 'string', isForeign: true },
        { name: 'userId', type: 'string', isForeign: true },
        { name: 'amount', type: 'float' },
        { name: 'paymentMethod', type: 'string' },
        { name: 'paymentDate', type: 'date' },
        { name: 'transactionId', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'receipt', type: 'string' }
      ]
    },
    {
      name: 'Shipment',
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      attributes: [
        { name: 'id', type: 'string', isPrimary: true },
        { name: 'paymentId', type: 'string', isForeign: true },
        { name: 'shipmentDate', type: 'date' },
        { name: 'trackingNumber', type: 'string' },
        { name: 'carrier', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'deliveryAddress', type: 'string' },
        { name: 'estimatedDelivery', type: 'date' },
        { name: 'actualDelivery', type: 'date' }
      ]
    }
  ];

  // Relationships between entities
  const relationships = [
    { from: 'User', to: 'MedicineRequest', relationship: '1:N', description: 'creates' },
    { from: 'User', to: 'Quotation', relationship: '1:N', description: 'reviews' },
    { from: 'User', to: 'Payment', relationship: '1:N', description: 'processes' },
    { from: 'MedicineRequest', to: 'Quotation', relationship: '1:N', description: 'receives' },
    { from: 'Quotation', to: 'Payment', relationship: '1:1', description: 'receives' },
    { from: 'Payment', to: 'Shipment', relationship: '1:1', description: 'triggers' }
  ];

  // Class structure data for service layer
  const services = [
    {
      name: 'UserService',
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      methods: [
        'register(userData): Promise<User>',
        'verifyEmail(token): Promise<boolean>',
        'login(email, password): Promise<AuthToken>',
        'forgotPassword(email): Promise<boolean>',
        'resetPassword(token, password): Promise<boolean>',
        'getProfile(userId): Promise<User>',
        'updateProfile(userId, userData): Promise<User>'
      ]
    },
    {
      name: 'MedicineService',
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      methods: [
        'listMedicines(filters): Promise<Array<Medicine>>',
        'getMedicine(id): Promise<Medicine>',
        'addMedicine(medicineData): Promise<Medicine>',
        'updateMedicine(id, medicineData): Promise<Medicine>',
        'deleteMedicine(id): Promise<boolean>',
        'searchMedicines(query): Promise<Array<Medicine>>'
      ]
    },
    {
      name: 'RequestService',
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      methods: [
        'createRequest(requestData): Promise<MedicineRequest>',
        'getRequests(filters): Promise<Array<MedicineRequest>>',
        'getRequestById(id): Promise<MedicineRequest>',
        'updateRequest(id, requestData): Promise<MedicineRequest>',
        'cancelRequest(id, reason): Promise<boolean>'
      ]
    },
    {
      name: 'QuotationService',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      methods: [
        'createQuotation(quotationData): Promise<Quotation>',
        'getQuotationById(id): Promise<Quotation>',
        'updateQuotation(id, quotationData): Promise<Quotation>',
        'acceptQuotation(id): Promise<Quotation>',
        'rejectQuotation(id, reason): Promise<Quotation>'
      ]
    },
    {
      name: 'PaymentService',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      methods: [
        'processPayment(paymentData): Promise<Payment>',
        'getPaymentStatus(id): Promise<string>',
        'generateReceipt(id): Promise<string>',
        'refundPayment(id, reason): Promise<Payment>'
      ]
    },
    {
      name: 'ShipmentService',
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      methods: [
        'createShipment(shipmentData): Promise<Shipment>',
        'updateShipmentStatus(id, status): Promise<Shipment>',
        'getShipmentById(id): Promise<Shipment>',
        'trackShipment(trackingNumber): Promise<TrackingInfo>'
      ]
    }
  ];

  // API Endpoints
  const apiEndpoints = [
    {
      group: 'Authentication',
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      endpoints: [
        { path: '/api/auth/register', method: 'POST', description: 'Register a new user' },
        { path: '/api/auth/login', method: 'POST', description: 'Login to the system' },
        { path: '/api/auth/verify-email/:token', method: 'GET', description: 'Verify email address' },
        { path: '/api/auth/forgot-password', method: 'POST', description: 'Request password reset' },
        { path: '/api/auth/reset-password', method: 'POST', description: 'Reset password with token' }
      ]
    },
    {
      group: 'Medicines',
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      endpoints: [
        { path: '/api/medicines', method: 'GET', description: 'List all medicines' },
        { path: '/api/medicines/:id', method: 'GET', description: 'Get medicine details' },
        { path: '/api/medicines', method: 'POST', description: 'Add new medicine' },
        { path: '/api/medicines/:id', method: 'PUT', description: 'Update medicine details' },
        { path: '/api/medicines/:id', method: 'DELETE', description: 'Delete a medicine' }
      ]
    },
    {
      group: 'Requests',
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      endpoints: [
        { path: '/api/requests', method: 'GET', description: 'List all requests' },
        { path: '/api/requests/:id', method: 'GET', description: 'Get request details' },
        { path: '/api/requests', method: 'POST', description: 'Create new request' },
        { path: '/api/requests/:id', method: 'PUT', description: 'Update request details' },
        { path: '/api/requests/:id/cancel', method: 'POST', description: 'Cancel a request' }
      ]
    },
    {
      group: 'Quotations',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      endpoints: [
        { path: '/api/quotations', method: 'POST', description: 'Create new quotation' },
        { path: '/api/quotations/:id', method: 'GET', description: 'Get quotation details' },
        { path: '/api/quotations/:id', method: 'PUT', description: 'Update quotation' },
        { path: '/api/quotations/:id/accept', method: 'POST', description: 'Accept a quotation' },
        { path: '/api/quotations/:id/reject', method: 'POST', description: 'Reject a quotation' }
      ]
    },
    {
      group: 'Payments',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      endpoints: [
        { path: '/api/payments', method: 'POST', description: 'Process a payment' },
        { path: '/api/payments/:id', method: 'GET', description: 'Get payment details' },
        { path: '/api/payments/:id/receipt', method: 'GET', description: 'Generate receipt' },
        { path: '/api/payments/:id/refund', method: 'POST', description: 'Refund a payment' }
      ]
    },
    {
      group: 'Shipments',
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      endpoints: [
        { path: '/api/shipments', method: 'POST', description: 'Create new shipment' },
        { path: '/api/shipments/:id', method: 'GET', description: 'Get shipment details' },
        { path: '/api/shipments/:id/status', method: 'PUT', description: 'Update shipment status' },
        { path: '/api/shipments/track/:trackingNumber', method: 'GET', description: 'Track a shipment' }
      ]
    }
  ];

  // Component hierarchy data
  const components = [
    {
      name: 'App',
      type: 'root',
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      children: [
        {
          name: 'Layouts',
          children: [
            { name: 'MainLayout' },
            { name: 'AuthLayout' },
            { name: 'DashboardLayout' }
          ]
        }
      ]
    },
    {
      name: 'Auth Components',
      type: 'group',
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
      children: [
        { name: 'LoginForm' },
        { 
          name: 'RegisterForm',
          children: [
            { name: 'PersonalInfoSection' },
            { name: 'CredentialsSection' },
            { name: 'FileUploadSection' }
          ]
        },
        { name: 'VerificationForm' },
        { name: 'PasswordResetForm' }
      ]
    },
    {
      name: 'Dashboard Components',
      type: 'group',
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      children: [
        { 
          name: 'ImporterDashboard',
          children: [
            { name: 'DashboardStats' },
            { name: 'RecentRequests' },
            { name: 'InventorySummary' },
            { name: 'RevenueChart' }
          ]
        },
        { 
          name: 'ClientDashboard',
          children: [
            { name: 'RequestStatus' },
            { name: 'ActiveQuotations' },
            { name: 'OrderHistory' }
          ]
        },
        { 
          name: 'DonorDashboard',
          children: [
            { name: 'DonationStatus' },
            { name: 'DonationHistory' },
            { name: 'ImpactMetrics' }
          ]
        }
      ]
    },
    {
      name: 'Medicine Request Flow',
      type: 'group',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      children: [
        { 
          name: 'RequestListPage',
          children: [
            { name: 'RequestFilters' },
            { name: 'RequestList', children: [{ name: 'RequestCard' }] }
          ]
        },
        { 
          name: 'CreateRequestPage',
          children: [
            { name: 'RequestForm', children: [
              { name: 'MedicineSelector' },
              { name: 'QuantitySelector' }
            ]}
          ]
        },
        { 
          name: 'RequestDetailPage',
          children: [
            { name: 'RequestInfo' },
            { name: 'StatusTimeline' },
            { name: 'QuotationList', children: [
              { name: 'QuotationDetail', children: [
                { name: 'AcceptQuotation' },
                { name: 'RejectQuotation' }
              ]}
            ]}
          ]
        }
      ]
    }
  ];

  // Data flow diagram
  const dataFlowSteps = [
    {
      name: 'Client Side',
      color: 'bg-indigo-100 border-indigo-300',
      textColor: 'text-indigo-800',
      items: [
        { name: 'Pages', description: 'Next.js pages that define routes' },
        { name: 'Components', description: 'React components that render UI elements' },
        { name: 'Hooks', description: 'Custom hooks for state and side effects' },
        { name: 'API Calls', description: 'Data fetching using React Query or SWR' },
        { name: 'State Management', description: 'Global state with Context API or Zustand' }
      ]
    },
    {
      name: 'Server Side',
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
      items: [
        { name: 'API Routes', description: 'Next.js API endpoints' },
        { name: 'Controllers', description: 'Handle incoming requests' },
        { name: 'Services', description: 'Business logic implementation' },
        { name: 'Models/DAO', description: 'Data access objects using Prisma' },
        { name: 'Database', description: 'PostgreSQL database' }
      ]
    },
    {
      name: 'Authentication Flow',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      items: [
        { name: 'Auth Middleware', description: 'Verifies authentication status' },
        { name: 'JWT Verification', description: 'Validates JSON Web Tokens' },
        { name: 'Role-Based Access', description: 'Controls access based on user role' },
        { name: 'Protected Routes', description: 'Client and server side protection' }
      ]
    },
    {
      name: 'Database Interactions',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      items: [
        { name: 'Prisma Client', description: 'Type-safe database client' },
        { name: 'Transactions', description: 'Ensures data integrity' },
        { name: 'Relationships', description: 'Manages entity relationships' },
        { name: 'Migrations', description: 'Version control for schema' }
      ]
    }
  ];

  // Responsive grid layout for different breakpoints
  const gridLayout = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Drug Importer System Architecture
            </span>
          </motion.h1>
          <motion.p 
            className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Comprehensive system architecture for developers and stakeholders
          </motion.p>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.title}
              </motion.button>
            ))}
          </div>

          {/* Auto-play button only for user flow */}
          {activeTab === 'userFlow' && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  autoPlay 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300' 
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300'
                }`}
              >
                {autoPlay ? 'Stop Auto-Play' : 'Start Auto-Play'}
              </button>
            </motion.div>
          )}
        </div>
        
        {/* User Flow Tab Content */}
        {activeTab === 'userFlow' && (
          <>
            {/* Progress Steps - Horizontal display on larger screens */}
            <div className="hidden lg:flex justify-between items-center mb-12 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.button
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                      index <= activeStep ? step.color : 'bg-gray-100 dark:bg-gray-800'
                    } border-2 ${
                      index <= activeStep ? `border-${step.id.split('-')[0]}-500` : 'border-gray-300 dark:border-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(index)}
                  >
                    {step.icon}
                  </motion.button>
                  
                  {index < steps.length - 1 && (
                    <motion.div 
                      className={`h-1 w-16 rounded-full ${
                        index < activeStep ? step.connectorColor : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: index < activeStep ? 64 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Current Step Display - Highlighted larger card */}
            <motion.div
              className="mb-12 max-w-4xl mx-auto"
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`p-6 rounded-lg shadow-lg border-l-4 ${steps[activeStep].color} border-${steps[activeStep].textColor.split('-')[1]}-500`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`p-3 rounded-full ${steps[activeStep].color}`}>
                      {steps[activeStep].icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${steps[activeStep].textColor}`}>
                      {steps[activeStep].title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setActiveStep(prev => prev > 0 ? prev - 1 : steps.length - 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaChevronRight className="transform rotate-180 text-gray-600 dark:text-gray-300" />
                </button>
                
                <button 
                  onClick={() => setActiveStep(prev => prev < steps.length - 1 ? prev + 1 : 0)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </motion.div>
            
            {/* User Flow Visualization */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Users & Interactions</h2>
            
            <div className={gridLayout}>
              {/* Drug Importer Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-xl shadow-md border border-blue-200 dark:border-blue-800"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-full bg-blue-100 dark:bg-blue-800 w-16 h-16 flex items-center justify-center mb-4">
                  <FaUserMd className="text-blue-600 dark:text-blue-300 size-8" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">Drug Importer</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Register and verify account with documentation</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>View incoming medicine requests from clients/donors</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Send quotations with pricing and availability</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Process shipments and manage inventory</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Track revenue, income, and all transactions</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Client Card */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 p-6 rounded-xl shadow-md border border-green-200 dark:border-green-800"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-full bg-green-100 dark:bg-green-800 w-16 h-16 flex items-center justify-center mb-4">
                  <FaUser className="text-green-600 dark:text-green-300 size-8" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Client/Patient</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Create account and verify identity</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Submit medicine requests with details</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Review quotations from drug importers</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Accept or deny quotations based on needs</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Make payments and track delivery status</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Donor Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-6 rounded-xl shadow-md border border-purple-200 dark:border-purple-800"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="rounded-full bg-purple-100 dark:bg-purple-800 w-16 h-16 flex items-center justify-center mb-4">
                  <FaHandHoldingMedical className="text-purple-600 dark:text-purple-300 size-8" />
                </div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">Donor</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Create donor account and verification</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Submit donation requests for specific medicines</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Review and approve medicine quotations</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Fund donations and arrange delivery</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Track donation impact and distribution</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Transaction Flow Visualization */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transaction Flow</h2>
              
              <div className="relative">
                {/* Flow line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full"></div>
                
                {/* Flow steps */}
                <div className="space-y-12 relative">
                  {[
                    {
                      title: "Request Creation",
                      description: "Client or donor creates a medicine request with detailed requirements",
                      icon: <FaClipboardList className="text-blue-500 size-6" />,
                      color: "bg-blue-100 dark:bg-blue-900",
                      textColor: "text-blue-800 dark:text-blue-200",
                      borderColor: "border-blue-300 dark:border-blue-700"
                    },
                    {
                      title: "Quotation Processing",
                      description: "Drug importer reviews request and sends a detailed quotation",
                      icon: <FaFileInvoiceDollar className="text-green-500 size-6" />,
                      color: "bg-green-100 dark:bg-green-900",
                      textColor: "text-green-800 dark:text-green-200",
                      borderColor: "border-green-300 dark:border-green-700"
                    },
                    {
                      title: "Payment Processing",
                      description: "Client accepts and processes payment for the medicines",
                      icon: <FaCheckCircle className="text-yellow-500 size-6" />,
                      color: "bg-yellow-100 dark:bg-yellow-900",
                      textColor: "text-yellow-800 dark:text-yellow-200",
                      borderColor: "border-yellow-300 dark:border-yellow-700"
                    },
                    {
                      title: "Shipment & Delivery",
                      description: "Drug importer ships the medicines and inventory is updated",
                      icon: <FaShippingFast className="text-orange-500 size-6" />,
                      color: "bg-orange-100 dark:bg-orange-900",
                      textColor: "text-orange-800 dark:text-orange-200",
                      borderColor: "border-orange-300 dark:border-orange-700"
                    },
                    {
                      title: "Transaction Complete",
                      description: "Revenue is updated and client receives medicines",
                      icon: <FaBoxOpen className="text-purple-500 size-6" />,
                      color: "bg-purple-100 dark:bg-purple-900",
                      textColor: "text-purple-800 dark:text-purple-200",
                      borderColor: "border-purple-300 dark:border-purple-700"
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className={`w-1/2 pr-8 ${index % 2 === 0 ? 'text-right' : 'order-last text-left pl-8 pr-0'}`}>
                        <div className={`inline-block p-4 rounded-lg shadow-md ${step.color} border ${step.borderColor}`}>
                          <h3 className={`text-lg font-bold ${step.textColor} mb-2`}>{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 ${step.color}`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <div className={`w-1/2 ${index % 2 === 1 ? 'text-right' : 'order-first text-left'}`}></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Entity Relationship Diagram */}
        {activeTab === 'entityRelationship' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Entity Relationship Diagram (ERD)</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                This diagram shows the database structure and relationships between entities in the system.
              </p>
              
              {/* Entity Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {entities.map((entity, entityIndex) => (
                  <motion.div
                    key={entity.name}
                    className={`p-4 rounded-lg shadow-md ${entity.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: entityIndex * 0.1 }}
                  >
                    <h3 className={`text-lg font-bold ${entity.textColor} border-b pb-2 mb-3`}>{entity.name}</h3>
                    <div className="space-y-1">
                      {entity.attributes.map((attr, attrIndex) => (
                        <div key={`${entity.name}-${attr.name}`} className="flex items-center text-sm">
                          <span className={`inline-block w-4 h-4 rounded-full mr-2 ${
                            attr.isPrimary ? 'bg-yellow-400' : attr.isForeign ? 'bg-blue-400' : 'bg-gray-300'
                          }`}></span>
                          <span className="font-medium">{attr.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2">{attr.type}</span>
                          {attr.isPrimary && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">PK</span>}
                          {attr.isForeign && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1 rounded">FK</span>}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Relationships */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Entity Relationships</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entity</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Relationship</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {relationships.map((rel, index) => (
                      <motion.tr 
                        key={`${rel.from}-${rel.to}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">{rel.from}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200 font-bold">{rel.relationship}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">{rel.to}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{rel.description}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Class Structure Diagram */}
        {activeTab === 'classStructure' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Class Structure Diagram</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                This diagram shows the service layer classes and their methods in the system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    className={`p-4 rounded-lg shadow-md ${service.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className={`text-lg font-bold ${service.textColor} border-b pb-2 mb-3`}>{service.name}</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {service.methods.map((method, methodIndex) => (
                        <li key={`${service.name}-${methodIndex}`} className="font-mono">
                          {method}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Service Dependencies</h3>
                <div className="relative h-80 md:h-96 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner p-4">
                  {/* Arrows showing service relationships */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                    {/* QuotationService -> MedicineService */}
                    <motion.path
                      d="M 300,150 C 400,100 500,100 600,150"
                      stroke="rgba(79, 70, 229, 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    {/* PaymentService -> InventoryService */}
                    <motion.path
                      d="M 200,300 C 300,350 500,350 700,280"
                      stroke="rgba(79, 70, 229, 0.5)"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                    {/* ShipmentService -> InventoryService */}
                    <motion.path
                      d="M 600,300 C 650,280 680,260 700,250"
                      stroke="rgba(79, 70, 229, 0.5)"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                    {/* Arrow marker */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="rgba(79, 70, 229, 0.8)" />
                      </marker>
                    </defs>
                  </svg>
                  
                  {/* Service boxes */}
                  <motion.div
                    className="absolute top-8 left-24 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    UserService
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-36 left-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-lg border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    PaymentService
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-36 left-1/3 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    QuotationService
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-36 right-24 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    MedicineService
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-12 left-1/4 px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-lg border border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    ShipmentService
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-24 right-8 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    InventoryService
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-60 left-1/2 -translate-x-1/2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    RequestService
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints */}
        {activeTab === 'apiEndpoints' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">API Endpoints</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Complete list of backend API endpoints grouped by functionality.
              </p>
              
              <div className="space-y-10">
                {apiEndpoints.map((group, groupIndex) => (
                  <motion.div
                    key={group.group}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                  >
                    <h3 className={`text-lg font-bold ${group.textColor} mb-4 px-4 py-2 ${group.color} rounded-lg`}>
                      {group.group} Endpoints
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full rounded-lg overflow-hidden shadow">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Endpoint</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Method</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {group.endpoints.map((endpoint, endpointIndex) => (
                            <motion.tr 
                              key={`${group.group}-${endpointIndex}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 + endpointIndex * 0.05 }}
                            >
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-indigo-600 dark:text-indigo-400">{endpoint.path}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{endpoint.description}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Component Hierarchy */}
        {activeTab === 'componentHierarchy' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">React Component Hierarchy</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Frontend component structure showing how components are organized and nested.
              </p>
              
              {components.map((component, componentIndex) => (
                <motion.div
                  key={component.name}
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: componentIndex * 0.1 }}
                >
                  <h3 className={`text-lg font-bold ${component.textColor || 'text-gray-900 dark:text-white'} mb-4 px-4 py-2 ${component.color || 'bg-gray-100 dark:bg-gray-700'} rounded-lg`}>
                    {component.name}
                  </h3>
                  
                  <div className="pl-6 border-l-2 border-gray-300 dark:border-gray-700 ml-4">
                    {component.children && component.children.map((child, childIndex) => (
                      <div key={`${component.name}-${child.name}`} className="mb-4">
                        <motion.div
                          className="flex items-center pl-4 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + childIndex * 0.05 }}
                        >
                          <FaCubes className="text-indigo-500 mr-2" />
                          <span className="font-medium text-gray-800 dark:text-gray-200">{child.name}</span>
                        </motion.div>
                        
                        {child.children && (
                          <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-800 ml-4">
                            {child.children.map((grandchild, grandchildIndex) => (
                              <div key={`${component.name}-${child.name}-${grandchild.name}`}>
                                <motion.div
                                  className="flex items-center pl-4 mb-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.3 + grandchildIndex * 0.05 }}
                                >
                                  <FaTh className="text-blue-500 mr-2" />
                                  <span className="font-medium text-gray-700 dark:text-gray-300">{grandchild.name}</span>
                                </motion.div>
                                
                                {grandchild.children && (
                                  <div className="pl-6 border-l-2 border-gray-100 dark:border-gray-800 ml-4">
                                    {grandchild.children.map((greatgrandchild, ggcIndex) => (
                                      <motion.div
                                        key={`${component.name}-${child.name}-${grandchild.name}-${greatgrandchild.name}`}
                                        className="flex items-center pl-4 mb-2"
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 + ggcIndex * 0.05 }}
                                      >
                                        <FaTasks className="text-green-500 mr-2" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{greatgrandchild.name}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Data Flow */}
        {activeTab === 'dataFlow' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Next.js Data Flow Architecture</h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                How data flows between the client and server in the Next.js application.
              </p>
              
              {/* Data Flow Diagram */}
              <div className="relative mb-12 h-[600px] md:h-[500px]">
                {/* Arrows connecting layers */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
                  {/* Client to Server */}
                  <motion.path
                    d="M 500,150 L 500,300"
                    stroke="rgba(79, 70, 229, 0.5)"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  {/* Server to Database */}
                  <motion.path
                    d="M 500,400 L 500,470"
                    stroke="rgba(79, 70, 229, 0.5)"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  {/* Arrow marker */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="rgba(79, 70, 229, 0.8)" />
                    </marker>
                  </defs>
                </svg>
                
                {/* Main layers */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-indigo-200 dark:bg-indigo-800 p-3">
                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100">Client Side</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-indigo-800 dark:text-indigo-200">
                        <FaCode className="mx-auto mb-1" />
                        Components
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-indigo-800 dark:text-indigo-200">
                        <FaProjectDiagram className="mx-auto mb-1" />
                        Hooks
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-indigo-800 dark:text-indigo-200">
                        <FaNetworkWired className="mx-auto mb-1" />
                        API Calls
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute top-40 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-green-100 dark:bg-green-900 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-green-200 dark:bg-green-800 p-3">
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-100">Server Side</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-green-800 dark:text-green-200">
                        <FaNetworkWired className="mx-auto mb-1" />
                        API Routes
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-green-800 dark:text-green-200">
                        <FaCode className="mx-auto mb-1" />
                        Controllers
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-green-800 dark:text-green-200">
                        <FaCubes className="mx-auto mb-1" />
                        Services
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="bg-blue-200 dark:bg-blue-800 p-3">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">Database Layer</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-blue-800 dark:text-blue-200">
                        <FaDatabase className="mx-auto mb-1" />
                        PostgreSQL
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-blue-800 dark:text-blue-200">
                        <FaObjectGroup className="mx-auto mb-1" />
                        Prisma ORM
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-blue-800 dark:text-blue-200">
                        <FaLink className="mx-auto mb-1" />
                        Transactions
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Data Flow Steps */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Data Flow Process</h3>
              <div className="space-y-6">
                {dataFlowSteps.map((step, stepIndex) => (
                  <motion.div
                    key={step.name}
                    className={`p-4 rounded-lg shadow-md ${step.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                  >
                    <h4 className={`text-lg font-bold ${step.textColor} mb-3`}>{step.name}</h4>
                    <div className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <motion.div
                          key={`${step.name}-${itemIndex}`}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + itemIndex * 0.05 }}
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                            <span className="mx-2 text-gray-400">—</span>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFlowVisualization;


