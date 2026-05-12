
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";

const Signup = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md space-y-6 border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/10">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Get started
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid gap-4">
          <Link to="/signup/client">
            <Card className="cursor-pointer border-white/70 p-4 transition hover:-translate-y-0.5 hover:bg-accent">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-primary/10">
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
            <Card className="cursor-pointer border-white/70 p-4 transition hover:-translate-y-0.5 hover:bg-accent">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-primary/10">
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
