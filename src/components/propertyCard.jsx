import React from "react";
import { Building2, MapPin, Bed, Bath, MessageCircle, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";

const propertyCard = ({ property }) => {
  const navigate = useNavigate();
  const price =
    typeof property.price === "number"
      ? property.price.toLocaleString()
      : property.price;

  return (
    <Card className="group relative flex h-full min-h-[420px] overflow-hidden rounded-lg border-white/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
      <div className="flex w-full flex-col">
      <div className="relative h-60 bg-muted">
        {property.images && property.images.length ? (
          <img
            src={`${property.images[0]}`}
            alt={property.title}
            className="h-full w-full transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Building2 className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          For Sale
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
          <MessageCircle className="h-4 w-4" />
          Chat
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-xl font-semibold tracking-tight">
            {property.title}
          </h3>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-secondary" />
            <span className="truncate">{property.address}</span>
          </p>
        </div>

        <p className="mt-4 text-2xl font-bold text-primary">
          &#8358;{price}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-md bg-muted/70 p-3">
            <Bed className="mb-1 h-4 w-4 text-primary" />
            <span className="font-semibold">{property.bedrooms}</span>
            <p className="text-xs text-muted-foreground">Beds</p>
          </div>
          <div className="rounded-md bg-muted/70 p-3">
            <Bath className="mb-1 h-4 w-4 text-primary" />
            <span className="font-semibold">{property.bathrooms}</span>
            <p className="text-xs text-muted-foreground">Baths</p>
          </div>
          <div className="rounded-md bg-muted/70 p-3">
            <Ruler className="mb-1 h-4 w-4 text-primary" />
            <span className="font-semibold">
              {property.squareFeet || "-"}
            </span>
            <p className="text-xs text-muted-foreground">Sq ft</p>
          </div>
        </div>

        <Button
          className="mt-auto w-full"
          onClick={() => navigate(`/property/${property._id}`)}
        >
          View details
        </Button>
      </div>
      </div>
    </Card>
  );
};

export default propertyCard;
