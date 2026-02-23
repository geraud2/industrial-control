import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Wrench } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-foreground p-3">
            <Wrench className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
          1ER GEIR MAINTENANCE
        </h1>
        <p className="max-w-sm text-center text-sm text-sidebar-foreground">
          Application de gestion de maintenance & suivi des installations
        </p>
        <div className="mt-8 flex gap-1">
          <div className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-primary-foreground" />
          <div className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-primary-foreground" style={{ animationDelay: "0.3s" }} />
          <div className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-primary-foreground" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
