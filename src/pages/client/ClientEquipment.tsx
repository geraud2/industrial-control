import { HardDrive, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const equipment = [
  { id: 1, name: "Climatisation centrale", site: "Paris Centre", status: "ok", nextMaintenance: "15/05/2026" },
  { id: 2, name: "Groupe électrogène GE-500", site: "Lyon Part-Dieu", status: "warning", nextMaintenance: "08/02/2026" },
  { id: 3, name: "Compresseur d'air CA-200", site: "Lille Europe", status: "critical", nextMaintenance: "01/02/2026" },
  { id: 4, name: "Ascenseur principal", site: "Paris Centre", status: "ok", nextMaintenance: "12/08/2026" },
  { id: 5, name: "Système anti-incendie", site: "Nantes", status: "ok", nextMaintenance: "10/08/2026" },
  { id: 6, name: "Pompe hydraulique PH-100", site: "Nantes", status: "ok", nextMaintenance: "14/05/2026" },
];

const statusMap = {
  ok: { label: "Opérationnel", className: "bg-success text-success-foreground" },
  warning: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  critical: { label: "En panne", className: "bg-destructive text-destructive-foreground" },
};

const ClientEquipment = () => {
  const [search, setSearch] = useState("");
  const filtered = equipment.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.site.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes Équipements</h1>
        <p className="text-sm text-muted-foreground">Consultez l'état de vos équipements</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Équipement</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Prochaine maint.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      {e.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{e.site}</td>
                    <td className="p-4">
                      <Badge className={statusMap[e.status as keyof typeof statusMap].className}>
                        {statusMap[e.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{e.nextMaintenance}</td>
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

export default ClientEquipment;
