import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "safe" | "warning" | "danger";
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend = "neutral",
  variant = "default" 
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-primary/5 border-primary/20",
    safe: "bg-safe/5 border-safe/20",
    warning: "bg-warning/5 border-warning/20",
    danger: "bg-danger/5 border-danger/20",
  };

  const iconVariantStyles = {
    default: "text-primary",
    safe: "text-safe",
    warning: "text-warning",
    danger: "text-danger",
  };

  return (
    <Card className={cn(
      "p-6 border-2 transition-all hover:shadow-lg animate-slide-in",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          variant === "default" && "bg-primary/10",
          variant === "safe" && "bg-safe/10",
          variant === "warning" && "bg-warning/10",
          variant === "danger" && "bg-danger/10"
        )}>
          <Icon className={cn("w-6 h-6", iconVariantStyles[variant])} />
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};

export default StatCard;
