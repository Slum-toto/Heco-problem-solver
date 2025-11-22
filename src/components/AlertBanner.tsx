import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="bg-danger/10 border-danger/30 mb-6 animate-slide-in">
      <AlertTriangle className="h-5 w-5 text-danger" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex-1 text-foreground">
          <span className="font-semibold">High Risk Alert:</span> Cholera outbreak detected in Laini Saba area. 
          Immediate preventive measures recommended.
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-4"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
