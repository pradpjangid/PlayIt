import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/routes/_app/protectedRoute";

export const Route = createFileRoute("/_app")({
  component: () => (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
});