import {
  Building2,
  HardDrive,
  Wrench,
  AlertTriangle,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  Activity,
  Calendar,
  MapPin,
  Users,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Award,
  Target,
  Crown,
  BarChart3,
  PieChart,
  Gauge,
  Thermometer,
  Zap,
  Droplets,
  Wind,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Données enrichies
const kpis = [
  { label: "Total sites", value: "24", icon: Building2, trend: "+2 ce mois", change: "+8.3%", iconBg: "bg-blue-50 dark:bg-blue-950/30", iconColor: "text-blue-600" },
  { label: "Équipements", value: "156", icon: HardDrive, trend: "12 nouveaux", change: "+8.3%", iconBg: "bg-emerald-50 dark:bg-emerald-950/30", iconColor: "text-emerald-600" },
  { label: "Maintenances semaine", value: "18", icon: Wrench, trend: "5 aujourd'hui", change: "+12%", iconBg: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-600" },
  { label: "Interventions en cours", value: "7", icon: ClipboardList, trend: "3 urgentes", change: "-2", iconBg: "bg-rose-50 dark:bg-rose-950/30", iconColor: "text-rose-600" },
];

const alerts = [
  { id: 1, message: "Climatisation Agence Paris — Panne critique", level: "destructive", time: "il y a 12 min", site: "Paris Centre", priority: "haute" },
  { id: 2, message: "Groupe électrogène Site Lyon — Maintenance dépassée", level: "warning", time: "il y a 1h", site: "Lyon Part-Dieu", priority: "moyenne" },
  { id: 3, message: "Ascenseur Agence Marseille — Inspection requise", level: "warning", time: "il y a 3h", site: "Marseille", priority: "basse" },
];

const recentInterventions = [
  { id: 1, site: "Agence Bordeaux", type: "Maintenance préventive", tech: "J. Martin", status: "Terminée", statusColor: "success", date: "10:30", equipement: "CTA" },
  { id: 2, site: "Agence Paris", type: "Réparation urgente", tech: "A. Dupont", status: "En cours", statusColor: "warning", date: "09:15", equipement: "Groupe électrogène" },
  { id: 3, site: "Agence Lyon", type: "Inspection", tech: "M. Bernard", status: "En cours", statusColor: "warning", date: "08:45", equipement: "Ascenseur" },
  { id: 4, site: "Agence Lille", type: "Maintenance corrective", tech: "S. Petit", status: "Planifiée", statusColor: "muted", date: "14:00", equipement: "Chaudière" },
  { id: 5, site: "Agence Nantes", type: "Remplacement pièce", tech: "J. Martin", status: "Terminée", statusColor: "success", date: "11:20", equipement: "Pompe" },
];

const equipmentStatus = [
  { label: "Opérationnel", count: 128, color: "bg-emerald-500", percentage: 82 },
  { label: "En maintenance", count: 18, color: "bg-amber-500", percentage: 11.5 },
  { label: "En panne", count: 10, color: "bg-rose-500", percentage: 6.5 },
];

const performanceData = [
  { label: "Lun", value: 85 },
  { label: "Mar", value: 92 },
  { label: "Mer", value: 88 },
  { label: "Jeu", value: 94 },
  { label: "Ven", value: 90 },
  { label: "Sam", value: 78 },
  { label: "Dim", value: 82 },
];

const topSites = [
  { name: "Paris Centre", interventions: 42, performance: 98, trend: "+5%" },
  { name: "Lyon Part-Dieu", interventions: 38, performance: 92, trend: "+2%" },
  { name: "Lille Europe", interventions: 35, performance: 88, trend: "-1%" },
  { name: "Nantes Atlantique", interventions: 28, performance: 95, trend: "+4%" },
];

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("jour");
  const [showWelcome, setShowWelcome] = useState(true);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = equipmentStatus.reduce((s, e) => s + e.count, 0);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bonjour" : currentHour < 18 ? "Bon après-midi" : "Bonsoir";

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
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header avec météo et accueil */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {greeting}, Jean 👋
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                <span>Bienvenue sur votre tableau de bord</span>
                <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                  <Crown className="h-2.5 w-2.5 mr-1" />
                  Premium
                </Badge>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Météo */}
            <div className="hidden sm:flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border">
              <Sun className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-xs font-medium">Paris</p>
                <p className="text-[10px] text-muted-foreground">18°C • Ensoleillé</p>
              </div>
            </div>

            {/* Période */}
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-24 sm:w-32 h-8 sm:h-9">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jour">Aujourd'hui</SelectItem>
                <SelectItem value="semaine">Cette semaine</SelectItem>
                <SelectItem value="mois">Ce mois</SelectItem>
              </SelectContent>
            </Select>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            </Button>
          </div>
        </motion.div>

        {/* KPIs avec design amélioré */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
        >
          {kpis.map((kpi, index) => (
            <motion.div key={kpi.label} variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                          {kpi.value}
                        </p>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-medium",
                          kpi.change.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {kpi.change}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {kpi.trend}
                      </p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-2 sm:p-2.5 rounded-xl ${kpi.iconBg} group-hover:scale-110 transition-transform`}
                    >
                      <kpi.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${kpi.iconColor}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Section performance et graphique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Graphique performance */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Performance globale
                </CardTitle>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs hier
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="h-32 sm:h-40 flex items-end justify-between gap-1 sm:gap-2">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${item.value}%` }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                      style={{ height: `${item.value}%` }}
                    />
                    <span className="text-[8px] sm:text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-[8px] sm:text-xs font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* État global équipements */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                État des équipements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              {equipmentStatus.map((s) => (
                <div key={s.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{s.count}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {s.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${s.color}`}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-sm font-bold text-foreground">{total}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertes et stats du mois */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Alertes critiques */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                Alertes critiques
                <Badge variant="destructive" className="ml-auto text-xs">
                  {alerts.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "rounded-xl p-3 border relative overflow-hidden",
                    alert.level === "destructive"
                      ? "border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20"
                      : "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20"
                  )}
                >
                  {/* Indicateur de priorité */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    alert.priority === "haute" ? "bg-rose-500" : "bg-amber-500"
                  )} />
                  
                  <div className="pl-2">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={cn(
                        "text-[8px] px-1 py-0",
                        alert.priority === "haute" ? "border-rose-200 text-rose-600" : "border-amber-200 text-amber-600"
                      )}>
                        {alert.priority}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Stats du mois */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Ce mois
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mb-1" />
                  <p className="text-lg font-bold text-emerald-600">42</p>
                  <p className="text-[10px] text-emerald-600/80">Interventions</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl">
                  <Clock className="h-4 w-4 text-blue-600 mb-1" />
                  <p className="text-lg font-bold text-blue-600">2h15</p>
                  <p className="text-[10px] text-blue-600/80">Temps moyen</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Objectif mensuel</span>
                  <span className="font-medium text-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Taux de conformité</p>
                  <p className="text-xs text-muted-foreground">94% vs objectif 95%</p>
                </div>
                <Badge variant="outline" className="ml-auto text-[10px]">-1%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Top sites */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Top sites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              {topSites.map((site, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">{site.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">{site.performance}%</span>
                        {site.trend.startsWith('+') ? (
                          <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-rose-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {site.interventions} interventions
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dernières interventions - Version responsive */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2 px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                Dernières interventions
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Voir tout
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {/* Version mobile : cartes */}
            <div className="block lg:hidden space-y-2">
              {recentInterventions.map((i) => (
                <motion.div
                  key={i.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-xl p-3 space-y-2 bg-white/50 dark:bg-gray-900/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <MapPin className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{i.site}</span>
                    </div>
                    <Badge
                      variant={
                        i.statusColor === "success"
                          ? "default"
                          : i.statusColor === "warning"
                          ? "secondary"
                          : "outline"
                      }
                      className={cn(
                        "text-[10px]",
                        i.statusColor === "success" && "bg-emerald-500 text-white",
                        i.statusColor === "warning" && "bg-amber-500 text-white"
                      )}
                    >
                      {i.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Équipement</p>
                      <p className="font-medium truncate">{i.equipement}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium truncate">{i.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tech.</p>
                      <p className="font-medium">{i.tech}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {i.date}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Version desktop : tableau */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-6 font-medium">Site</th>
                    <th className="pb-3 pr-6 font-medium">Équipement</th>
                    <th className="pb-3 pr-6 font-medium">Type</th>
                    <th className="pb-3 pr-6 font-medium">Technicien</th>
                    <th className="pb-3 pr-6 font-medium">Heure</th>
                    <th className="pb-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInterventions.map((i) => (
                    <motion.tr
                      key={i.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      className="border-b last:border-0 cursor-pointer"
                    >
                      <td className="py-3 pr-6 font-medium text-foreground whitespace-nowrap">
                        {i.site}
                      </td>
                      <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                        {i.equipement}
                      </td>
                      <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                        {i.type}
                      </td>
                      <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                        {i.tech}
                      </td>
                      <td className="py-3 pr-6 text-muted-foreground whitespace-nowrap">
                        {i.date}
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
                          className={cn(
                            "text-xs",
                            i.statusColor === "success" && "bg-emerald-500 text-white",
                            i.statusColor === "warning" && "bg-amber-500 text-white"
                          )}
                        >
                          {i.status}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer avec résumé mobile */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">42</p>
              <p className="text-xs text-muted-foreground">Interventions ce mois</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/5 to-amber-500/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">7</p>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;