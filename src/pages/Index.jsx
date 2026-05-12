
import { Building2, Calendar, CircleDollarSign, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

const DashboardCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="space-y-3 border-white/70 bg-white/85 p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <div className="grid h-11 w-11 place-items-center rounded-md bg-accent text-primary">
        <Icon className="h-5 w-5" />
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
  <Card className="space-y-5 border-white/70 bg-white/85 p-5 shadow-sm">
    <div>
      <p className="text-sm font-semibold text-secondary">Pipeline</p>
      <h3 className="text-xl font-semibold tracking-tight">Recent Activity</h3>
    </div>
    <div className="space-y-4">
      {[
        { time: "2h ago", text: "New property listing added" },
        { time: "4h ago", text: "Appointment scheduled with John Doe" },
        { time: "Yesterday", text: "Property status updated to 'Pending'" },
      ].map((activity, i) => (
        <div key={i} className="flex items-start gap-4 text-sm">
          <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-secondary" />
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
    <div className="min-h-screen bg-background pb-28">
      <header className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/15 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Agent dashboard
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Keep listings, clients, and revenue in view.
              </h1>
              <p className="mt-3 max-w-2xl text-primary-foreground/75">
                A cleaner command center for managing today&apos;s property work.
              </p>
            </div>
            <div className="rounded-md bg-white/10 px-4 py-3 text-sm backdrop-blur">
              <p className="text-primary-foreground/70">This month</p>
              <p className="text-2xl font-bold">+12%</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-6 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            icon={CircleDollarSign}
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
