import { Building2, MapPin, Phone, ChevronRight, Wrench, Calendar, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const agencies = [
  { id: 1, name: "Agence Paris Centre", address: "12 Rue de Rivoli, 75001 Paris", phone: "+33 1 42 00 00 00", equipments: 28, status: "ok", lastMaintenance: "15/02/2026" },
  { id: 2, name: "Agence Lyon Part-Dieu", address: "45 Bd Vivier Merle, 69003 Lyon", phone: "+33 4 72 00 00 00", equipments: 22, status: "warning", lastMaintenance: "08/02/2026" },
  { id: 3, name: "Agence Marseille Vieux-Port", address: "8 Quai du Port, 13002 Marseille", phone: "+33 4 91 00 00 00", equipments: 18, status: "ok", lastMaintenance: "12/02/2026" },
  { id: 4, name: "Agence Bordeaux Mériadeck", address: "25 Rue Georges Bonnac, 33000 Bordeaux", phone: "+33 5 56 00 00 00", equipments: 15, status: "ok", lastMaintenance: "10/02/2026" },
  { id: 5, name: "Agence Lille Europe", address: "100 Rue de Tournai, 59000 Lille", phone: "+33 3 20 00 00 00", equipments: 20, status: "critical", lastMaintenance: "01/02/2026" },
  { id: 6, name: "Agence Nantes Atlantique", address: "3 Allée Baco, 44000 Nantes", phone: "+33 2 40 00 00 00", equipments: 16, status: "ok", lastMaintenance: "14/02/2026" },
];

const statusMap = {
  ok: { label: "Opérationnel", className: "bg-success text-success-foreground" },
  warning: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  critical: { label: "Incident", className: "bg-destructive text-destructive-foreground" },
};

const detailEquipments = [
  { name: "Climatisation centrale", status: "ok", nextMaintenance: "15/03/2026" },
  { name: "Groupe électrogène", status: "warning", nextMaintenance: "20/02/2026" },
  { name: "Ascenseur A", status: "ok", nextMaintenance: "01/04/2026" },
  { name: "Système anti-incendie", status: "ok", nextMaintenance: "10/03/2026" },
];

const Agencies = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const agency = agencies.find((a) => a.id === selected);

  // Vue détaillée d'une agence
  if (agency) {
    return (
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
        {/* En-tête avec retour */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelected(null)}
            className="w-full sm:w-auto justify-start gap-2 -ml-2 sm:ml-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sm:hidden">Retour aux agences</span>
            <span className="hidden sm:inline">Retour</span>
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {agency.name}
            </h1>
            <Badge className={`${statusMap[agency.status as keyof typeof statusMap].className} w-fit`}>
              {statusMap[agency.status as keyof typeof statusMap].label}
            </Badge>
          </div>
        </div>

        {/* Cartes d'information - Grille responsive */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Adresse et contact */}
          <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-5 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{agency.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground">{agency.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Équipements */}
          <Card>
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                <Wrench className="h-3.5 w-3.5" />
                Équipements
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                {agency.equipments}
              </p>
            </CardContent>
          </Card>

          {/* Dernière maintenance */}
          <Card>
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Dernière maintenance
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                {agency.lastMaintenance}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des équipements */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">
              Équipements du site
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {/* Version mobile : cartes */}
            <div className="block lg:hidden space-y-3">
              {detailEquipments.map((eq) => (
                <div key={eq.name} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">
                      {eq.name}
                    </span>
                    <Badge className={statusMap[eq.status as keyof typeof statusMap].className}>
                      {statusMap[eq.status as keyof typeof statusMap].label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Prochaine maintenance</span>
                    <span className="font-medium text-foreground">{eq.nextMaintenance}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Version desktop : tableau */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-6 font-medium">Nom</th>
                    <th className="pb-3 pr-6 font-medium">Statut</th>
                    <th className="pb-3 font-medium">Prochaine maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {detailEquipments.map((eq) => (
                    <tr key={eq.name} className="border-b last:border-0">
                      <td className="py-3 pr-6 font-medium text-foreground whitespace-nowrap">
                        {eq.name}
                      </td>
                      <td className="py-3 pr-6">
                        <Badge className={statusMap[eq.status as keyof typeof statusMap].className}>
                          {statusMap[eq.status as keyof typeof statusMap].label}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground whitespace-nowrap">
                        {eq.nextMaintenance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bouton d'action rapide (mobile) */}
        <div className="lg:hidden">
          <Button className="w-full">
            Planifier une maintenance
          </Button>
        </div>
      </div>
    );
  }

  // Vue liste des agences
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Agences
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Gestion de vos sites et agences
          </p>
        </div>
        
        {/* Bouton d'ajout (optionnel) */}
        <Button size="sm" className="w-full sm:w-auto">
          <Building2 className="h-4 w-4 mr-2" />
          Nouvelle agence
        </Button>
      </div>

      {/* Version mobile : cartes des agences */}
      <div className="block lg:hidden space-y-3">
        {agencies.map((a) => (
          <Card 
            key={a.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelected(a.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{a.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="flex items-start gap-2 text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{a.address}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {a.equipments} équipements
                    </span>
                  </div>
                  <Badge className={statusMap[a.status as keyof typeof statusMap].className}>
                    {statusMap[a.status as keyof typeof statusMap].label}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t">
                  <Calendar className="h-3 w-3" />
                  <span>Maintenance: {a.lastMaintenance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Version desktop : tableau */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Agence</th>
                  <th className="p-4 font-medium">Adresse</th>
                  <th className="p-4 font-medium">Équipements</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Dernière maintenance</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelected(a.id)}
                  >
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="whitespace-nowrap">{a.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {a.address}
                    </td>
                    <td className="p-4 text-foreground">{a.equipments}</td>
                    <td className="p-4">
                      <Badge className={statusMap[a.status as keyof typeof statusMap].className}>
                        {statusMap[a.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {a.lastMaintenance}
                    </td>
                    <td className="p-4">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Résumé mobile */}
      <div className="grid grid-cols-3 gap-2 lg:hidden">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-primary">{agencies.length}</p>
            <p className="text-xs text-muted-foreground">Agences</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-warning">
              {agencies.filter(a => a.status === 'warning').length}
            </p>
            <p className="text-xs text-muted-foreground">Maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-destructive">
              {agencies.filter(a => a.status === 'critical').length}
            </p>
            <p className="text-xs text-muted-foreground">Incidents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agencies;