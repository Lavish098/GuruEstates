import { Building2, Clock, Search, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import PropertiesList from "../components/propertiesList";

const ClientDashboard = () => {
  const navigate = useNavigate();

  // Property images
  const propertyImages = {
    1: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    2: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    3: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    4: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    5: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
    6: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="p-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input className="pl-10" placeholder="Search properties..." />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Upcoming Viewings</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-full">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium">Modern Downtown Apartment</h3>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 2:00 PM
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Featured Properties</h2>
            <Link to="/agents">
              <Button variant="ghost" size="sm">
                Find an Agent
              </Button>
            </Link>
          </div>
          <div className="">
            <PropertiesList isHome={true} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Saved Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["2"]}
                  alt="Modern Apartment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Modern Apartment</h3>
                <p className="text-sm text-muted-foreground">
                  456 Oak Ave, Suburbs
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-semibold">$350,000</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/property/2")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["5"]}
                  alt="Garden Cottage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Garden Cottage</h3>
                <p className="text-sm text-muted-foreground">
                  321 Flower St, Garden District
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-semibold">$275,000</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/property/5")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["6"]}
                  alt="Urban Loft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Urban Loft</h3>
                <p className="text-sm text-muted-foreground">
                  987 Brick Lane, Arts District
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-semibold">$425,000</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/property/6")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientDashboard;
