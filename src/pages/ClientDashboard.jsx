import { ArrowRight, Clock, MapPin, Search, ShieldCheck } from "lucide-react";
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
    <div className="min-h-screen bg-background pb-28">
      <main className="container mx-auto space-y-8 px-4 py-6">
        <section className="overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-2xl shadow-primary/15">
          <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                GuruEstates
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                Find homes that match the life you are building.
              </h1>
              <p className="mt-4 max-w-xl text-primary-foreground/75">
                Search verified listings, compare the essentials, and reach agents without leaving the app.
              </p>
              <div className="relative mt-6 max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-14 rounded-md border-white/20 bg-white pl-12 text-foreground shadow-xl"
                  placeholder="Search by area, apartment, or price"
                />
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Modern home exterior"
                className="h-full w-full"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/90 p-4 text-foreground shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Verified listings</p>
                    <p className="text-sm text-muted-foreground">
                      Clear details before you book a viewing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Your Upcoming Viewings</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <Card className="border-white/70 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-accent text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium">Modern Downtown Apartment</h3>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 2:00 PM
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-secondary">Featured</p>
              <h2 className="text-2xl font-bold tracking-tight">Properties worth seeing</h2>
            </div>
            <Link to="/agents">
              <Button variant="outline" size="sm">
                Find an Agent
              </Button>
            </Link>
          </div>
          <PropertiesList isHome={true} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Saved Properties</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="overflow-hidden border-white/70 bg-white shadow-sm">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["2"]}
                  alt="Modern Apartment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">Modern Apartment</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  456 Oak Ave, Suburbs
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-primary">$350,000</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/property/2")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-white/70 bg-white shadow-sm">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["5"]}
                  alt="Garden Cottage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">Garden Cottage</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  321 Flower St, Garden District
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-primary">$275,000</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/property/5")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-white/70 bg-white shadow-sm">
              <div className="h-48 bg-muted">
                <img
                  src={propertyImages["6"]}
                  alt="Urban Loft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">Urban Loft</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  987 Brick Lane, Arts District
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-primary">$425,000</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/property/6")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientDashboard;
