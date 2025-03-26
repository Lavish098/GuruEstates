import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from "lucide-react";
import axios from "axios";
import { BottomNav } from "../components/BottomNav";
import { Button } from "@/components/ui/button";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Mock user data - in a real app this would come from an API or context
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    agency: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    avatar: "",
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    agency: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    avatar: "",
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileUrl =
        user.role === "agent" ? "agent/property-agent" : "user";

      try {
        const response = await axios.get(
          `https://guru-estates-backend.vercel.app/${profileUrl}/${user.id}`
        );
        console.log(response.data);

        const data = response.data;

        setUserData(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.role, user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, reset form
      setFormData(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileUrl =
      user.role === "agent" ? "agent/agent-profile" : "user-profile";
    // In a real app, you would send this data to your backend

    setIsEditing(false);

    const response = await fetch(
      `https://guru-estates-backend.vercel.app/${profileUrl}/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data.firstname);

    setUserData({
      firstname: data.firstname,
      lastname: data.lastname,
      agency: data.agency,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
    });
    // Show success toast
    setToastMessage("Profile updated successfully!");
    setToastType("success");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-secondary to-success p-6 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="opacity-80">Manage your personal information</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                {isEditing ? (
                  <>
                    <label className="block text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center relative">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : userData.avatar ? (
                        <img
                          src={userData.avatar}
                          alt="Current profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full ">
                          <User size={50} className="text-secondary mr-2" />
                        </div>
                      )}

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        name="images"
                        id="image-upload"
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-300"
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                      >
                        <Camera className="text-secondary" size={24} />
                      </Button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-2">
                      <p>Profile image upload will be available soon</p>
                    </div>
                  </>
                ) : (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    {userData.avatar ? (
                      <img
                        src={userData.avatar}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        <User size={50} className="text-secondary mr-2" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        <span>{userData.firstname}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        <span>{userData.lastname}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-500 mr-2" />
                        <span>{userData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <Phone size={16} />
                        </span>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-500 mr-2" />
                        <span>{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <MapPin size={16} />
                        </span>
                        <input
                          type="text"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-500 mr-2" />
                        <span>{userData.address}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {user.role === "agent" && (
                      <>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Agency
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                              <MapPin size={16} />
                            </span>
                            <input
                              type="text"
                              name="agency"
                              value={formData.agency}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <MapPin size={16} className="text-gray-500 mr-2" />
                            <span>{userData.agency}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    {user.role === "agent" && (
                      <>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Bio
                        </label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        ) : (
                          <p className="text-gray-700">{userData.bio}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-success flex items-center"
                      >
                        <Save size={16} className="mr-1" /> Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-success flex items-center"
                    >
                      <Edit size={16} className="mr-1" /> Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default MyProfile;
