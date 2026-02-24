import { useState, useMemo } from "react";
import { CalendarDays, List, Filter, ChevronLeft, ChevronRight, MapPin, User, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Données pour le calendrier
const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);
const daysWithEvents = [2, 5, 8, 10, 12, 15, 18, 20, 22, 24, 25, 26, 27, 28];

// Mois et années pour la navigation
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const priorityColor: Record<string, string> = {
  Critique: "bg-destructive text-destructive-foreground",
  Haute: "bg-warning text-warning-foreground",
  Normale: "bg-primary text-primary-foreground",
  Basse: "bg-muted text-muted-foreground",
};

const typeColor: Record<string, string> = {
  "Préventive": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Corrective": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  "Inspection": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Urgente": "bg-destructive/20 text-destructive dark:bg-destructive/30",
};

const Planning = () => {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [siteFilter, setSiteFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMonth, setCurrentMonth] = useState(1); // Février (0-indexé)
  const [currentYear, setCurrentYear] = useState(2026);

  // Extraire les sites uniques
  const uniqueSites = useMemo(() => {
    const sites = plannings.map(p => p.site);
    return ['all', ...new Set(sites)];
  }, []);

  // Filtrage avancé
  const filtered = useMemo(() => {
    return plannings.filter((p) => {
      const matchesSite = siteFilter === "all" || p.site === siteFilter;
      const matchesPriority = priorityFilter === "all" || p.priority === priorityFilter;
      const matchesSearch = 
        searchQuery === "" ||
        p.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSite && matchesPriority && matchesSearch;
    });
  }, [siteFilter, priorityFilter, searchQuery]);

  // Statistiques
  const stats = useMemo(() => ({
    total: plannings.length,
    critique: plannings.filter(p => p.priority === "Critique").length,
    haute: plannings.filter(p => p.priority === "Haute").length,
    aujourdhui: plannings.filter(p => p.date === "24/02/2026").length,
  }), []);

  // Navigation du calendrier
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Planification des maintenances
          </p>
        </div>
        
        {/* Badges statistiques */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Badge variant="outline" className="whitespace-nowrap">
            Total: {stats.total}
          </Badge>
          <Badge className="bg-destructive whitespace-nowrap">
            {stats.critique} critique
          </Badge>
          <Badge className="bg-warning whitespace-nowrap">
            {stats.haute} haute
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap">
            Aujourd'hui: {stats.aujourdhui}
          </Badge>
        </div>
      </div>

      {/* Toggle de vue et filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Toggle view */}
        <div className="flex gap-2 bg-muted p-1 rounded-lg w-full sm:w-auto">
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("list")}
            className="flex-1 sm:flex-none"
          >
            <List className="mr-1.5 h-4 w-4" />
            Liste
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("calendar")}
            className="flex-1 sm:flex-none"
          >
            <CalendarDays className="mr-1.5 h-4 w-4" />
            Calendrier
          </Button>
        </div>

        {/* Barre de recherche */}
        <div className="relative flex-1">
          <Input
            placeholder="Rechercher par site, technicien..."
            className="h-9 sm:h-10 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          <Select value={siteFilter} onValueChange={setSiteFilter}>
            <SelectTrigger className="w-[120px] sm:w-[140px] h-9 sm:h-10">
              <Filter className="h-4 w-4 mr-2 sm:mr-0" />
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les sites</SelectItem>
              {uniqueSites.filter(s => s !== 'all').map(site => (
                <SelectItem key={site} value={site}>{site}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[120px] sm:w-[140px] h-9 sm:h-10">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="Critique">Critique</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Normale">Normale</SelectItem>
              <SelectItem value="Basse">Basse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vue Calendrier */}
      {view === "calendar" && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {months[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Version mobile : calendrier compact */}
            <div className="block sm:hidden">
              <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
                {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
                  <div key={d} className="py-1.5 font-medium text-muted-foreground">{d}</div>
                ))}
                {/* Offset pour février 2026 (débute un samedi) */}
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day}
                    className={`aspect-square flex flex-col items-center justify-center rounded-md p-1 ${
                      daysWithEvents.includes(day)
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-foreground"
                    } ${day === 24 ? "ring-2 ring-primary" : ""}`}
                  >
                    <span>{day}</span>
                    {daysWithEvents.includes(day) && (
                      <div className="h-1 w-1 rounded-full bg-primary mt-0.5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Avec intervention</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full ring-2 ring-primary" />
                  <span>Aujourd'hui</span>
                </div>
              </div>
            </div>

            {/* Version desktop : calendrier détaillé */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((d) => (
                  <div key={d} className="py-2 font-medium text-muted-foreground">{d}</div>
                ))}
                {/* Offset pour février 2026 (débute un samedi) */}
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day}
                    className={`min-h-[80px] rounded-md border p-2 ${
                      daysWithEvents.includes(day)
                        ? "bg-primary/5 border-primary/20"
                        : "border-border"
                    } ${day === 24 ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        daysWithEvents.includes(day) ? "text-primary" : "text-foreground"
                      }`}>
                        {day}
                      </span>
                      {daysWithEvents.includes(day) && (
                        <Badge variant="outline" className="text-[10px] h-5">
                          {plannings.filter(p => p.date.endsWith(`/${day}/02/2026`)).length}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Aperçu des interventions du jour */}
                    {daysWithEvents.includes(day) && (
                      <div className="mt-1 space-y-1">
                        {plannings
                          .filter(p => p.date === `${day < 10 ? '0'+day : day}/02/2026`)
                          .slice(0, 2)
                          .map(p => (
                            <div key={p.id} className="text-[10px] truncate text-muted-foreground">
                              • {p.site} ({p.tech})
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vue Liste */}
      {view === "list" && (
        <>
          {/* Version mobile : cartes */}
          <div className="block lg:hidden space-y-3">
            {filtered.map((p) => (
              <Card key={p.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{p.site}</h3>
                      <p className="text-xs text-muted-foreground">{p.date}</p>
                    </div>
                    <Badge className={priorityColor[p.priority]}>
                      {p.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge className={typeColor[p.type]}>
                        {p.type}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {p.tech}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>Statut: {p.status}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filtered.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Aucune planification trouvée</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Version desktop : tableau */}
          <Card className="hidden lg:block">
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
                      <th className="p-4 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium text-foreground whitespace-nowrap">
                          {p.date}
                        </td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {p.site}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={typeColor[p.type]}>
                            {p.type}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {p.tech}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={priorityColor[p.priority]}>
                            {p.priority}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {p.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Résumé des résultats */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length} intervention{filtered.length > 1 ? 's' : ''} planifiée{filtered.length > 1 ? 's' : ''}</span>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Exporter le planning
          </Button>
        </div>
      )}
    </div>
  );
};

export default Planning;