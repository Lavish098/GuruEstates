import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "@/components/ui/toasty";
import { X, Upload } from "lucide-react";

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    title: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    propertyType: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleSelectChange = (value, name) => {
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImages([...images, ...files]);

      // Create preview URLs
      const newPreviewImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setPreviewImages([...previewImages, ...newPreviewImages]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index].url);

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const userObject = JSON.parse(userData);

        const agentId = userObject.id;

        const formData = new FormData();
        formData.append("title", propertyData.title);
        formData.append("address", propertyData.address);
        formData.append("price", propertyData.price);
        formData.append("bedrooms", propertyData.bedrooms);
        formData.append("bathrooms", propertyData.bathrooms);
        formData.append("squareFeet", propertyData.squareFeet);
        formData.append("propertyType", propertyData.propertyType);
        formData.append("description", propertyData.description);
        formData.append("status", "available");
        formData.append("agentId", agentId);

        // Append images (multiple files)
        images.forEach((file) => {
          formData.append("images", file);
        });

        console.log(formData);

        const response = await fetch("http://localhost:3001/api/property", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        });

        const data = await response.json();

        // Clear the form after submission
        // setPropertyData({
        //   title: "",
        //   address: "",
        //   price: "",
        //   bedrooms: "",
        //   bathrooms: "",
        //   squareFeet: "",
        //   propertyType: "",
        //   description: "",
        // });

        // Clear images
        previewImages.forEach((img) => URL.revokeObjectURL(img.url));
        setImages([]);
        setPreviewImages([]);

        // Show success message
        setToastMessage("Property added successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.log("No user data found in localStorage.");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      setToastMessage("Failed to add property. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Property</CardTitle>
          <CardDescription>
            Fill in the details to list a new property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={propertyData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern 3 Bedroom Townhouse"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={propertyData.address}
                    onChange={handleInputChange}
                    placeholder="Full property address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={propertyData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 250000"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      value={propertyData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="e.g., 3"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      value={propertyData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="e.g., 2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="squareFeet">Square Feet</Label>
                    <Input
                      id="squareFeet"
                      name="squareFeet"
                      type="number"
                      value={propertyData.squareFeet}
                      onChange={handleInputChange}
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={propertyData.propertyType}
                    onValueChange={(value) =>
                      handleSelectChange(value, "propertyType")
                    }
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={propertyData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the property..."
                    className="h-32"
                    required
                  />
                </div>

                <div>
                  <Label>Property Images</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop images here, or click to select files
                      </p>
                      <p className="text-xs text-gray-400">
                        (PNG, JPG, JPEG up to 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        name="images"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                      >
                        Select Files
                      </Button>
                    </div>
                  </div>

                  {previewImages.length > 0 && (
                    <div className="mt-4">
                      <Label>Image Previews</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                        {previewImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image.url}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                            <p className="text-xs truncate mt-1">
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-end mt-6 px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Property..." : "Add Property"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {showToast && (
        <Toast className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-md border">
          {toastMessage}
        </Toast>
      )}
    </div>
  );
};
export default AddProperty;
