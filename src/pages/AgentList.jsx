
import { User, Phone, Mail, Building2, Clock, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

const AgentList = () => {
  const navigate = useNavigate();
  
  // Mock agents data
  const agents = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      agency: "Prime Real Estate",
      experience: "10 years",
      bio: "Specializing in luxury properties and commercial real estate.",
      listings: 24,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
      agency: "City Homes Realty",
      experience: "8 years",
      bio: "Expert in residential properties and first-time homebuyers.",
      listings: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="bg-white/70" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Experts
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-primary">Our Agents</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <Link to="/menu">
              <Button variant="ghost" size="sm">Menu</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto grid max-w-5xl gap-5 px-4 py-2 md:grid-cols-2">
        {agents.map((agent) => (
          <Card key={agent.id} className="border-white/70 bg-white/85 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-accent">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-xl font-semibold">{agent.name}</h2>
                  <p className="text-muted-foreground">{agent.agency}</p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {agent.listings} listings
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {agent.experience} experience
                  </span>
                </div>
                <p className="text-sm">{agent.bio}</p>
                <div className="mt-4 flex gap-2">
                  <Button className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default AgentList;
