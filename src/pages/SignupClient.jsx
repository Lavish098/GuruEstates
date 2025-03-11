import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const SignupClient = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email &&
      formData.password &&
      formData.firstname &&
      formData.lastname
    ) {
      const mockUser = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        role: "client",
        phone: formData.phone,
        password: formData.password,
      };
      const response = await fetch(
        "https://guru-estates-backend.vercel.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockUser),
        }
      );

      if (response.status === 400) {
        const data = await response.json();
        const errorMessages = Object.values(data).filter(Boolean).join(", ");
      } else {
        if (response.ok) {
          const data = await response.json();
          console.log(data);

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
            description: "Logged in successfully",
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
          <h1 className="text-2xl font-semibold">Create Client Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="First Name"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Last Name"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
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
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupClient;
