import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Zap,
  Rocket
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { awesomeTemplates, templateCategories, type Template } from "./AwesomeTemplates";

interface ProjectCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCreationModal = ({ open, onOpenChange }: ProjectCreationModalProps) => {
  const [step, setStep] = useState<'template' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const { createProject } = useProjects();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredTemplates = awesomeTemplates.filter(template => 
    activeCategory === 'All' || template.category === activeCategory
  );

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setProjectName(template.name === 'Blank Canvas' ? 'My New Project' : `My ${template.name}`);
    setProjectDescription(template.description);
    setStep('details');
  };

  const handleCreateProject = async () => {
    if (!selectedTemplate || !projectName.trim()) return;

    console.log('=== PROJECT CREATION DEBUG ===');
    console.log('Selected template:', selectedTemplate);
    console.log('Project name:', projectName.trim());
    console.log('Project description:', projectDescription.trim());
    console.log('User from useAuth:', { user, hasUser: !!user });

    if (!user) {
      console.error('User not authenticated - redirecting to auth');
      toast({
        title: "Authentication required",
        description: "Please sign in to create a project.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCreating(true);
      
      const projectData = {
        name: projectName.trim(),
        description: projectDescription.trim() || undefined,
        type: 'Web App',
        status: 'Draft' as const,
        template_id: selectedTemplate.id,
        settings: {
          template: selectedTemplate,
          complexity: selectedTemplate.complexity,
          features: selectedTemplate.features
        }
      };

      console.log('Project data to create:', projectData);
      
      const result = await createProject(projectData);
      console.log('Project creation result:', result);

      toast({
        title: "Project created successfully!",
        description: `${projectName} is ready for development.`
      });

      onOpenChange(false);
      resetForm();
      
      // Navigate to the project builder
      navigate(`/projects/${result.id}`);
    } catch (error) {
      console.error('=== PROJECT CREATION ERROR ===');
      console.error('Full error:', error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
      
      toast({
        title: "Failed to create project",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setStep('template');
    setSelectedTemplate(null);
    setActiveCategory('All');
    setProjectName('');
    setProjectDescription('');
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {step === 'template' ? 'Choose a Template' : 'Project Details'}
          </DialogTitle>
          <DialogDescription>
            {step === 'template' 
              ? 'Start your project with a professionally designed template'
              : 'Configure your new project settings'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'template' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {templateCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Templates Grid */}
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50 border-2 bg-card hover:bg-accent/50"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-lg">
                              {template.icon}
                            </div>
                          <div>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {template.complexity}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {template.estimatedTime}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-3">
                        {template.description}
                      </CardDescription>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Includes:</div>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {step === 'details' && selectedTemplate && (
          <div className="space-y-6">
            {/* Selected Template Preview */}
            <Card className="bg-accent/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                    {selectedTemplate.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep('template')}
                    className="ml-auto"
                  >
                    Change Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Details Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description (Optional)</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project"
                  className="bg-background"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('template')}>
                Back to Templates
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={!projectName.trim() || isCreating}
                className="min-w-[120px]"
              >
                {isCreating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};