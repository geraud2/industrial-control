import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  HardDrive,
  CalendarDays,
  BarChart3,
  UserCircle,
  Wrench,
  LogOut,
  Menu,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  Home,
  MapPin,
  Settings,
  FileText,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard, mobileIcon: Home },
  { to: "/client/agencies", label: "Mes Agences", icon: Building2, mobileIcon: MapPin },
  { to: "/client/equipment", label: "Mes Équipements", icon: HardDrive, mobileIcon: HardDrive },
  { to: "/client/planning", label: "Planning", icon: CalendarDays, mobileIcon: Calendar },
  { to: "/client/reports", label: "Rapports", icon: BarChart3, mobileIcon: FileText },
  { to: "/client/account", label: "Mon Compte", icon: UserCircle, mobileIcon: Settings },
];

// Items pour la navigation mobile (bottom bar) - on garde les plus importants
const mobileNavItems = [
  { to: "/client/dashboard", label: "Accueil", icon: Home },
  { to: "/client/agencies", label: "Sites", icon: MapPin },
  { to: "/client/planning", label: "Planning", icon: Calendar },
  { to: "/client/reports", label: "Rapports", icon: FileText },
  { to: "/client/account", label: "Profil", icon: UserCircle },
];

const ClientLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Détection de la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
        setShowMobileMenu(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileOpen || showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen, showMobileMenu]);

  const handleLogout = () => {
    navigate("/login");
  };

  // Récupérer le titre de la page courante
  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(item => 
      location.pathname.includes(item.to)
    );
    return currentItem?.label || "Dashboard";
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Overlay mobile pour le menu latéral */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Overlay pour le menu mobile du bas (quand déplié) */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Sidebar - cachée sur mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden md:flex flex-col bg-primary transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand avec toggle pour desktop */}
        <div className={`flex h-16 items-center border-b border-sidebar-border px-4 ${
          sidebarCollapsed ? "justify-center" : "gap-2"
        }`}>
          <div className="rounded-md bg-primary-foreground p-1.5 shrink-0">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm lg:text-base font-bold text-primary-foreground leading-tight truncate">
                1ER GEIR
              </span>
              <span className="flex items-center gap-1 text-[8px] lg:text-[10px] text-sidebar-foreground/70 uppercase tracking-wider">
                <Eye className="h-2.5 w-2.5 lg:h-3 lg:w-3" /> 
                <span className="truncate">Portail Client</span>
              </span>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="rounded-md bg-primary-foreground p-1.5">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          )}

          {/* Bouton toggle desktop */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation desktop */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-sidebar-border">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  sidebarCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer desktop */}
        <div className="border-t border-sidebar-border p-3">
          {!sidebarCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8 border-2 border-sidebar-accent">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm">
                    ABC
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    Entreprise ABC
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">
                    contact@abc.fr
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center rounded-md p-2.5 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
              title="Déconnexion"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 md:ml-0 pb-16 md:pb-0">
        {/* Top bar - visible uniquement sur desktop */}
        <header className="sticky top-0 z-30 hidden md:flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4">
          {/* Menu mobile button - caché sur desktop */}
          <button
            className="text-foreground hover:text-primary transition-colors md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb pour desktop */}
          <nav className="hidden md:flex items-center text-sm text-muted-foreground flex-1">
            <span>Portail Client</span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-foreground font-medium">{getCurrentPageTitle()}</span>
          </nav>

          {/* Actions rapides */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Profil utilisateur - version desktop */}
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-primary">Client</span>
              <span className="text-border">|</span>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  ABC
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground hidden lg:inline">Entreprise ABC</span>
            </div>

            {/* Menu utilisateur mobile - bouton avec badge */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full md:hidden">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      ABC
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>Entreprise ABC</span>
                    <span className="text-xs text-muted-foreground">contact@abc.fr</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/client/account")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Mon compte</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Bottom Navigation Bar - Style application mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
          <div className="flex items-center justify-around h-16">
            {mobileNavItems.map((item) => {
              const isActive = location.pathname.includes(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.label === "Planning" && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
                    )}
                  </div>
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </NavLink>
              );
            })}
            
            {/* Bouton "Plus" pour ouvrir le menu complet */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="h-5 w-5" />
              <span className="text-[10px] mt-1 font-medium">Plus</span>
            </button>
          </div>
        </nav>

        {/* Menu mobile complet (quand on clique sur "Plus") */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="bg-card rounded-t-xl border border-border shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-foreground">Menu complet</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1 hover:bg-muted rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  {navItems.map((item) => {
                    const isActive = location.pathname.includes(item.to);
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-6 w-6 mb-1" />
                        <span className="text-xs text-center">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLayout;