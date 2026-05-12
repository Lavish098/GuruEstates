
import { Mail, Phone, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

const contacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-0123",
    type: "client",
    notes: "Interested in downtown properties",
    lastContact: "2024-03-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-0124",
    type: "agent",
    lastContact: "2024-03-12",
  },
];

const ContactCard = ({ contact }) => (
  <Card className="space-y-4 border-white/70 bg-white/85 p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="font-semibold">{contact.name}</h3>
        <span className="inline-flex rounded-md bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
        </span>
      </div>
    </div>
    
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-muted-foreground" />
        <span>{contact.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-muted-foreground" />
        <span>{contact.phone}</span>
      </div>
    </div>
    
    {contact.notes && (
      <p className="text-sm text-muted-foreground">{contact.notes}</p>
    )}
    
    {contact.lastContact && (
      <p className="text-xs text-muted-foreground">
        Last contacted: {contact.lastContact}
      </p>
    )}
  </Card>
);

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Network
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Contacts
            </h1>
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="container mx-auto grid gap-4 px-4 md:grid-cols-2">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Contacts;
