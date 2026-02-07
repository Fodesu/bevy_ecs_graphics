import { Header } from "@/components/Header";
import Methods from "@/components/methods";
import { Separator } from "@/components/ui/separator";
import { Outlet, type RouteObject } from "react-router";
import { Box, Play } from "lucide-react";

export const indexObject: RouteObject = {
  path: "/",
  element: <Index />,
};

function Index() {
  return (
    <div className="bg-background relative flex w-full h-full flex-col">
      <Header />
      <div className="flex flex-col w-full flex-1 p-6 gap-6 overflow-auto">
        {/* Section 1: RPC Discover Results */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Box className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">RPC Discover Results</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Available methods from the Bevy Remote Protocol server.
          </p>
          <Methods />
        </section>

        <Separator />

        {/* Section 2: Use Method */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Play className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Use Method</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Select a method above to execute it with custom parameters.
          </p>
          <div className="rounded-lg border bg-muted/30 p-8 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">Click on a method from the list above to start</p>
            </div>
          </div>
        </section>

        <Outlet />
      </div>
    </div>
  );
}
