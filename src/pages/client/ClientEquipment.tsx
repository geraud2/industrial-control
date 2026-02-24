import { HardDrive, Search, Filter, Wrench, Calendar, AlertTriangle, CheckCircle2, Clock, Thermometer, Gauge, Zap, Droplets, Wind, Activity, TrendingUp, MoreVertical, Download, Share2, BarChart3, PieChart, Layers, Cpu, Fan, Flame, ArrowUpRight, GaugeCircle, CircleGauge, Eye, Bell, Settings, RefreshCw, X, ChevronRight, ChevronLeft, DownloadCloud, Printer, Star,Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Données enrichies
const equipment = [
  { 
    id: 1, 
    name: "Climatisation centrale", 
    site: "Paris Centre", 
    status: "ok", 
    nextMaintenance: "15/05/2026",
    lastMaintenance: "15/04/2026",
    type: "CTA",
    modele: "Trane XE-80",
    serial: "TR-2024-001",
    temperature: "22°C",
    pression: "4.2 bar",
    rendement: 94,
    consommation: "2.4 kW",
    heuresFonction: 1250,
    priorite: "basse",
    responsable: "Jean Dupont",
    alertes: []
  },
  { 
    id: 2, 
    name: "Groupe électrogène GE-500", 
    site: "Lyon Part-Dieu", 
    status: "warning", 
    nextMaintenance: "08/02/2026",
    lastMaintenance: "08/01/2026",
    type: "Générateur",
    modele: "Caterpillar C4.4",
    serial: "CAT-2023-042",
    temperature: "38°C",
    pression: "3.1 bar",
    rendement: 72,
    consommation: "5.8 kW",
    heuresFonction: 2340,
    priorite: "haute",
    responsable: "Marie Martin",
    alertes: ["Surchauffe détectée", "Niveau d'huile bas"]
  },
  { 
    id: 3, 
    name: "Compresseur d'air CA-200", 
    site: "Lille Europe", 
    status: "critical", 
    nextMaintenance: "01/02/2026",
    lastMaintenance: "01/01/2026",
    type: "Compresseur",
    modele: "Atlas Copco GA-200",
    serial: "AC-2023-789",
    temperature: "45°C",
    pression: "7.8 bar",
    rendement: 65,
    consommation: "7.2 kW",
    heuresFonction: 3120,
    priorite: "critique",
    responsable: "Pierre Dubois",
    alertes: ["Pression trop élevée", "Filtre obstrué", "Température excessive"]
  },
  { 
    id: 4, 
    name: "Ascenseur principal", 
    site: "Paris Centre", 
    status: "ok", 
    nextMaintenance: "12/08/2026",
    lastMaintenance: "12/07/2026",
    type: "Ascenseur",
    modele: "Otis Gen2",
    serial: "OT-2024-112",
    cycles: 15432,
    vitesse: "1.6 m/s",
    rendement: 96,
    heuresFonction: 890,
    priorite: "basse",
    responsable: "Jean Dupont",
    alertes: []
  },
  { 
    id: 5, 
    name: "Système anti-incendie", 
    site: "Nantes Atlantique", 
    status: "ok", 
    nextMaintenance: "10/08/2026",
    lastMaintenance: "10/07/2026",
    type: "Sécurité",
    modele: "Siemens Cerberus",
    serial: "SI-2023-567",
    pression: "12 bar",
    batteries: "98%",
    rendement: 100,
    heuresFonction: 450,
    priorite: "moyenne",
    responsable: "Sophie Lefevre",
    alertes: []
  },
  { 
    id: 6, 
    name: "Pompe hydraulique PH-100", 
    site: "Nantes Atlantique", 
    status: "ok", 
    nextMaintenance: "14/05/2026",
    lastMaintenance: "14/04/2026",
    type: "Pompe",
    modele: "Grundfos NK-100",
    serial: "GR-2024-234",
    debit: "45 m³/h",
    pression: "6.5 bar",
    rendement: 92,
    heuresFonction: 678,
    priorite: "basse",
    responsable: "Sophie Lefevre",
    alertes: []
  },
  { 
    id: 7, 
    name: "Chaudière gaz", 
    site: "Lyon Part-Dieu", 
    status: "warning", 
    nextMaintenance: "05/03/2026",
    lastMaintenance: "05/02/2026",
    type: "Chaudière",
    modele: "Viessmann Vitocrossal",
    serial: "VI-2023-891",
    temperature: "65°C",
    pression: "1.8 bar",
    rendement: 84,
    consommation: "12.3 kW",
    heuresFonction: 1870,
    priorite: "moyenne",
    responsable: "Marie Martin",
    alertes: ["Entretien recommandé"]
  },
  { 
    id: 8, 
    name: "Centrale de traitement d'air", 
    site: "Paris Centre", 
    status: "ok", 
    nextMaintenance: "20/06/2026",
    lastMaintenance: "20/05/2026",
    type: "CTA",
    modele: "Carrier 39HQ",
    serial: "CA-2024-456",
    temperature: "19°C",
    debit: "4500 m³/h",
    rendement: 97,
    consommation: "3.1 kW",
    heuresFonction: 1120,
    priorite: "basse",
    responsable: "Jean Dupont",
    alertes: []
  }
];

const statusMap = {
  ok: { 
    label: "Opérationnel", 
    className: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
    icon: CheckCircle2,
    color: "emerald"
  },
  warning: { 
    label: "Maintenance", 
    className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    icon: AlertTriangle,
    color: "amber"
  },
  critical: { 
    label: "En panne", 
    className: "bg-gradient-to-r from-rose-500 to-rose-600 text-white",
    icon: AlertTriangle,
    color: "rose"
  },
};

const typeIcons = {
  "CTA": Fan,
  "Générateur": Zap,
  "Compresseur": Cpu,
  "Ascenseur": ArrowUpRight,
  "Sécurité": Shield,
  "Pompe": Droplets,
  "Chaudière": Flame,
  "Défaut": AlertTriangle
};

const ClientEquipment = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>("name");

  // Extraire les sites uniques
  const sites = [...new Set(equipment.map(e => e.site))];
  const types = [...new Set(equipment.map(e => e.type))];

  // Filtrer les équipements
  const filtered = equipment.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                         e.site.toLowerCase().includes(search.toLowerCase()) ||
                         e.modele?.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "all" || e.type === selectedType;
    const matchesStatus = selectedStatus === "all" || e.status === selectedStatus;
    const matchesSite = selectedSite === "all" || e.site === selectedSite;
    return matchesSearch && matchesType && matchesStatus && matchesSite;
  });

  // Trier les équipements
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "site") return a.site.localeCompare(b.site);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "nextMaintenance") return a.nextMaintenance.localeCompare(b.nextMaintenance);
    return 0;
  });

  // Statistiques
  const stats = {
    total: equipment.length,
    ok: equipment.filter(e => e.status === "ok").length,
    warning: equipment.filter(e => e.status === "warning").length,
    critical: equipment.filter(e => e.status === "critical").length,
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header avec titre et stats */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Mes Équipements
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.total} équipements • {stats.ok} opérationnels • {stats.warning} en maintenance • {stats.critical} en panne
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Synchroniser
            </Button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total", value: stats.total, icon: HardDrive, color: "from-blue-400 to-blue-500", bg: "bg-blue-50" },
            { label: "Opérationnel", value: stats.ok, icon: CheckCircle2, color: "from-emerald-400 to-emerald-500", bg: "bg-emerald-50" },
            { label: "Maintenance", value: stats.warning, icon: AlertTriangle, color: "from-amber-400 to-amber-500", bg: "bg-amber-50" },
            { label: "En panne", value: stats.critical, icon: AlertTriangle, color: "from-rose-400 to-rose-500", bg: "bg-rose-50" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                    >
                      <stat.icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtres avancés */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border shadow-lg space-y-4"
        >
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un équipement, un site, un modèle..." 
              className="pl-10 bg-white dark:bg-gray-900 border-0 shadow-sm"
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'équipement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="ok">Opérationnel</SelectItem>
                <SelectItem value="warning">Maintenance</SelectItem>
                <SelectItem value="critical">En panne</SelectItem>
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

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="site">Site</SelectItem>
                <SelectItem value="status">Statut</SelectItem>
                <SelectItem value="nextMaintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("grid")}
                className="flex-1"
              >
                <PieChart className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("list")}
                className="flex-1"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Résultats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "grid gap-4",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {sorted.map((eq) => {
            const StatusIcon = statusMap[eq.status].icon;
            const TypeIcon = typeIcons[eq.type as keyof typeof typeIcons] || HardDrive;
            
            return (
              <motion.div
                key={eq.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEquipment(eq)}
                className="cursor-pointer group"
              >
                <Card className={cn(
                  "border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
                  viewMode === "list" && "flex items-center"
                )}>
                  {/* Badge d'alerte */}
                  {eq.alertes.length > 0 && (
                    <div className={cn(
                      "absolute top-3 right-3 z-10",
                      viewMode === "list" && "static ml-auto"
                    )}>
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {eq.alertes.length}
                      </Badge>
                    </div>
                  )}

                  <CardContent className={cn(
                    "p-5",
                    viewMode === "list" && "flex items-center gap-4 flex-1"
                  )}>
                    {/* Icône et type */}
                    <div className={cn(
                      "flex items-start gap-3",
                      viewMode === "list" && "w-48"
                    )}>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={cn(
                          "p-3 rounded-xl",
                          eq.status === 'ok' && "bg-emerald-50 dark:bg-emerald-950/30",
                          eq.status === 'warning' && "bg-amber-50 dark:bg-amber-950/30",
                          eq.status === 'critical' && "bg-rose-50 dark:bg-rose-950/30"
                        )}
                      >
                        <TypeIcon className={cn(
                          "h-5 w-5",
                          eq.status === 'ok' && "text-emerald-600",
                          eq.status === 'warning' && "text-amber-600",
                          eq.status === 'critical' && "text-rose-600"
                        )} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{eq.name}</p>
                        <p className="text-xs text-muted-foreground">{eq.modele}</p>
                      </div>
                    </div>

                    {viewMode === "grid" ? (
                      /* Vue Grille */
                      <div className="space-y-3 mt-3">
                        {/* Site et statut */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-2 h-2 rounded-full bg-primary/50" />
                            <span>{eq.site}</span>
                          </div>
                          <Badge className={statusMap[eq.status].className}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusMap[eq.status].label}
                          </Badge>
                        </div>

                        {/* Métriques principales */}
                        <div className="grid grid-cols-2 gap-2">
                          {eq.temperature && (
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-3 w-3 text-rose-500" />
                              <span className="text-xs">{eq.temperature}</span>
                            </div>
                          )}
                          {eq.pression && (
                            <div className="flex items-center gap-2">
                              <Gauge className="h-3 w-3 text-blue-500" />
                              <span className="text-xs">{eq.pression}</span>
                            </div>
                          )}
                          {eq.consommation && (
                            <div className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-amber-500" />
                              <span className="text-xs">{eq.consommation}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Activity className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs">{eq.rendement}%</span>
                          </div>
                        </div>

                        {/* Barre de rendement */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Rendement</span>
                            <span className={cn(
                              "font-medium",
                              eq.rendement >= 90 ? "text-emerald-600" :
                              eq.rendement >= 75 ? "text-amber-600" : "text-rose-600"
                            )}>
                              {eq.rendement}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${eq.rendement}%` }}
                              transition={{ duration: 0.5 }}
                              className={cn(
                                "h-full rounded-full",
                                eq.rendement >= 90 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" :
                                eq.rendement >= 75 ? "bg-gradient-to-r from-amber-400 to-amber-500" :
                                "bg-gradient-to-r from-rose-400 to-rose-500"
                              )}
                            />
                          </div>
                        </div>

                        {/* Dates maintenance */}
                        <div className="flex justify-between pt-2 border-t text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Dernière: {eq.lastMaintenance}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Prochaine: {eq.nextMaintenance}</span>
                          </div>
                        </div>

                        {/* Responsable */}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {eq.responsable.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {eq.responsable}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Vue Liste */
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-48">
                          <p className="text-xs text-muted-foreground">Site</p>
                          <p className="text-sm font-medium">{eq.site}</p>
                        </div>
                        <div className="w-32">
                          <p className="text-xs text-muted-foreground">Statut</p>
                          <Badge className={statusMap[eq.status].className}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusMap[eq.status].label}
                          </Badge>
                        </div>
                        <div className="w-32">
                          <p className="text-xs text-muted-foreground">Rendement</p>
                          <p className={cn(
                            "text-sm font-medium",
                            eq.rendement >= 90 ? "text-emerald-600" :
                            eq.rendement >= 75 ? "text-amber-600" : "text-rose-600"
                          )}>
                            {eq.rendement}%
                          </p>
                        </div>
                        <div className="w-40">
                          <p className="text-xs text-muted-foreground">Prochaine maintenance</p>
                          <p className="text-sm">{eq.nextMaintenance}</p>
                        </div>
                      </div>
                    )}

                    {/* Chevron pour voir détails */}
                    <ChevronRight className={cn(
                      "h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors",
                      viewMode === "list" && "ml-auto"
                    )} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Affichage de {sorted.length} sur {equipment.length} équipements
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal détails équipement */}
      <AnimatePresence>
        {selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEquipment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête modal */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    selectedEquipment.status === 'ok' && "bg-emerald-50 dark:bg-emerald-950/30",
                    selectedEquipment.status === 'warning' && "bg-amber-50 dark:bg-amber-950/30",
                    selectedEquipment.status === 'critical' && "bg-rose-50 dark:bg-rose-950/30"
                  )}>
                    <HardDrive className={cn(
                      "h-6 w-6",
                      selectedEquipment.status === 'ok' && "text-emerald-600",
                      selectedEquipment.status === 'warning' && "text-amber-600",
                      selectedEquipment.status === 'critical' && "text-rose-600"
                    )} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedEquipment.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.modele} • {selectedEquipment.serial}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEquipment(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Corps modal */}
              <div className="p-6 space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Site</p>
                    <p className="font-medium">{selectedEquipment.site}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedEquipment.type}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Responsable</p>
                    <p className="font-medium">{selectedEquipment.responsable}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Priorité</p>
                    <Badge variant={selectedEquipment.priorite === "critique" ? "destructive" : "outline"}>
                      {selectedEquipment.priorite}
                    </Badge>
                  </div>
                </div>

                {/* Alertes */}
                {selectedEquipment.alertes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-rose-600">Alertes actives</p>
                    {selectedEquipment.alertes.map((alerte: string, index: number) => (
                      <div key={index} className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        <span className="text-sm">{alerte}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Métriques en temps réel */}
                <div>
                  <p className="text-sm font-medium mb-3">Métriques en temps réel</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedEquipment.temperature && (
                      <Card>
                        <CardContent className="p-3 text-center">
                          <Thermometer className="h-4 w-4 mx-auto mb-1 text-rose-500" />
                          <p className="text-xs text-muted-foreground">Température</p>
                          <p className="font-semibold">{selectedEquipment.temperature}</p>
                        </CardContent>
                      </Card>
                    )}
                    {selectedEquipment.pression && (
                      <Card>
                        <CardContent className="p-3 text-center">
                          <Gauge className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                          <p className="text-xs text-muted-foreground">Pression</p>
                          <p className="font-semibold">{selectedEquipment.pression}</p>
                        </CardContent>
                      </Card>
                    )}
                    {selectedEquipment.consommation && (
                      <Card>
                        <CardContent className="p-3 text-center">
                          <Zap className="h-4 w-4 mx-auto mb-1 text-amber-500" />
                          <p className="text-xs text-muted-foreground">Consommation</p>
                          <p className="font-semibold">{selectedEquipment.consommation}</p>
                        </CardContent>
                      </Card>
                    )}
                    <Card>
                      <CardContent className="p-3 text-center">
                        <Activity className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                        <p className="text-xs text-muted-foreground">Rendement</p>
                        <p className="font-semibold">{selectedEquipment.rendement}%</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Historique maintenance */}
                <div>
                  <p className="text-sm font-medium mb-3">Maintenance</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dernière maintenance</p>
                          <p className="text-xs text-muted-foreground">{selectedEquipment.lastMaintenance}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Effectuée</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Prochaine maintenance</p>
                          <p className="text-xs text-muted-foreground">{selectedEquipment.nextMaintenance}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Planifiée</Badge>
                    </div>
                  </div>
                </div>

                {/* Heures de fonctionnement */}
                <div>
                  <p className="text-sm font-medium mb-2">Heures de fonctionnement</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedEquipment.heuresFonction / 5000) * 100}%` }}
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{selectedEquipment.heuresFonction}h / 5000h</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1 gap-2">
                    <Wrench className="h-4 w-4" />
                    Planifier maintenance
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClientEquipment;