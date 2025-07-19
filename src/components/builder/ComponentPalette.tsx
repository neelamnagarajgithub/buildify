import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Type, 
  Square, 
  Image, 
  Layout, 
  MousePointer, 
  Smartphone,
  Calendar,
  Table,
  BarChart3,
  Search,
  Grid3x3,
  List,
  Layers,
  Settings
} from "lucide-react";
import { useState } from "react";

interface Component {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const components: Component[] = [
  // Layout Components
  { 
    id: 'container', 
    name: 'Container', 
    icon: <Square className="w-4 h-4" />, 
    category: 'Layout',
    description: 'Basic container for content'
  },
  { 
    id: 'grid', 
    name: 'Grid', 
    icon: <Grid3x3 className="w-4 h-4" />, 
    category: 'Layout',
    description: 'Responsive grid system'
  },
  { 
    id: 'flex', 
    name: 'Flex Container', 
    icon: <Layout className="w-4 h-4" />, 
    category: 'Layout',
    description: 'Flexible layout container'
  },

  // Input Components
  { 
    id: 'text-input', 
    name: 'Text Input', 
    icon: <Type className="w-4 h-4" />, 
    category: 'Input',
    description: 'Single line text input'
  },
  { 
    id: 'button', 
    name: 'Button', 
    icon: <MousePointer className="w-4 h-4" />, 
    category: 'Input',
    description: 'Clickable button element'
  },

  // Display Components
  { 
    id: 'text', 
    name: 'Text', 
    icon: <Type className="w-4 h-4" />, 
    category: 'Display',
    description: 'Static text content'
  },
  { 
    id: 'image', 
    name: 'Image', 
    icon: <Image className="w-4 h-4" />, 
    category: 'Display',
    description: 'Display images'
  },
  { 
    id: 'card', 
    name: 'Card', 
    icon: <Square className="w-4 h-4" />, 
    category: 'Display',
    description: 'Content card container'
  },

  // Data Components
  { 
    id: 'table', 
    name: 'Table', 
    icon: <Table className="w-4 h-4" />, 
    category: 'Data',
    description: 'Data table display'
  },
  { 
    id: 'chart', 
    name: 'Chart', 
    icon: <BarChart3 className="w-4 h-4" />, 
    category: 'Data',
    description: 'Data visualization chart'
  },
  { 
    id: 'list', 
    name: 'List', 
    icon: <List className="w-4 h-4" />, 
    category: 'Data',
    description: 'Ordered or unordered list'
  },

  // Media Components
  { 
    id: 'video', 
    name: 'Video', 
    icon: <Smartphone className="w-4 h-4" />, 
    category: 'Media',
    description: 'Video player component'
  },

  // Form Components
  { 
    id: 'form', 
    name: 'Form', 
    icon: <Layers className="w-4 h-4" />, 
    category: 'Form',
    description: 'Form container'
  },
  { 
    id: 'date-picker', 
    name: 'Date Picker', 
    icon: <Calendar className="w-4 h-4" />, 
    category: 'Form',
    description: 'Date selection input'
  }
];

const categories = ['All', 'Layout', 'Input', 'Display', 'Data', 'Media', 'Form'];

export const ComponentPalette = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = components.filter(component => {
    const matchesCategory = activeCategory === 'All' || component.category === activeCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDragStart = (e: React.DragEvent, component: Component) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  return (
    <div className="w-72 bg-glass backdrop-blur-glass border-r border-glass flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-glass">
        <h2 className="font-semibold mb-3">Components</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-glass"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="text-xs h-7"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Components List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredComponents.map((component) => (
            <Card
              key={component.id}
              className="bg-background/50 border-glass hover:bg-accent/50 transition-colors cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {component.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{component.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {component.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="p-8 text-center">
            <Settings className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No components found for "{searchQuery}"
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t border-glass">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Layers className="w-4 h-4 mr-2" />
            Component Library
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Custom Components
          </Button>
        </div>
      </div>
    </div>
  );
};