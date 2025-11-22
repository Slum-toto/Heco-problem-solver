import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import OutbreakMap from "@/components/OutbreakMap";
import PredictionPanel from "@/components/PredictionPanel";
import AlertBanner from "@/components/AlertBanner";
import PreventionTips from "@/components/PreventionTips";
import HealthChatbot from "@/components/HealthChatbot";
import { Activity, Users, AlertTriangle, TrendingDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <AlertBanner />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Cases"
            value="77"
            description="Currently under monitoring"
            icon={Activity}
            variant="default"
          />
          <StatCard
            title="Population at Risk"
            value="12,847"
            description="In high-risk zones"
            icon={Users}
            variant="warning"
          />
          <StatCard
            title="Active Alerts"
            value="3"
            description="Requiring immediate attention"
            icon={AlertTriangle}
            variant="danger"
          />
          <StatCard
            title="Prevention Rate"
            value="82%"
            description="Successful interventions"
            icon={TrendingDown}
            variant="safe"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <OutbreakMap />
          </div>
          <div>
            <PredictionPanel />
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="mb-8">
          <HealthChatbot />
        </div>

        {/* Prevention Tips */}
        <PreventionTips />
      </main>
    </div>
  );
};

export default Index;
