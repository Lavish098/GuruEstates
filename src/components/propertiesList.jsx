import { Building2, Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useContext } from "react";
import PropertyCard from "./propertyCard";
import { PropertyContext } from "../context/PropertyContext";

const PropertiesList = ({ isHome = false }) => {
  const { properties } = useContext(PropertyContext);

  const displayedProperties = isHome ? properties.slice(0, 4) : properties;

  return (
    <div className={isHome ? "" : "min-h-screen bg-background pb-28"}>
      {!isHome && (
        <header className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-5 rounded-lg border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Marketplace
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Discover available homes
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Browse curated properties with clear pricing, images, and quick access to agents.
              </p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-11 w-full rounded-md border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Search city or property"
              />
            </div>
          </div>
        </header>
      )}

      <main className={`${isHome ? "" : "container mx-auto px-4"} grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`}>
        {displayedProperties.length > 0 ? (
          displayedProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <div className="col-span-full flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-white/70 p-8 text-center">
            <Building2 className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-semibold">No properties yet</p>
            <p className="text-sm text-muted-foreground">
              New listings will appear here once they are added.
            </p>
          </div>
        )}
      </main>

      {!isHome && <BottomNav />}
    </div>
  );
};

export default PropertiesList;
