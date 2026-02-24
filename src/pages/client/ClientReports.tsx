import { Download, Calendar, Filter, Search, FileText, BarChart3, PieChart, TrendingUp, AlertTriangle, CheckCircle2, Clock, HardDrive, Building2, Wrench, Users, DownloadCloud, Printer, Mail, Share2, Eye, ChevronDown, X, FileBarChart, FileSpreadsheet, FilePieChart, Activity, Zap, Thermometer, Gauge, ArrowUpRight, ArrowDownRight, Sparkles, Award, Target, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Données enrichies
const interventions = [
  { id: 1, date: "18/02/2026", site: "Paris Centre", type: "Maintenance préventive", status: "Terminée", technicien: "Jean Martin", duree: "2h30", equipement: "Climatisation centrale", cost: "450€", satisfaction: 98 },
  { id: 2, date: "12/02/2026", site: "Lyon Part-Dieu", type: "Réparation corrective", status: "Terminée", technicien: "Marie Dubois", duree: "4h15", equipement: "Groupe électrogène", cost: "780€", satisfaction: 92 },
  { id: 3, date: "08/02/2026", site: "Lille Europe", type: "Inspection", status: "Terminée", technicien: "Pierre Lambert", duree: "1h45", equipement: "Système sécurité", cost: "320€", satisfaction: 95 },
  { id: 4, date: "01/02/2026", site: "Nantes Atlantique", type: "Maintenance préventive", status: "Terminée", technicien: "Sophie Lefevre", duree: "3h00", equipement: "Pompe hydraulique", cost: "520€", satisfaction: 97 },
  { id: 5, date: "25/01/2026", site: "Paris Centre", type: "Remplacement pièce", status: "Terminée", technicien: "Jean Martin", duree: "5h30", equipement: "Moteur ascenseur", cost: "1250€", satisfaction: 88 },
  { id: 6, date: "20/01/2026", site: "Lyon Part-Dieu", type: "Urgence", status: "Terminée", technicien: "Thomas Petit", duree: "2h00", equipement: "Fuite eau", cost: "380€", satisfaction: 94 },
  { id: 7, date: "15/01/2026", site: "Marseille", type: "Maintenance préventive", status: "Terminée", technicien: "Julie Bernard", duree: "4h00", equipement: "Chaudière", cost: "680€", satisfaction: 96 },
];

// Données pour les graphiques
const monthlyData = [
  { month: "Sep", interventions: 12, cout: 3450 },
  { month: "Oct", interventions: 15, cout: 4200 },
  { month: "Nov", interventions: 18, cout: 5100 },
  { month: "Déc", interventions: 14, cout: 3900 },
  { month: "Jan", interventions: 22, cout: 6100 },
  { month: "Fév", interventions: 19, cout: 5400 },
];

const siteStats = [
  { name: "Paris Centre", count: 28, pourcentage: 35, color: "bg-blue-500" },
  { name: "Lyon Part-Dieu", count: 22, pourcentage: 28, color: "bg-amber-500" },
  { name: "Lille Europe", count: 18, pourcentage: 23, color: "bg-emerald-500" },
  { name: "Nantes", count: 12, pourcentage: 14, color: "bg-purple-500" },
];

const typeStats = [
  { type: "Préventive", count: 32, color: "bg-blue-500" },
  { type: "Corrective", count: 18, color: "bg-amber-500" },
  { type: "Urgence", count: 8, color: "bg-rose-500" },
  { type: "Inspection", count: 22, color: "bg-emerald-500" },
];

const ClientReports = () => {
  const [period, setPeriod] = useState("3m");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("historique");

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
  const sites = [...new Set(interventions.map(i => i.site))];
  const types = [...new Set(interventions.map(i => i.type))];

  // Filtrer les interventions
  const filteredInterventions = interventions.filter(i => {
    const matchesSearch = i.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         i.equipement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSite = selectedSite === "all" || i.site === selectedSite;
    const matchesType = selectedType === "all" || i.type === selectedType;
    return matchesSearch && matchesSite && matchesType;
  });

  // Calculer les statistiques
  const stats = {
    total: interventions.length,
    coutTotal: interventions.reduce((acc, i) => acc + parseInt(i.cost.replace('€', '')), 0),
    dureeMoyenne: Math.round(interventions.reduce((acc, i) => {
      const [hours, minutes] = i.duree.replace('h', '').split('h').map(Number);
      return acc + hours + (minutes || 0) / 60;
    }, 0) / interventions.length * 10) / 10,
    satisfactionMoyenne: Math.round(interventions.reduce((acc, i) => acc + i.satisfaction, 0) / interventions.length),
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

  // Composant Filtres mobile
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

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'intervention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
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
              Rapports & Analyses
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {stats.total} interventions • {stats.coutTotal}€ coût total
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32 sm:w-40 bg-card h-9 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">30 jours</SelectItem>
                <SelectItem value="3m">3 mois</SelectItem>
                <SelectItem value="6m">6 mois</SelectItem>
                <SelectItem value="1y">1 an</SelectItem>
              </SelectContent>
            </Select>
            
            {!isMobile && (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                  <FileBarChart className="h-4 w-4" />
                  Générer
                </Button>
              </>
            )}
            
            {isMobile && (
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
        >
          {[
            { label: "Interventions", value: stats.total, icon: Wrench, color: "from-blue-400 to-blue-500", change: "+12%" },
            { label: "Coût total", value: `${stats.coutTotal}€`, icon: TrendingUp, color: "from-emerald-400 to-emerald-500", change: "+8%" },
            { label: "Durée moyenne", value: `${stats.dureeMoyenne}h`, icon: Clock, color: "from-amber-400 to-amber-500", change: "-5%" },
            { label: "Satisfaction", value: `${stats.satisfactionMoyenne}%`, icon: Award, color: "from-purple-400 to-purple-500", change: "+2%" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={cn(
                        "text-[10px] sm:text-xs mt-1",
                        stat.change.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {stat.change} vs période précédente
                      </p>
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

        {/* Tabs principales */}
        <Tabs defaultValue="apercu" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border w-full sm:w-auto overflow-x-auto flex-nowrap">
            <TabsTrigger value="apercu" className="text-xs sm:text-sm">Aperçu</TabsTrigger>
            <TabsTrigger value="historique" className="text-xs sm:text-sm">Historique</TabsTrigger>
            <TabsTrigger value="statistiques" className="text-xs sm:text-sm">Statistiques</TabsTrigger>
            <TabsTrigger value="couts" className="text-xs sm:text-sm">Coûts</TabsTrigger>
          </TabsList>

          {/* Onglet Aperçu */}
          <TabsContent value="apercu" className="space-y-4">
            {/* Graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Graphique des interventions */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Évolution des interventions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 sm:h-48 flex items-end justify-between gap-1 sm:gap-2">
                    {monthlyData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${(item.interventions / 25) * 100}%` }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                          style={{ height: `${(item.interventions / 25) * 100}%` }}
                        />
                        <span className="text-[8px] sm:text-xs text-muted-foreground">{item.month}</span>
                        <span className="text-[8px] sm:text-xs font-medium">{item.interventions}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Répartition par site */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Répartition par site
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {siteStats.map((site, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>{site.name}</span>
                        <span className="font-medium">{site.count} int.</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${site.pourcentage}%` }}
                          transition={{ delay: index * 0.1 }}
                          className={`h-full ${site.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Types d'interventions */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-primary" />
                    Types d'interventions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {typeStats.map((type, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${type.color}`} />
                        <span className="text-xs sm:text-sm flex-1">{type.type}</span>
                        <span className="text-xs sm:text-sm font-medium">{type.count}</span>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((type.count / interventions.length) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Satisfaction */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Satisfaction client
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {stats.satisfactionMoyenne}%
                    </div>
                    <Progress value={stats.satisfactionMoyenne} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Basé sur {interventions.length} interventions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Historique */}
          <TabsContent value="historique" className="space-y-4">
            {/* Filtres */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border shadow-lg space-y-3">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder={isMobile ? "Rechercher..." : "Rechercher par site, type, équipement..."}
                  className="pl-9 bg-white dark:bg-gray-900 border-0 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filtres desktop */}
              {!isMobile && (
                <div className="flex gap-3">
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

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Filtres mobile */}
              {isMobile && (
                <div className="flex gap-2">
                  <FiltersSheet />
                  <Button variant="outline" className="flex-1" onClick={() => {
                    setSelectedSite("all");
                    setSelectedType("all");
                    setSearchQuery("");
                  }}>
                    Réinitialiser
                  </Button>
                </div>
              )}
            </div>

            {/* Liste des interventions */}
            <div className="space-y-3">
              {filteredInterventions.map((intervention, index) => (
                <motion.div
                  key={intervention.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedReport(intervention)}
                  className="cursor-pointer"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Date */}
                        <div className="flex items-center gap-2 sm:min-w-[100px]">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">{intervention.date}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">{intervention.duree}</p>
                          </div>
                        </div>

                        {/* Infos principales */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-sm sm:text-base font-semibold">{intervention.equipement}</h3>
                              <p className="text-xs text-muted-foreground">{intervention.site}</p>
                            </div>
                            <Badge variant="outline" className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {intervention.status}
                            </Badge>
                          </div>

                          {/* Métadonnées */}
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                              <Wrench className="h-3 w-3" />
                              <span>{intervention.type}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>{intervention.technicien}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-primary">
                              <TrendingUp className="h-3 w-3" />
                              <span>{intervention.cost}</span>
                            </div>
                          </div>
                        </div>

                        {/* Satisfaction */}
                        <div className="flex items-center gap-2 sm:border-l sm:pl-4">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Satisfaction</p>
                            <p className="text-sm font-semibold text-primary">{intervention.satisfaction}%</p>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filteredInterventions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune intervention trouvée
                </div>
              )}
            </div>
          </TabsContent>

          {/* Onglet Statistiques */}
          <TabsContent value="statistiques">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Statistiques détaillées à venir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Coûts */}
          <TabsContent value="couts">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Analyse des coûts à venir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rapport récent */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-3 bg-primary/20 rounded-xl">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">Rapport mensuel - Février 2026</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    22 interventions • 5 400€ • 94% satisfaction
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2">
                  <Eye className="h-4 w-4" />
                  Aperçu
                </Button>
                <Button size="sm" className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-primary to-primary/80">
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal détails rapport */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedReport(null)}
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
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Détail de l'intervention</h2>
                      <p className="text-sm text-muted-foreground">{selectedReport.date}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReport(null)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Corps */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Site</p>
                    <p className="font-medium">{selectedReport.site}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Équipement</p>
                    <p className="font-medium">{selectedReport.equipement}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <Badge variant="outline">{selectedReport.type}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <Badge className="bg-emerald-500">Terminé</Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Détails techniques</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Durée</p>
                      <p className="font-medium">{selectedReport.duree}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Coût</p>
                      <p className="font-medium">{selectedReport.cost}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Technicien</p>
                      <p className="font-medium">{selectedReport.technicien}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <p className="font-medium text-primary">{selectedReport.satisfaction}%</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Actions</h3>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Exporter PDF
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Printer className="h-4 w-4" />
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

export default ClientReports;