-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'Web App',
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
  template_id TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project collaborators table
CREATE TABLE public.project_collaborators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Create project analytics table
CREATE TABLE public.project_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  session_duration INTEGER DEFAULT 0, -- in seconds
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, date)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view their own projects and collaborations" 
ON public.projects 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  auth.uid() IN (
    SELECT user_id FROM public.project_collaborators 
    WHERE project_id = id
  )
);

CREATE POLICY "Users can create their own projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  auth.uid() IN (
    SELECT user_id FROM public.project_collaborators 
    WHERE project_id = id AND role IN ('owner', 'editor')
  )
);

CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Project collaborators policies
CREATE POLICY "Users can view collaborators of their projects" 
ON public.project_collaborators 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  auth.uid() IN (
    SELECT p.user_id FROM public.projects p WHERE p.id = project_id
  )
);

CREATE POLICY "Project owners can manage collaborators" 
ON public.project_collaborators 
FOR ALL 
USING (
  auth.uid() IN (
    SELECT p.user_id FROM public.projects p WHERE p.id = project_id
  )
);

-- Analytics policies
CREATE POLICY "Users can view analytics of their projects" 
ON public.project_analytics 
FOR SELECT 
USING (
  auth.uid() IN (
    SELECT p.user_id FROM public.projects p WHERE p.id = project_id
  ) OR
  auth.uid() IN (
    SELECT pc.user_id FROM public.project_collaborators pc WHERE pc.project_id = project_id
  )
);

CREATE POLICY "Users can update analytics of their projects" 
ON public.project_analytics 
FOR ALL 
USING (
  auth.uid() IN (
    SELECT p.user_id FROM public.projects p WHERE p.id = project_id
  )
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_project_collaborators_project_id ON public.project_collaborators(project_id);
CREATE INDEX idx_project_collaborators_user_id ON public.project_collaborators(user_id);
CREATE INDEX idx_project_analytics_project_id ON public.project_analytics(project_id);
CREATE INDEX idx_project_analytics_date ON public.project_analytics(date);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Insert some sample data
INSERT INTO public.projects (user_id, name, description, type, status) VALUES
(auth.uid(), 'Customer CRM', 'Complete customer relationship management system with lead tracking and analytics.', 'CRM', 'Published'),
(auth.uid(), 'Project Dashboard', 'Team collaboration dashboard with task management and project tracking.', 'Dashboard', 'Draft'),
(auth.uid(), 'E-commerce Admin', 'Product management system with inventory tracking and order processing.', 'E-commerce', 'Published'),
(auth.uid(), 'Contact Forms', 'Dynamic form builder with validation and submission management.', 'Form', 'Archived');

-- Insert sample analytics data
INSERT INTO public.project_analytics (project_id, date, page_views, unique_visitors, session_duration, bounce_rate)
SELECT 
  p.id,
  CURRENT_DATE - INTERVAL '7 days' + (generate_series(0, 6) || ' days')::interval,
  floor(random() * 1000 + 100)::integer,
  floor(random() * 500 + 50)::integer,
  floor(random() * 300 + 60)::integer,
  (random() * 30 + 10)::decimal(5,2)
FROM public.projects p
WHERE p.user_id = auth.uid();

-- Insert sample notifications
INSERT INTO public.notifications (user_id, title, message, type) VALUES
(auth.uid(), 'Welcome to Buildify!', 'Thank you for joining. Get started by creating your first project.', 'success'),
(auth.uid(), 'Project Published', 'Your Customer CRM project has been successfully published.', 'success'),
(auth.uid(), 'New Collaboration Request', 'John Doe wants to collaborate on your Project Dashboard.', 'info');