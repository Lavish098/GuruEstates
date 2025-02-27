
import { Building2, Calendar, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

const DashboardCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="p-4 space-y-2">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="p-2 bg-secondary/10 rounded-full">
        <Icon className="w-5 h-5 text-secondary" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-1 text-xs">
        <TrendingUp className="w-4 h-4 text-success" />
        <span className="text-success">{trend}</span>
      </div>
    )}
  </Card>
);

const RecentActivity = () => (
  <Card className="p-4 space-y-4">
    <h3 className="font-semibold">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { time: "2h ago", text: "New property listing added" },
        { time: "4h ago", text: "Appointment scheduled with John Doe" },
        { time: "Yesterday", text: "Property status updated to 'Pending'" },
      ].map((activity, i) => (
        <div key={i} className="flex items-start gap-4 text-sm">
          <div className="w-2 h-2 mt-1.5 rounded-full bg-secondary" />
          <div>
            <p className="text-muted-foreground">{activity.time}</p>
            <p>{activity.text}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
            title="Properties"
            value="24"
            icon={Building2}
            trend="+2 this week"
          />
          <DashboardCard
            title="Appointments"
            value="8"
            icon={Calendar}
          />
          <DashboardCard
            title="Active Clients"
            value="12"
            icon={Users}
            trend="+3 this month"
          />
          <DashboardCard
            title="Revenue"
            value="$52,000"
            icon={TrendingUp}
            trend="+12% vs last month"
          />
        </div>

        <RecentActivity />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
