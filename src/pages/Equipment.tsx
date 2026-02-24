import { HardDrive, Search, Filter, Wrench, Calendar, MapPin, ArrowLeft, AlertCircle, Shield, Lock, Fingerprint, Camera, Eye, Building2, Zap, Video, Activity, CheckCircle2, Clock, Download, Share2, MoreVertical, BarChart3, Cpu, Smartphone, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

// Images réalistes (remplacez ces URLs par vos vraies images)
const equipment = [
  { 
    id: 1, 
    name: "Sas antieffraction FB4", 
    site: "Paris Centre", 
    category: "Contrôle d'accès",
    status: "ok", 
    lastMaintenance: "15/02/2026", 
    nextMaintenance: "15/05/2026", 
    serial: "SES-FB4-001",
    manufacturer: "Sésame",
    description: "Sas blindé avec portique de détection métaux - Modèle dernière génération avec reconnaissance faciale intégrée.",
    alertes: 0,
    performance: 98,
    image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 2, 
    name: "Sas pare-balles FB5", 
    site: "Lyon Part-Dieu", 
    category: "Contrôle d'accès",
    status: "ok", 
    lastMaintenance: "08/01/2026", 
    nextMaintenance: "08/04/2026", 
    serial: "SES-FB5-045",
    manufacturer: "Sésame",
    description: "Protection balistique classe FB5 avec système de décompression et contrôle biométrique.",
    alertes: 0,
    performance: 97,
    image: "https://images.unsplash.com/photo-1558005530-795af63d1df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-795af63d1df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 3, 
    name: "Portique détection métaux", 
    site: "Marseille", 
    category: "Détection",
    status: "warning", 
    lastMaintenance: "12/02/2026", 
    nextMaintenance: "12/03/2026", 
    serial: "PDM-2023-012",
    manufacturer: "Sésame",
    description: "Détection haute sensibilité multi-zone avec analyse spectrale.",
    alertes: 1,
    performance: 85,
    image: "https://images.unsplash.com/photo-1558005530-897f9e7ffbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-897f9e7ffbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 4, 
    name: "Serrure électromagnétique", 
    site: "Bordeaux", 
    category: "Contrôle d'accès",
    status: "ok", 
    lastMaintenance: "10/02/2026", 
    nextMaintenance: "10/08/2026", 
    serial: "SEM-2024-008",
    manufacturer: "Sésame",
    description: "Serrure 600kg avec capteur d'effraction et alarme intégrée.",
    alertes: 0,
    performance: 99,
    image: "https://images.unsplash.com/photo-1558005530-1027ac1e6d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-1027ac1e6d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 5, 
    name: "Contrôle d'accès biométrique", 
    site: "Lille", 
    category: "Contrôle d'accès",
    status: "critical", 
    lastMaintenance: "01/12/2025", 
    nextMaintenance: "01/02/2026", 
    serial: "BIO-2024-033",
    manufacturer: "Sésame",
    description: "Reconnaissance d'empreintes et reconnaissance faciale double validation.",
    alertes: 3,
    performance: 65,
    image: "https://images.unsplash.com/photo-1558005530-529ff9c5c4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-529ff9c5c4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 6, 
    name: "Caméra surveillance 4K", 
    site: "Nantes", 
    category: "Vidéosurveillance",
    status: "ok", 
    lastMaintenance: "14/02/2026", 
    nextMaintenance: "14/05/2026", 
    serial: "CAM-2023-019",
    manufacturer: "Sésame",
    description: "Vision nocturne 50m, détection de mouvement IA et tracking automatique.",
    alertes: 0,
    performance: 96,
    image: "https://images.unsplash.com/photo-1558005530-795af63d1df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-795af63d1df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 7, 
    name: "Interphone vidéo", 
    site: "Paris Centre", 
    category: "Communication",
    status: "warning", 
    lastMaintenance: "20/01/2026", 
    nextMaintenance: "20/04/2026", 
    serial: "INT-2024-002",
    manufacturer: "Sésame",
    description: "Écran tactile 7\" avec vision nocturne et ouverture à distance.",
    alertes: 1,
    performance: 88,
    image: "https://images.unsplash.com/photo-1558005530-1027ac1e6d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-1027ac1e6d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: 8, 
    name: "Vitrage pare-balles FB5", 
    site: "Lyon", 
    category: "Protection balistique",
    status: "ok", 
    lastMaintenance: "05/02/2026", 
    nextMaintenance: "05/08/2026", 
    serial: "VIT-FB5-007",
    manufacturer: "Sésame",
    description: "Multifeuilleté anti-éclats niveau FB5 avec traitement anti-rayures.",
    alertes: 0,
    performance: 100,
    image: "https://images.unsplash.com/photo-1558005530-897f9e7ffbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    thumbnail: "https://images.unsplash.com/photo-1558005530-897f9e7ffbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
];

const statusMap = {
  ok: { 
    label: "Opérationnel", 
    className: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200/50",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500"
  },
  warning: { 
    label: "Maintenance", 
    className: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200/50",
    icon: AlertCircle,
    gradient: "from-amber-500 to-orange-500"
  },
  critical: { 
    label: "En panne", 
    className: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200/50",
    icon: AlertCircle,
    gradient: "from-rose-500 to-pink-500"
  },
};

const categoryIcons = {
  "Contrôle d'accès": Lock,
  "Détection": Fingerprint,
  "Vidéosurveillance": Camera,
  "Communication": Video,
  "Protection balistique": Shield,
};

const categoryColors = {
  "Contrôle d'accès": "from-blue-500 to-indigo-500",
  "Détection": "from-purple-500 to-pink-500",
  "Vidéosurveillance": "from-cyan-500 to-blue-500",
  "Communication": "from-orange-500 to-red-500",
  "Protection balistique": "from-slate-600 to-slate-800",
};

const Equipment = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Catégories uniques
  const uniqueCategories = useMemo(() => {
    const categories = equipment.map(e => e.category);
    return ['all', ...new Set(categories)];
  }, []);

  // Filtrage
  const filtered = equipment.filter((e) => {
    const matchesSearch = 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.site.toLowerCase().includes(search.toLowerCase()) ||
      e.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
      e.serial.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;
    const matchesTab = activeTab === "all" || e.category === activeTab;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  const selected = equipment.find((e) => e.id === selectedId);

  // Statistiques
  const stats = useMemo(() => ({
    total: equipment.length,
    ok: equipment.filter(e => e.status === 'ok').length,
    warning: equipment.filter(e => e.status === 'warning').length,
    critical: equipment.filter(e => e.status === 'critical').length,
  }), []);

  // Gestion erreur image
  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Vue détaillée
  if (selected) {
    const CategoryIcon = categoryIcons[selected.category as keyof typeof categoryIcons] || Shield;
    const StatusIcon = statusMap[selected.status as keyof typeof statusMap].icon;
    const categoryColor = categoryColors[selected.category as keyof typeof categoryColors] || "from-gray-500 to-gray-700";
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Hero Image avec overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          {!imageErrors[selected.id] ? (
            <img 
              src={selected.image} 
              alt={selected.name} 
              className="w-full h-full object-cover"
              onError={() => handleImageError(selected.id)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <CategoryIcon className="h-24 w-24 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedId(null)}
            className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" /> Exporter
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" /> Partager
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
              <Badge variant="secondary" className={cn(
                "bg-gradient-to-r text-white border-0",
                categoryColor
              )}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {selected.category}
              </Badge>
              <Badge className={cn(
                "border-0 backdrop-blur-sm",
                statusMap[selected.status as keyof typeof statusMap].className
              )}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusMap[selected.status as keyof typeof statusMap].label}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{selected.name}</h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{selected.site}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-8 relative z-10">
          {/* Stats Cards avec design moderne */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Performance", value: `${selected.performance}%`, icon: Activity, color: "from-blue-500 to-cyan-500" },
              { label: "Alertes", value: selected.alertes, icon: AlertCircle, color: "from-rose-500 to-pink-500" },
              { label: "Dernière maintenance", value: selected.lastMaintenance, icon: Calendar, color: "from-amber-500 to-orange-500" },
              { label: "Prochaine", value: selected.nextMaintenance, icon: Clock, color: "from-emerald-500 to-teal-500" },
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className={cn("h-1 w-full bg-gradient-to-r", stat.color)} />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br", stat.color, "bg-opacity-10")}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Informations détaillées */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-primary" />
                Détails techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Fabricant</p>
                    <p className="font-medium">{selected.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Numéro de série</p>
                    <p className="font-mono text-sm bg-muted/50 p-2 rounded">{selected.serial}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-muted-foreground">{selected.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions et historique */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Wrench className="h-4 w-4 mr-2" />
              Planifier une maintenance
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Voir l'historique
            </Button>
          </div>

          {/* Graphique de performance */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Tendance de performance</span>
                <Badge variant="outline" className="text-xs">30 derniers jours</Badge>
              </div>
              <div className="h-16 flex items-end gap-1">
                {[85, 88, 92, 95, 93, 97, 98].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t transition-all hover:from-primary/80"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[8px] text-muted-foreground">J{i+1}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vue liste
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="p-4 sm:p-6 space-y-6">
        {/* En-tête avec stats élégantes */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Équipements
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez et surveillez tous vos équipements de sécurité
            </p>
          </div>
          
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg">
            <HardDrive className="h-4 w-4 mr-2" />
            Nouvel équipement
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, icon: HardDrive, color: "from-blue-500 to-cyan-500" },
            { label: "Opérationnel", value: stats.ok, icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
            { label: "Maintenance", value: stats.warning, icon: AlertCircle, color: "from-amber-500 to-orange-500" },
            { label: "En panne", value: stats.critical, icon: AlertCircle, color: "from-rose-500 to-pink-500" },
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                  <div className={cn("p-2 rounded-lg bg-gradient-to-br", stat.color, "bg-opacity-10")}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recherche et filtres design */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par nom, site, fabricant..." 
                  className="pl-9 w-full bg-muted/50 border-0 focus-visible:ring-1"
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] bg-muted/50 border-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="ok">Opérationnel</SelectItem>
                    <SelectItem value="warning">Maintenance</SelectItem>
                    <SelectItem value="critical">En panne</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px] bg-muted/50 border-0">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'Toutes les catégories' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs catégories avec design amélioré */}
        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex-nowrap bg-muted/50 p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Tous
            </TabsTrigger>
            <TabsTrigger value="Contrôle d'accès" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Lock className="h-3 w-3 mr-1 sm:mr-2" />
              Accès
            </TabsTrigger>
            <TabsTrigger value="Détection" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Fingerprint className="h-3 w-3 mr-1 sm:mr-2" />
              Détection
            </TabsTrigger>
            <TabsTrigger value="Vidéosurveillance" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Camera className="h-3 w-3 mr-1 sm:mr-2" />
              Caméras
            </TabsTrigger>
            <TabsTrigger value="Communication" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Video className="h-3 w-3 mr-1 sm:mr-2" />
              Communication
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Grille responsive avec design moderne */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((eq) => {
                const StatusIcon = statusMap[eq.status as keyof typeof statusMap].icon;
                const CategoryIcon = categoryIcons[eq.category as keyof typeof categoryIcons] || Shield;
                const categoryColor = categoryColors[eq.category as keyof typeof categoryColors] || "from-gray-500 to-gray-700";
                
                return (
                  <Card 
                    key={eq.id}
                    className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                    onClick={() => setSelectedId(eq.id)}
                  >
                    {/* Image avec overlay au hover */}
                    <div className="relative h-44 overflow-hidden">
                      {!imageErrors[eq.id] ? (
                        <img 
                          src={eq.thumbnail} 
                          alt={eq.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={() => handleImageError(eq.id)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                          <CategoryIcon className="h-12 w-12 text-white/30" />
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                        <Badge className={cn(
                          "bg-gradient-to-r text-white border-0 shadow-lg",
                          categoryColor
                        )}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {eq.category}
                        </Badge>
                        
                        <Badge className={cn(
                          "border-0 shadow-lg backdrop-blur-sm",
                          statusMap[eq.status as keyof typeof statusMap].className
                        )}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusMap[eq.status as keyof typeof statusMap].label}
                        </Badge>
                      </div>

                      {/* Site */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                        <MapPin className="h-3 w-3" />
                        {eq.site}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {eq.name}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {eq.description}
                      </p>
                      
                      <Separator className="my-3" />
                      
                      {/* Infos supplémentaires */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Cpu className="h-3 w-3" />
                          {eq.manufacturer}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {eq.nextMaintenance}
                        </div>
                      </div>

                      {/* Barre de performance */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-muted-foreground">Performance</span>
                          <span className={cn(
                            "font-medium",
                            eq.performance >= 90 ? "text-emerald-600" :
                            eq.performance >= 75 ? "text-amber-600" : "text-rose-600"
                          )}>
                            {eq.performance}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              eq.performance >= 90 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                              eq.performance >= 75 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                              "bg-gradient-to-r from-rose-500 to-pink-500"
                            )}
                            style={{ width: `${eq.performance}%` }}
                          />
                        </div>
                      </div>

                      {/* Alertes */}
                      {eq.alertes > 0 && (
                        <div className="mt-3 flex items-center gap-1 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded">
                          <AlertCircle className="h-3 w-3" />
                          {eq.alertes} alerte{eq.alertes > 1 ? 's' : ''} en cours
                        </div>
                      )}

                      {/* Bouton voir détails qui apparaît au hover */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="w-full text-xs">
                          Voir détails
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {filtered.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <Search className="h-12 w-12 text-muted-foreground/30" />
                <p className="text-lg font-medium">Aucun équipement trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Essayez de modifier vos filtres ou d'effectuer une nouvelle recherche
                </p>
                <Button variant="outline" onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Equipment;