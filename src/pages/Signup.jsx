
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid gap-4">
          <Link to="/signup/client">
            <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Client Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking to buy or rent a property
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/signup/agent">
            <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Agent Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Real estate professional
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

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

export default Signup;
