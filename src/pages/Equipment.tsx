import { HardDrive, Search, Filter, Wrench, Calendar, MapPin, ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const equipment = [
  { id: 1, name: "Climatisation centrale", site: "Paris Centre", type: "CVC", status: "ok", lastMaintenance: "15/02/2026", nextMaintenance: "15/05/2026", serial: "CLM-2024-001" },
  { id: 2, name: "Groupe électrogène GE-500", site: "Lyon Part-Dieu", type: "Énergie", status: "warning", lastMaintenance: "08/01/2026", nextMaintenance: "08/02/2026", serial: "GEL-2023-045" },
  { id: 3, name: "Ascenseur principal", site: "Marseille", type: "Élévation", status: "ok", lastMaintenance: "12/02/2026", nextMaintenance: "12/08/2026", serial: "ASC-2022-012" },
  { id: 4, name: "Système anti-incendie", site: "Bordeaux", type: "Sécurité", status: "ok", lastMaintenance: "10/02/2026", nextMaintenance: "10/08/2026", serial: "SAI-2024-008" },
  { id: 5, name: "Compresseur d'air CA-200", site: "Lille Europe", type: "Pneumatique", status: "critical", lastMaintenance: "01/12/2025", nextMaintenance: "01/02/2026", serial: "CMP-2021-033" },
  { id: 6, name: "Pompe hydraulique PH-100", site: "Nantes", type: "Hydraulique", status: "ok", lastMaintenance: "14/02/2026", nextMaintenance: "14/05/2026", serial: "PHP-2023-019" },
  { id: 7, name: "Tableau électrique TGBT", site: "Paris Centre", type: "Énergie", status: "ok", lastMaintenance: "20/01/2026", nextMaintenance: "20/07/2026", serial: "TGT-2020-002" },
  { id: 8, name: "Chaudière industrielle", site: "Lyon Part-Dieu", type: "CVC", status: "warning", lastMaintenance: "05/02/2026", nextMaintenance: "05/03/2026", serial: "CHD-2022-007" },
];

const statusMap = {
  ok: { label: "Opérationnel", className: "bg-success text-success-foreground" },
  warning: { label: "Maintenance", className: "bg-warning text-warning-foreground" },
  critical: { label: "En panne", className: "bg-destructive text-destructive-foreground" },
};

const Equipment = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Extraire les types uniques pour le filtre
  const uniqueTypes = useMemo(() => {
    const types = equipment.map(e => e.type);
    return ['all', ...new Set(types)];
  }, []);

  // Filtrage avancé
  const filtered = equipment.filter((e) => {
    const matchesSearch = 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.site.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase()) ||
      e.serial.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const selected = equipment.find((e) => e.id === selectedId);

  // Statistiques pour les badges
  const stats = useMemo(() => ({
    total: equipment.length,
    ok: equipment.filter(e => e.status === 'ok').length,
    warning: equipment.filter(e => e.status === 'warning').length,
    critical: equipment.filter(e => e.status === 'critical').length,
  }), []);

  // Vue détaillée d'un équipement
  if (selected) {
    return (
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
        {/* En-tête avec retour */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedId(null)}
            className="w-full sm:w-auto justify-start gap-2 -ml-2 sm:ml-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sm:hidden">Retour aux équipements</span>
            <span className="hidden sm:inline">Retour</span>
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {selected.name}
            </h1>
            <Badge className={`${statusMap[selected.status as keyof typeof statusMap].className} w-fit`}>
              {statusMap[selected.status as keyof typeof statusMap].label}
            </Badge>
          </div>
        </div>

        {/* Grille d'informations responsive */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
          {/* Carte Informations générales */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-muted-foreground">N° de série</span>
                <span className="text-sm sm:text-base font-medium text-foreground font-mono">
                  {selected.serial}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-muted-foreground">Type d'équipement</span>
                <span className="text-sm sm:text-base font-medium text-foreground">
                  {selected.type}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                <span className="text-xs sm:text-sm text-muted-foreground">Site d'installation</span>
                <span className="text-sm sm:text-base font-medium text-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.site}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Carte Maintenance */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Planning maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Dernière maintenance
                </span>
                <span className="text-sm sm:text-base font-medium text-foreground">
                  {selected.lastMaintenance}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Prochaine maintenance
                </span>
                <span className={`text-sm sm:text-base font-medium ${
                  new Date(selected.nextMaintenance.split('/').reverse().join('-')) < new Date() 
                    ? 'text-destructive' 
                    : 'text-foreground'
                }`}>
                  {selected.nextMaintenance}
                  {new Date(selected.nextMaintenance.split('/').reverse().join('-')) < new Date() && (
                    <AlertCircle className="h-3.5 w-3.5 inline ml-1 text-destructive" />
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="flex-1">
            <Wrench className="h-4 w-4 mr-2" />
            Planifier une maintenance
          </Button>
          <Button variant="outline" className="flex-1">
            Voir l'historique
          </Button>
        </div>
      </div>
    );
  }

  // Vue liste des équipements
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Équipements
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Inventaire et suivi technique
          </p>
        </div>
        
        {/* Badges statistiques */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Badge variant="outline" className="whitespace-nowrap">
            Total: {stats.total}
          </Badge>
          <Badge className="bg-success whitespace-nowrap">
            {stats.ok} op.
          </Badge>
          <Badge className="bg-warning whitespace-nowrap">
            {stats.warning} maint.
          </Badge>
          <Badge className="bg-destructive whitespace-nowrap">
            {stats.critical} panne
          </Badge>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher par nom, site, type ou n° série..." 
            className="pl-10 h-10 sm:h-11 text-sm"
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        
        {/* Filtres pour desktop */}
        <div className="hidden sm:flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="ok">Opérationnel</SelectItem>
              <SelectItem value="warning">Maintenance</SelectItem>
              <SelectItem value="critical">En panne</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'Tous' : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bouton filtre mobile */}
        <Button variant="outline" className="sm:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Version mobile : cartes des équipements */}
      <div className="block lg:hidden space-y-3">
        {filtered.map((e) => (
          <Card 
            key={e.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedId(e.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">{e.name}</span>
                </div>
                <Badge className={statusMap[e.status as keyof typeof statusMap].className}>
                  {statusMap[e.status as keyof typeof statusMap].label}
                </Badge>
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{e.site}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground">{e.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t">
                  <Calendar className="h-3 w-3" />
                  <span>Prochaine: {e.nextMaintenance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Aucun équipement trouvé
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
                  <th className="p-4 font-medium">Équipement</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">N° série</th>
                  <th className="p-4 font-medium">Prochaine maint.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr 
                    key={e.id} 
                    className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors" 
                    onClick={() => setSelectedId(e.id)}
                  >
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="whitespace-nowrap">{e.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {e.site}
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {e.type}
                    </td>
                    <td className="p-4">
                      <Badge className={statusMap[e.status as keyof typeof statusMap].className}>
                        {statusMap[e.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">
                      {e.serial}
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {e.nextMaintenance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Résumé mobile avec nombre de résultats */}
      <div className="text-xs text-muted-foreground text-center lg:hidden">
        {filtered.length} équipement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default Equipment;