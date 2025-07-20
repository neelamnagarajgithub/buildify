# Buildify - No-Code SaaS Application Builder

<div align="center">
  <img src="public/logo.png" alt="Buildify Logo" width="120" height="120">
  
  **Build Powerful SaaS Applications Without Code**
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.52.0-green.svg)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue.svg)](https://tailwindcss.com/)
</div>

Buildify is a modern no-code SaaS application builder that enables users to create, manage, and deploy applications without writing code. With an intuitive drag-and-drop interface, pre-built templates, and powerful collaboration features, Buildify empowers teams to build professional applications in minutes.

## 📋 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Templates](#-templates)
- [Authentication](#-authentication)
- [Database Schema](#-database-schema)
- [API Integration](#-api-integration)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎨 **Visual Builder**
- **Drag & Drop Interface**: Intuitive visual editor with pre-built components
- **Real-time Preview**: Instant preview with device-responsive views (Desktop, Tablet, Mobile)
- **Component Palette**: Rich library of UI components and templates
- **Custom Styling**: Glass morphism design with beautiful gradient effects

### 📱 **Project Management**
- **Template Library**: 25+ professional templates across 15+ categories
- **Project Status Tracking**: Draft, Published, and Archived states
- **Version Control**: Save and publish functionality with change tracking
- **Collaboration Tools**: Team member invitations and role-based permissions

### 👥 **Team Collaboration**
- **Multi-tenant Architecture**: Secure user isolation with workspace management
- **Role-based Access**: Owner, Editor, and Viewer permissions
- **Real-time Collaboration**: Work together on projects simultaneously
- **Team Analytics**: Track team performance and project contributions

### 📊 **Analytics & Insights**
- **Performance Tracking**: Page views, unique visitors, and session duration
- **Project Analytics**: Individual project performance metrics
- **Dashboard Overview**: Comprehensive statistics and insights
- **Custom Reports**: Filtered data by time periods (7d, 30d, 90d)

### 🛠 **Advanced Features**
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Themes**: Beautiful theme system with smooth transitions
- **Search & Filtering**: Advanced search across projects and team members
- **Export Options**: Share and deploy projects with custom domains

## 🛠 Technology Stack

### **Frontend**
- **[React 18](https://reactjs.org/)**: Modern React with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development environment
- **[Vite](https://vitejs.dev/)**: Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible UI components

### **State Management & Routing**
- **[React Router](https://reactrouter.com/)**: Client-side routing and navigation
- **[React Query](https://tanstack.com/query/)**: Server state management and caching
- **[React Hook Form](https://react-hook-form.com/)**: Form handling with validation

### **UI Components & Design**
- **[Radix UI](https://www.radix-ui.com/)**: Headless UI primitives for accessibility
- **[Lucide React](https://lucide.dev/)**: Beautiful, customizable icons
- **[Recharts](https://recharts.org/)**: Composable charting library
- **[Sonner](https://sonner.emilkowal.ski/)**: Toast notifications

### **Backend & Database**
- **[Supabase](https://supabase.com/)**: Backend-as-a-Service platform
  - PostgreSQL database with Row Level Security
  - Real-time subscriptions
  - Authentication and user management
  - File storage and CDN

### **Development Tools**
- **[ESLint](https://eslint.org/)**: Code linting and quality checks
- **[Bun](https://bun.sh/)**: Fast JavaScript runtime and package manager
- **[PostCSS](https://postcss.org/)**: CSS processing and optimization

## 📂 Project Structure

```
buildify-main/
├── public/                          # Static assets
│   ├── logo.png                     # Application logo
│   ├── analytics.png                # Template previews
│   ├── crm_landing.png             
│   ├── ecom.png                    
│   └── ...                         # Other template images
│
├── src/                            # Source code
│   ├── components/                 # Reusable components
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── auth/                   # Authentication components
│   │   │   ├── AuthPage.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/              # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectCreationModal.tsx
│   │   │   └── AwesomeTemplates.tsx
│   │   ├── builder/                # Visual builder components
│   │   ├── landing/                # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Pricing.tsx
│   │   └── ...
│   │
│   ├── pages/                      # Main application pages
│   │   ├── Index.tsx               # Landing page
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── Projects.tsx            # Project management
│   │   ├── Analytics.tsx           # Analytics dashboard
│   │   ├── Team.tsx                # Team management
│   │   ├── Settings.tsx            # User settings
│   │   └── Builder.tsx             # Visual builder
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.tsx             # Authentication hook
│   │   ├── useProjects.tsx         # Project management
│   │   └── use-toast.tsx           # Toast notifications
│   │
│   ├── integrations/               # External integrations
│   │   └── supabase/               # Supabase configuration
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   ├── lib/                        # Utility functions
│   │   └── utils.ts
│   │
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles and design system
│
├── supabase/                       # Database configuration
│   ├── config.toml                 # Supabase configuration
│   └── migrations/                 # Database migrations
│
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 🚀 Installation

### **Prerequisites**
- **Node.js** (v18 or higher)
- **Bun** (recommended) or **npm**
- **Supabase** account

### **Backend Setup (Supabase)**

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com/)
   - Create a new project
   - Note your project URL and anon key

2. **Set up Database Tables**:
   ```sql
   -- Run the migrations in supabase/migrations/
   -- Tables: projects, profiles, project_collaborators, project_analytics, notifications
   ```

3. **Configure Row Level Security**:
   - Enable RLS on all tables
   - Set up policies for user data access

### **Frontend Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/neelamnagarajgithub/buildify
   cd buildify-main
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Create environment variables**:
   ```bash
   # Create .env.local file
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**:
   ```bash
   supabase db push
   ```

5. **Start the development server**:
   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Access the application**:
   - Open [http://localhost:5173](http://localhost:5173)
   - Sign up for a new account or use existing credentials

## 💻 Usage

### **Getting Started**

1. **Authentication**:
   - Visit the landing page at `/`
   - Click "Start Building Free" to sign up
   - Complete the registration with your name, username, and email

2. **Dashboard Overview**:
   - View your project statistics and recent activity
   - Access quick-start templates
   - Monitor team collaboration

### **Project Management**

1. **Creating Projects**:
   - Click "New Project" from the dashboard
   - Choose from 25+ professional templates
   - Configure project name and description
   - Start building immediately

2. **Using the Visual Builder**:
   - Drag and drop components from the palette
   - Preview your app in different device sizes
   - Save and publish when ready

3. **Collaboration**:
   - Invite team members to projects
   - Assign roles (Owner, Editor, Viewer)
   - Work together in real-time

### **Team Management**

- **View Team Members**: See all collaborators across projects
- **Role Management**: Control access levels and permissions
- **Activity Tracking**: Monitor team contributions and project involvement

### **Analytics & Insights**

- **Performance Metrics**: Track page views, visitors, and engagement
- **Project Analytics**: Individual project performance data
- **Time Period Filtering**: View data for 7, 30, or 90-day periods
- **Export Reports**: Generate custom analytics reports

## 🎨 Templates

Buildify includes **25+ professional templates** across **15+ categories**:

### **Business Templates**
- **CRM Powerhouse**: Advanced customer relationship management
- **Project Command Center**: Ultimate project management solution
- **E-commerce Empire**: Complete online store platform

### **Analytics Templates**
- **Analytics Command Center**: Professional data visualization
- **Social Media Command**: Multi-platform performance tracking

### **Creative Templates**
- **Creative Portfolio**: Stunning visual layouts for showcasing work
- **Photo Studio Manager**: Complete photography business management

### **Health & Education**
- **Medical Practice Suite**: Comprehensive healthcare management
- **Learning Management System**: Complete online education platform

### **And Many More...**
- Landing page builders
- Mobile app prototypes  
- Gaming community hubs
- Travel planning suites
- Real estate platforms

Each template includes:
- **Pre-built Components**: Ready-to-use UI elements
- **Complexity Levels**: Beginner, Intermediate, Advanced
- **Estimated Build Time**: 5 minutes to 4 hours
- **Feature Lists**: Detailed functionality overview

## 🔐 Authentication

Buildify uses **Supabase Auth** for secure user management:

### **Authentication Flow**
```typescript
// Sign Up
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      full_name: 'John Doe',
      username: 'johndoe'
    }
  }
})

// Sign In  
const { user, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
})
```

### **Protected Routes**
All dashboard routes are protected using the `ProtectedRoute` component:

```typescript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### **User Profiles**
Extended user information is stored in the `profiles` table with:
- Full name and username
- Avatar URL
- User preferences
- Organization data

## 🗄 Database Schema

Buildify uses **PostgreSQL** with the following main tables:

### **Core Tables**

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR NOT NULL,
  status VARCHAR CHECK (status IN ('Draft', 'Published', 'Archived')),
  template_id VARCHAR,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  full_name VARCHAR,
  username VARCHAR UNIQUE,
  avatar_url VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project collaborators
CREATE TABLE project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics data
CREATE TABLE project_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  session_duration INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Row Level Security (RLS)**
All tables implement RLS policies to ensure users can only access their own data:

```sql
-- Example RLS policy for projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own projects" ON projects  
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

## 🔌 API Integration

### **Supabase Client Configuration**
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### **Custom Hooks**
Buildify uses custom hooks for data management:

```typescript
// useProjects hook example
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (data) setProjects(data);
  };
  
  return { projects, loading, fetchProjects, createProject, updateProject };
};
```

### **Real-time Subscriptions**
```typescript
// Real-time project updates
useEffect(() => {
  const subscription = supabase
    .channel('projects')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' },
      (payload) => {
        // Handle real-time updates
      }
    )
    .subscribe();
    
  return () => subscription.unsubscribe();
}, []);
```

## 📸 Screenshots

<img width="1600" height="835" alt="image" src="https://github.com/user-attachments/assets/cbd60375-c5ef-4a0e-a4e3-ed0b613f509f" />
<img width="1600" height="836" alt="image" src="https://github.com/user-attachments/assets/151a5122-af2b-4672-847d-8b92e35ea782" />
<img width="1600" height="828" alt="image" src="https://github.com/user-attachments/assets/2b81d331-349e-42cd-a158-a857839bab99" />
<img width="1600" height="818" alt="image" src="https://github.com/user-attachments/assets/1c7468f5-d896-4f69-a6d3-e29615557804" />
<img width="1600" height="816" alt="image" src="https://github.com/user-attachments/assets/6f03068d-15cb-48a2-9ddc-5e260f34ab70" />


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Process**

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/buildify-main.git
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow TypeScript best practices
   - Use existing UI components
   - Add proper error handling
   - Update documentation

4. **Test your changes**
   ```bash
   bun run lint
   bun run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Include screenshots if UI changes
   - Reference any related issues

### **Code Style Guidelines**
- Use TypeScript for all new files
- Follow existing naming conventions
- Use shadcn/ui components when possible
- Implement proper error handling
- Add appropriate comments and documentation

### **Bug Reports**
When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior  
- Browser and OS information
- Screenshots or error messages

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

<div align="center">
  
**Developed with ❤️ using React, TypeScript, and Supabase**

*Built by the Buildify Team*

**© 2024 Buildify. All rights reserved.**

[Website](https://buildify.nagarajneelam.me/)
</div>
