import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";

interface Prediction {
  disease: string;
  probability: number;
  timeframe: string;
  affectedAreas: string[];
  risk: "low" | "medium" | "high";
}

const PredictionPanel = () => {
  const predictions: Prediction[] = [
    {
      disease: "Cholera",
      probability: 78,
      timeframe: "Next 7 days",
      affectedAreas: ["Laini Saba", "Makina"],
      risk: "high"
    },
    {
      disease: "Malaria",
      probability: 62,
      timeframe: "Next 14 days",
      affectedAreas: ["Silanga", "Olympic"],
      risk: "medium"
    },
    {
      disease: "Typhoid",
      probability: 34,
      timeframe: "Next 30 days",
      affectedAreas: ["Kianda"],
      risk: "low"
    }
  ];

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-danger/10 text-danger border-danger/20">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Medium Risk</Badge>;
      case "low":
        return <Badge className="bg-safe/10 text-safe border-safe/20">Low Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Predictions</h2>
            <p className="text-sm text-muted-foreground">Disease outbreak forecasting</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div 
            key={index}
            className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{prediction.disease}</h3>
                <p className="text-sm text-muted-foreground">{prediction.timeframe}</p>
              </div>
              {getRiskBadge(prediction.risk)}
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Outbreak Probability</span>
                <span className="text-sm font-semibold text-foreground">{prediction.probability}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    prediction.risk === "high" ? "bg-danger" :
                    prediction.risk === "medium" ? "bg-warning" :
                    "bg-safe"
                  }`}
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Affected Areas:</p>
              <div className="flex flex-wrap gap-2">
                {prediction.affectedAreas.map((area, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-info/5 border border-info/20 rounded-lg">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">AI Analysis Active</p>
            <p className="text-xs text-muted-foreground">
              Predictions updated every 6 hours using real-time health data and environmental factors
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionPanel;
