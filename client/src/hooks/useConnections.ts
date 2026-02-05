import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "bevy-connections";
const ACTIVE_CONNECTION_KEY = "bevy-active-connection";

export interface Connection {
  id: string;
  alias: string;
  host: string;
  port: string;
}

const DEFAULT_CONNECTION: Connection = {
  id: "default",
  alias: "Bevy Server",
  host: "localhost",
  port: "15702",
};

function getDefaultConnections(): Connection[] {
  return [{ ...DEFAULT_CONNECTION }];
}

function buildURL(host: string, port: string): string {
  return `http://${host}:${port}`;
}

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeConnectionId, setActiveConnectionId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const connections = stored ? JSON.parse(stored) : getDefaultConnections();
      setConnections(connections);

      const activeId = localStorage.getItem(ACTIVE_CONNECTION_KEY);
      setActiveConnectionId(activeId || connections[0]?.id || "default");
    } catch {
      setConnections(getDefaultConnections());
      setActiveConnectionId(DEFAULT_CONNECTION.id);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when connections change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
    }
  }, [connections, isLoaded]);

  // Save active connection when it changes
  useEffect(() => {
    if (isLoaded && activeConnectionId) {
      localStorage.setItem(ACTIVE_CONNECTION_KEY, activeConnectionId);
    }
  }, [activeConnectionId, isLoaded]);

  const addConnection = useCallback((connection: Omit<Connection, "id">) => {
    const newConnection: Connection = {
      ...connection,
      id: crypto.randomUUID(),
    };
    setConnections((prev) => [...prev, newConnection]);
    return newConnection.id;
  }, []);

  const updateConnection = useCallback(
    (id: string, updates: Partial<Omit<Connection, "id">>) => {
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === id ? { ...conn, ...updates } : conn
        )
      );
    },
    []
  );

  const deleteConnection = useCallback(
    (id: string) => {
      setConnections((prev) => {
        const filtered = prev.filter((conn) => conn.id !== id);
        // If we deleted the active connection, switch to the first available
        if (id === activeConnectionId && filtered.length > 0) {
          setActiveConnectionId(filtered[0].id);
        }
        return filtered;
      });
    },
    [activeConnectionId]
  );

  const setActiveConnection = useCallback((id: string) => {
    setActiveConnectionId(id);
  }, []);

  const getActiveConnection = useCallback((): Connection | undefined => {
    return connections.find((conn) => conn.id === activeConnectionId);
  }, [connections, activeConnectionId]);

  const getActiveURL = useCallback((): string => {
    const active = getActiveConnection();
    if (active) {
      return buildURL(active.host, active.port);
    }
    return buildURL(DEFAULT_CONNECTION.host, DEFAULT_CONNECTION.port);
  }, [getActiveConnection]);

  return {
    connections,
    activeConnectionId,
    isLoaded,
    addConnection,
    updateConnection,
    deleteConnection,
    setActiveConnection,
    getActiveConnection,
    getActiveURL,
  };
}
