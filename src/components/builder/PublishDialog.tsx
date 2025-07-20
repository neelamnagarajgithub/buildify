import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, 
  Eye, 
  Settings, 
  ExternalLink,
  Copy,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: () => Promise<void>;
  project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
  };
}

export const PublishDialog = ({ open, onOpenChange, onPublish, project }: PublishDialogProps) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [enableComments, setEnableComments] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const projectUrl = `https://${project.name.toLowerCase().replace(/\s+/g, '-')}.buildify.app`;

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await onPublish();
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "URL has been copied to your clipboard."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-glass backdrop-blur-glass border-glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Publish Project
          </DialogTitle>
          <DialogDescription>
            Make your project live and accessible to users worldwide.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Info */}
          <Card className="bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Status:</span>
                <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Publication URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Publication URL</Label>
            <div className="flex items-center gap-2">
              <Input
                id="url"
                value={projectUrl}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(projectUrl)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your project will be available at this URL once published.
            </p>
          </div>

          {/* Custom Domain */}
          <div className="space-y-2">
            <Label htmlFor="domain">Custom Domain (Optional)</Label>
            <Input
              id="domain"
              placeholder="www.yoursite.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Connect your own domain for a professional look.
            </p>
          </div>

          {/* Publish Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Publish Settings</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Access</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anyone to view your project
                </p>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Track visitor behavior and engagement
                </p>
              </div>
              <Switch
                checked={enableAnalytics}
                onCheckedChange={setEnableAnalytics}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comments</Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to leave feedback
                </p>
              </div>
              <Switch
                checked={enableComments}
                onCheckedChange={setEnableComments}
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="space-y-2">
            <Label htmlFor="meta">Meta Description</Label>
            <Textarea
              id="meta"
              placeholder="A brief description of your project for search engines..."
              value={project.description || ''}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-gradient-primary hover:bg-gradient-primary/90"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 mr-2" />
                {project.status === 'Published' ? 'Update' : 'Publish'} Project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};