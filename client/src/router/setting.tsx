import type { RouteObject } from "react-router";
import { ConnectionManager } from "@/components/connection-manager";
import { Separator } from "@/components/ui/separator";

function Settings() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your Bevy server connections and preferences.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Bevy Connections</h2>
        <p className="text-sm text-muted-foreground">
          Add, edit, or remove Bevy server connections. The active connection will be used for all RPC requests.
        </p>
        <ConnectionManager />
      </div>
    </div>
  );
}

export const settingsObject: RouteObject = {
  path: "settings",
  element: <Settings />,
};
