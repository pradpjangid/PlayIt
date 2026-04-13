import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/_app/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Support</h1>
      </div>
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <p className="text-muted-foreground">
          Need help? Contact us at support@playit.com
        </p>
      </div>
    </div>
  );
}
