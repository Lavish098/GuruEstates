
import { Home, Calendar, Building2, Users, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center animate-fade-in">
      <Link
        to="/"
        className={`flex flex-col items-center space-y-1 ${
          isActive("/") ? "text-secondary" : "text-gray-500"
        }`}
      >
        <Home size={24} />
        <span className="text-xs">Dashboard</span>
      </Link>
      
      <Link
        to="/appointments"
        className={`flex flex-col items-center space-y-1 ${
          isActive("/appointments") ? "text-secondary" : "text-gray-500"
        }`}
      >
        <Calendar size={24} />
        <span className="text-xs">Calendar</span>
      </Link>
      
      <Link
        to="/properties"
        className={`flex flex-col items-center space-y-1 ${
          isActive("/properties") ? "text-secondary" : "text-gray-500"
        }`}
      >
        <Building2 size={24} />
        <span className="text-xs">Properties</span>
      </Link>
      
      <Link
        to="/contacts"
        className={`flex flex-col items-center space-y-1 ${
          isActive("/contacts") ? "text-secondary" : "text-gray-500"
        }`}
      >
        <Users size={24} />
        <span className="text-xs">Contacts</span>
      </Link>
      
      <Link
        to="/menu"
        className={`flex flex-col items-center space-y-1 ${
          isActive("/menu") ? "text-secondary" : "text-gray-500"
        }`}
      >
        <Menu size={24} />
        <span className="text-xs">More</span>
      </Link>
    </nav>
  );
}
