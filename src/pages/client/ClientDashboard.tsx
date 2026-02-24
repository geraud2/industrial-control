import { useState } from "react";
import { 
  Building2, 
  HardDrive, 
  CalendarDays, 
  AlertTriangle, 
  Wrench, 
  MapPin, 
  Clock, 
  Flame,
  Bell,
  ChevronRight,
  Thermometer,
  Gauge,
  Zap,
  Activity,
  Search,
  Filter,
  MoreVertical,
  Home,
  PieChart,
  Settings,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Droplets,
  Wind,
  BarChart3,
  Sunrise,
  Battery,
  Cpu,
  GaugeCircle,
  Waves,
  Fan,
  ThermometerSun,
  GanttChartSquare,
  LineChart,
  CircleGauge,
  Eclipse,
  Orbit,
  Shield,
  Award,
  Target,
  ZapOff
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Données enrichies
const stats = [
  { 
    id: 1, 
    title: "Agences", 
    value: "4", 
    icon: Building2, 
    change: "+1", 
    color: "from-blue-400 to-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-blue-600",
    chart: [65, 70, 75, 80, 85, 90, 95]
  },
  { 
    id: 2, 
    title: "Équipements", 
    value: "52", 
    icon: Cpu, 
    change: "+3", 
    color: "from-emerald-400 to-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-emerald-600",
    chart: [45, 50, 48, 52, 55, 53, 58]
  },
  { 
    id: 3, 
    title: "Maintenances", 
    value: "8", 
    icon: GanttChartSquare, 
    change: "+2", 
    color: "from-violet-400 to-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500 to-violet-600",
    chart: [20, 25, 22, 28, 30, 26, 32]
  },
  { 
    id: 4, 
    title: "Alertes", 
    value: "1", 
    icon: Shield, 
    change: "-2", 
    color: "from-rose-400 to-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-rose-600",
    chart: [12, 10, 8, 6, 4, 2, 1]
  },
];

const agences = [
  { 
    id: 1, 
    nom: "Paris Centre", 
    equipements: 18, 
    alertes: 0, 
    taux: 98,
    performance: "+5.2%",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    color: "from-blue-500 to-blue-600",
    energie: 94,
    securite: 100,
    confort: 96
  },
  { 
    id: 2, 
    nom: "Lyon Part-Dieu", 
    equipements: 15, 
    alertes: 1, 
    taux: 85,
    performance: "-2.1%",
    image: "https://images.unsplash.com/photo-1545259741-2c3e3d4b4b0a?q=80&w=2070",
    color: "from-amber-500 to-amber-600",
    energie: 82,
    securite: 95,
    confort: 88
  },
  { 
    id: 3, 
    nom: "Marseille", 
    equipements: 12, 
    alertes: 0, 
    taux: 97,
    performance: "+3.8%",
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070",
    color: "from-emerald-500 to-emerald-600",
    energie: 96,
    securite: 98,
    confort: 95
  },
];

const equipements = [
  { 
    id: 1, 
    nom: "Climatisation Multi-split", 
    site: "Paris Centre", 
    statut: "optimal",
    temperature: "22°C",
    rendement: 94,
    icon: Fan,
    consommation: "2.4 kW",
    pression: "4.2 bar",
    humidity: "45%"
  },
  { 
    id: 2, 
    nom: "Groupe Électrogène", 
    site: "Lyon Part-Dieu", 
    statut: "critique",
    temperature: "38°C",
    rendement: 72,
    icon: Zap,
    consommation: "5.8 kW",
    pression: "3.1 bar",
    vibration: "0.8 mm/s"
  },
  { 
    id: 3, 
    nom: "Ascenseur Panoramique", 
    site: "Marseille", 
    statut: "optimal",
    temperature: "22°C",
    rendement: 96,
    icon: ArrowUpRight,
    cycles: "1,234",
    vitesse: "1.6 m/s"
  },
  { 
    id: 4, 
    nom: "Chaudière Haute Performance", 
    site: "Lyon Part-Dieu", 
    statut: "attention",
    temperature: "65°C",
    rendement: 88,
    icon: Flame,
    pression: "1.8 bar",
    flamme: "92%"
  },
  { 
    id: 5, 
    nom: "Centrale de Traitement d'Air", 
    site: "Paris Centre", 
    statut: "optimal",
    temperature: "19°C",
    rendement: 97,
    icon: Wind,
    debit: "4500 m³/h",
    co2: "420 ppm"
  },
];

const alertes = [
  { 
    id: 1, 
    message: "Groupe électrogène - Surchauffe critique", 
    site: "Lyon Part-Dieu", 
    time: "15 min",
    severity: "haute",
    icon: ZapOff
  },
  { 
    id: 2, 
    message: "Pression d'huile basse - Maintenance requise", 
    site: "Paris Centre", 
    time: "1h",
    severity: "moyenne",
    icon: Gauge
  },
  { 
    id: 3, 
    message: "Filtre à air - Nettoyage nécessaire", 
    site: "Marseille", 
    time: "2h",
    severity: "basse",
    icon: Wind
  },
];

const activites = [
  { id: 1, action: "Maintenance préventive", equipement: "Climatisation", site: "Paris Centre", time: "Il y a 10 min", icon: Wrench },
  { id: 2, action: "Rapport généré", equipement: "Analyse mensuelle", site: "Tous sites", time: "Il y a 25 min", icon: FileText },
  { id: 3, action: "Alerte résolue", equipement: "Pression huile", site: "Lyon", time: "Il y a 1h", icon: CheckCircle2 },
];

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("accueil");
  const [selectedPeriod, setSelectedPeriod] = useState("jour");
  const [showNotifications, setShowNotifications] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 pb-20">
      {/* Header Premium */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50"
      >
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 w-10 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                  ABC Entreprise
                </motion.h1>
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1"
                >
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] px-1.5 py-0">
                    <Award className="h-2.5 w-2.5 mr-1" />
                    Premium
                  </Badge>
                  <span className="text-[10px] text-gray-400">•</span>
                  <span className="text-[10px] text-gray-400">Client depuis 2024</span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                    className="absolute top-2 right-2 h-2.5 w-2.5 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full ring-2 ring-white dark:ring-gray-900"
                  />
                </Button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold">Notifications</p>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {alertes.map((alerte) => (
                          <div key={alerte.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <div className="flex gap-2">
                              <div className={cn(
                                "p-1.5 rounded-lg shrink-0",
                                alerte.severity === "haute" && "bg-rose-50 dark:bg-rose-950/30",
                                alerte.severity === "moyenne" && "bg-amber-50 dark:bg-amber-950/30",
                                alerte.severity === "basse" && "bg-blue-50 dark:bg-blue-950/30"
                              )}>
                                <alerte.icon className={cn(
                                  "h-3 w-3",
                                  alerte.severity === "haute" && "text-rose-600",
                                  alerte.severity === "moyenne" && "text-amber-600",
                                  alerte.severity === "basse" && "text-blue-600"
                                )} />
                              </div>
                              <div>
                                <p className="text-xs font-medium">{alerte.message}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{alerte.site} • {alerte.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white">
                    ABC
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-5 space-y-6 max-w-md mx-auto"
      >
        {/* Section Bonjour avec météo */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <motion.p 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Bonjour, Jean 👋
            </motion.p>
            <motion.h2 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
              Content de vous revoir
            </motion.h2>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-800/50"
          >
            <Sunrise className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-xs font-medium">Paris</p>
              <p className="text-[10px] text-gray-500">18°C • Ensoleillé</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Performance Badge */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl p-4 text-white shadow-xl shadow-primary/20"
        >
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              Performance globale
            </Badge>
            <span className="text-2xl font-bold">94%</span>
          </div>
          <Progress value={94} className="h-2 bg-white/20 [&>div]:bg-white" />
          <div className="flex justify-between mt-2 text-xs text-white/80">
            <span>⬆️ +5.2% cette semaine</span>
            <span>🎯 Objectif: 95%</span>
          </div>
        </motion.div>

        {/* Stats Cards with micro charts */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 overflow-hidden relative group">
                {/* Micro chart background */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d={`M ${stat.chart.map((val, i) => `${i * 16.6},${30 - val * 0.3}`).join(' L ')}`}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-900 dark:text-white"
                    />
                  </svg>
                </div>
                <CardContent className="p-4 relative">
                  <div className="flex items-start justify-between mb-2">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
                    </motion.div>
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "text-xs font-medium px-1.5 py-0.5 rounded-full",
                        stat.change.startsWith('+') 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" 
                          : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                      )}
                    >
                      {stat.change}
                    </motion.span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar with filters */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un équipement, une agence..."
                className="w-full h-12 pl-9 pr-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-lg shadow-gray-100/50 dark:shadow-gray-900/50"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-gray-200 dark:border-gray-800">
                <Filter className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Alertes avec animations */}
        <AnimatePresence>
          {alertes.length > 0 && (
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 bg-rose-500 rounded-full animate-pulse" />
                  Alertes critiques
                </h2>
                <Badge variant="destructive" className="rounded-full px-2">{alertes.length}</Badge>
              </div>
              {alertes.map((alerte, index) => (
                <motion.div
                  key={alerte.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={cn(
                    "rounded-2xl p-4 border overflow-hidden relative",
                    alerte.severity === "haute" && "bg-gradient-to-r from-rose-50 to-rose-50/50 dark:from-rose-950/30 dark:to-rose-950/20 border-rose-200 dark:border-rose-800",
                    alerte.severity === "moyenne" && "bg-gradient-to-r from-amber-50 to-amber-50/50 dark:from-amber-950/30 dark:to-amber-950/20 border-amber-200 dark:border-amber-800",
                    alerte.severity === "basse" && "bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/20 border-blue-200 dark:border-blue-800"
                  )}
                >
                  {/* Decorative line */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    alerte.severity === "haute" && "bg-gradient-to-b from-rose-500 to-rose-600",
                    alerte.severity === "moyenne" && "bg-gradient-to-b from-amber-500 to-amber-600",
                    alerte.severity === "basse" && "bg-gradient-to-b from-blue-500 to-blue-600"
                  )} />
                  
                  <div className="flex items-start gap-3 pl-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                      className={cn(
                        "p-2 rounded-xl",
                        alerte.severity === "haute" && "bg-rose-100 dark:bg-rose-900/50",
                        alerte.severity === "moyenne" && "bg-amber-100 dark:bg-amber-900/50",
                        alerte.severity === "basse" && "bg-blue-100 dark:bg-blue-900/50"
                      )}
                    >
                      <alerte.icon className={cn(
                        "h-4 w-4",
                        alerte.severity === "haute" && "text-rose-600",
                        alerte.severity === "moyenne" && "text-amber-600",
                        alerte.severity === "basse" && "text-blue-600"
                      )} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alerte.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn(
                          "text-[10px] px-1.5 py-0",
                          alerte.severity === "haute" && "border-rose-200 text-rose-600",
                          alerte.severity === "moyenne" && "border-amber-200 text-amber-600",
                          alerte.severity === "basse" && "border-blue-200 text-blue-600"
                        )}>
                          {alerte.severity}
                        </Badge>
                        <span className="text-xs text-gray-500">{alerte.site}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{alerte.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mes Agences avec design amélioré */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Mes agences</h2>
            <Button variant="ghost" size="sm" className="text-xs text-primary h-7">
              Voir tout <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {agences.map((agence, index) => (
              <motion.div
                key={agence.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 overflow-hidden">
                  <div className="h-28 relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <img src={agence.image} alt={agence.nom} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Badge performance */}
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="absolute top-3 right-3"
                    >
                      <Badge className={cn(
                        "bg-gradient-to-r text-white border-0",
                        agence.performance.startsWith('+') 
                          ? "from-emerald-500 to-emerald-600" 
                          : "from-rose-500 to-rose-600"
                      )}>
                        {agence.performance}
                      </Badge>
                    </motion.div>
                    
                    {/* Info agence */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-semibold text-lg">{agence.nom}</p>
                      <div className="flex items-center gap-3 text-white/80 text-xs">
                        <span>{agence.equipements} équipements</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {agence.taux}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Métriques détaillées */}
                  <CardContent className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Énergie", value: agence.energie, icon: Zap, color: "text-emerald-500" },
                        { label: "Sécurité", value: agence.securite, icon: Shield, color: "text-blue-500" },
                        { label: "Confort", value: agence.confort, icon: Thermometer, color: "text-amber-500" }
                      ].map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <metric.icon className={`h-3 w-3 ${metric.color}`} />
                            <span className="text-[10px] text-gray-500">{metric.label}</span>
                          </div>
                          <div className="relative h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                              className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r ${agence.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Équipements en direct avec statuts dynamiques */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Équipements en direct</h2>
            <div className="flex gap-1">
              {["jour", "semaine", "mois"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={cn(
                    "h-7 text-xs px-2",
                    selectedPeriod === period && "bg-primary text-white"
                  )}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {equipements.map((eq, index) => (
              <motion.div
                key={eq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={cn(
                        "p-2.5 rounded-xl relative overflow-hidden",
                        eq.statut === 'optimal' && "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30",
                        eq.statut === 'attention' && "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30",
                        eq.statut === 'critique' && "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/30"
                      )}
                    >
                      <eq.icon className={cn(
                        "h-4 w-4 relative z-10",
                        eq.statut === 'optimal' && "text-emerald-600",
                        eq.statut === 'attention' && "text-amber-600",
                        eq.statut === 'critique' && "text-rose-600"
                      )} />
                      {/* Pulse animation for critical status */}
                      {eq.statut === 'critique' && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-rose-400/20 rounded-xl"
                        />
                      )}
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{eq.nom}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{eq.site}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <Badge variant="outline" className={cn(
                          "text-[8px] px-1 py-0 h-4",
                          eq.statut === 'optimal' && "border-emerald-200 text-emerald-600 bg-emerald-50/50",
                          eq.statut === 'attention' && "border-amber-200 text-amber-600 bg-amber-50/50",
                          eq.statut === 'critique' && "border-rose-200 text-rose-600 bg-rose-50/50 animate-pulse"
                        )}>
                          {eq.statut}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">{eq.temperature}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Gauge className="h-3 w-3 text-gray-400" />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">{eq.rendement}%</span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activités récentes */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Activités récentes</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
            {activites.map((activite, index) => (
              <motion.div
                key={activite.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <activite.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activite.action}</p>
                  <p className="text-xs text-gray-500">{activite.equipement} • {activite.site}</p>
                </div>
                <span className="text-xs text-gray-400">{activite.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions rapides avec design premium */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2 py-4">
          {[
            { icon: Users, label: "Équipe", color: "from-blue-400 to-blue-500", count: 12 },
            { icon: FileText, label: "Rapports", color: "from-purple-400 to-purple-500", count: 8 },
            { icon: CalendarDays, label: "Planning", color: "from-emerald-400 to-emerald-500", count: 3 },
            { icon: Settings, label: "Réglages", color: "from-gray-400 to-gray-500", count: null },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button variant="ghost" className="flex-col h-auto py-3 gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                {item.count && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary">
                    {item.count}
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Navigation Premium */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-2"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: "Accueil", id: "accueil", gradient: "from-primary to-primary/80" },
            { icon: BarChart3, label: "Statistiques", id: "stats", gradient: "from-blue-400 to-blue-500" },
            { icon: Wrench, label: "Maintenance", id: "actions", gradient: "from-amber-400 to-amber-500" },
            { icon: Users, label: "Profil", id: "profil", gradient: "from-purple-400 to-purple-500" },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center relative"
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                "h-5 w-5 transition-all",
                activeTab === item.id 
                  ? `text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text` 
                  : "text-gray-400 dark:text-gray-600"
              )} />
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                activeTab === item.id 
                  ? `text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text` 
                  : "text-gray-400 dark:text-gray-600"
              )}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default ClientDashboard;