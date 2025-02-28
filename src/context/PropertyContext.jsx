import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";

export const PropertyContext = createContext();

const PropertyContextProvider = (props) => {
  //   const API_URL = "https://guru-estates-backend.vercel.app";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [properties, setProperties] = useState([]);
  const [search, setSeacrh] = useState(false);

  useEffect(() => {
    fetchProperties();
  });

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
  };

  // search user
  const searchUser = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `https://react-chat-app-main.onrender.com/search?username=${searchUsername}`
      );
      const data = await response.json();
      console.log(data[0]);
      setSpinner(false);

      setSelectedUser(data[0]);
      setChatUser(data[0]);
      setSearchUsername(""); // Clear the search input
      fetchMessages(data[0].username); // Fetch messages for the found user
    } catch (error) {
      setSpinner(false);

      toast.error("User does not exist");
    }
  };

  const fetchProperties = async () => {
    axios.get(`${API_URL}/api/properties`).then((response) => {
      console.log(response.data);

      setProperties(response.data);
    });
  };

  const navigate = useNavigate();

  const auth = () => {
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/");
    }
  };

  //Authentication

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const response = await fetch(
      "https://react-chat-app-main.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 400) {
      setSpinner(false);
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("chatUser", data.username);
        localStorage.setItem("userId", data.userId);
        setChatUser(data);
        toast.success("Registration successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const response = await fetch(
      "https://react-chat-app-main.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 400) {
      setSpinner(false);
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("chatUser", data.username);
        localStorage.setItem("userId", data.userId);
        setChatUser(data);
        toast.success("Login successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const logout = () => {
    Cookies.remove("jwt");
    setChatUser([]);
    localStorage.removeItem("chatUser");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  //Values
  const value = {
    properties,
    handleLoginSubmit,
    formData,
    setFormData,
    handleSignUpSubmit,
    navigate,
    auth,
    logout,
    search,
  };

  return (
    <PropertyContext.Provider value={value}>
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyContextProvider;
