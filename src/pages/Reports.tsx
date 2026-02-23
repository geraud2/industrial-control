import { BarChart3, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const siteReports = [
  { site: "Paris Centre", total: 45, completed: 42, avgTime: "1h50", conformity: 96 },
  { site: "Lyon Part-Dieu", total: 38, completed: 34, avgTime: "2h30", conformity: 89 },
  { site: "Marseille", total: 30, completed: 29, avgTime: "1h45", conformity: 97 },
  { site: "Bordeaux", total: 25, completed: 24, avgTime: "2h00", conformity: 95 },
  { site: "Lille Europe", total: 32, completed: 28, avgTime: "2h45", conformity: 84 },
  { site: "Nantes", total: 22, completed: 21, avgTime: "1h55", conformity: 96 },
];

const monthlyStats = [
  { month: "Sept", value: 28 },
  { month: "Oct", value: 35 },
  { month: "Nov", value: 32 },
  { month: "Déc", value: 30 },
  { month: "Jan", value: 38 },
  { month: "Fév", value: 42 },
];

const Reports = () => {
  const [period, setPeriod] = useState("6m");
  const maxVal = Math.max(...monthlyStats.map((m) => m.value));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports</h1>
          <p className="text-sm text-muted-foreground">Historique et statistiques de maintenance</p>
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

      {/* Bar chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Interventions par mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-48">
            {monthlyStats.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-foreground">{m.value}</span>
                <div
                  className="w-full rounded-t bg-primary"
                  style={{ height: `${(m.value / maxVal) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Site stats table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Statistiques par site</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Interventions</th>
                  <th className="p-4 font-medium">Terminées</th>
                  <th className="p-4 font-medium">Temps moyen</th>
                  <th className="p-4 font-medium">Conformité</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {siteReports.map((r) => (
                  <tr key={r.site} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{r.site}</td>
                    <td className="p-4 text-foreground">{r.total}</td>
                    <td className="p-4 text-foreground">{r.completed}</td>
                    <td className="p-4 text-muted-foreground">{r.avgTime}</td>
                    <td className="p-4">
                      <span className={`font-medium ${r.conformity >= 95 ? "text-success" : r.conformity >= 90 ? "text-warning" : "text-destructive"}`}>
                        {r.conformity}%
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
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

export default Reports;
