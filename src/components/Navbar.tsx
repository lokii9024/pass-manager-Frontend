// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {User} = useAuthStore()

  useEffect(() => {
    // Replace this with real login state (e.g., token check)
    setIsLoggedIn(User? true : false)
  }, [User]);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Lock className="w-5 h-5" /> VaultSafe
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        <Button onClick={() => navigate("/")} variant="ghost">Home</Button>
        <Button variant="ghost" onClick={() => navigate("/howItWorks")}>How it works</Button>
        <Button variant="ghost" onClick={() => isLoggedIn? navigate("/signout"): navigate("/signin")}>
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </Button>
        <Button onClick={() => isLoggedIn? navigate("/dashboard/:slug"): navigate("/signup")}>
          {isLoggedIn ? "Dashboard" : "Sign Up"}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4 p-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/howItWorks")}>How it works</Button>
            <Button variant="ghost" onClick={() => isLoggedIn? navigate("/signout"): navigate("/signin")}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </Button>
            <Button onClick={() => isLoggedIn? navigate("/dashboard/:slug"): navigate("/signup")}>
              {isLoggedIn ? "Dashboard" : "Sign Up"}
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
