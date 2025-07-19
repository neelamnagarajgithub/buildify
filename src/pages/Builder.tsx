import { ComponentPalette } from "@/components/builder/ComponentPalette";
import { CanvasArea } from "@/components/builder/CanvasArea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Save, 
  Share, 
  Settings, 
  Eye, 
  Code,
  Smartphone,
  Tablet,
  Monitor,
  Undo,
  Redo
} from "lucide-react";
import { useState } from "react";

export const Builder = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-none';
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="h-16 border-b border-glass bg-glass backdrop-blur-glass flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Customer CRM</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Draft
                </Badge>
                <span className="text-xs text-muted-foreground">Last saved 2 min ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* History Controls */}
          <div className="flex items-center border border-glass rounded-lg bg-glass">
            <Button variant="ghost" size="icon" className="rounded-r-none">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-l-none">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

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
          <Button variant="glass">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button 
            variant={previewMode ? 'secondary' : 'glass'}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>

          <Button variant="hero">
            <Play className="w-4 h-4 mr-2" />
            Publish
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
              <span>Last auto-save: 2 min ago</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm">
                <Share className="w-3 h-3 mr-2" />
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
    </div>
  );
};