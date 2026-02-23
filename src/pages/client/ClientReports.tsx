import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const interventions = [
  { id: 1, date: "18/02/2026", site: "Paris Centre", type: "Maintenance préventive", status: "Terminée" },
  { id: 2, date: "12/02/2026", site: "Lyon Part-Dieu", type: "Réparation corrective", status: "Terminée" },
  { id: 3, date: "08/02/2026", site: "Lille Europe", type: "Inspection", status: "Terminée" },
  { id: 4, date: "01/02/2026", site: "Nantes", type: "Maintenance préventive", status: "Terminée" },
  { id: 5, date: "25/01/2026", site: "Paris Centre", type: "Remplacement pièce", status: "Terminée" },
];

const ClientReports = () => {
  const [period, setPeriod] = useState("3m");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports</h1>
          <p className="text-sm text-muted-foreground">Historique des interventions sur vos sites</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Dernier mois</SelectItem>
              <SelectItem value="3m">3 derniers mois</SelectItem>
              <SelectItem value="6m">6 derniers mois</SelectItem>
              <SelectItem value="1y">Dernière année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Historique des interventions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((i) => (
                  <tr key={i.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{i.date}</td>
                    <td className="p-4 text-muted-foreground">{i.site}</td>
                    <td className="p-4 text-muted-foreground">{i.type}</td>
                    <td className="p-4">
                      <span className="text-success font-medium">{i.status}</span>
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

export default ClientReports;
