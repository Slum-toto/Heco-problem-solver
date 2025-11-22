import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Hotspot {
  id: string;
  location: string;
  disease: string;
  cases: number;
  risk: "low" | "medium" | "high";
  coordinates: { x: number; y: number };
}

const OutbreakMap = () => {
  const hotspots: Hotspot[] = [
    { id: "1", location: "Laini Saba", disease: "Cholera", cases: 23, risk: "high", coordinates: { x: 35, y: 40 } },
    { id: "2", location: "Silanga", disease: "Malaria", cases: 15, risk: "medium", coordinates: { x: 60, y: 30 } },
    { id: "3", location: "Kianda", disease: "Typhoid", cases: 8, risk: "low", coordinates: { x: 45, y: 65 } },
    { id: "4", location: "Makina", disease: "Dengue", cases: 31, risk: "high", coordinates: { x: 70, y: 50 } },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-danger border-danger";
      case "medium": return "bg-warning border-warning";
      case "low": return "bg-safe border-safe";
      default: return "bg-muted border-muted";
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground mb-2">Outbreak Hotspot Map</h2>
        <p className="text-sm text-muted-foreground">Real-time disease distribution across Kibera</p>
      </div>

      <div className="relative w-full h-[400px] bg-muted/30 rounded-lg border-2 border-border overflow-hidden">
        {/* Map background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 10,20 L 30,15 L 50,25 L 70,20 L 90,30 L 85,60 L 70,80 L 40,85 L 20,75 L 10,50 Z" 
                  fill="currentColor" className="text-primary" />
          </svg>
        </div>

        {/* Hotspot markers */}
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute group cursor-pointer"
            style={{ 
              left: `${hotspot.coordinates.x}%`, 
              top: `${hotspot.coordinates.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full border-4 animate-pulse-subtle transition-transform group-hover:scale-125",
              getRiskColor(hotspot.risk)
            )}>
              <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <Card className="p-3 min-w-[200px] shadow-lg">
                <p className="font-bold text-sm mb-1">{hotspot.location}</p>
                <p className="text-xs text-muted-foreground mb-2">{hotspot.disease}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Cases: {hotspot.cases}</span>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    hotspot.risk === "high" && "bg-danger/10 text-danger border-danger/20",
                    hotspot.risk === "medium" && "bg-warning/10 text-warning border-warning/20",
                    hotspot.risk === "low" && "bg-safe/10 text-safe border-safe/20"
                  )}>
                    {hotspot.risk.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger border-2 border-danger" />
          <span className="text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning border-2 border-warning" />
          <span className="text-muted-foreground">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-safe border-2 border-safe" />
          <span className="text-muted-foreground">Low Risk</span>
        </div>
      </div>
    </Card>
  );
};

// Import cn helper
import { cn } from "@/lib/utils";

export default OutbreakMap;
