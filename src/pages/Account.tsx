import { UserCircle, Building2, Mail, Phone, Shield, Key, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Account = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header avec retour visuel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Mon compte
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Gérez les informations de votre compte et vos préférences
          </p>
        </div>
        
        {/* Badge de statut du compte (optionnel) */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            Compte actif
          </span>
        </div>
      </div>

      {/* Grille principale */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        
        {/* Carte Informations personnelles */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 bg-muted/5">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <UserCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Informations personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pt-4 sm:pt-5">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="fullName" className="text-xs sm:text-sm">
                Nom complet
              </Label>
              <Input 
                id="fullName"
                defaultValue="Jean-Pierre Martin" 
                className="h-9 sm:h-10 text-sm"
              />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm">
                Adresse email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="email"
                  defaultValue="jp.martin@entreprise.com" 
                  type="email" 
                  className="pl-9 h-9 sm:h-10 text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="phone" className="text-xs sm:text-sm">
                Téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="phone"
                  defaultValue="+33 6 12 34 56 78" 
                  className="pl-9 h-9 sm:h-10 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <Button size="sm" className="w-full sm:w-auto">
                <Save className="h-3.5 w-3.5 mr-2" />
                Enregistrer
              </Button>
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                Annuler
              </Button>
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
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="companyName" className="text-xs sm:text-sm">
                Nom de l'entreprise
              </Label>
              <Input 
                id="companyName"
                defaultValue="TechMaintenance SAS" 
                className="h-9 sm:h-10 text-sm"
              />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="siret" className="text-xs sm:text-sm">
                Numéro SIRET
              </Label>
              <Input 
                id="siret"
                defaultValue="123 456 789 00012" 
                className="h-9 sm:h-10 text-sm font-mono"
              />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="address" className="text-xs sm:text-sm">
                Adresse
              </Label>
              <Input 
                id="address"
                defaultValue="15 Avenue de l'Industrie, 75012 Paris" 
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <Button size="sm" className="w-full sm:w-auto">
                <Save className="h-3.5 w-3.5 mr-2" />
                Enregistrer
              </Button>
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Carte Sécurité - Pleine largeur */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 bg-muted/5">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Sécurité & authentification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pt-4 sm:pt-5">
            {/* Version mobile : affichage en colonne */}
            <div className="block sm:hidden space-y-4">
              <div className="space-y-3">
                <Label htmlFor="currentPassword" className="text-xs">
                  Mot de passe actuel
                </Label>
                <Input 
                  id="currentPassword"
                  type="password" 
                  placeholder="••••••••" 
                  className="h-9 text-sm"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="newPassword" className="text-xs">
                  Nouveau mot de passe
                </Label>
                <Input 
                  id="newPassword"
                  type="password" 
                  placeholder="••••••••" 
                  className="h-9 text-sm"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-xs">
                  Confirmer le mot de passe
                </Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  className="h-9 text-sm"
                />
              </div>
              
              <div className="pt-2">
                <Button size="sm" className="w-full">
                  <Key className="h-3.5 w-3.5 mr-2" />
                  Changer le mot de passe
                </Button>
              </div>
            </div>

            {/* Version desktop : grille 2 colonnes */}
            <div className="hidden sm:block">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword-desktop" className="text-sm">
                    Mot de passe actuel
                  </Label>
                  <Input 
                    id="currentPassword-desktop"
                    type="password" 
                    placeholder="Entrez votre mot de passe actuel" 
                    className="h-10 text-sm"
                  />
                </div>
                <div className="sm:block" /> {/* Spacer */}
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword-desktop" className="text-sm">
                    Nouveau mot de passe
                  </Label>
                  <Input 
                    id="newPassword-desktop"
                    type="password" 
                    placeholder="Minimum 8 caractères" 
                    className="h-10 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword-desktop" className="text-sm">
                    Confirmer le nouveau mot de passe
                  </Label>
                  <Input 
                    id="confirmPassword-desktop"
                    type="password" 
                    placeholder="Retapez votre nouveau mot de passe" 
                    className="h-10 text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button size="default" className="w-full sm:w-auto">
                  <Key className="h-4 w-4 mr-2" />
                  Changer le mot de passe
                </Button>
              </div>
            </div>

            {/* Indicateur de force du mot de passe (optionnel) */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/10 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-foreground mb-2">
                Exigences de sécurité
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-success" />
                  Minimum 8 caractères
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Au moins une majuscule
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Au moins un chiffre
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer avec actions supplémentaires */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
        <p className="text-xs text-muted-foreground order-2 sm:order-1">
          Dernière connexion : 15 Fév 2026 à 14:32
        </p>
        <div className="flex gap-2 order-1 sm:order-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            Déconnexion
          </Button>
          <Button variant="destructive" size="sm" className="text-xs sm:text-sm">
            Supprimer le compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;