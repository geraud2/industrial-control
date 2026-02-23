import { Building2, HardDrive, CalendarDays, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Mes agences", value: "4", icon: Building2 },
  { label: "Mes équipements", value: "52", icon: HardDrive },
  { label: "Prochaine maintenance", value: "26/02", icon: CalendarDays },
  { label: "Alertes en cours", value: "1", icon: AlertTriangle },
];

const alerts = [
  { id: 1, message: "Compresseur d'air — Agence Lille — Panne signalée", level: "destructive" as const, time: "il y a 2h" },
  { id: 2, message: "Groupe électrogène — Agence Lyon — Maintenance prévue", level: "warning" as const, time: "il y a 1 jour" },
];

const equipmentStatus = [
  { label: "Opérationnel", count: 45, color: "bg-success" },
  { label: "En maintenance", count: 5, color: "bg-warning" },
  { label: "En panne", count: 2, color: "bg-destructive" },
];

const ClientDashboard = () => {
  const total = equipmentStatus.reduce((s, e) => s + e.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de vos installations</p>
      </div>

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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Alertes
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">État global de vos équipements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {equipmentStatus.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{s.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${(s.count / total) * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-right">{total} équipements au total</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
