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
import axios from "axios";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const { properties } = useContext(PropertyContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Number, setNumber] = useState(false);
  const [agentNumber, setAgentNumber] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log(properties);

        const foundProperty = properties.find(
          (property) => property._id === id
        );

        console.log(foundProperty);
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

    console.log(selectedImage);
  }, [id, properties]);

  const showNumber = () => {
    console.log("click");

    axios
      .get(`http://localhost:3001/agent/property-agent/${property.agentId}`)
      .then((response) => {
        console.log(response.data);
        setAgentNumber(response.data.phone);
        setNumber(true);
      });
  };
  useEffect(() => {
    // Set selectedImage when property.images is available
    if (property.images && property.images.length > 0) {
      setSelectedImage(property.images[0]);
    }
  }, [property]);

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
        {selectedImage ? (
          <div className="rounded-lg overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
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
          <div
            className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory"
            style={{ paddingBottom: "15px", clipPath: "inset(0 0 20px 0)" }}
          >
            {property.images.slice(0).map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden w-[200px] h-[120px] flex-shrink-0 snap-start mx-1 cursor-pointer rounded-md transition-all ${
                  selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={`data:image/jpeg;base64,${image}`}
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
              <Button className="flex-1" onClick={() => showNumber()}>
                {Number ? (
                  <div>{agentNumber}</div>
                ) : (
                  <div>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Agent
                  </div>
                )}
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
