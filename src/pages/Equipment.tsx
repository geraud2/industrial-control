import { HardDrive, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const equipment = [
  { id: 1, name: "Climatisation centrale", site: "Paris Centre", type: "CVC", status: "ok", lastMaintenance: "15/02/2026", nextMaintenance: "15/05/2026", serial: "CLM-2024-001" },
  { id: 2, name: "Groupe électrogène GE-500", site: "Lyon Part-Dieu", type: "Énergie", status: "warning", lastMaintenance: "08/01/2026", nextMaintenance: "08/02/2026", serial: "GEL-2023-045" },
  { id: 3, name: "Ascenseur principal", site: "Marseille", type: "Élévation", status: "ok", lastMaintenance: "12/02/2026", nextMaintenance: "12/08/2026", serial: "ASC-2022-012" },
  { id: 4, name: "Système anti-incendie", site: "Bordeaux", type: "Sécurité", status: "ok", lastMaintenance: "10/02/2026", nextMaintenance: "10/08/2026", serial: "SAI-2024-008" },
  { id: 5, name: "Compresseur d'air CA-200", site: "Lille Europe", type: "Pneumatique", status: "critical", lastMaintenance: "01/12/2025", nextMaintenance: "01/02/2026", serial: "CMP-2021-033" },
  { id: 6, name: "Pompe hydraulique PH-100", site: "Nantes", type: "Hydraulique", status: "ok", lastMaintenance: "14/02/2026", nextMaintenance: "14/05/2026", serial: "PHP-2023-019" },
  { id: 7, name: "Tableau électrique TGBT", site: "Paris Centre", type: "Énergie", status: "ok", lastMaintenance: "20/01/2026", nextMaintenance: "20/07/2026", serial: "TGT-2020-002" },
  { id: 8, name: "Chaudière industrielle", site: "Lyon Part-Dieu", type: "CVC", status: "warning", lastMaintenance: "05/02/2026", nextMaintenance: "05/03/2026", serial: "CHD-2022-007" },
];

const statusMap = {
  ok: { label: "Opérationnel", className: "bg-success text-success-foreground" },
  warning: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  critical: { label: "En panne", className: "bg-destructive text-destructive-foreground" },
};

const Equipment = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const filtered = equipment.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.site.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase())
  );

  const selected = equipment.find((e) => e.id === selectedId);

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedId(null)} className="text-sm text-primary hover:underline">← Retour aux équipements</button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">{selected.name}</h1>
          <Badge className={statusMap[selected.status as keyof typeof statusMap].className}>
            {statusMap[selected.status as keyof typeof statusMap].label}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Informations</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">N° série</span><span className="font-medium text-foreground">{selected.serial}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">{selected.type}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Site</span><span className="font-medium text-foreground">{selected.site}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Maintenance</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Dernière maintenance</span><span className="font-medium text-foreground">{selected.lastMaintenance}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Prochaine maintenance</span><span className="font-medium text-foreground">{selected.nextMaintenance}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Équipements</h1>
        <p className="text-sm text-muted-foreground">Inventaire et suivi technique</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher un équipement..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Équipement</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Prochaine maint.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setSelectedId(e.id)}>
                    <td className="p-4 font-medium text-foreground flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      {e.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{e.site}</td>
                    <td className="p-4 text-muted-foreground">{e.type}</td>
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

export default Equipment;
