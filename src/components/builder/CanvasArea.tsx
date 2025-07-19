import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Settings, 
  Trash2, 
  Copy, 
  Move,
  MousePointer,
  Type,
  Image,
  Square
} from "lucide-react";

interface CanvasComponent {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: Record<string, any>;
}

export const CanvasArea = () => {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent: CanvasComponent = {
      id: `${componentData.id}-${Date.now()}`,
      type: componentData.id,
      name: componentData.name,
      x: Math.max(0, x - 50),
      y: Math.max(0, y - 25),
      width: getDefaultWidth(componentData.id),
      height: getDefaultHeight(componentData.id),
      content: getDefaultContent(componentData.id),
      style: getDefaultStyle(componentData.id)
    };

    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getDefaultWidth = (type: string): number => {
    switch (type) {
      case 'button': return 120;
      case 'text-input': return 200;
      case 'text': return 150;
      case 'image': return 200;
      case 'container': return 300;
      case 'card': return 250;
      default: return 150;
    }
  };

  const getDefaultHeight = (type: string): number => {
    switch (type) {
      case 'button': return 40;
      case 'text-input': return 40;
      case 'text': return 30;
      case 'image': return 150;
      case 'container': return 200;
      case 'card': return 180;
      default: return 50;
    }
  };

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case 'button': return 'Click me';
      case 'text-input': return '';
      case 'text': return 'Sample text';
      case 'image': return 'https://via.placeholder.com/200x150';
      default: return '';
    }
  };

  const getDefaultStyle = (type: string): Record<string, any> => {
    const baseStyle = {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '8px'
    };

    switch (type) {
      case 'button':
        return {
          ...baseStyle,
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          cursor: 'pointer',
          fontWeight: '500'
        };
      case 'text':
        return {
          ...baseStyle,
          border: 'none',
          backgroundColor: 'transparent',
          padding: '4px'
        };
      case 'image':
        return {
          ...baseStyle,
          padding: '0',
          overflow: 'hidden'
        };
      default:
        return baseStyle;
    }
  };

  const renderComponent = (component: CanvasComponent) => {
    const isSelected = selectedComponent === component.id;
    
    const commonProps = {
      style: {
        position: 'absolute' as const,
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
        ...component.style,
        cursor: 'pointer',
        userSelect: 'none' as const,
        outline: isSelected ? '2px solid #3b82f6' : 'none',
        outlineOffset: isSelected ? '2px' : '0'
      },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedComponent(component.id);
      }
    };

    switch (component.type) {
      case 'button':
        return (
          <div key={component.id} {...commonProps}>
            <button className="w-full h-full" style={component.style}>
              {component.content}
            </button>
          </div>
        );
      
      case 'text-input':
        return (
          <div key={component.id} {...commonProps}>
            <input 
              type="text" 
              placeholder="Enter text..."
              className="w-full h-full border rounded px-2"
              style={component.style}
            />
          </div>
        );
      
      case 'text':
        return (
          <div key={component.id} {...commonProps}>
            <div style={component.style}>
              {component.content}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div key={component.id} {...commonProps}>
            <img 
              src={component.content} 
              alt="Component"
              className="w-full h-full object-cover"
              style={component.style}
            />
          </div>
        );
      
      case 'container':
        return (
          <div key={component.id} {...commonProps}>
            <div 
              className="w-full h-full flex items-center justify-center text-muted-foreground text-sm"
              style={component.style}
            >
              Container
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div key={component.id} {...commonProps}>
            <div className="w-full h-full" style={component.style}>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Card Title</h3>
                <p className="text-sm text-muted-foreground">Card content goes here.</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div key={component.id} {...commonProps}>
            <div 
              className="w-full h-full flex items-center justify-center text-muted-foreground text-sm"
              style={component.style}
            >
              {component.name}
            </div>
          </div>
        );
    }
  };

  const deleteComponent = () => {
    if (selectedComponent) {
      setComponents(components.filter(c => c.id !== selectedComponent));
      setSelectedComponent(null);
    }
  };

  const duplicateComponent = () => {
    if (selectedComponent) {
      const component = components.find(c => c.id === selectedComponent);
      if (component) {
        const newComponent = {
          ...component,
          id: `${component.type}-${Date.now()}`,
          x: component.x + 20,
          y: component.y + 20
        };
        setComponents([...components, newComponent]);
        setSelectedComponent(newComponent.id);
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Canvas Drop Zone */}
      <div
        className="absolute inset-0 bg-grid-pattern"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => setSelectedComponent(null)}
        style={{
          backgroundImage: `
            radial-gradient(circle, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Components */}
        {components.map(renderComponent)}

        {/* Empty State */}
        {components.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Building</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Drag components from the palette to start building your application.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Component Toolbar */}
      {selectedComponent && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white rounded-lg shadow-lg border border-glass p-2">
          <Button variant="ghost" size="icon" onClick={duplicateComponent}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={deleteComponent}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Canvas Info */}
      <div className="absolute bottom-4 left-4">
        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
          {components.length} components
        </Badge>
      </div>
    </div>
  );
};