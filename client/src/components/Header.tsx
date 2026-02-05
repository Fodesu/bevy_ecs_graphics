import { Button } from "./ui/button";
import { SearchIcon, RefreshCw } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useConnection } from "@/hooks/useConnection";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export function Header() {
  const { host, port, alias, isConnected, isLoading, refetch } = useConnection();

  return (
    <header className="bg-background relative top-0 z-50 w-full h-16 flex items-center border-b">
      <div className="flex w-full gap-4 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-10 w-10" />
          
          {/* Connection Status */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-3 py-1.5">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Spinner className="size-4" />
              ) : (
                <div
                  className={cn(
                    "size-2.5 rounded-full",
                    isConnected ? "bg-green-500" : "bg-red-500"
                  )}
                />
              )}
              <span className="text-sm font-medium">{alias}</span>
            </div>
            
            <div className="h-4 w-px bg-border" />
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-mono">{host}</span>
              <span>:</span>
              <span className="font-mono">{port}</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="size-6 -mr-1"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={cn("size-3", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full h-9 gap-2">
            <SearchIcon className="size-4" />
            <div className="text-gray-500 text-xs">Ctrl K</div>
          </Button>
          <Button variant="outline" className="h-9 w-9 p-0">
            <span className="text-xs font-medium">B</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
