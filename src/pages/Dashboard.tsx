import {
  Building2,
  HardDrive,
  Wrench,
  AlertTriangle,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total sites", value: "24", icon: Building2, trend: "+2 ce mois" },
  { label: "Équipements", value: "156", icon: HardDrive, trend: "12 nouveaux" },
  { label: "Maintenances semaine", value: "18", icon: Wrench, trend: "5 aujourd'hui" },
  { label: "Interventions en cours", value: "7", icon: ClipboardList, trend: "3 urgentes" },
];

const alerts = [
  { id: 1, message: "Climatisation Agence Paris — Panne critique", level: "destructive" as const, time: "il y a 12 min" },
  { id: 2, message: "Groupe électrogène Site Lyon — Maintenance dépassée", level: "warning" as const, time: "il y a 1h" },
  { id: 3, message: "Ascenseur Agence Marseille — Inspection requise", level: "warning" as const, time: "il y a 3h" },
];

const recentInterventions = [
  { id: 1, site: "Agence Bordeaux", type: "Maintenance préventive", tech: "J. Martin", status: "Terminée", statusColor: "success" },
  { id: 2, site: "Agence Paris", type: "Réparation urgente", tech: "A. Dupont", status: "En cours", statusColor: "warning" },
  { id: 3, site: "Agence Lyon", type: "Inspection", tech: "M. Bernard", status: "En cours", statusColor: "warning" },
  { id: 4, site: "Agence Lille", type: "Maintenance corrective", tech: "S. Petit", status: "Planifiée", statusColor: "muted" },
  { id: 5, site: "Agence Nantes", type: "Remplacement pièce", tech: "J. Martin", status: "Terminée", statusColor: "success" },
];

const equipmentStatus = [
  { label: "Opérationnel", count: 128, color: "bg-success" },
  { label: "En maintenance", count: 18, color: "bg-warning" },
  { label: "En panne", count: 10, color: "bg-destructive" },
];

const Dashboard = () => {
  const total = equipmentStatus.reduce((s, e) => s + e.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de vos installations</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-lg bg-primary/10 p-3">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Alertes critiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-md border p-3 text-sm ${
                  alert.level === "destructive"
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-warning/30 bg-warning/5"
                }`}
              >
                <p className="font-medium text-foreground">{alert.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Equipment status chart */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">État global équipements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {equipmentStatus.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{s.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${s.color}`}
                    style={{ width: `${(s.count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-right">{total} équipements au total</p>
          </CardContent>
        </Card>

        {/* Quick stats */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Ce mois</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-success/10 p-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">42 interventions terminées</p>
                <p className="text-xs text-muted-foreground">+12% vs mois précédent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-warning/10 p-2">
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Temps moyen : 2h15</p>
                <p className="text-xs text-muted-foreground">-8% vs mois précédent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Taux de conformité : 94%</p>
                <p className="text-xs text-muted-foreground">Objectif : 95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent interventions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dernières interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Site</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Technicien</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentInterventions.map((i) => (
                  <tr key={i.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{i.site}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{i.type}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{i.tech}</td>
                    <td className="py-3">
                      <Badge
                        variant={
                          i.statusColor === "success"
                            ? "default"
                            : i.statusColor === "warning"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          i.statusColor === "success"
                            ? "bg-success text-success-foreground hover:bg-success/90"
                            : i.statusColor === "warning"
                            ? "bg-warning text-warning-foreground hover:bg-warning/90"
                            : ""
                        }
                      >
                        {i.status}
                      </Badge>
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

export default Dashboard;
