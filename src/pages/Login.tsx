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
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left panel - Amélioré pour mobile/tablet */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-primary p-8 xl:p-12">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-foreground p-2">
            <Wrench className="h-5 w-5 xl:h-6 xl:w-6 text-primary" />
          </div>
          <span className="text-base xl:text-lg font-bold text-primary-foreground">
            1ER GEIR MAINTENANCE
          </span>
        </div>
        <div className="space-y-4 max-w-lg">
          <h2 className="text-2xl xl:text-3xl font-bold leading-tight text-primary-foreground">
            Gérez vos installations<br />en toute sérénité
          </h2>
          <p className="text-sm xl:text-base text-sidebar-foreground">
            Planifiez vos maintenances, suivez vos équipements et pilotez vos interventions depuis une interface unique, fiable et sécurisée.
          </p>
        </div>
        <p className="text-xs text-sidebar-muted">
          © 2026 MaintiPro — Tous droits réservés
        </p>
      </div>

      {/* Right panel - Optimisé mobile d'abord */}
      <div className="flex w-full items-center justify-center bg-card px-4 py-8 sm:px-6 lg:w-1/2 lg:px-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          
          {/* Logo visible sur mobile/tablet seulement */}
          <div className="lg:hidden flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-8">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <span className="text-base sm:text-lg font-bold text-foreground">
              1ER GEIR MAINTENANCE
            </span>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Connexion
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Accédez à votre espace de gestion
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Email field */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Adresse email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.com"
                  className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role selection - Optimisé pour mobile */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-sm sm:text-base">
                Connexion en tant que
              </Label>
              <RadioGroup 
                value={role} 
                onValueChange={(v) => setRole(v as "admin" | "client")} 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                {/* Admin option */}
                <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 p-3 sm:p-4 transition-colors ${
                  role === "admin" ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <RadioGroupItem value="admin" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                      <span className="truncate">Administrateur</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Accès complet
                    </p>
                  </div>
                </label>

                {/* Client option */}
                <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 p-3 sm:p-4 transition-colors ${
                  role === "client" ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <RadioGroupItem value="client" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                      <span className="truncate">Client</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Consultation
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Forgot password link */}
            <div className="flex items-center justify-end">
              <Link 
                to="#" 
                className="text-xs sm:text-sm text-primary hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit button */}
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-11 text-sm sm:text-base"
            >
              Se connecter
            </Button>
          </form>

          {/* Register link */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link 
              to="/register" 
              className="font-medium text-primary hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;