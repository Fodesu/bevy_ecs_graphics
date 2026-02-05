const ACTIVE_CONNECTION_KEY = "bevy-active-connection";
const CONNECTIONS_KEY = "bevy-connections";

interface Connection {
  id: string;
  alias: string;
  host: string;
  port: string;
}

function loadActiveURL(): string {
  try {
    const activeId = localStorage.getItem(ACTIVE_CONNECTION_KEY);
    const stored = localStorage.getItem(CONNECTIONS_KEY);
    
    if (stored) {
      const connections: Connection[] = JSON.parse(stored);
      const active = activeId 
        ? connections.find((c) => c.id === activeId)
        : connections[0];
      if (active) {
        return `http://${active.host}:${active.port}`;
      }
    }
  } catch {
    // Fall through to default
  }
  return "http://localhost:15702";
}

export class Server {
  private static baseurl: string = loadActiveURL();

  static baseURL(): string {
    // Reload from localStorage each time to get updates
    this.baseurl = loadActiveURL();
    return this.baseurl;
  }
  
  static setbaseURL(url: string) {
    this.baseurl = url;
  }
}
