import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SIDEBAR_ITEMS, Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { type ReactNode, Suspense } from "react";

function RouteLoading() {
  return (
    <div className="space-y-4 p-6" data-ocid="route_loading">
      <div className="h-8 w-48 animate-pulse-soft rounded-lg bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((id) => (
          <div
            key={id}
            className="h-32 animate-pulse-soft rounded-2xl border border-border bg-muted/40"
          />
        ))}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <span className="font-display text-xs font-bold">U</span>
            </span>
            <span className="font-display text-base font-bold tracking-tight">
              UdyamAI
            </span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                aria-label="Open menu"
                data-ocid="mobile_menu_button"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b border-border px-4 py-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="flex-1 space-y-1 overflow-y-auto p-3"
                aria-label="Mobile navigation"
                data-ocid="mobile_menu"
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
                      data-ocid="mobile_menu_link"
                    >
                      <Icon className="size-4.5 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 pb-20 lg:pb-0">
          <Suspense fallback={<RouteLoading />}>
            {children ?? <Outlet />}
          </Suspense>
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
