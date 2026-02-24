import { Building2, MapPin, Phone, ChevronRight, Wrench, Calendar, ArrowLeft, Search, Filter, Mail, Globe, Users, Activity, TrendingUp, AlertTriangle, CheckCircle2, Clock, Download, Share2, Star, Sparkles, Award, Eye, Gauge, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const agencies = [
  { 
    id: 1, 
    name: "Paris Centre", 
    address: "12 Rue de Rivoli, 75001 Paris", 
    phone: "+33 1 42 00 00 00",
    email: "paris.centre@geir.fr",
    equipments: 28, 
    status: "ok", 
    lastMaintenance: "15/02/2026",
    nextMaintenance: "15/03/2026",
    responsable: "Jean Martin",
    performance: 98,
    alertes: 0,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
  },
  { 
    id: 2, 
    name: "Lyon Part-Dieu", 
    address: "45 Bd Vivier Merle, 69003 Lyon", 
    phone: "+33 4 72 00 00 00",
    email: "lyon@geir.fr",
    equipments: 22, 
    status: "warning", 
    lastMaintenance: "08/02/2026",
    nextMaintenance: "08/03/2026",
    responsable: "Marie Dubois",
    performance: 85,
    alertes: 2,
    image: "https://images.unsplash.com/photo-1545259741-2c3e3d4b4b0a?q=80&w=2070"
  },
  { 
    id: 3, 
    name: "Marseille", 
    address: "8 Quai du Port, 13002 Marseille", 
    phone: "+33 4 91 00 00 00",
    email: "marseille@geir.fr",
    equipments: 18, 
    status: "ok", 
    lastMaintenance: "12/02/2026",
    nextMaintenance: "12/03/2026",
    responsable: "Pierre Lambert",
    performance: 97,
    alertes: 0,
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070"
  },
  { 
    id: 4, 
    name: "Bordeaux", 
    address: "25 Rue Georges Bonnac, 33000 Bordeaux", 
    phone: "+33 5 56 00 00 00",
    email: "bordeaux@geir.fr",
    equipments: 15, 
    status: "ok", 
    lastMaintenance: "10/02/2026",
    nextMaintenance: "10/03/2026",
    responsable: "Sophie Lefevre",
    performance: 96,
    alertes: 0,
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070"
  },
  { 
    id: 5, 
    name: "Lille", 
    address: "100 Rue de Tournai, 59000 Lille", 
    phone: "+33 3 20 00 00 00",
    email: "lille@geir.fr",
    equipments: 20, 
    status: "critical", 
    lastMaintenance: "01/02/2026",
    nextMaintenance: "01/03/2026",
    responsable: "Thomas Petit",
    performance: 72,
    alertes: 3,
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070"
  },
  { 
    id: 6, 
    name: "Nantes", 
    address: "3 Allée Baco, 44000 Nantes", 
    phone: "+33 2 40 00 00 00",
    email: "nantes@geir.fr",
    equipments: 16, 
    status: "ok", 
    lastMaintenance: "14/02/2026",
    nextMaintenance: "14/03/2026",
    responsable: "Julie Bernard",
    performance: 95,
    alertes: 0,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
  },
];

const statusMap = {
  ok: { 
    label: "Opérationnel", 
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    icon: CheckCircle2,
    dot: "bg-emerald-500"
  },
  warning: { 
    label: "Maintenance", 
    className: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    icon: AlertTriangle,
    dot: "bg-amber-500"
  },
  critical: { 
    label: "Incident", 
    className: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    icon: AlertTriangle,
    dot: "bg-rose-500"
  },
};

const detailEquipments = [
  { name: "Climatisation centrale", status: "ok", nextMaintenance: "15/03/2026", type: "CTA" },
  { name: "Groupe électrogène", status: "warning", nextMaintenance: "20/02/2026", type: "Générateur" },
  { name: "Ascenseur A", status: "ok", nextMaintenance: "01/04/2026", type: "Ascenseur" },
  { name: "Système anti-incendie", status: "ok", nextMaintenance: "10/03/2026", type: "Sécurité" },
];

const Agencies = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const agency = agencies.find((a) => a.id === selected);

  // Filtrer les agences
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || agency.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: agencies.length,
    ok: agencies.filter(a => a.status === "ok").length,
    warning: agencies.filter(a => a.status === "warning").length,
    critical: agencies.filter(a => a.status === "critical").length,
    equipments: agencies.reduce((acc, a) => acc + a.equipments, 0),
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

  // Vue détaillée d'une agence
  if (agency) {
    const StatusIcon = statusMap[agency.status as keyof typeof statusMap].icon;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        {/* En-tête avec image */}
        <div className="relative h-48 rounded-xl overflow-hidden mb-6">
          <img 
            src={agency.image} 
            alt={agency.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelected(null)}
            className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-4">
            <h1 className="text-2xl font-semibold text-white">{agency.name}</h1>
            <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {agency.address}
            </p>
          </div>

          <Badge className={cn(
            "absolute top-4 right-4",
            statusMap[agency.status as keyof typeof statusMap].className
          )}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusMap[agency.status as keyof typeof statusMap].label}
          </Badge>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Équipements", value: agency.equipements, icon: HardDrive },
            { label: "Performance", value: `${agency.performance}%`, icon: TrendingUp },
            { label: "Alertes", value: agency.alertes, icon: AlertTriangle },
            { label: "Prochaine maintenance", value: agency.nextMaintenance, icon: Calendar },
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className={cn(
                    "text-xs font-medium",
                    stat.label === "Alertes" && agency.alertes > 0 ? "text-rose-600" : "text-muted-foreground"
                  )}>
                    {stat.label === "Alertes" && agency.alertes > 0 ? `${agency.alertes} active(s)` : ""}
                  </span>
                </div>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informations de contact */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Téléphone</p>
                <p className="text-sm font-medium">{agency.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{agency.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Responsable</p>
                <p className="text-sm font-medium">{agency.responsable}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Équipements */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              Équipements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detailEquipments.map((eq, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{eq.name}</p>
                  <p className="text-xs text-muted-foreground">{eq.type}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={statusMap[eq.status as keyof typeof statusMap].className}>
                    {statusMap[eq.status as keyof typeof statusMap].label}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{eq.nextMaintenance}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Planifier
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    );
  }

  // Vue liste des agences
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Agences
          </h1>
          <p className="text-sm text-muted-foreground">
            {stats.total} sites • {stats.equipments} équipements
          </p>
        </div>
        
        <Button className="w-full sm:w-auto">
          <Building2 className="h-4 w-4 mr-2" />
          Nouvelle agence
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Opérationnel</p>
                <p className="text-xl font-semibold text-emerald-600">{stats.ok}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Maintenance</p>
                <p className="text-xl font-semibold text-amber-600">{stats.warning}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-rose-50/50 dark:bg-rose-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Incident</p>
                <p className="text-xl font-semibold text-rose-600">{stats.critical}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher une agence..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 sm:h-10 px-3 rounded-md border bg-background text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="ok">Opérationnel</option>
          <option value="warning">Maintenance</option>
          <option value="critical">Incident</option>
        </select>
      </div>

      {/* Liste des agences */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredAgencies.map((agency) => {
          const StatusIcon = statusMap[agency.status as keyof typeof statusMap].icon;
          const statusDot = statusMap[agency.status as keyof typeof statusMap].dot;
          
          return (
            <motion.div
              key={agency.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelected(agency.id)}
              className="cursor-pointer"
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${statusDot}`} />
                        <h3 className="font-medium text-foreground">{agency.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {agency.address}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <HardDrive className="h-3 w-3" />
                          <span>{agency.equipments} équipements</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{agency.lastMaintenance}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="h-3 w-3 text-primary" />
                          <span className="text-primary font-medium">{agency.performance}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={statusMap[agency.status as keyof typeof statusMap].className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusMap[agency.status as keyof typeof statusMap].label}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Agencies;