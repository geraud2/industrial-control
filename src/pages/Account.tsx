import { UserCircle, Building2, Mail, Phone, Shield, Key, Save, Camera, Lock, Fingerprint, Globe, Clock, Calendar, Bell, Moon, Sun, Laptop, Smartphone, Tablet, ChevronRight, CheckCircle2, AlertCircle, Edit2, Copy, Download, Share2, Eye, EyeOff, Award, Sparkles, Crown, Star, LogOut, Trash2, Settings, Palette, Languages, CreditCard, FileText, History, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Données de l'utilisateur
  const user = {
    name: "Jean-Pierre Martin",
    email: "jp.martin@entreprise.com",
    phone: "+33 6 12 34 56 78",
    company: "TechMaintenance SAS",
    siret: "123 456 789 00012",
    address: "15 Avenue de l'Industrie, 75012 Paris",
    role: "Administrateur",
    since: "15 Jan 2024",
    lastLogin: "15 Fév 2026 à 14:32",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070"
  };

  // Statistiques
  const stats = [
    { label: "Jours actifs", value: "412", icon: Calendar, color: "from-blue-400 to-blue-500" },
    { label: "Interventions", value: "156", icon: History, color: "from-emerald-400 to-emerald-500" },
    { label: "Sites gérés", value: "8", icon: Building2, color: "from-amber-400 to-amber-500" },
    { label: "Équipements", value: "42", icon: Shield, color: "from-purple-400 to-purple-500" },
  ];

  // Sessions actives
  const sessions = [
    { device: "Windows PC - Chrome", location: "Paris, France", ip: "192.168.1.45", active: true, icon: Laptop },
    { device: "iPhone 14 - Safari", location: "Lyon, France", ip: "192.168.1.78", active: false, icon: Smartphone },
    { device: "iPad Pro", location: "Marseille, France", ip: "192.168.1.92", active: false, icon: Tablet },
  ];

  // Activités récentes
  const activities = [
    { action: "Connexion", device: "Windows PC", location: "Paris", time: "Il y a 2h", icon: LogOut },
    { action: "Modification mot de passe", device: "iPhone", location: "Lyon", time: "Il y a 3j", icon: Key },
    { action: "Mise à jour profil", device: "iPad", location: "Marseille", time: "Il y a 5j", icon: Edit2 },
  ];

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
        {/* Header avec avatar et badges */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="relative group">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-xl">
                  JM
                </AvatarFallback>
              </Avatar>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-3 w-3" />
              </motion.button>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
                <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Compte vérifié
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <span>{user.role}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>Membre depuis {user.since}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                    >
                      <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs principales */}
        <Tabs defaultValue="general" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border w-full sm:w-auto overflow-x-auto flex-nowrap">
            <TabsTrigger value="general" className="text-xs sm:text-sm">Général</TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">Sécurité</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs sm:text-sm">Préférences</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs sm:text-sm">Activité</TabsTrigger>
          </TabsList>

          {/* Onglet Général */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Informations personnelles */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-primary" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nom complet</Label>
                    <div className="relative group">
                      <Input 
                        defaultValue={user.name}
                        className="h-9 sm:h-10 text-sm pr-20"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Modifier
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        defaultValue={user.email}
                        className="pl-9 h-9 sm:h-10 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        defaultValue={user.phone}
                        className="pl-9 h-9 sm:h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 gap-2">
                      <Save className="h-3.5 w-3.5" />
                      Enregistrer
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Informations entreprise */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nom de l'entreprise</Label>
                    <Input 
                      defaultValue={user.company}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Numéro SIRET</Label>
                    <Input 
                      defaultValue={user.siret}
                      className="h-9 sm:h-10 text-sm font-mono"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Adresse</Label>
                    <Input 
                      defaultValue={user.address}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 gap-2">
                      <Save className="h-3.5 w-3.5" />
                      Enregistrer
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Mot de passe */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    Changer le mot de passe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-9 sm:h-10 text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nouveau mot de passe</Label>
                    <Input 
                      type="password"
                      placeholder="Minimum 8 caractères"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-xs">Confirmer le mot de passe</Label>
                    <Input 
                      type="password"
                      placeholder="Retapez votre nouveau mot de passe"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>

                  {/* Force du mot de passe */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Force du mot de passe</span>
                      <span className="font-medium text-emerald-600">Forte</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>

                  <Button className="w-full gap-2">
                    <Key className="h-4 w-4" />
                    Mettre à jour le mot de passe
                  </Button>
                </CardContent>
              </Card>

              {/* Authentification à deux facteurs */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Authentification à deux facteurs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Activer la 2FA</p>
                      <p className="text-xs text-muted-foreground">
                        Renforcez la sécurité de votre compte
                      </p>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>

                  {twoFactorEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 pt-2"
                    >
                      <div className="p-3 bg-primary/5 rounded-lg flex items-center gap-3">
                        <Fingerprint className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Méthode par défaut</p>
                          <p className="text-xs text-muted-foreground">Application d'authentification</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurer la 2FA
                      </Button>
                    </motion.div>
                  )}

                  <Separator />

                  {/* Sessions actives */}
                  <div>
                    <p className="text-sm font-medium mb-3">Sessions actives</p>
                    {sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-muted rounded-lg">
                            <session.icon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{session.device}</p>
                            <p className="text-[10px] text-muted-foreground">{session.location}</p>
                          </div>
                        </div>
                        {session.active ? (
                          <Badge className="bg-emerald-500 text-white text-[8px] px-1.5">
                            Actif
                          </Badge>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            Déconnecter
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Préférences */}
          <TabsContent value="preferences" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  Préférences utilisateur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Recevoir des alertes par email
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                {/* Thème sombre */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {darkMode ? (
                        <Moon className="h-4 w-4 text-primary" />
                      ) : (
                        <Sun className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mode sombre</p>
                      <p className="text-xs text-muted-foreground">
                        Activer le thème sombre
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                {/* Langue */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Langue</p>
                      <p className="text-xs text-muted-foreground">
                        Français (par défaut)
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Changer
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                {/* Fuseau horaire */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fuseau horaire</p>
                      <p className="text-xs text-muted-foreground">
                        Europe/Paris (UTC+1)
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Activité */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.device} • {activity.location}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Voir plus d'activités
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            Dernière connexion : {user.lastLogin}
          </p>
          <div className="flex gap-2 order-1 sm:order-2">
            <Button variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
            <Button variant="destructive" size="sm" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;