import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

/**
 * Renders the full App wrapped in a QueryClientProvider.
 *
 * The production entry point (main.tsx) mounts <App /> inside a
 * QueryClientProvider, but <App /> itself does not include one. Phase 3 pages
 * (Finance, Schemes) use @tanstack/react-query hooks, so tests that render
 * <App /> directly must supply the provider or those pages crash with
 * "No QueryClient set". This mirrors the production mount without touching
 * production files.
 */
export function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}
