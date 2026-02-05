import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConnections, type Connection } from "@/hooks/useConnections";
import { cn } from "@/lib/utils";
import { Check, Plus, Trash2, Edit2, X, Save } from "lucide-react";

export function ConnectionManager() {
  const {
    connections,
    activeConnectionId,
    isLoaded,
    addConnection,
    updateConnection,
    deleteConnection,
    setActiveConnection,
  } = useConnections();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    alias: "",
    host: "",
    port: "",
  });

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>;
  }

  const handleAdd = () => {
    setFormData({ alias: "", host: "localhost", port: "15702" });
    setIsAdding(true);
  };

  const handleSaveNew = () => {
    if (formData.alias && formData.host && formData.port) {
      addConnection(formData);
      setIsAdding(false);
      setFormData({ alias: "", host: "", port: "" });
    }
  };

  const handleEdit = (conn: Connection) => {
    setFormData({ alias: conn.alias, host: conn.host, port: conn.port });
    setEditingId(conn.id);
  };

  const handleUpdate = () => {
    if (editingId && formData.alias && formData.host && formData.port) {
      updateConnection(editingId, formData);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ alias: "", host: "", port: "" });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bevy Connections</CardTitle>
        <Button size="sm" onClick={handleAdd} disabled={isAdding}>
          <Plus className="mr-1 size-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Add new connection form */}
        {isAdding && (
          <div className="rounded-lg border bg-muted/50 p-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Alias</label>
                <Input
                  value={formData.alias}
                  onChange={(e) =>
                    setFormData({ ...formData, alias: e.target.value })
                  }
                  placeholder="My Server"
                  className="h-8"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Port</label>
                <Input
                  value={formData.port}
                  onChange={(e) =>
                    setFormData({ ...formData, port: e.target.value })
                  }
                  placeholder="15702"
                  className="h-8"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Host</label>
              <Input
                value={formData.host}
                onChange={(e) =>
                  setFormData({ ...formData, host: e.target.value })
                }
                placeholder="localhost"
                className="h-8"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="mr-1 size-3" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveNew}>
                <Save className="mr-1 size-3" />
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Connection list */}
        {connections.map((conn) => (
          <div
            key={conn.id}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3",
              activeConnectionId === conn.id && "border-primary bg-primary/5"
            )}
          >
            {editingId === conn.id ? (
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={formData.alias}
                    onChange={(e) =>
                      setFormData({ ...formData, alias: e.target.value })
                    }
                    placeholder="Alias"
                    className="h-7 text-sm"
                  />
                  <Input
                    value={formData.port}
                    onChange={(e) =>
                      setFormData({ ...formData, port: e.target.value })
                    }
                    placeholder="Port"
                    className="h-7 text-sm"
                  />
                </div>
                <Input
                  value={formData.host}
                  onChange={(e) =>
                    setFormData({ ...formData, host: e.target.value })
                  }
                  placeholder="Host"
                  className="h-7 text-sm"
                />
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" className="size-7" onClick={handleCancel}>
                    <X className="size-3" />
                  </Button>
                  <Button size="icon" className="size-7" onClick={handleUpdate}>
                    <Save className="size-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConnection(conn.id)}
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2",
                      activeConnectionId === conn.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30 hover:border-primary/50"
                    )}
                  >
                    {activeConnectionId === conn.id && (
                      <Check className="size-3 text-primary-foreground" />
                    )}
                  </button>
                  <div>
                    <div className="font-medium">{conn.alias}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {conn.host}:{conn.port}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7"
                    onClick={() => handleEdit(conn)}
                  >
                    <Edit2 className="size-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 text-destructive hover:text-destructive"
                    onClick={() => deleteConnection(conn.id)}
                    disabled={connections.length <= 1}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

        {connections.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No connections. Click "Add" to create one.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
