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
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header avec titre et sous-titre */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Vue d'ensemble de vos installations
          </p>
        </div>
        
        {/* Filtre de période responsive à ajouter si nécessaire */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs sm:text-sm">
            Aujourd'hui
          </Badge>
        </div>
      </div>

      {/* KPIs - Grille responsive */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="overflow-hidden">
            <CardContent className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
              <div className="rounded-lg bg-primary/10 p-2 sm:p-3 shrink-0">
                <kpi.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {kpi.label}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {kpi.trend}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section principale - Grille responsive */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Alertes critiques */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              <span className="truncate">Alertes critiques</span>
              <Badge variant="destructive" className="ml-auto text-xs">
                {alerts.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-4 sm:px-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-md border p-3 text-sm ${
                  alert.level === "destructive"
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-warning/30 bg-warning/5"
                }`}
              >
                <p className="font-medium text-foreground text-sm leading-tight">
                  {alert.message}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {alert.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* État global équipements */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">
              État global équipements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            {equipmentStatus.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
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
            <p className="text-xs text-muted-foreground text-right pt-2">
              {total} équipements au total
            </p>
          </CardContent>
        </Card>

        {/* Stats du mois */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="text-sm sm:text-base">
              Ce mois
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-success/10 p-1.5 sm:p-2 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  42 interventions terminées
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  +12% vs mois précédent
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-warning/10 p-1.5 sm:p-2 shrink-0">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  Temps moyen : 2h15
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  -8% vs mois précédent
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-1.5 sm:p-2 shrink-0">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  Taux de conformité : 94%
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Objectif : 95%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dernières interventions - Table responsive */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base">
            Dernières interventions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {/* Version mobile : carte pour chaque intervention */}
          <div className="block lg:hidden space-y-3">
            {recentInterventions.map((i) => (
              <div key={i.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{i.site}</span>
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
                        ? "bg-success text-success-foreground hover:bg-success/90 text-xs"
                        : i.statusColor === "warning"
                        ? "bg-warning text-warning-foreground hover:bg-warning/90 text-xs"
                        : "text-xs"
                    }
                  >
                    {i.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground truncate">{i.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Technicien</p>
                    <p className="font-medium text-foreground">{i.tech}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Version desktop : tableau */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-6 font-medium">Site</th>
                  <th className="pb-3 pr-6 font-medium">Type</th>
                  <th className="pb-3 pr-6 font-medium">Technicien</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentInterventions.map((i) => (
                  <tr key={i.id} className="border-b last:border-0">
                    <td className="py-3 pr-6 font-medium text-foreground whitespace-nowrap">
                      {i.site}
                    </td>
                    <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                      {i.type}
                    </td>
                    <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                      {i.tech}
                    </td>
                    <td className="py-3 whitespace-nowrap">
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

      {/* Footer avec résumé mobile */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">42</p>
            <p className="text-xs text-muted-foreground">Interventions ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">7</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;