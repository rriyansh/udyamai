import { Link } from "@tanstack/react-router";
import {
  FileText,
  History,
  Home,
  PlusCircle,
  Sparkles,
  User,
} from "lucide-react";

interface BottomNavItem {
  label: string;
  to: string;
  icon: typeof Home;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "New", to: "/new", icon: PlusCircle },
  { label: "History", to: "/analyses", icon: History },
  { label: "Ask", to: "/assistant", icon: Sparkles },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Profile", to: "/profile", icon: User },
];

export function BottomNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden"
      aria-label="Bottom navigation"
      data-ocid="bottom_navigation"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-smooth"
              activeProps={{ className: "text-primary" }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground",
              }}
              activeOptions={{ exact: item.to === "/dashboard" }}
              data-ocid="bottom_nav_link"
            >
              <Icon className="size-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
