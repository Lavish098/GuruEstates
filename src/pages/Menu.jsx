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
    className="p-4 hover:bg-secondary hover:text-white group ease-in-out transition"
    onClick={onClick}
    role={onClick ? "button" : undefined}
  >
    <div className="flex items-center gap-4 ">
      <div className="p-2 bg-secondary/10 rounded-full">
        <Icon className="w-5 h-5 text-secondary group-hover:text-white" />
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 mb-6">
          {user.id ? (
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-secondary" />
            </div>
          ) : (
            <div className="cursor-pointer w-full font-medium font-xl">
              <Link to="/login">
                <h1>Login/Sign Up</h1>
              </Link>
            </div>
          )}{" "}
          <div>
            <h2 className="font-semibold">
              {user.firstname} {user.lastname}
            </h2>
            <h2 className="font-semibold">{user.role}</h2>
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
