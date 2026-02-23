import { Building2, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const agencies = [
  { id: 1, name: "Agence Paris Centre", address: "12 Rue de Rivoli, 75001 Paris", phone: "+33 1 42 00 00 00", equipments: 18, status: "ok", lastMaintenance: "15/02/2026" },
  { id: 2, name: "Agence Lyon Part-Dieu", address: "45 Bd Vivier Merle, 69003 Lyon", phone: "+33 4 72 00 00 00", equipments: 14, status: "warning", lastMaintenance: "08/02/2026" },
  { id: 3, name: "Agence Lille Europe", address: "100 Rue de Tournai, 59000 Lille", phone: "+33 3 20 00 00 00", equipments: 12, status: "critical", lastMaintenance: "01/02/2026" },
  { id: 4, name: "Agence Nantes Atlantique", address: "3 Allée Baco, 44000 Nantes", phone: "+33 2 40 00 00 00", equipments: 8, status: "ok", lastMaintenance: "14/02/2026" },
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
];

const ClientAgencies = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const agency = agencies.find((a) => a.id === selected);

  if (agency) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>← Retour</Button>
          <h1 className="text-2xl font-bold text-foreground">{agency.name}</h1>
          <Badge className={statusMap[agency.status as keyof typeof statusMap].className}>
            {statusMap[agency.status as keyof typeof statusMap].label}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5 space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> {agency.address}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" /> {agency.phone}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Équipements</p>
              <p className="text-3xl font-bold text-foreground">{agency.equipments}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Dernière maintenance</p>
              <p className="text-3xl font-bold text-foreground">{agency.lastMaintenance}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Équipements du site</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Nom</th>
                  <th className="pb-3 pr-4 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Prochaine maintenance</th>
                </tr>
              </thead>
              <tbody>
                {detailEquipments.map((eq) => (
                  <tr key={eq.name} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{eq.name}</td>
                    <td className="py-3 pr-4">
                      <Badge className={statusMap[eq.status as keyof typeof statusMap].className}>
                        {statusMap[eq.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{eq.nextMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes Agences</h1>
        <p className="text-sm text-muted-foreground">Consultez vos sites et leur état</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Agence</th>
                  <th className="p-4 font-medium">Équipements</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Dernière maintenance</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelected(a.id)}
                  >
                    <td className="p-4 font-medium text-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {a.name}
                    </td>
                    <td className="p-4 text-foreground">{a.equipments}</td>
                    <td className="p-4">
                      <Badge className={statusMap[a.status as keyof typeof statusMap].className}>
                        {statusMap[a.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{a.lastMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAgencies;
