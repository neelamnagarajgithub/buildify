import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  UserPlus, 
  Crown, 
  Edit, 
  Shield, 
  Eye,
  Mail,
  Search,
  MoreHorizontal,
  Calendar,
  Activity,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMember {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface Collaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  created_at: string;
  projects: {
    name: string;
  };
  profiles: TeamMember;
}

export const Team = () => {
  const { user } = useAuth();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch all collaborators for projects the user owns or collaborates on
        const { data, error } = await supabase
          .from('project_collaborators')
          .select(`
            *,
            projects!fk_project_collaborators_project_id(name),
            profiles!fk_project_collaborators_user_id(id, full_name, username, avatar_url, created_at)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCollaborators((data || []) as Collaborator[]);
      } catch (err) {
        console.error('Failed to fetch team data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [user]);

  const uniqueMembers = collaborators.reduce((acc, collab) => {
    if (collab.profiles && !acc.find(member => member.id === collab.profiles.id)) {
      acc.push({
        ...collab.profiles,
        role: collab.role,
        projectCount: collaborators.filter(c => c.user_id === collab.user_id).length,
        lastActive: collab.created_at
      });
    }
    return acc;
  }, [] as any[]);

  const filteredMembers = uniqueMembers.filter(member =>
    member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'editor': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'viewer': return <Eye className="w-4 h-4 text-gray-500" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner': return 'default';
      case 'editor': return 'secondary';
      case 'viewer': return 'outline';
      default: return 'outline';
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Team</h1>
            <p className="text-muted-foreground">Manage your team members and collaborators</p>
          </div>
          <Button variant="hero" className="group">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueMembers.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Owners</CardTitle>
              <Crown className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueMembers.filter(m => m.role === 'owner').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Editors</CardTitle>
              <Edit className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueMembers.filter(m => m.role === 'editor').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(collaborators.map(c => c.project_id)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-glass border-glass"
            />
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-glass backdrop-blur-glass border-glass">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar_url || ""} alt={member.full_name || ""} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {getInitials(member.full_name, member.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.full_name || member.username}</h3>
                      <p className="text-sm text-muted-foreground">@{member.username}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-glass backdrop-blur-glass border-glass">
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Permissions
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1">
                    {getRoleIcon(member.role)}
                    {member.role}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Projects</span>
                  <span className="text-sm font-medium">{member.projectCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm font-medium">
                    {new Date(member.lastActive).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Active now</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? 'No members found' : 'No team members yet'}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                {searchQuery 
                  ? 'Try adjusting your search criteria.'
                  : 'Start collaborating by inviting team members to your projects.'
                }
              </p>
              {!searchQuery && (
                <Button variant="hero">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Your First Team Member
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Collaboration Overview */}
        <Card className="bg-glass backdrop-blur-glass border-glass">
          <CardHeader>
            <CardTitle>Recent Collaborations</CardTitle>
            <CardDescription>Latest team activity across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collaborators.slice(0, 5).map((collab, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={collab.profiles?.avatar_url || ""} />
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">
                      {getInitials(collab.profiles?.full_name, collab.profiles?.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {collab.profiles?.full_name || collab.profiles?.username} joined "{collab.projects?.name}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(collab.created_at).toLocaleDateString()} as {collab.role}
                    </p>
                  </div>
                  <Badge variant="outline">{collab.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};