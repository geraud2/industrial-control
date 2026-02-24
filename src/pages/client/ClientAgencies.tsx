import { Building2, MapPin, Phone, Wrench, Calendar, AlertTriangle, CheckCircle2, Clock, ArrowRight, Search, Filter, MoreVertical, Eye, Droplets, Zap, Thermometer, Users, HardDrive, Activity, TrendingUp, Gauge, Shield, Settings, Mail, Globe, Clock3, BarChart3, PieChart, Download, Share2, Star, MessageSquare, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Données enrichies
const agencies = [
  { 
    id: 1, 
    name: "Paris Centre", 
    address: "12 Rue de Rivoli, 75001 Paris", 
    phone: "+33 1 42 00 00 00",
    email: "paris.centre@abc.fr",
    equipments: 18, 
    status: "ok", 
    lastMaintenance: "15/02/2026",
    nextMaintenance: "15/03/2026",
    responsable: "Jean Dupont",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    performance: 98,
    energie: 94,
    securite: 100,
    confort: 96,
    alertes: 0,
    equipementsList: [
      { id: 1, name: "Climatisation centrale", status: "ok", lastCheck: "14/02/2026", nextCheck: "14/03/2026", type: "CTA", consommation: "2.4 kW", rendement: 94 },
      { id: 2, name: "Groupe électrogène", status: "ok", lastCheck: "12/02/2026", nextCheck: "12/03/2026", type: "Générateur", consommation: "0 kW", rendement: 98 },
      { id: 3, name: "Ascenseur A", status: "ok", lastCheck: "10/02/2026", nextCheck: "10/03/2026", type: "Ascenseur", cycles: 1234, rendement: 96 },
      { id: 4, name: "Chaufferie", status: "ok", lastCheck: "08/02/2026", nextCheck: "08/03/2026", type: "Chaudière", pression: "1.8 bar", rendement: 92 },
    ]
  },
  { 
    id: 2, 
    name: "Lyon Part-Dieu", 
    address: "45 Bd Vivier Merle, 69003 Lyon", 
    phone: "+33 4 72 00 00 00",
    email: "lyon@abc.fr",
    equipments: 14, 
    status: "warning", 
    lastMaintenance: "08/02/2026",
    nextMaintenance: "08/03/2026",
    responsable: "Marie Martin",
    image: "https://images.unsplash.com/photo-1545259741-2c3e3d4b4b0a?q=80&w=2070",
    performance: 85,
    energie: 82,
    securite: 95,
    confort: 88,
    alertes: 1,
    equipementsList: [
      { id: 5, name: "Climatisation", status: "warning", lastCheck: "07/02/2026", nextCheck: "07/03/2026", type: "CTA", consommation: "3.1 kW", rendement: 78, alerte: "Filtre à changer" },
      { id: 6, name: "Groupe électrogène", status: "critical", lastCheck: "05/02/2026", nextCheck: "05/03/2026", type: "Générateur", temperature: "38°C", rendement: 72, alerte: "Surchauffe" },
      { id: 7, name: "Ascenseur B", status: "ok", lastCheck: "09/02/2026", nextCheck: "09/03/2026", type: "Ascenseur", cycles: 856, rendement: 95 },
    ]
  },
  { 
    id: 3, 
    name: "Lille Europe", 
    address: "100 Rue de Tournai, 59000 Lille", 
    phone: "+33 3 20 00 00 00",
    email: "lille@abc.fr",
    equipments: 12, 
    status: "critical", 
    lastMaintenance: "01/02/2026",
    nextMaintenance: "01/03/2026",
    responsable: "Pierre Dubois",
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070",
    performance: 72,
    energie: 68,
    securite: 85,
    confort: 75,
    alertes: 2,
    equipementsList: [
      { id: 8, name: "Chaufferie", status: "critical", lastCheck: "01/02/2026", nextCheck: "01/03/2026", type: "Chaudière", pression: "2.4 bar", rendement: 65, alerte: "Pression trop élevée" },
      { id: 9, name: "Ascenseur C", status: "warning", lastCheck: "02/02/2026", nextCheck: "02/03/2026", type: "Ascenseur", cycles: 2341, rendement: 82, alerte: "Bruit anormal" },
    ]
  },
  { 
    id: 4, 
    name: "Nantes Atlantique", 
    address: "3 Allée Baco, 44000 Nantes", 
    phone: "+33 2 40 00 00 00",
    email: "nantes@abc.fr",
    equipments: 8, 
    status: "ok", 
    lastMaintenance: "14/02/2026",
    nextMaintenance: "14/03/2026",
    responsable: "Sophie Lefevre",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
    performance: 97,
    energie: 96,
    securite: 98,
    confort: 95,
    alertes: 0,
    equipementsList: [
      { id: 10, name: "Climatisation", status: "ok", lastCheck: "13/02/2026", nextCheck: "13/03/2026", type: "CTA", consommation: "1.9 kW", rendement: 97 },
      { id: 11, name: "Ascenseur D", status: "ok", lastCheck: "12/02/2026", nextCheck: "12/03/2026", type: "Ascenseur", cycles: 567, rendement: 98 },
    ]
  },
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
    label: "Incident", 
    className: "bg-gradient-to-r from-rose-500 to-rose-600 text-white",
    icon: AlertTriangle,
    color: "rose"
  },
};

