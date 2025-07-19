import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Blocks, 
  Users, 
  Database, 
  Shield, 
  Zap, 
  Palette,
  BarChart3,
  Cloud,
  Code
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Blocks,
      title: "Drag & Drop Builder",
      description: "Intuitive visual editor with pre-built components. Create complex layouts without writing code.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Multi-Tenant Architecture",
      description: "Secure user isolation with workspace management. Perfect for teams and organizations.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Database,
      title: "Dynamic Data Management",
      description: "Built-in database with custom fields, relationships, and real-time sync capabilities.",
      gradient: "from-pink-500 to-red-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Role-based access control, data encryption, and compliance-ready infrastructure.",
      gradient: "from-red-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant preview and real-time collaboration features.",
      gradient: "from-orange-500 to-yellow-600"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "White-label solutions with custom themes, logos, and domain configuration.",
      gradient: "from-yellow-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Built-in analytics dashboard with usage metrics and performance monitoring.",
      gradient: "from-green-500 to-blue-600"
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Scalable infrastructure with automatic backups and global CDN distribution.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Connect with external services through REST APIs and webhook automation.",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Build & Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple forms to complex business applications, our platform provides all the tools 
            you need to create professional SaaS solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="bg-glass backdrop-blur-glass border-glass hover:shadow-glow transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};