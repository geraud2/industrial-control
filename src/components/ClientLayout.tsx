import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  { to: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/client/agencies", label: "Mes Agences", icon: Building2 },
  { to: "/client/equipment", label: "Mes Équipements", icon: HardDrive },
  { to: "/client/planning", label: "Planning", icon: CalendarDays },
  { to: "/client/reports", label: "Rapports", icon: BarChart3 },
  { to: "/client/account", label: "Mon Compte", icon: UserCircle },
];

const ClientLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détection de la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    // Logique de déconnexion
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Overlay mobile avec animation */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-primary transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen 
            ? "translate-x-0 shadow-2xl" 
            : "-translate-x-full"
        } ${
          sidebarCollapsed && !isMobile ? "w-20" : "w-64"
        }`}
      >
        {/* Brand avec toggle pour desktop */}
        <div className={`flex h-16 items-center border-b border-sidebar-border px-4 ${
          sidebarCollapsed && !isMobile ? "justify-center" : "gap-2"
        }`}>
          <div className="rounded-md bg-primary-foreground p-1.5 shrink-0">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          
          {(!sidebarCollapsed || isMobile) && (
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

          {sidebarCollapsed && !isMobile && (
            <div className="rounded-md bg-primary-foreground p-1.5">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          )}

          {/* Bouton fermer mobile */}
          <button
            className={`text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors lg:hidden ${
              sidebarCollapsed && !isMobile ? "hidden" : "ml-auto"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Bouton toggle desktop */}
          {!isMobile && (
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
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-sidebar-border">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  sidebarCollapsed && !isMobile ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
              title={sidebarCollapsed && !isMobile ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!sidebarCollapsed || isMobile) && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer avec infos client */}
        <div className="border-t border-sidebar-border p-3">
          {(!sidebarCollapsed || isMobile) ? (
            // Version détaillée
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
            // Version réduite
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
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-3 sm:px-6">
          {/* Menu mobile button */}
          <button
            className="text-foreground hover:text-primary transition-colors lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Badge client pour mobile */}
          <Badge variant="outline" className="lg:hidden flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span className="text-xs">Client</span>
          </Badge>

          {/* Breadcrumb pour desktop */}
          <nav className="hidden lg:flex items-center text-sm text-muted-foreground">
            <span>Portail Client</span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-foreground font-medium">Dashboard</span>
          </nav>

          <div className="flex-1" />

          {/* Actions rapides */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Aide */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <HelpCircle className="h-4 w-4" />
            </Button>

            {/* Séparateur */}
            <div className="hidden sm:block h-6 w-px bg-border mx-1" />

            {/* Profil utilisateur - version desktop */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wide text-primary">Client</span>
              <span className="text-border">|</span>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  ABC
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">Entreprise ABC</span>
            </div>

            {/* Profil utilisateur - version mobile/tablet */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full lg:hidden">
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

        {/* Page content avec scroll */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer simple pour mobile */}
        <footer className="border-t border-border bg-card py-3 px-4 text-center text-xs text-muted-foreground lg:hidden">
          <p className="flex items-center justify-center gap-1">
            <Eye className="h-3 w-3" />
            Portail Client - Entreprise ABC
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ClientLayout;