import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Bed,
  Bath,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";

const propertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden mx-2 w-full">
      <div className="h-48 bg-muted flex items-center justify-center">
        {property.images && property.images.length ? (
          <img
            src={`${property.images[0]}`}
            alt=""
            className="w-full h-[100%]"
          />
        ) : (
          <Building2 className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold truncate">{property.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {property.address}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            ${property.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex">
              {property.bedrooms}

              <Bed className="h-5 w-5 mx-auto mb-2 ml-1" />
            </span>
            <span>•</span>
            <span className="flex">
              {property.bathrooms}
              <Bath className="h-5 w-5 mx-auto mb-2 ml-1" />
            </span>
            <span>•</span>
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                property.status === "available"
                  ? "bg-success/10 text-success"
                  : property.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary`}
            >
              For {property.type}
            </span>
          </div>
          <Button
            className="justify-end"
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default propertyCard;
