import { useQuery } from "@tanstack/react-query";
import { Server } from "@/lib/server";
import { fetcher } from "@/api/bevy_remote";

export interface ConnectionInfo {
  host: string;
  port: string;
  alias: string;
  isConnected: boolean;
}

function parseBaseURL(url: string): { host: string; port: string } {
  try {
    const urlObj = new URL(url);
    return {
      host: urlObj.hostname,
      port: urlObj.port || "80",
    };
  } catch {
    return { host: "localhost", port: "15702" };
  }
}

export function useConnection() {
  const baseURL = Server.baseURL();
  const { host, port } = parseBaseURL(baseURL);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["connection", baseURL],
    queryFn: async () => {
      try {
        // Try to call rpc.discover to check connection
        const result = await fetcher("rpc.discover", []);
        return "result" in result;
      } catch {
        return false;
      }
    },
    retry: 1,
    refetchInterval: 5000, // Check every 5 seconds
    staleTime: 0,
  });

  const connectionInfo: ConnectionInfo = {
    host,
    port,
    alias: "Bevy Server", // Default alias, can be customized later
    isConnected: data ?? false,
  };

  return {
    ...connectionInfo,
    isLoading,
    isError,
    refetch,
  };
}
