
import { useState } from "react";
import { User, Save, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

const ClientProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const userString = localStorage.getItem("user");
  const initialUser = userString ? JSON.parse(userString) : {};
  
  const [formData, setFormData] = useState({
    name: initialUser.name || "",
    email: initialUser.email || "",
    phone: initialUser.phone || "",
    preferences: initialUser.preferences || {
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      propertyType: "",
    },
  });

  const handleSave = () => {
    // In a real app, this would be an API call
    localStorage.setItem("user", JSON.stringify({ ...initialUser, ...formData }));
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">Your Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/agents">
              <Button variant="ghost" size="sm">Agents</Button>
            </Link>
            <Link to="/menu">
              <Button variant="ghost" size="sm">Menu</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-muted-foreground">Client</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Property Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Price</label>
                  <Input
                    type="number"
                    value={formData.preferences.minPrice}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, minPrice: e.target.value }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Price</label>
                  <Input
                    type="number"
                    value={formData.preferences.maxPrice}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, maxPrice: e.target.value }
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientProfile;
