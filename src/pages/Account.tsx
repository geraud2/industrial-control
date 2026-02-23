import { UserCircle, Building2, Mail, Phone, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Account = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon compte</h1>
        <p className="text-sm text-muted-foreground">Gérer les informations de votre compte</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nom complet</Label>
              <Input defaultValue="Jean-Pierre Martin" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="jp.martin@entreprise.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input defaultValue="+33 6 12 34 56 78" />
            </div>
            <Button size="sm">Enregistrer</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Entreprise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nom de l'entreprise</Label>
              <Input defaultValue="TechMaintenance SAS" />
            </div>
            <div className="space-y-2">
              <Label>SIRET</Label>
              <Input defaultValue="123 456 789 00012" />
            </div>
            <div className="space-y-2">
              <Label>Adresse</Label>
              <Input defaultValue="15 Avenue de l'Industrie, 75012 Paris" />
            </div>
            <Button size="sm">Enregistrer</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" /> Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div />
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Confirmer le mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button size="sm" className="mt-4">Changer le mot de passe</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
