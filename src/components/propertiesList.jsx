import { Building2, Plus } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";
import PropertyCard from "./propertyCard";

const PropertiesList = ({ isHome = false }) => {
  const [properties, setProperties] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl = isHome ? "/api/properties?_limit=4" : "/api/properties";
      try {
        const res = await fetch(apiUrl);
        console.log(res);

        const data = await res.json();
        console.log(data);

        setProperties(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className=" space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default PropertiesList;
