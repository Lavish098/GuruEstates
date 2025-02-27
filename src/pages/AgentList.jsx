
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">Our Agents</h1>
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

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-secondary" />
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
                <div className="flex gap-2 mt-4">
                  <Button variant="secondary" className="flex items-center">
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
