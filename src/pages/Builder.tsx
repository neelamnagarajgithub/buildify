import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';
import { ComponentPalette } from '@/components/builder/ComponentPalette';
import { CanvasArea } from '@/components/builder/CanvasArea';
import { PublishDialog } from '@/components/builder/PublishDialog';
import { TeamInviteDialog } from '@/components/builder/TeamInviteDialog';
import { 
  Save, 
  Eye, 
  Globe, 
  Settings, 
  Undo, 
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Users,
  BarChart3,
  ArrowLeft,
  Loader2,
  Code
} from 'lucide-react';

export const Builder = (): JSX.Element => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, loading: projectsLoading, updateProject } = useProjects();
  
  const [previewMode, setPreviewMode] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showTeamInviteDialog, setShowTeamInviteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentProject = projectId ? projects.find(p => p.id === projectId) : null;

  useEffect(() => {
    if (!projectsLoading && projectId && !currentProject) {
      toast({
        title: "Project not found",
        description: "The project you're looking for doesn't exist or you don't have access to it.",
        variant: "destructive"
      });
      navigate('/projects');
    }
  }, [projectId, currentProject, projectsLoading, navigate, toast]);

  // Get appropriate device width class
  const getDeviceWidth = (): string => {
    switch (deviceView) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  const handleSave = async () => {
    if (!currentProject) return;
    
    try {
      setIsSaving(true);
      await updateProject(currentProject.id, {
        updated_at: new Date().toISOString()
      });
      toast({
        title: "Project saved",
        description: "Your changes have been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "There was an error saving your project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!currentProject) return;
    
    try {
      await updateProject(currentProject.id, {
        status: 'Published' as const,
        updated_at: new Date().toISOString()
      });
      toast({
        title: "Project published",
        description: "Your project is now live and accessible to users."
      });
      setShowPublishDialog(false);
    } catch (error) {
      toast({
        title: "Failed to publish",
        description: "There was an error publishing your project. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/projects')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="h-16 border-b border-glass bg-glass backdrop-blur-glass flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">{currentProject.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {currentProject.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {currentProject.type}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Device View Controls */}
          <div className="flex items-center border border-glass rounded-lg bg-glass">
            <Button
              variant={deviceView === 'desktop' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setDeviceView('desktop')}
              className="rounded-r-none"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setDeviceView('tablet')}
              className="rounded-none"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'mobile' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setDeviceView('mobile')}
              className="rounded-l-none"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <Button 
            variant="glass"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
          
          <Button 
            variant={previewMode ? 'secondary' : 'glass'}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>

          <Button 
            variant="hero"
            onClick={() => setShowPublishDialog(true)}
          >
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>

          <Button 
            variant="glass" 
            size="sm"
            onClick={() => setShowTeamInviteDialog(true)}
          >
            <Users className="w-4 h-4 mr-2" />
            Team
          </Button>
          
          <Button 
            variant="glass" 
            size="sm"
            onClick={() => navigate('/analytics')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Stats
          </Button>

          <Button variant="glass" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Palette - Hide in preview mode */}
        {!previewMode && <ComponentPalette />}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto">
            <div className={`mx-auto transition-all duration-300 ${getDeviceWidth()}`}>
              <div 
                className={`
                  bg-white rounded-lg shadow-card border border-glass transition-all duration-300
                  ${deviceView === 'mobile' ? 'min-h-[800px]' : 'min-h-[600px]'}
                `}
                style={{
                  width: deviceView === 'mobile' ? '375px' : 
                         deviceView === 'tablet' ? '768px' : '100%'
                }}
              >
                <CanvasArea />
              </div>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="h-12 border-t border-glass bg-glass backdrop-blur-glass flex items-center justify-between px-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Components: 8</span>
              <span>•</span>
              <span>Pages: 1</span>
              <span>•</span>
              <Badge variant="outline" className={currentProject.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}>
                {currentProject.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm">
                <Share2 className="w-3 h-3 mr-2" />
                Share
              </Button>
              <div className="text-xs text-muted-foreground">
                Zoom: 100%
              </div>
            </div>
          </div>
        </div>

        {/* Properties Panel - Show in non-preview mode */}
        {!previewMode && (
          <div className="w-80 bg-glass backdrop-blur-glass border-l border-glass">
            <div className="p-4 border-b border-glass">
              <h3 className="font-semibold">Properties</h3>
              <p className="text-sm text-muted-foreground">Configure selected component</p>
            </div>
            
            <div className="p-4">
              <div className="text-center py-8">
                <Settings className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Select a component to edit its properties
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <PublishDialog 
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onPublish={handlePublish}
        project={currentProject}
      />
      
      <TeamInviteDialog 
        open={showTeamInviteDialog}
        onOpenChange={setShowTeamInviteDialog}
        project={currentProject}
      />
    </div>
  );
};