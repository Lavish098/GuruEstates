import {
  ArrowLeft,
  Building2,
  MapPin,
  Bed,
  Bath,
  Clock,
  Phone,
  Ruler,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [price, setPrice] = useState(0);

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
          setPrice(foundProperty.price.toLocaleString());
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
      .get(
        `https://guru-estates-backend.vercel.app/agent/property-agent/${property.agentId}`
      )
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
    <div className="min-h-screen bg-background pb-28">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="bg-white/70" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <main className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4">
        {selectedImage ? (
          <div className="overflow-hidden rounded-lg shadow-2xl shadow-slate-900/10">
            <img
              src={`${selectedImage}`}
              alt={property.title}
              className="h-[320px] w-full md:h-[520px]"
            />
          </div>
        ) : (
          <div className="flex h-80 items-center justify-center rounded-lg bg-muted">
            <Building2 className="h-16 w-16 text-muted-foreground" />
          </div>
        )}

        {property.images && property.images.length > 1 && (
          <div
            className="flex w-full snap-x snap-mandatory flex-row gap-3 overflow-x-auto"
            style={{ paddingBottom: "15px", clipPath: "inset(0 0 20px 0)" }}
          >
            {property.images.slice(0).map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`h-24 w-36 flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-md transition-all md:h-32 md:w-48 ${
                  selectedImage === image ? "ring-2 ring-primary ring-offset-2" : "opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={`${image}`}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        </section>

        <section className="space-y-6">
          <div className="rounded-lg border border-white/70 bg-white/85 p-6 shadow-sm">
          <p className="mb-3 inline-flex rounded-md bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            For sale
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{property.title}</h1>
          <div className="mt-3 flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {property.address}
          </div>
          <p className="mt-5 text-4xl font-bold text-primary">&#8358;{price}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="border-white/70 bg-white/85 p-4 text-center shadow-sm">
              <Bed className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </Card>
            <Card className="border-white/70 bg-white/85 p-4 text-center shadow-sm">
              <Bath className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </Card>
            <Card className="border-white/70 bg-white/85 p-4 text-center shadow-sm">
              <Ruler className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Square Feet</p>
              <p className="font-semibold">{property.squareFeet}</p>
            </Card>
          </div>

          <Card className="space-y-4 border-white/70 bg-white/85 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="leading-7 text-muted-foreground">{property.description}</p>
          </Card>

          <Card className="border-white/70 bg-white/85 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Schedule a Viewing</h2>
            <div className="grid gap-3 sm:grid-cols-2">
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
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default PropertyDetails;
