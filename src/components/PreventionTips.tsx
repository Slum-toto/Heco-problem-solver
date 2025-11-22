import { Card } from "@/components/ui/card";
import { CheckCircle2, Droplets, Pill, Shield, Users } from "lucide-react";

const PreventionTips = () => {
  const tips = [
    {
      icon: Droplets,
      title: "Clean Water Access",
      description: "Ensure access to clean drinking water. Boil water for at least 1 minute before consumption."
    },
    {
      icon: Shield,
      title: "Hygiene Practices",
      description: "Wash hands frequently with soap. Use hand sanitizer when soap isn't available."
    },
    {
      icon: Pill,
      title: "Vaccination",
      description: "Stay updated on recommended vaccinations. Visit local health centers for free immunization."
    },
    {
      icon: Users,
      title: "Community Awareness",
      description: "Report suspected cases immediately. Participate in community health education programs."
    }
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Prevention Guidelines</h2>
        <p className="text-sm text-muted-foreground">Essential measures to prevent disease outbreaks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div 
              key={index}
              className="p-4 bg-muted/30 rounded-lg border border-border hover:border-safe/30 transition-all animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-safe/10 rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-safe" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-safe flex-shrink-0 ml-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PreventionTips;
