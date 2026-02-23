import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrench, Mail, Lock, Phone, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
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
            Rejoignez MaintiPro
          </h2>
          <p className="max-w-md text-sidebar-foreground">
            Créez votre compte entreprise et commencez à gérer vos installations de manière centralisée et efficace.
          </p>
        </div>
        <p className="text-xs text-sidebar-muted">
          © 2026 MaintiPro — Tous droits réservés
        </p>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center bg-card p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">MaintiPro</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inscription</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Créez votre compte entreprise
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nom de l'entreprise</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="company" placeholder="Votre entreprise" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nom du responsable</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Prénom Nom" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="reg-email" type="email" placeholder="nom@entreprise.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="phone" type="tel" placeholder="+33 6 00 00 00 00" className="pl-10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="reg-password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="reg-password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmation</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              Créer mon compte
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
