import { Link } from "@tanstack/react-router";
import {
  BadgePercent,
  FileText,
  FlaskConical,
  FolderOpen,
  Home,
  PlusCircle,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
export interface NavItem {
  label: string;
  to: string;
  icon: typeof Home;
}

export const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "New Analysis", to: "/new", icon: PlusCircle },
  { label: "My Analyses", to: "/analyses", icon: FolderOpen },
  { label: "Market", to: "/market", icon: TrendingUp },
  { label: "Finance", to: "/finance", icon: Wallet },
  { label: "Schemes", to: "/schemes", icon: BadgePercent },
  { label: "What-if", to: "/what-if", icon: FlaskConical },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Ask UdyamAI", to: "/assistant", icon: Sparkles },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
          <span className="font-display text-sm font-bold">U</span>
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          UdyamAI
        </span>
      </div>
      <nav
        className="flex-1 space-y-1 overflow-y-auto p-3"
        aria-label="Main navigation"
      >
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth"
              activeProps={{
                className: "bg-accent text-accent-foreground",
              }}
              inactiveProps={{
                className:
                  "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              }}
              activeOptions={{ exact: item.to === "/dashboard" }}
              data-ocid="sidebar_link"
            >
              <Icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} UdyamAI
        </p>
      </div>
    </aside>
  );
}
