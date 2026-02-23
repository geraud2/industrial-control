import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plannings = [
  { id: 1, date: "24/02/2026", site: "Paris Centre", type: "Préventive", priority: "Normale" },
  { id: 2, date: "25/02/2026", site: "Lyon Part-Dieu", type: "Corrective", priority: "Haute" },
  { id: 3, date: "26/02/2026", site: "Lille Europe", type: "Urgente", priority: "Critique" },
  { id: 4, date: "26/02/2026", site: "Nantes", type: "Préventive", priority: "Normale" },
  { id: 5, date: "28/02/2026", site: "Lyon Part-Dieu", type: "Préventive", priority: "Normale" },
];

const priorityColor: Record<string, string> = {
  Critique: "bg-destructive text-destructive-foreground",
  Haute: "bg-warning text-warning-foreground",
  Normale: "bg-primary text-primary-foreground",
  Basse: "bg-muted text-muted-foreground",
};

const ClientPlanning = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Planning</h1>
        <p className="text-sm text-muted-foreground">Maintenances planifiées sur vos sites</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Priorité</th>
                </tr>
              </thead>
              <tbody>
                {plannings.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{p.date}</td>
                    <td className="p-4 text-muted-foreground">{p.site}</td>
                    <td className="p-4 text-muted-foreground">{p.type}</td>
                    <td className="p-4">
                      <Badge className={priorityColor[p.priority]}>{p.priority}</Badge>
                    </td>
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

export default ClientPlanning;
