import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Clock, 
  MousePointer,
  Calendar,
  BarChart3,
  Loader2
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsData {
  project_id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  session_duration: number;
  bounce_rate: number;
}

export const Analytics = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('project_analytics')
          .select(`
            *,
            projects(name, status)
          `)
          .order('date', { ascending: false });

        if (error) throw error;
        setAnalytics(data || []);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  const getFilteredAnalytics = () => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return analytics.filter(item => new Date(item.date) >= cutoffDate);
  };

  const getAggregatedStats = () => {
    const filtered = getFilteredAnalytics();
    
    return {
      totalViews: filtered.reduce((sum, item) => sum + item.page_views, 0),
      totalVisitors: filtered.reduce((sum, item) => sum + item.unique_visitors, 0),
      avgSessionDuration: Math.round(
        filtered.reduce((sum, item) => sum + item.session_duration, 0) / filtered.length || 0
      ),
      avgBounceRate: Math.round(
        filtered.reduce((sum, item) => sum + item.bounce_rate, 0) / filtered.length || 0
      )
    };
  };

  const getChartData = () => {
    const filtered = getFilteredAnalytics();
    const grouped = filtered.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = {
          date,
          page_views: 0,
          unique_visitors: 0,
          session_duration: 0,
          bounce_rate: 0,
          count: 0
        };
      }
      acc[date].page_views += item.page_views;
      acc[date].unique_visitors += item.unique_visitors;
      acc[date].session_duration += item.session_duration;
      acc[date].bounce_rate += item.bounce_rate;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).map((item: any) => ({
      ...item,
      session_duration: Math.round(item.session_duration / item.count),
      bounce_rate: Math.round(item.bounce_rate / item.count),
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })).reverse();
  };

  const getProjectPerformance = () => {
    const projectStats = analytics.reduce((acc, item) => {
      if (!acc[item.project_id]) {
        acc[item.project_id] = {
          project_id: item.project_id,
          page_views: 0,
          unique_visitors: 0,
          sessions: 0
        };
      }
      acc[item.project_id].page_views += item.page_views;
      acc[item.project_id].unique_visitors += item.unique_visitors;
      acc[item.project_id].sessions += 1;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(projectStats)
      .sort((a: any, b: any) => b.page_views - a.page_views)
      .slice(0, 5);
  };

  const stats = getAggregatedStats();
  const chartData = getChartData();
  const projectPerformance = getProjectPerformance();

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  if (loading || projectsLoading) {
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
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your projects' performance and user engagement</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedPeriod === '7d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('7d')}
            >
              7 days
            </Button>
            <Button 
              variant={selectedPeriod === '30d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('30d')}
            >
              30 days
            </Button>
            <Button 
              variant={selectedPeriod === '90d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('90d')}
            >
              90 days
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                +12% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                +8% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(stats.avgSessionDuration / 60)}m {stats.avgSessionDuration % 60}s</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                -3% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <MousePointer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgBounceRate}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
                -2% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Trends */}
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader>
              <CardTitle>Traffic Trends</CardTitle>
              <CardDescription>Page views and visitors over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="page_views" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    name="Page Views"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="unique_visitors" 
                    stroke="#06b6d4" 
                    strokeWidth={2} 
                    name="Unique Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Performance */}
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader>
              <CardTitle>Top Performing Projects</CardTitle>
              <CardDescription>Projects ranked by page views</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="project_id" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Bar dataKey="page_views" fill="#8b5cf6" name="Page Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-glass backdrop-blur-glass border-glass">
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Most active day</span>
                <Badge variant="secondary">Monday</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Peak hour</span>
                <Badge variant="secondary">2-3 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mobile traffic</span>
                <Badge variant="secondary">68%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New vs returning</span>
                <Badge variant="secondary">45% new</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-glass border-glass lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest analytics events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {item.page_views} page views on {new Date(item.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.unique_visitors} unique visitors, {Math.floor(item.session_duration / 60)}m avg session
                      </p>
                    </div>
                    <Badge variant="outline">{item.bounce_rate.toFixed(1)}% bounce</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};