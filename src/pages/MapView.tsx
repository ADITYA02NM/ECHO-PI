import { ArrowLeft, Map, ZoomIn, ZoomOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MapView = () => {
  const [zoom, setZoom] = useState(10);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Offline Maps</h1>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center space-y-2">
            <Map className="h-16 w-16 text-primary mx-auto" />
            <p className="text-muted-foreground">
              Map tiles loaded from http://192.168.4.1:8000/tiles/
            </p>
            <p className="text-sm text-muted-foreground">Zoom level: {zoom}</p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <Button
            size="sm"
            onClick={() => setZoom((z) => Math.min(18, z + 1))}
            className="rounded-full h-10 w-10 p-0 shadow-lg"
          >
            <ZoomIn className="h-5 w-5 text-white" />
          </Button>
          <Button
            size="sm"
            onClick={() => setZoom((z) => Math.max(1, z - 1))}
            className="rounded-full h-10 w-10 p-0 shadow-lg"
          >
            <ZoomOut className="h-5 w-5 text-white" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MapView;
