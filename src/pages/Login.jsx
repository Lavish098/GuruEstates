import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/options";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const options = [
    { value: "", label: "Client/Agent" },
    { value: "agent", label: "Agent" },
    { value: "client", label: "Client" },
  ];
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    // Mock login - in real app, this would validate against a backend
    if (formData.email && formData.password) {
      const mockUser = {
        email: formData.email,
        password: formData.password,
      };

      console.log(formData.role);

      const loginUrl = formData.role === "agent" ? "agent/signin" : "signin";

      const response = await fetch(
        `https://guru-estates-backend.vercel.app/${loginUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockUser),
        }
      );

      if (response.status === 400) {
        setSpinner(false);
        const data = await response.json();
        console.log(data);

        const errorMessages = Object.values(data)
          .filter((msg) => typeof msg === "string" && msg.trim() !== "")
          .join(", ");

        toast({
          title: "Error",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        if (response.ok) {
          const data = await response.json();
          console.log(data.errors);

          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data._id,
              role: data.role,
              firstname: data.firstname,
              lastname: data.lastname,
            })
          );
          toast({
            title: "Success",
            description: "Account created successfully",
          });
          // Cookies.set("jwt", data.token);
          navigate("/");
        }
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[91.3vh] bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Select
              id="role"
              options={options}
              value={formData.role} // Bind the select value to formData
              onChange={
                (e) => setFormData({ ...formData, role: e.target.value }) // Update the userType in formData
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {spinner ? <Spinner /> : "Sign in"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
