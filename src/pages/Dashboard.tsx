import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { ProjectCreationModal } from "@/components/dashboard/ProjectCreationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Activity, 
  Clock,
  Filter,
  Search,
  Grid3x3,
  List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";

export const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setUserProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const { projects } = useProjects();

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length.toString(),
      change: `+${projects.filter(p => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.created_at) > weekAgo;
      }).length} this week`,
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      title: 'Published',
      value: projects.filter(p => p.status === 'Published').length.toString(),
      change: '+12% from last month',
      icon: Users,
      color: 'text-green-500'
    },
    {
      title: 'In Progress',
      value: projects.filter(p => p.status === 'Draft').length.toString(),
      change: '+8% from last month',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Build Time Saved',
      value: '156h',
      change: '+24h this week',
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  const templates = [
    { name: 'CRM Template', type: 'Customer Management', description: 'Full-featured CRM system' },
    { name: 'Dashboard Template', type: 'Analytics', description: 'Data visualization dashboard' },
    { name: 'Form Builder', type: 'Data Collection', description: 'Dynamic form creation tool' },
    { name: 'E-commerce Suite', type: 'Online Store', description: 'Complete e-commerce solution' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile?.full_name || user?.email?.split('@')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </div>
          <Button variant="hero" className="group" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-glass backdrop-blur-glass border-glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-glass backdrop-blur-glass border-glass">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get started quickly with these popular templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <div
                  key={template.name}
                  className="p-4 border border-glass rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                  onClick={() => setShowCreateModal(true)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">{template.type}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <p className="text-muted-foreground">Manage and organize all your applications</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-glass border-glass"
                />
              </div>
              <Button variant="glass" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <div className="flex rounded-lg border border-glass bg-glass">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State for no projects */}
          {projects.length === 0 && (
            <Card className="bg-glass backdrop-blur-glass border-glass">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Get started by creating your first project or choosing from our templates.
                </p>
                <Button variant="hero" onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Project Creation Modal */}
      <ProjectCreationModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </DashboardLayout>
  );
};