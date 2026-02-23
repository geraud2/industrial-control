import { UserCircle, Building2, Shield, Mail, Phone, MapPin, Calendar, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ClientAccount = () => {
  // Données simulées du client
  const clientInfo = {
    firstName: "Marie",
    lastName: "Durand",
    email: "m.durand@entreprise-abc.com",
    phone: "+33 6 98 76 54 32",
    company: "Entreprise ABC",
    siret: "123 456 789 00012",
    address: "15 Avenue de l'Industrie, 75012 Paris",
    contract: "Maintenance Premium",
    contractStatus: "Actif",
    sites: 4,
    employees: 2,
    memberSince: "Janvier 2024",
    lastLogin: "23/02/2026 à 14:32",
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* En-tête avec avatar et informations principales */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary text-xl sm:text-2xl">
            {clientInfo.firstName[0]}{clientInfo.lastName[0]}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              {clientInfo.firstName} {clientInfo.lastName}
            </h1>
            <Badge variant="outline" className="w-fit flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Compte client
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{clientInfo.email}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{clientInfo.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grille d'informations */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        
        {/* Carte Informations personnelles */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 bg-muted/5">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <UserCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Informations personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pt-4 sm:pt-5">
            {/* Version mobile : affichage compact */}
            <div className="block lg:hidden space-y-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Prénom</p>
                    <p className="text-sm font-medium text-foreground">{clientInfo.firstName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Nom</p>
                    <p className="text-sm font-medium text-foreground">{clientInfo.lastName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground break-all">{clientInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="text-sm font-medium text-foreground">{clientInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Version desktop : champs de formulaire */}
            <div className="hidden lg:block space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Prénom</Label>
                  <Input value={clientInfo.firstName} readOnly className="bg-muted/50 h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Nom</Label>
                  <Input value={clientInfo.lastName} readOnly className="bg-muted/50 h-9" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Email</Label>
                <Input value={clientInfo.email} readOnly className="bg-muted/50 h-9" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Téléphone</Label>
                <Input value={clientInfo.phone} readOnly className="bg-muted/50 h-9" />
              </div>
            </div>

            <Separator className="my-2 lg:hidden" />
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Membre depuis {clientInfo.memberSince}</span>
              <Badge variant="outline" className="text-[10px]">
                Dernière connexion: {clientInfo.lastLogin}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Carte Entreprise */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 bg-muted/5">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Entreprise</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pt-4 sm:pt-5">
            {/* Version mobile : affichage en cartes */}
            <div className="block lg:hidden space-y-3">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Entreprise</p>
                <p className="text-base font-semibold text-foreground">{clientInfo.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">SIRET</p>
                  <p className="text-sm font-medium text-foreground font-mono">{clientInfo.siret}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Sites</p>
                  <p className="text-sm font-medium text-foreground">{clientInfo.sites} agences</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Adresse</p>
                    <p className="text-sm text-foreground">{clientInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Version desktop : champs de formulaire */}
            <div className="hidden lg:block space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Nom de l'entreprise</Label>
                <Input value={clientInfo.company} readOnly className="bg-muted/50 h-9" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Numéro SIRET</Label>
                <Input value={clientInfo.siret} readOnly className="bg-muted/50 h-9 font-mono" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Adresse</Label>
                <Input value={clientInfo.address} readOnly className="bg-muted/50 h-9" />
              </div>
            </div>

            <Separator className="my-2" />

            {/* Informations contractuelles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-muted/20 rounded-lg p-2 text-center">
                <FileText className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">Contrat</p>
                <p className="text-xs font-medium text-foreground truncate">{clientInfo.contract}</p>
              </div>
              <div className="bg-muted/20 rounded-lg p-2 text-center">
                <Shield className="h-4 w-4 mx-auto mb-1 text-success" />
                <p className="text-[10px] text-muted-foreground">Statut</p>
                <Badge variant="default" className="text-[10px] px-1 py-0 h-5">
                  {clientInfo.contractStatus}
                </Badge>
              </div>
              <div className="bg-muted/20 rounded-lg p-2 text-center sm:col-span-1">
                <Building2 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">Sites</p>
                <p className="text-xs font-medium text-foreground">{clientInfo.sites}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carte des informations complémentaires */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-xs sm:text-sm text-muted-foreground">Dernière intervention</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">22/02/2026</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-xs sm:text-sm text-muted-foreground">Prochaine maintenance</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">25/02/2026</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Tickets ouverts</span>
              <Badge variant="destructive" className="text-xs">2</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        <Button variant="outline" className="flex-1">
          <Mail className="h-4 w-4 mr-2" />
          Contacter le support
        </Button>
        <Button variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Télécharger mes documents
        </Button>
      </div>

      {/* Mention de lecture seule */}
      <p className="text-xs text-center text-muted-foreground">
        <Eye className="h-3 w-3 inline mr-1" />
        Compte en consultation seule. Pour toute modification, contactez votre administrateur.
      </p>
    </div>
  );
};

export default ClientAccount;