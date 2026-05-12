import {
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  User,
  Heart,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const MenuItem = ({ icon: Icon, label, onClick }) => (
  <Card
    className="group cursor-pointer border-white/70 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
    onClick={onClick}
    role={onClick ? "button" : undefined}
  >
    <div className="flex items-center gap-4 ">
      <div className="grid h-10 w-10 place-items-center rounded-md bg-accent">
        <Icon className="w-5 h-5 text-primary group-hover:text-primary" />
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
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <main className="container mx-auto max-w-3xl space-y-4 px-4 py-8">
        <div className="mb-6 flex items-center gap-4 rounded-lg border border-white/70 bg-white/85 p-5 shadow-sm">
          {user.id ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-accent">
              <User className="w-8 h-8 text-primary" />
            </div>
          ) : (
            <div className="w-full cursor-pointer text-lg font-semibold">
              <Link to="/login">
                <h1>Login/Sign Up</h1>
              </Link>
            </div>
          )}{" "}
          <div>
            <h2 className="text-lg font-semibold">
              {user.firstname} {user.lastname}
            </h2>
            <h2 className="text-sm capitalize text-muted-foreground">{user.role}</h2>
          </div>
        </div>

        <div className="space-y-2">
          {user.role === "agent" ? (
            <MenuItem
              icon={Plus}
              label="Add your apartment"
              onClick={() => navigate(`/add-property`)}
            />
          ) : (
            ""
          )}
          {user.id ? (
            <MenuItem
              icon={User}
              label="My Profile"
              onClick={() => navigate(`/profile/${user.id}`)}
            />
          ) : (
            <MenuItem
              icon={User}
              label="My Profile"
              onClick={() => navigate(`/login`)}
            />
          )}

          {user.role === "agent" ? (
            <MenuItem icon={Heart} label="My Properties" />
          ) : (
            <MenuItem icon={Heart} label="Saved Properties" />
          )}

          <MenuItem icon={HelpCircle} label="Help & Support" />
          {user.id ? (
            <MenuItem icon={LogOut} label="Log Out" onClick={handleLogout} />
          ) : (
            ""
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Menu;