const ClientAgencies = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  
  const agency = agencies.find((a) => a.id === selected);
  
  // Filtrer les agences
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || agency.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  if (agency) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 pb-20"
      >
        {/* Header avec image de fond */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img src={agency.image} alt={agency.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
          </motion.div>
          
          {/* Bouton retour */}
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(null)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white rounded-xl px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux agences
          </motion.button>
          
          {/* Info agence */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{agency.name}</h1>
                <p className="text-sm text-white/80">{agency.address}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Stats cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Équipements", value: agency.equipments, icon: HardDrive, color: "from-blue-400 to-blue-500" },
              { label: "Performance", value: `${agency.performance}%`, icon: TrendingUp, color: "from-emerald-400 to-emerald-500" },
              { label: "Dernière maintenance", value: agency.lastMaintenance, icon: Calendar, color: "from-purple-400 to-purple-500" },
              { label: "Alertes", value: agency.alertes, icon: AlertTriangle, color: "from-rose-400 to-rose-500" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                  <CardContent className="p-6">
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

          {/* Informations de contact */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Adresse</p>
                      <p className="text-sm font-medium">{agency.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                      <Phone className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Téléphone</p>
                      <p className="text-sm font-medium">{agency.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <Mail className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{agency.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs pour les différentes sections */}
          <Tabs defaultValue="equipements" className="space-y-4">
            <TabsList className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border">
              <TabsTrigger value="equipements">Équipements</TabsTrigger>
              <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
              <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
            </TabsList>

            <TabsContent value="equipements" className="space-y-4">
              {/* Liste des équipements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agency.equipementsList.map((eq, index) => (
                  <motion.div
                    key={eq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEquipment(eq)}
                    className="cursor-pointer"
                  >
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              eq.status === 'ok' && "bg-emerald-50 dark:bg-emerald-950/30",
                              eq.status === 'warning' && "bg-amber-50 dark:bg-amber-950/30",
                              eq.status === 'critical' && "bg-rose-50 dark:bg-rose-950/30"
                            )}>
                              <Wrench className={cn(
                                "h-4 w-4",
                                eq.status === 'ok' && "text-emerald-600",
                                eq.status === 'warning' && "text-amber-600",
                                eq.status === 'critical' && "text-rose-600"
                              )} />
                            </div>
                            <div>
                              <p className="font-medium">{eq.name}</p>
                              <p className="text-xs text-muted-foreground">{eq.type}</p>
                            </div>
                          </div>
                          <Badge className={statusMap[eq.status as keyof typeof statusMap].className}>
                            {statusMap[eq.status as keyof typeof statusMap].label}
                          </Badge>
                        </div>

                        {/* Métriques selon le type */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {eq.consommation && (
                            <div className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-amber-500" />
                              <span className="text-xs">{eq.consommation}</span>
                            </div>
                          )}
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
                          {eq.cycles && (
                            <div className="flex items-center gap-2">
                              <Activity className="h-3 w-3 text-purple-500" />
                              <span className="text-xs">{eq.cycles} cycles</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs">{eq.rendement}%</span>
                          </div>
                        </div>

                        {/* Alertes éventuelles */}
                        {eq.alerte && (
                          <div className="mt-3 p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-rose-600" />
                            <span className="text-xs text-rose-600">{eq.alerte}</span>
                          </div>
                        )}

                        {/* Dates */}
                        <div className="flex justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                          <span>Dernier: {eq.lastCheck}</span>
                          <span>Prochain: {eq.nextCheck}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maintenances">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground py-8">
                    Historique des maintenances à venir...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistiques">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground py-8">
                    Graphiques de performance à venir...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Modal équipement */}
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
                className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{selectedEquipment.name}</h3>
                  <button onClick={() => setSelectedEquipment(null)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-4">Détails de l'équipement à venir...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header avec titre et actions */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Mes Agences
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {agencies.length} sites • {agencies.filter(a => a.status === 'ok').length} opérationnels
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une agence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white dark:bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 px-3 bg-white dark:bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Tous les statuts</option>
              <option value="ok">Opérationnel</option>
              <option value="warning">Maintenance</option>
              <option value="critical">Incident</option>
            </select>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <PieChart className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Grille des agences */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "grid gap-4",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {filteredAgencies.map((agency) => {
            const StatusIcon = statusMap[agency.status as keyof typeof statusMap].icon;
            const statusColor = statusMap[agency.status as keyof typeof statusMap].color;
            
            return (
              <motion.div
                key={agency.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(agency.id)}
                className="cursor-pointer group"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white dark:bg-gray-900">
                  {/* Image d'en-tête */}
                  <div className="relative h-32 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <img src={agency.image} alt={agency.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge statut */}
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="absolute top-3 right-3"
                    >
                      <Badge className={statusMap[agency.status as keyof typeof statusMap].className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusMap[agency.status as keyof typeof statusMap].label}
                      </Badge>
                    </motion.div>
                    
                    {/* Nom de l'agence */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-semibold text-lg">{agency.name}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    {/* Informations principales */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{agency.address}</span>
                      </div>
                      
                      {/* Métriques */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <HardDrive className="h-3 w-3" />
                            <span>Équip.</span>
                          </div>
                          <p className="font-semibold">{agency.equipments}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <Activity className="h-3 w-3" />
                            <span>Perf.</span>
                          </div>
                          <p className={cn(
                            "font-semibold",
                            agency.performance >= 90 ? "text-emerald-600" :
                            agency.performance >= 80 ? "text-amber-600" : "text-rose-600"
                          )}>
                            {agency.performance}%
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Alertes</span>
                          </div>
                          <p className={cn(
                            "font-semibold",
                            agency.alertes === 0 ? "text-emerald-600" : "text-rose-600"
                          )}>
                            {agency.alertes}
                          </p>
                        </div>
                      </div>
                      
                      {/* Responsable */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {agency.responsable.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {agency.responsable}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{agency.lastMaintenance}</span>
                        </div>
                      </div>
                      
                      {/* Barre de progression des indicateurs */}
                      <div className="grid grid-cols-3 gap-1 mt-2">
                        {[
                          { value: agency.energie, color: "bg-blue-500", label: "Énergie" },
                          { value: agency.securite, color: "bg-emerald-500", label: "Sécurité" },
                          { value: agency.confort, color: "bg-amber-500", label: "Confort" }
                        ].map((metric, i) => (
                          <div key={i} className="space-y-1">
                            <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`h-full ${metric.color}`}
                              />
                            </div>
                            <p className="text-[8px] text-center text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bouton voir détails */}
                      <Button 
                        variant="ghost" 
                        className="w-full mt-2 group-hover:bg-primary/5 transition-colors"
                      >
                        Voir les détails
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientAgencies;