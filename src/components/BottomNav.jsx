
import { Home, Calendar, Building2, Users, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/appointments", label: "Calendar", icon: Calendar },
    { to: "/properties", label: "Properties", icon: Building2 },
    { to: "/contacts", label: "Contacts", icon: Users },
    { to: "/menu", label: "More", icon: Menu },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 items-center justify-between rounded-lg border border-white/70 bg-white/90 px-2 py-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl animate-fade-in">
      {items.map(({ to, label, icon: Icon }) => {
        const active = isActive(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-medium transition ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon size={20} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
