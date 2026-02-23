import { UserCircle, Building2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ClientAccount = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon Compte</h1>
        <p className="text-sm text-muted-foreground">Vos informations de compte (lecture seule)</p>
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
              <Input defaultValue="Marie Durand" readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="m.durand@entreprise-abc.com" readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input defaultValue="+33 6 98 76 54 32" readOnly className="bg-muted/50" />
            </div>
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
              <Input defaultValue="Entreprise ABC" readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Contrat</Label>
              <Input defaultValue="Maintenance Premium — Actif" readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Agences rattachées</Label>
              <Input defaultValue="4 sites" readOnly className="bg-muted/50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientAccount;
