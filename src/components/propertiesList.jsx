import { Building2, Plus } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useContext, useEffect, useState } from "react";
import PropertyCard from "./propertyCard";
import { PropertyContext } from "../context/PropertyContext";

const PropertiesList = ({ isHome = false }) => {
  const { properties } = useContext(PropertyContext);
  // const [loading, setLoading] = useState(true);

  const displayedProperties = isHome ? properties.slice(0, 4) : properties;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className=" space-y-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {displayedProperties.length > 0 ? (
          displayedProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <div>No properties</div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default PropertiesList;
