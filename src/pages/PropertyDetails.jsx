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
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const { properties } = useContext(PropertyContext);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const foundProperty = properties.find((property) => property.id === id);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // setError("Property not found"); // Handle case where property is not found
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchProperty();
  }, [id, properties]);

  // Mock property data (in a real app, this would come from an API)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 mt-6 space-y-6 max-w-4xl">
        {property.images && property.images.length > 0 ? (
          <div className="rounded-lg overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-64 object-cover"
            />
          </div>
        ) : (
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <Building2 className="h-16 w-16 text-muted-foreground" />
          </div>
        )}

        {property.images && property.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-24">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{property.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {property.address}
          </div>
          <p className="text-3xl font-bold">${property.price}</p>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <Bed className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </Card>
            <Card className="p-4 text-center">
              <Bath className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </Card>
            <Card className="p-4 text-center">
              <Building2 className="h-5 w-5 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Square Feet</p>
              <p className="font-semibold">{property.sqft}</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Schedule a Viewing</h2>
            <div className="flex gap-4">
              <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Call Agent
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="mr-2 h-4 w-4" />
                Book Online
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PropertyDetails;
