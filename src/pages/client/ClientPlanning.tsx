import { Calendar, Clock, MapPin, Wrench, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Filter, Search, Download, Share2, Bell, MoreVertical, Settings, Users, HardDrive, Sun, Sunrise, Sunset, Moon, CalendarDays, ListTodo, Grid3x3, Plus, X, ArrowRight, Clock3, CalendarRange, GanttChartSquare, Sparkles, TrendingUp, Activity, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Données enrichies (inchangées)
const plannings = [
  { 
    id: 1, 
    date: "24/02/2026", 
    site: "Paris Centre", 
    type: "Préventive", 
    priority: "Normale",
    equipement: "Climatisation centrale",
    technicien: "Jean Martin",
    duree: "2h",
    description: "Maintenance préventive trimestrielle - Nettoyage des filtres et vérification des pressions",
    status: "planifié"
  },
  { 
    id: 2, 
    date: "25/02/2026", 
    site: "Lyon Part-Dieu", 
    type: "Corrective", 
    priority: "Haute",
    equipement: "Groupe électrogène GE-500",
    technicien: "Marie Dubois",
    duree: "4h",
    description: "Intervention corrective suite à alerte surchauffe - Remplacement ventilateur",
    status: "en_cours"
  },
  { 
    id: 3, 
    date: "26/02/2026", 
    site: "Lille Europe", 
    type: "Urgente", 
    priority: "Critique",
    equipement: "Compresseur d'air CA-200",
    technicien: "Pierre Lambert",
    duree: "6h",
    description: "Panne critique - Compresseur hors service - Remplacement joints et révision complète",
    status: "urgent"
  },
  { 
    id: 4, 
    date: "26/02/2026", 
    site: "Nantes Atlantique", 
    type: "Préventive", 
    priority: "Normale",
    equipement: "Pompe hydraulique PH-100",
    technicien: "Sophie Lefevre",
    duree: "3h",
    description: "Maintenance préventive - Vérification étanchéité et graissage",
    status: "planifié"
  },
  { 
    id: 5, 
    date: "28/02/2026", 
    site: "Lyon Part-Dieu", 
    type: "Préventive", 
    priority: "Normale",
    equipement: "Chaudière gaz",
    technicien: "Marie Dubois",
    duree: "3h",
    description: "Maintenance annuelle - Nettoyage brûleur et contrôle sécurité",
    status: "planifié"
  },
  { 
    id: 6, 
    date: "01/03/2026", 
    site: "Paris Centre", 
    type: "Inspection", 
    priority: "Basse",
    equipement: "Système anti-incendie",
    technicien: "Jean Martin",
    duree: "1h",
    description: "Inspection réglementaire - Vérification détecteurs et extincteurs",
    status: "planifié"
  },
  { 
    id: 7, 
    date: "02/03/2026", 
    site: "Marseille", 
    type: "Corrective", 
    priority: "Haute",
    equipement: "Ascenseur principal",
    technicien: "Thomas Petit",
    duree: "5h",
    description: "Réparation suite à panne - Remplacement moteur traction",
    status: "planifié"
  }
];

const priorityConfig = {
  Critique: { 
    label: "Critique", 
    className: "bg-gradient-to-r from-rose-500 to-rose-600 text-white",
    icon: AlertTriangle,
    color: "rose"
  },
  Haute: { 
    label: "Haute", 
    className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    icon: AlertTriangle,
    color: "amber"
  },
  Normale: { 
    label: "Normale", 
    className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    icon: Clock,
    color: "blue"
  },
  Basse: { 
    label: "Basse", 
    className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
    icon: CheckCircle2,
    color: "gray"
  },
};

const statusConfig = {
  planifié: { label: "Planifié", className: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400" },
  en_cours: { label: "En cours", className: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400" },
  urgent: { label: "Urgent", className: "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 animate-pulse" },
  terminé: { label: "Terminé", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" },
};

const typeIcons = {
  "Préventive": Wrench,
  "Corrective": AlertTriangle,
  "Urgente": AlertTriangle,
  "Inspection": CheckCircle2,
};

const ClientPlanning = () => {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extraire les sites uniques
  const sites = [...new Set(plannings.map(p => p.site))];

  // Filtrer les maintenances
  const filteredPlannings = plannings.filter(p => {
    const matchesSearch = p.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.equipement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.technicien.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === "all" || p.priority === selectedPriority;
    const matchesSite = selectedSite === "all" || p.site === selectedSite;
    return matchesSearch && matchesPriority && matchesSite;
  });

  // Grouper par date pour le calendrier
  const planningsByDate = filteredPlannings.reduce((acc, p) => {
    if (!acc[p.date]) acc[p.date] = [];
    acc[p.date].push(p);
    return acc;
  }, {} as Record<string, typeof plannings>);

  // Obtenir les dates du mois
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Jours du mois précédent
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, currentMonth: false });
    }
    
    // Jours du mois courant
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Statistiques
  const stats = {
    total: plannings.length,
    urgent: plannings.filter(p => p.priority === "Critique").length,
    enCours: plannings.filter(p => p.status === "en_cours" || p.status === "urgent").length,
    planifie: plannings.filter(p => p.status === "planifié").length,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Composant Filtres pour mobile
  const FiltersSheet = () => (
    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filtres</h3>
            <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="Critique">Critique</SelectItem>
                <SelectItem value="Haute">Haute</SelectItem>
                <SelectItem value="Normale">Normale</SelectItem>
                <SelectItem value="Basse">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger>
                <SelectValue placeholder="Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sites</SelectItem>
                {sites.map(site => (
                  <SelectItem key={site} value={site}>{site}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full" onClick={() => setFiltersOpen(false)}>
              Appliquer les filtres
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 pb-20 md:pb-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header responsive */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Planning des Maintenances
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {stats.total} interventions • {stats.urgent} urgentes • {stats.enCours} en cours
            </p>
          </div>
          
          {/* Actions - cachées sur mobile dans un menu */}
          {!isMobile ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                <Plus className="h-4 w-4" />
                Nouvelle intervention
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" className="gap-2 flex-1">
                <Plus className="h-4 w-4" />
                Nouvelle
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>

        {/* Stats cards responsives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
        >
          {[
            { label: "Total", value: stats.total, icon: Wrench, color: "from-blue-400 to-blue-500" },
            { label: "Urgent", value: stats.urgent, icon: AlertTriangle, color: "from-rose-400 to-rose-500" },
            { label: "En cours", value: stats.enCours, icon: Clock, color: "from-amber-400 to-amber-500" },
            { label: "Planifiées", value: stats.planifie, icon: Calendar, color: "from-emerald-400 to-emerald-500" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                    >
                      <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtres et vue - adaptés mobile */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border shadow-lg space-y-3 sm:space-y-4"
        >
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={isMobile ? "Rechercher..." : "Rechercher par site, équipement, technicien..."}
              className="pl-9 sm:pl-10 bg-white dark:bg-gray-900 border-0 shadow-sm text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtres - version desktop */}
          {!isMobile && (
            <div className="flex flex-wrap gap-3">
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="Critique">Critique</SelectItem>
                  <SelectItem value="Haute">Haute</SelectItem>
                  <SelectItem value="Normale">Normale</SelectItem>
                  <SelectItem value="Basse">Basse</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les sites</SelectItem>
                  {sites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg overflow-hidden ml-auto">
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="rounded-none gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  Calendrier
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none gap-2"
                >
                  <ListTodo className="h-4 w-4" />
                  Liste
                </Button>
              </div>
            </div>
          )}

          {/* Filtres - version mobile */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <FiltersSheet />
              
              <div className="flex border rounded-lg overflow-hidden flex-1">
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="rounded-none flex-1 gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs">Calendrier</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none flex-1 gap-2"
                >
                  <ListTodo className="h-4 w-4" />
                  <span className="text-xs">Liste</span>
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Vue Calendrier responsive */}
        {viewMode === "calendar" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Navigation mois responsive */}
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold">
                {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Grille calendrier responsive */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-2 sm:p-4">
                {/* Jours de la semaine */}
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground py-1 sm:py-2">
                      {isMobile ? day.substring(0, 1) : day}
                    </div>
                  ))}
                </div>

                {/* Jours du mois */}
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                  {days.map((day, index) => {
                    const dateStr = formatDate(day.date);
                    const dayPlannings = planningsByDate[dateStr] || [];
                    const hasUrgent = dayPlannings.some(p => p.priority === "Critique");
                    
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                          "min-h-[60px] sm:min-h-[80px] md:min-h-[100px] p-1 sm:p-2 rounded-lg border transition-all cursor-pointer",
                          day.currentMonth 
                            ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" 
                            : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-muted-foreground",
                          hasUrgent && "border-l-2 sm:border-l-4 border-l-rose-500"
                        )}
                        onClick={() => {
                          if (dayPlannings.length > 0) {
                            setSelectedMaintenance(dayPlannings[0]);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className={cn(
                            "text-[10px] sm:text-xs md:text-sm font-medium",
                            !day.currentMonth && "text-muted-foreground"
                          )}>
                            {day.date.getDate()}
                          </span>
                          {dayPlannings.length > 0 && (
                            <Badge variant="outline" className="text-[8px] sm:text-[10px] h-3 sm:h-4 px-1">
                              {dayPlannings.length}
                            </Badge>
                          )}
                        </div>

                        {/* Aperçu des maintenances - responsive */}
                        <div className="space-y-0.5">
                          {dayPlannings.slice(0, isMobile ? 1 : 2).map((p, i) => (
                            <div
                              key={i}
                              className={cn(
                                "text-[6px] sm:text-[8px] md:text-[10px] p-0.5 sm:p-1 rounded truncate",
                                p.priority === "Critique" && "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400",
                                p.priority === "Haute" && "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
                                p.priority === "Normale" && "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
                              )}
                            >
                              {isMobile ? p.equipement.substring(0, 3) + '...' : p.equipement.substring(0, 8) + '...'}
                            </div>
                          ))}
                          {dayPlannings.length > (isMobile ? 1 : 2) && (
                            <div className="text-[6px] sm:text-[8px] text-muted-foreground">
                              +{dayPlannings.length - (isMobile ? 1 : 2)}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Légende responsive */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-rose-500" />
                <span>Urgent</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
                <span>Haute</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
                <span>Normale</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vue Liste responsive */}
        {viewMode === "list" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 sm:space-y-3"
          >
            {filteredPlannings.map((p, index) => {
              const PriorityIcon = priorityConfig[p.priority as keyof typeof priorityConfig].icon;
              const TypeIcon = typeIcons[p.type as keyof typeof typeIcons] || Wrench;
              
              return (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: isMobile ? 2 : 4 }}
                  onClick={() => setSelectedMaintenance(p)}
                  className="cursor-pointer"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        {/* Date - responsive */}
                        <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 sm:min-w-[80px]">
                          <div className="text-xl sm:text-2xl font-bold text-primary">
                            {p.date.split('/')[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(p.date.split('/').reverse().join('-')).toLocaleDateString('fr-FR', { month: 'short' })}
                          </div>
                        </div>

                        {/* Indicateur priorité - vertical sur mobile */}
                        <div className={cn(
                          "w-full sm:w-1 h-1 sm:h-auto sm:self-stretch rounded-full",
                          p.priority === "Critique" && "bg-rose-500",
                          p.priority === "Haute" && "bg-amber-500",
                          p.priority === "Normale" && "bg-blue-500",
                          p.priority === "Basse" && "bg-gray-500",
                        )} />

                        {/* Contenu principal */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base">{p.equipement}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{p.site}</p>
                            </div>
                            <Badge className={cn(
                              priorityConfig[p.priority as keyof typeof priorityConfig].className,
                              "text-xs w-fit"
                            )}>
                              <PriorityIcon className="h-3 w-3 mr-1" />
                              {p.priority}
                            </Badge>
                          </div>

                          {/* Description - cachée sur mobile */}
                          {!isMobile && (
                            <p className="text-sm mt-2 line-clamp-2">{p.description}</p>
                          )}

                          {/* Métadonnées - wrap sur mobile */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                              <TypeIcon className="h-3 w-3" />
                              <span>{p.type}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{p.duree}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                              <Avatar className="h-4 w-4 sm:h-5 sm:w-5">
                                <AvatarFallback className="text-[6px] sm:text-[8px]">
                                  {p.technicien.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate max-w-[60px] sm:max-w-none">{p.technicien}</span>
                            </div>
                          </div>

                          {/* Barre de progression pour les interventions en cours */}
                          {p.status === "en_cours" && (
                            <div className="mt-2 sm:mt-3">
                              <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                                <span className="text-muted-foreground">Progression</span>
                                <span className="font-medium text-amber-600">45%</span>
                              </div>
                              <div className="h-1 sm:h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "45%" }}
                                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                                />
                              </div>
                            </div>
                          )}

                          {/* Badge statut */}
                          <div className="mt-2 sm:mt-3">
                            <Badge variant="outline" className={cn(
                              statusConfig[p.status as keyof typeof statusConfig].className,
                              "text-[10px] sm:text-xs"
                            )}>
                              {statusConfig[p.status as keyof typeof statusConfig].label}
                            </Badge>
                          </div>
                        </div>

                        <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {filteredPlannings.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucune intervention trouvée
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal détails maintenance responsive */}
      <AnimatePresence>
        {selectedMaintenance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedMaintenance(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={cn(
                      "p-2 sm:p-3 rounded-xl",
                      selectedMaintenance.priority === "Critique" && "bg-rose-50 dark:bg-rose-950/30",
                      selectedMaintenance.priority === "Haute" && "bg-amber-50 dark:bg-amber-950/30",
                      selectedMaintenance.priority === "Normale" && "bg-blue-50 dark:bg-blue-950/30",
                    )}>
                      <Wrench className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6",
                        selectedMaintenance.priority === "Critique" && "text-rose-600",
                        selectedMaintenance.priority === "Haute" && "text-amber-600",
                        selectedMaintenance.priority === "Normale" && "text-blue-600",
                      )} />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">{selectedMaintenance.equipement}</h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedMaintenance.site}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedMaintenance(null)} className="p-1">
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Corps */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Informations principales */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Date</p>
                    <p className="text-sm sm:text-base font-medium flex items-center gap-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      {selectedMaintenance.date}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Durée</p>
                    <p className="text-sm sm:text-base font-medium flex items-center gap-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      {selectedMaintenance.duree}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Type</p>
                    <Badge variant="outline" className="text-xs">{selectedMaintenance.type}</Badge>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Priorité</p>
                    <Badge className={priorityConfig[selectedMaintenance.priority as keyof typeof priorityConfig].className}>
                      {selectedMaintenance.priority}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium">Description</p>
                  <p className="text-xs sm:text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                    {selectedMaintenance.description}
                  </p>
                </div>

                {/* Technicien */}
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium">Technicien assigné</p>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarFallback>
                        {selectedMaintenance.technicien.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm sm:text-base font-medium">{selectedMaintenance.technicien}</p>
                      <p className="text-xs text-muted-foreground">Technicien senior</p>
                    </div>
                  </div>
                </div>

                {/* Pièces détachées */}
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium">Pièces nécessaires</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span className="text-xs sm:text-sm">Filtre à air</span>
                      </div>
                      <Badge variant="outline" className="text-xs">2 unités</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span className="text-xs sm:text-sm">Joint d'étanchéité</span>
                      </div>
                      <Badge variant="outline" className="text-xs">4 unités</Badge>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button className="flex-1 gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Terminer
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClientPlanning;