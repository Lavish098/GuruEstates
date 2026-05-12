
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

const appointments = [
  {
    id: "1",
    propertyId: "1",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    clientPhone: "555-0123",
    date: "2024-03-15",
    time: "14:00",
    type: "showing",
    status: "scheduled",
    notes: "Interested in seeing the backyard",
  },
  {
    id: "2",
    propertyId: "2",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    clientPhone: "555-0124",
    date: "2024-03-16",
    time: "10:00",
    type: "inspection",
    status: "scheduled",
  },
];

const AppointmentCard = ({ appointment }) => (
  <Card className="space-y-4 border-white/70 bg-white/85 p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="font-semibold">{appointment.clientName}</h3>
        <p className="text-sm text-muted-foreground">{appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}</p>
      </div>
      <span className={`rounded-md px-3 py-1 text-xs font-semibold ${
        appointment.status === 'scheduled' ? 'bg-secondary/10 text-secondary' :
        appointment.status === 'completed' ? 'bg-success/10 text-success' :
        'bg-destructive/10 text-destructive'
      }`}>
        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
      </span>
    </div>
    
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
        <span>{appointment.date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span>{appointment.time}</span>
      </div>
    </div>
    
    <div className="flex items-center gap-2 text-sm">
      <User className="w-4 h-4 text-muted-foreground" />
      <span>{appointment.clientPhone}</span>
    </div>
    
    {appointment.notes && (
      <p className="text-sm text-muted-foreground">{appointment.notes}</p>
    )}
  </Card>
);

const Appointments = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="container mx-auto px-4 py-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Schedule
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Appointments
        </h1>
      </header>

      <main className="container mx-auto grid gap-4 px-4 md:grid-cols-2">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Appointments;
