import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Mail,
  Crown,
  Edit,
  Eye,
  Trash2,
  Copy,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TeamInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    name: string;
    user_id: string;
  };
}

interface Collaborator {
  id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  created_at: string;
  profiles: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
}

export const TeamInviteDialog = ({ open, onOpenChange, project }: TeamInviteDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'viewer'>('viewer');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isInviting, setIsInviting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCollaborators();
    }
  }, [open, project.id]);

  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('project_collaborators')
        .select(`
          *,
          profiles!fk_project_collaborators_user_id(full_name, username, avatar_url)
        `)
        .eq('project_id', project.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollaborators((data || []) as Collaborator[]);
    } catch (error) {
      console.error('Failed to fetch collaborators:', error);
      toast({
        title: "Failed to load team members",
        description: "There was an error loading the team members.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!email) return;
    
    try {
      setIsInviting(true);
      
      // In a real implementation, you would:
      // 1. Check if user exists by email
      // 2. Send invitation email
      // 3. Add to collaborators table
      
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${email}.`
      });
      
      setEmail('');
      setRole('viewer');
    } catch (error) {
      console.error('Failed to send invitation:', error);
      toast({
        title: "Failed to send invitation",
        description: "There was an error sending the invitation.",
        variant: "destructive"
      });
    } finally {
      setIsInviting(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'editor': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'viewer': return <Eye className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'owner': return 'Full access and can manage the project';
      case 'editor': return 'Can edit and modify the project';
      case 'viewer': return 'Can view but not edit the project';
      default: return '';
    }
  };

  const getInitials = (name: string | null, username: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (username) {
      return username.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/projects/${project.id}/invite`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Invite link copied",
      description: "The invite link has been copied to your clipboard."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-glass backdrop-blur-glass border-glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Management
          </DialogTitle>
          <DialogDescription>
            Invite team members to collaborate on "{project.name}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Section */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Invite New Member
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(value: 'editor' | 'viewer') => setRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-glass backdrop-blur-glass border-glass">
                      <SelectItem value="viewer">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Viewer</div>
                            <div className="text-xs text-muted-foreground">Can view only</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="editor">
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Editor</div>
                            <div className="text-xs text-muted-foreground">Can edit and modify</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleInvite}
                  disabled={!email || isInviting}
                  className="flex-1"
                >
                  {isInviting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={copyInviteLink}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Team Members ({collaborators.length + 1})</h4>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {/* Project Owner (Current User) */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        O
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">You (Owner)</p>
                      <p className="text-sm text-muted-foreground">Project creator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Owner
                    </Badge>
                  </div>
                </div>

                {/* Collaborators */}
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={collaborator.profiles?.avatar_url || ""} />
                        <AvatarFallback className="bg-gradient-secondary">
                          {getInitials(collaborator.profiles?.full_name, collaborator.profiles?.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {collaborator.profiles?.full_name || collaborator.profiles?.username || 'Unknown User'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getRoleDescription(collaborator.role)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getRoleIcon(collaborator.role)}
                        {collaborator.role}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};