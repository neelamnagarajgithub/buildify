import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  ExternalLink, 
  Copy, 
  Trash2, 
  Edit3,
  Calendar,
  Users,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    type: string;
    status: 'Draft' | 'Published' | 'Archived';
    created_at: string;
    updated_at: string;
    user_id: string;
    template_id?: string | null;
    settings?: Record<string, any>;
    lastModified?: string;
    collaborators?: number;
    views?: number;
    thumbnail?: string;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Draft': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Archived': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CRM': return 'bg-blue-500/10 text-blue-500';
      case 'Dashboard': return 'bg-purple-500/10 text-purple-500';
      case 'Form': return 'bg-green-500/10 text-green-500';
      case 'E-commerce': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="group bg-glass backdrop-blur-glass border-glass hover:shadow-glow transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-secondary rounded-t-lg relative overflow-hidden">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary-glow/10">
            <div className="text-6xl font-bold text-primary/30">
              {project.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getStatusColor(project.status)} border`}>
            {project.status}
          </Badge>
        </div>

        {/* Actions dropdown */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-glass backdrop-blur-glass border-glass">
              <DropdownMenuItem onClick={() => navigate(`/builder/${project.id}`)}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/builder/${project.id}`)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-1">{project.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={getTypeColor(project.type)}>
            {project.type}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{project.collaborators || 1}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>{project.views || Math.floor(Math.random() * 1000) + 100}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{project.lastModified || formatDate(project.updated_at)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="hero" 
            size="sm" 
            className="flex-1"
            onClick={() => navigate(`/builder/${project.id}`)}
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button variant="glass" size="sm">
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};