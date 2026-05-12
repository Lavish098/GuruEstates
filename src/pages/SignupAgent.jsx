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
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    agency: "",
    experience: "",
    bio: "",
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
        password: formData.password,
        role: "agent",
        phone: formData.phone,
        agency: formData.agency,
        experience: formData.experience,
        bio: formData.bio,
      };

      const response = await fetch(
        "https://guru-estates-backend.vercel.app/agent/signup",
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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl space-y-6 border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/10">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Agent access
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Create Agent Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your professional information to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Input
              placeholder="First Name"
              className="h-12 bg-white"
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
              className="h-12 bg-white"
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
              className="h-12 bg-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Phone Number"
              className="h-12 bg-white"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Agency"
              className="h-12 bg-white"
              value={formData.agency}
              onChange={(e) =>
                setFormData({ ...formData, agency: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Years of Experience"
              type="number"
              className="h-12 bg-white"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Textarea
              placeholder="Professional Bio"
              className="min-h-28 bg-white"
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
              className="h-12 bg-white"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full md:col-span-2">
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
