import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  HardDrive,
  CalendarDays,
  ClipboardList,
  BarChart3,
  UserCircle,
  Wrench,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agencies", label: "Agences", icon: Building2 },
  { to: "/equipment", label: "Équipements", icon: HardDrive },
  { to: "/planning", label: "Planning", icon: CalendarDays },
  { to: "/interventions", label: "Interventions", icon: ClipboardList },
  { to: "/reports", label: "Rapports", icon: BarChart3 },
  { to: "/account", label: "Compte", icon: UserCircle },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter la taille de l'écran
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
    // Logique de déconnexion ici
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay avec animation */}
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
          sidebarCollapsed && !isMobile ? "justify-center" : "gap-3"
        }`}>
          {(!sidebarCollapsed || isMobile) && (
            <>
              <div className="rounded-md bg-primary-foreground p-1.5 shrink-0">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-primary-foreground truncate">
                1ER GEIR
              </span>
            </>
          )}
          
          {sidebarCollapsed && !isMobile && (
            <div className="rounded-md bg-primary-foreground p-1.5">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
          )}

          {/* Bouton fermer mobile */}
          <button
            className={`text-sidebar-foreground lg:hidden ${
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
              
              {/* Badge de notification (exemple) */}
              {item.label === "Interventions" && (
                <span className={`ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5 ${
                  sidebarCollapsed && !isMobile ? "hidden" : ""
                }`}>
                  3
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer avec infos utilisateur */}
        <div className="border-t border-sidebar-border p-3">
          {(!sidebarCollapsed || isMobile) ? (
            // Version détaillée
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8 border-2 border-sidebar-accent">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    Admin
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">
                    admin@geir.com
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
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 sm:px-6">
          {/* Menu mobile button */}
          <button
            className="text-foreground hover:text-primary transition-colors lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb (optionnel) */}
          <nav className="hidden sm:flex items-center text-sm text-muted-foreground">
            <span>Accueil</span>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-foreground font-medium">Dashboard</span>
          </nav>

          <div className="flex-1" />

          {/* Actions rapides */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <div className="h-2 w-2 bg-destructive rounded-full absolute top-2 right-2" />
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>

            {/* Profil dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profil</span>
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
          <p>© 2026 1ER GEIR MAINTENANCE</p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;