import { Activity, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Kibera Health AI</h1>
            <p className="text-sm text-muted-foreground">Disease Outbreak Prevention System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-safe/10 text-safe border-safe/20">
            System Active
          </Badge>
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse-subtle" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
