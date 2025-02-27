import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const SignupAgent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    license: "",
    agency: "",
    experience: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email &&
      formData.password &&
      formData.name &&
      formData.license
    ) {
      const mockUser = {
        id: "1",
        email: formData.email,
        name: formData.name,
        role: "agent",
        phone: formData.phone,
        license: formData.license,
        agency: formData.agency,
        experience: formData.experience,
        bio: formData.bio,
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Create Agent Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your professional information to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Real Estate License Number"
              value={formData.license}
              onChange={(e) =>
                setFormData({ ...formData, license: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Agency/Brokerage"
              value={formData.agency}
              onChange={(e) =>
                setFormData({ ...formData, agency: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Years of Experience"
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Professional Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
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
            Create agent account
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

export default SignupAgent;
