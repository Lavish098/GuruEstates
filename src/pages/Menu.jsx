
import { Settings, LogOut, HelpCircle, Bell, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const MenuItem = ({ 
  icon: Icon, 
  label, 
  onClick 
}) => (
  <Card className="p-4" onClick={onClick} role={onClick ? "button" : undefined}>
    <div className="flex items-center gap-4">
      <div className="p-2 bg-secondary/10 rounded-full">
        <Icon className="w-5 h-5 text-secondary" />
      </div>
      <span className="font-medium">{label}</span>
    </div>
  </Card>
);

const Menu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-semibold">Menu</h1>
      </header>

      <main className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h2 className="font-semibold">{user.email}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>

        <div className="space-y-2">
          <MenuItem icon={Bell} label="Notifications" />
          <MenuItem icon={Settings} label="Settings" />
          <MenuItem icon={HelpCircle} label="Help & Support" />
          <MenuItem icon={LogOut} label="Log Out" onClick={handleLogout} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Menu;
