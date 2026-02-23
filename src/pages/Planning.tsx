import { useState } from "react";
import { CalendarDays, List, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const plannings = [
  { id: 1, date: "24/02/2026", site: "Paris Centre", type: "Préventive", tech: "J. Martin", priority: "Normale", status: "Planifiée" },
  { id: 2, date: "24/02/2026", site: "Lyon Part-Dieu", type: "Corrective", tech: "A. Dupont", priority: "Haute", status: "Planifiée" },
  { id: 3, date: "25/02/2026", site: "Marseille", type: "Inspection", tech: "M. Bernard", priority: "Basse", status: "Planifiée" },
  { id: 4, date: "25/02/2026", site: "Bordeaux", type: "Préventive", tech: "S. Petit", priority: "Normale", status: "Planifiée" },
  { id: 5, date: "26/02/2026", site: "Lille Europe", type: "Urgente", tech: "A. Dupont", priority: "Critique", status: "Planifiée" },
  { id: 6, date: "26/02/2026", site: "Nantes", type: "Préventive", tech: "J. Martin", priority: "Normale", status: "Planifiée" },
  { id: 7, date: "27/02/2026", site: "Paris Centre", type: "Inspection", tech: "M. Bernard", priority: "Basse", status: "Planifiée" },
  { id: 8, date: "28/02/2026", site: "Lyon Part-Dieu", type: "Préventive", tech: "S. Petit", priority: "Normale", status: "Planifiée" },
];

const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);
const daysWithEvents = [2, 5, 8, 10, 12, 15, 18, 20, 22, 24, 25, 26, 27, 28];

const priorityColor: Record<string, string> = {
  Critique: "bg-destructive text-destructive-foreground",
  Haute: "bg-warning text-warning-foreground",
  Normale: "bg-primary text-primary-foreground",
  Basse: "bg-muted text-muted-foreground",
};

const Planning = () => {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [siteFilter, setSiteFilter] = useState("all");

  const filtered = siteFilter === "all" ? plannings : plannings.filter((p) => p.site === siteFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planning</h1>
          <p className="text-sm text-muted-foreground">Planification des maintenances</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
            <CalendarDays className="mr-1.5 h-4 w-4" /> Calendrier
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            <List className="mr-1.5 h-4 w-4" /> Liste
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Select value={siteFilter} onValueChange={setSiteFilter}>
          <SelectTrigger className="w-48 bg-card">
            <SelectValue placeholder="Filtrer par site" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les sites</SelectItem>
            <SelectItem value="Paris Centre">Paris Centre</SelectItem>
            <SelectItem value="Lyon Part-Dieu">Lyon Part-Dieu</SelectItem>
            <SelectItem value="Marseille">Marseille</SelectItem>
            <SelectItem value="Bordeaux">Bordeaux</SelectItem>
            <SelectItem value="Lille Europe">Lille Europe</SelectItem>
            <SelectItem value="Nantes">Nantes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "calendar" ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Février 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
                <div key={d} className="py-2 font-medium text-muted-foreground">{d}</div>
              ))}
              {/* offset for Feb 2026 starting on Sunday */}
              {Array.from({ length: 6 }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`rounded-md py-3 text-sm ${
                    daysWithEvents.includes(day)
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground"
                  } ${day === 23 ? "ring-2 ring-primary" : ""}`}
                >
                  {day}
                  {daysWithEvents.includes(day) && (
                    <div className="mx-auto mt-0.5 h-1 w-1 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Site</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Technicien</th>
                    <th className="p-4 font-medium">Priorité</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{p.date}</td>
                      <td className="p-4 text-muted-foreground">{p.site}</td>
                      <td className="p-4 text-muted-foreground">{p.type}</td>
                      <td className="p-4 text-muted-foreground">{p.tech}</td>
                      <td className="p-4">
                        <Badge className={priorityColor[p.priority]}>
                          {p.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Planning;
