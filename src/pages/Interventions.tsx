import { ClipboardList, Camera, MessageSquare, CheckCircle2, Calendar, MapPin, User, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const interventions = [
  { id: 1, title: "Réparation climatisation", site: "Paris Centre", tech: "J. Martin", date: "23/02/2026", status: "En cours", comment: "Compresseur à remplacer. Pièce commandée.", hasPhoto: true, priority: "haute" },
  { id: 2, title: "Maintenance groupe électrogène", site: "Lyon Part-Dieu", tech: "A. Dupont", date: "22/02/2026", status: "En cours", comment: "Vidange et remplacement filtres en cours.", hasPhoto: false, priority: "normale" },
  { id: 3, title: "Inspection ascenseur", site: "Marseille", tech: "M. Bernard", date: "22/02/2026", status: "Terminée", comment: "RAS. Conformité validée.", hasPhoto: true, priority: "normale" },
  { id: 4, title: "Réparation compresseur", site: "Lille Europe", tech: "A. Dupont", date: "21/02/2026", status: "Terminée", comment: "Remplacement vanne + joints. Test OK.", hasPhoto: true, priority: "haute" },
  { id: 5, title: "Maintenance préventive chaudière", site: "Lyon Part-Dieu", tech: "S. Petit", date: "20/02/2026", status: "Terminée", comment: "Nettoyage brûleur, contrôle sécurité.", hasPhoto: false, priority: "normale" },
  { id: 6, title: "Calibration capteurs", site: "Nantes", tech: "J. Martin", date: "19/02/2026", status: "Terminée", comment: "Tous les capteurs recalibrés. Valeurs conformes.", hasPhoto: false, priority: "basse" },
  { id: 7, title: "Dépannage urgence ascenseur", site: "Bordeaux", tech: "M. Bernard", date: "23/02/2026", status: "En cours", comment: "Problème de verrouillage de porte.", hasPhoto: true, priority: "urgente" },
];

const statusStyle: Record<string, string> = {
  "En cours": "bg-warning text-warning-foreground",
  "Terminée": "bg-success text-success-foreground",
  "Planifiée": "bg-secondary text-secondary-foreground",
};

const priorityStyle: Record<string, string> = {
  "urgente": "bg-destructive text-destructive-foreground",
  "haute": "bg-orange-500 text-white",
  "normale": "bg-blue-500 text-white",
  "basse": "bg-muted text-muted-foreground",
};

const Interventions = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState("all");

  // Filtrage des interventions
  const filteredInterventions = useMemo(() => {
    return interventions.filter((intervention) => {
      const matchesSearch = 
        intervention.title.toLowerCase().includes(search.toLowerCase()) ||
        intervention.site.toLowerCase().includes(search.toLowerCase()) ||
        intervention.tech.toLowerCase().includes(search.toLowerCase()) ||
        intervention.comment.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || intervention.status === statusFilter;
      const matchesTab = selectedTab === "all" || 
        (selectedTab === "en-cours" && intervention.status === "En cours") ||
        (selectedTab === "terminees" && intervention.status === "Terminée");
      
      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [search, statusFilter, selectedTab]);

  // Statistiques
  const stats = useMemo(() => ({
    total: interventions.length,
    enCours: interventions.filter(i => i.status === "En cours").length,
    terminees: interventions.filter(i => i.status === "Terminée").length,
    avecPhotos: interventions.filter(i => i.hasPhoto).length,
  }), []);

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Interventions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Suivi des missions techniciens
          </p>
        </div>
        
        {/* Badges statistiques */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Badge variant="outline" className="whitespace-nowrap">
            Total: {stats.total}
          </Badge>
          <Badge className="bg-warning whitespace-nowrap">
            {stats.enCours} en cours
          </Badge>
          <Badge className="bg-success whitespace-nowrap">
            {stats.terminees} terminées
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap">
            📸 {stats.avecPhotos}
          </Badge>
        </div>
      </div>

      {/* Tabs pour mobile/desktop */}
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="en-cours">En cours</TabsTrigger>
          <TabsTrigger value="terminees">Terminées</TabsTrigger>
        </TabsList>

        {/* Barre de recherche et filtres */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Rechercher une intervention..." 
              className="pl-10 h-10 sm:h-11 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <Filter className="h-4 w-4 mr-2 sm:mr-0" />
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Terminée">Terminée</SelectItem>
              <SelectItem value="Planifiée">Planifiée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des interventions pour chaque onglet */}
        <TabsContent value={selectedTab} className="mt-4">
          <div className="space-y-4">
            {filteredInterventions.map((intervention) => (
              <Card 
                key={intervention.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  {/* Version mobile */}
                  <div className="block sm:hidden p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-base">
                        {intervention.title}
                      </h3>
                      <Badge className={statusStyle[intervention.status]}>
                        {intervention.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{intervention.site}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        <span>{intervention.tech}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{intervention.date}</span>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2 text-sm">
                        <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{intervention.comment}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {intervention.hasPhoto && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Camera className="h-4 w-4" />
                            <span>Photo</span>
                          </div>
                        )}
                        <Badge className={priorityStyle[intervention.priority]}>
                          {intervention.priority}
                        </Badge>
                      </div>
                      
                      {intervention.status === "En cours" && (
                        <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                          <CheckCircle2 className="mr-1.5 h-4 w-4" />
                          Valider
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Version desktop */}
                  <div className="hidden sm:block p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Contenu principal */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground text-lg">
                            {intervention.title}
                          </h3>
                          <Badge className={priorityStyle[intervention.priority]}>
                            {intervention.priority}
                          </Badge>
                          <Badge className={statusStyle[intervention.status]}>
                            {intervention.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{intervention.site}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{intervention.tech}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{intervention.date}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-sm bg-muted/30 rounded-lg p-3">
                          <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{intervention.comment}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-2">
                        {intervention.hasPhoto && (
                          <Button variant="outline" size="sm" className="whitespace-nowrap">
                            <Camera className="h-4 w-4 mr-2" />
                            Voir photo
                          </Button>
                        )}
                        
                        {intervention.status === "En cours" && (
                          <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground whitespace-nowrap">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Terminer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredInterventions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Aucune intervention trouvée</p>
                  <p className="text-sm">Modifiez vos filtres pour voir plus de résultats</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination simple */}
      {filteredInterventions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            {filteredInterventions.length} intervention{filteredInterventions.length > 1 ? 's' : ''} trouvée{filteredInterventions.length > 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" disabled>
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interventions;