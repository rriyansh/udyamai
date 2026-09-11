import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/lib/theme";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
        <AppInstallPrompt />
      </ToastProvider>
    </ThemeProvider>
  );
}
import { AppInstallPrompt } from "@/components/AppInstallPrompt";
