
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
  <Card className="p-4 space-y-3">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="font-semibold">{contact.name}</h3>
        <span className="px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <button className="p-2 bg-secondary text-white rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Contacts;
