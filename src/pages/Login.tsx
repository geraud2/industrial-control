import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrench, Mail, Lock, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "client">("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "admin" ? "/dashboard" : "/client/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-foreground p-2">
            <Wrench className="h-6 w-6 text-primary" />
          </div>
          <span className="text-lg font-bold text-primary-foreground">1ER GEIR MAINTENANCE</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold leading-tight text-primary-foreground">
            Gérez vos installations<br />en toute sérénité
          </h2>
          <p className="max-w-md text-sidebar-foreground">
            Planifiez vos maintenances, suivez vos équipements et pilotez vos interventions depuis une interface unique, fiable et sécurisée.
          </p>
        </div>
        <p className="text-xs text-sidebar-muted">
          © 2026 MaintiPro — Tous droits réservés
        </p>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center bg-card p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">1ER GEIR MAINTENANCE</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Connexion</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Accédez à votre espace de gestion
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Connexion en tant que</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as "admin" | "client")} className="flex gap-4">
                <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${role === "admin" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <RadioGroupItem value="admin" />
                  <div>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Administrateur</p>
                    <p className="text-xs text-muted-foreground">Accès complet</p>
                  </div>
                </label>
                <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${role === "client" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <RadioGroupItem value="client" />
                  <div>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Eye className="h-4 w-4 text-primary" /> Client</p>
                    <p className="text-xs text-muted-foreground">Consultation uniquement</p>
                  </div>
                </label>
              </RadioGroup>
            </div>
            <div className="flex items-center justify-end">
              <Link to="#" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;