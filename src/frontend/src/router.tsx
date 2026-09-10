import { AppShell } from "@/components/layout/AppShell";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/pages/LandingPage")),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: lazyRouteComponent(() => import("@/pages/OnboardingPage")),
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: lazyRouteComponent(() => import("@/pages/DashboardPage")),
});

const newAnalysisRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/new",
  component: lazyRouteComponent(() => import("@/pages/NewAnalysisPage")),
});

const myAnalysesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/analyses",
  component: lazyRouteComponent(() => import("@/pages/MyAnalysesPage")),
});

const marketRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/market",
  component: lazyRouteComponent(() => import("@/pages/MarketPage")),
});

const financeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/finance",
  component: lazyRouteComponent(() => import("@/pages/FinancePage")),
});

const schemesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/schemes",
  component: lazyRouteComponent(() => import("@/pages/SchemesPage")),
});

const whatIfRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/what-if",
  component: lazyRouteComponent(() => import("@/pages/WhatIfPage")),
});

const reportsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/reports",
  component: lazyRouteComponent(() => import("@/pages/ReportsPage")),
});

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/profile",
  component: lazyRouteComponent(() => import("@/pages/ProfilePage")),
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: lazyRouteComponent(() => import("@/pages/SettingsPage")),
});

const assistantRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/assistant",
  component: lazyRouteComponent(() => import("@/pages/AssistantPage")),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  onboardingRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    newAnalysisRoute,
    myAnalysesRoute,
    marketRoute,
    financeRoute,
    schemesRoute,
    whatIfRoute,
    reportsRoute,
    profileRoute,
    settingsRoute,
    assistantRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
