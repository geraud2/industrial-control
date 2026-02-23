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
} from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="flex min-h-screen w-full">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="rounded-md bg-primary-foreground p-1.5">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary-foreground leading-tight">1ER GEIR MAINTENANCE</span>
            <span className="flex items-center gap-1 text-[10px] text-sidebar-foreground/70 uppercase tracking-wider">
              <Eye className="h-3 w-3" /> Portail Client
            </span>
          </div>
          <button
            className="ml-auto text-sidebar-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6">
          <button
            className="text-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide text-primary">Client</span>
            <span className="mx-1 text-border">|</span>
            <UserCircle className="h-5 w-5" />
            <span>Entreprise ABC</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
