import { useMethods } from "@/hooks/useMethods";
import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, ChevronRight, Box } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Methods() {
  const { data, isError, isLoading, error, refetch } = useMethods();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMethods = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((method) => method.name.toLowerCase().includes(query));
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center gap-2 text-muted-foreground">
        <Spinner className="size-5" />
        <span>Loading methods...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="text-destructive font-medium">
          Error: {error?.message || "Failed to load methods"}
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="mr-2 size-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search methods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          title="Refresh"
        >
          <RefreshCw className="size-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 pl-3 text-sm text-muted-foreground">
        <Box className="size-4" />
        <span>
          {filteredMethods.length} {filteredMethods.length === 1 ? "method" : "methods"}
          {searchQuery && ` (filtered from ${data?.length || 0})`}
        </span>
      </div>

      {/* Methods List */}
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="divide-y">
          {filteredMethods.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              {searchQuery ? "No methods match your search" : "No methods available"}
            </div>
          ) : (
            filteredMethods.map((method) => (
              <MethodItem key={method.name} method={method} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface MethodItemProps {
  method: {
    name: string;
    params: unknown[];
  };
}

function MethodItem({ method }: MethodItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
          "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-sm font-medium">{method.name}</span>
          <span className="text-xs text-muted-foreground">
            {method.params.length} {method.params.length === 1 ? "param" : "params"}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      {isExpanded && method.params.length > 0 && (
        <div className="bg-muted/50 px-4 py-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Parameters
          </div>
          <pre className="overflow-x-auto rounded bg-background p-2 text-xs font-mono">
            {JSON.stringify(method.params, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
