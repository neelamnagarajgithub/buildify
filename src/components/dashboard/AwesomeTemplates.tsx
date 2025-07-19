import { 
  Smartphone, 
  Monitor, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Calendar,
  FileText,
  Zap,
  Globe,
  Code,
  Palette,
  Rocket,
  Heart,
  Camera,
  Music,
  Gamepad2,
  Car,
  Plane,
  Building2,
  Stethoscope,
  GraduationCap,
  Coffee,
  Dumbbell,
  Book,
  Banknote,
  Briefcase,
  Home
} from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  color: string;
  gradient: string;
}

export const awesomeTemplates: Template[] = [
  // Basic Templates
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch with unlimited possibilities',
    icon: <Code className="w-6 h-6" />,
    category: 'Basic',
    features: ['Clean structure', 'Responsive grid', 'Component library', 'Modern styling'],
    complexity: 'Beginner',
    estimatedTime: '5 min',
    color: 'from-slate-400 to-slate-600',
    gradient: 'bg-gradient-to-br from-slate-50 to-slate-100'
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your work with stunning visual layouts',
    icon: <Palette className="w-6 h-6" />,
    category: 'Personal',
    features: ['Project gallery', 'About section', 'Contact form', 'Testimonials', 'Blog'],
    complexity: 'Beginner',
    estimatedTime: '20 min',
    color: 'from-purple-400 to-pink-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50'
  },

  // Business Templates
  {
    id: 'crm-deluxe',
    name: 'CRM Powerhouse',
    description: 'Advanced customer relationship management with AI insights',
    icon: <Users className="w-6 h-6" />,
    category: 'Business',
    features: ['Contact management', 'Sales pipeline', 'AI analytics', 'Email automation', 'Reports'],
    complexity: 'Advanced',
    estimatedTime: '2 hours',
    color: 'from-blue-400 to-cyan-600',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50'
  },
  {
    id: 'project-hub',
    name: 'Project Command Center',
    description: 'Ultimate project management with team collaboration',
    icon: <Briefcase className="w-6 h-6" />,
    category: 'Business',
    features: ['Task management', 'Team chat', 'Time tracking', 'Gantt charts', 'Resource planning'],
    complexity: 'Intermediate',
    estimatedTime: '90 min',
    color: 'from-emerald-400 to-teal-600',
    gradient: 'bg-gradient-to-br from-emerald-50 to-teal-50'
  },

  // E-commerce Templates
  {
    id: 'ecommerce-pro',
    name: 'E-commerce Empire',
    description: 'Complete online store with advanced features',
    icon: <ShoppingCart className="w-6 h-6" />,
    category: 'E-commerce',
    features: ['Product catalog', 'Cart & checkout', 'Payment gateway', 'Inventory', 'Analytics'],
    complexity: 'Advanced',
    estimatedTime: '3 hours',
    color: 'from-orange-400 to-red-600',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50'
  },
  {
    id: 'marketplace',
    name: 'Digital Marketplace',
    description: 'Multi-vendor platform with seller dashboard',
    icon: <Building2 className="w-6 h-6" />,
    category: 'E-commerce',
    features: ['Vendor management', 'Commission tracking', 'Multi-payment', 'Reviews', 'Disputes'],
    complexity: 'Advanced',
    estimatedTime: '4 hours',
    color: 'from-violet-400 to-purple-600',
    gradient: 'bg-gradient-to-br from-violet-50 to-purple-50'
  },

  // Analytics & Data
  {
    id: 'analytics-suite',
    name: 'Analytics Command Center',
    description: 'Professional data visualization with real-time insights',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Analytics',
    features: ['Real-time charts', 'Custom dashboards', 'Data export', 'Alerts', 'API integration'],
    complexity: 'Intermediate',
    estimatedTime: '90 min',
    color: 'from-indigo-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-indigo-50 to-blue-50'
  },
  {
    id: 'social-media-analytics',
    name: 'Social Media Command',
    description: 'Track and analyze social media performance across platforms',
    icon: <Globe className="w-6 h-6" />,
    category: 'Analytics',
    features: ['Multi-platform tracking', 'Engagement metrics', 'Competitor analysis', 'Content calendar'],
    complexity: 'Intermediate',
    estimatedTime: '75 min',
    color: 'from-pink-400 to-rose-600',
    gradient: 'bg-gradient-to-br from-pink-50 to-rose-50'
  },

  // Creative & Media
  {
    id: 'photo-studio',
    name: 'Photo Studio Manager',
    description: 'Manage photography business with client galleries',
    icon: <Camera className="w-6 h-6" />,
    category: 'Creative',
    features: ['Client galleries', 'Booking system', 'Payment processing', 'Contract management'],
    complexity: 'Intermediate',
    estimatedTime: '2 hours',
    color: 'from-amber-400 to-orange-600',
    gradient: 'bg-gradient-to-br from-amber-50 to-orange-50'
  },
  {
    id: 'music-platform',
    name: 'Music Streaming Hub',
    description: 'Create your own music streaming platform',
    icon: <Music className="w-6 h-6" />,
    category: 'Creative',
    features: ['Audio player', 'Playlists', 'Artist profiles', 'Subscription model', 'Social features'],
    complexity: 'Advanced',
    estimatedTime: '4 hours',
    color: 'from-fuchsia-400 to-pink-600',
    gradient: 'bg-gradient-to-br from-fuchsia-50 to-pink-50'
  },

  // Health & Fitness
  {
    id: 'fitness-tracker',
    name: 'Fitness Revolution',
    description: 'Complete fitness tracking with workout plans',
    icon: <Dumbbell className="w-6 h-6" />,
    category: 'Health',
    features: ['Workout tracking', 'Nutrition diary', 'Progress charts', 'Social challenges'],
    complexity: 'Intermediate',
    estimatedTime: '2 hours',
    color: 'from-green-400 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  {
    id: 'medical-practice',
    name: 'Medical Practice Suite',
    description: 'Comprehensive medical practice management system',
    icon: <Stethoscope className="w-6 h-6" />,
    category: 'Health',
    features: ['Patient records', 'Appointment scheduling', 'Billing', 'Prescription management'],
    complexity: 'Advanced',
    estimatedTime: '3 hours',
    color: 'from-cyan-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-cyan-50 to-blue-50'
  },

  // Education
  {
    id: 'learning-platform',
    name: 'Learning Management System',
    description: 'Complete online education platform',
    icon: <GraduationCap className="w-6 h-6" />,
    category: 'Education',
    features: ['Course management', 'Video lessons', 'Quizzes', 'Progress tracking', 'Certificates'],
    complexity: 'Advanced',
    estimatedTime: '3.5 hours',
    color: 'from-teal-400 to-cyan-600',
    gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50'
  },
  {
    id: 'library-system',
    name: 'Digital Library',
    description: 'Modern library management with digital resources',
    icon: <Book className="w-6 h-6" />,
    category: 'Education',
    features: ['Book catalog', 'Digital lending', 'Reading lists', 'User reviews', 'Search system'],
    complexity: 'Intermediate',
    estimatedTime: '2 hours',
    color: 'from-yellow-400 to-amber-600',
    gradient: 'bg-gradient-to-br from-yellow-50 to-amber-50'
  },

  // Food & Hospitality
  {
    id: 'restaurant-pos',
    name: 'Restaurant Command',
    description: 'Complete restaurant management system',
    icon: <Coffee className="w-6 h-6" />,
    category: 'Hospitality',
    features: ['POS system', 'Table management', 'Menu builder', 'Order tracking', 'Staff management'],
    complexity: 'Advanced',
    estimatedTime: '3 hours',
    color: 'from-red-400 to-pink-600',
    gradient: 'bg-gradient-to-br from-red-50 to-pink-50'
  },

  // Entertainment & Gaming
  {
    id: 'gaming-platform',
    name: 'Gaming Community Hub',
    description: 'Social platform for gamers with tournaments',
    icon: <Gamepad2 className="w-6 h-6" />,
    category: 'Entertainment',
    features: ['User profiles', 'Tournament system', 'Leaderboards', 'Chat system', 'Game library'],
    complexity: 'Advanced',
    estimatedTime: '4 hours',
    color: 'from-purple-400 to-indigo-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-indigo-50'
  },

  // Travel & Transportation
  {
    id: 'travel-planner',
    name: 'Travel Planning Suite',
    description: 'Complete travel planning and booking system',
    icon: <Plane className="w-6 h-6" />,
    category: 'Travel',
    features: ['Trip planning', 'Booking integration', 'Expense tracking', 'Travel guides', 'Social sharing'],
    complexity: 'Advanced',
    estimatedTime: '3.5 hours',
    color: 'from-sky-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-sky-50 to-blue-50'
  },
  {
    id: 'car-rental',
    name: 'Car Rental Manager',
    description: 'Vehicle rental management with fleet tracking',
    icon: <Car className="w-6 h-6" />,
    category: 'Travel',
    features: ['Fleet management', 'Booking system', 'GPS tracking', 'Maintenance logs', 'Billing'],
    complexity: 'Intermediate',
    estimatedTime: '2.5 hours',
    color: 'from-slate-400 to-gray-600',
    gradient: 'bg-gradient-to-br from-slate-50 to-gray-50'
  },

  // Real Estate
  {
    id: 'real-estate',
    name: 'Real Estate Empire',
    description: 'Property management and listing platform',
    icon: <Home className="w-6 h-6" />,
    category: 'Real Estate',
    features: ['Property listings', 'Virtual tours', 'CRM integration', 'Market analytics', 'Lead management'],
    complexity: 'Advanced',
    estimatedTime: '3 hours',
    color: 'from-emerald-400 to-green-600',
    gradient: 'bg-gradient-to-br from-emerald-50 to-green-50'
  },

  // Finance
  {
    id: 'expense-tracker',
    name: 'Personal Finance Hub',
    description: 'Complete personal finance management',
    icon: <Banknote className="w-6 h-6" />,
    category: 'Finance',
    features: ['Expense tracking', 'Budget planning', 'Investment tracking', 'Bill reminders', 'Reports'],
    complexity: 'Intermediate',
    estimatedTime: '2 hours',
    color: 'from-green-400 to-teal-600',
    gradient: 'bg-gradient-to-br from-green-50 to-teal-50'
  },

  // Social & Community
  {
    id: 'dating-app',
    name: 'Dating Platform',
    description: 'Modern dating app with matching algorithms',
    icon: <Heart className="w-6 h-6" />,
    category: 'Social',
    features: ['Profile matching', 'Chat system', 'Video calls', 'Event planning', 'Safety features'],
    complexity: 'Advanced',
    estimatedTime: '4 hours',
    color: 'from-pink-400 to-red-600',
    gradient: 'bg-gradient-to-br from-pink-50 to-red-50'
  },

  // Marketing
  {
    id: 'landing-page-pro',
    name: 'Landing Page Wizard',
    description: 'High-converting landing pages with A/B testing',
    icon: <Rocket className="w-6 h-6" />,
    category: 'Marketing',
    features: ['Drag & drop builder', 'A/B testing', 'Analytics', 'Lead capture', 'Email integration'],
    complexity: 'Beginner',
    estimatedTime: '30 min',
    color: 'from-orange-400 to-yellow-600',
    gradient: 'bg-gradient-to-br from-orange-50 to-yellow-50'
  },

  // Mobile-First
  {
    id: 'mobile-app-ui',
    name: 'Mobile App Prototype',
    description: 'Mobile-first responsive application interface',
    icon: <Smartphone className="w-6 h-6" />,
    category: 'Mobile',
    features: ['Touch-friendly UI', 'Native feel', 'Offline support', 'Push notifications', 'App store ready'],
    complexity: 'Advanced',
    estimatedTime: '2.5 hours',
    color: 'from-indigo-400 to-purple-600',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50'
  }
];

export const templateCategories = [
  'All', 
  'Basic', 
  'Business', 
  'E-commerce', 
  'Analytics', 
  'Creative', 
  'Health', 
  'Education', 
  'Hospitality', 
  'Entertainment', 
  'Travel', 
  'Real Estate', 
  'Finance', 
  'Social', 
  'Marketing', 
  'Mobile',
  'Personal'
];