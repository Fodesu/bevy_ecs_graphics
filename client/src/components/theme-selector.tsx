import { useTheme, type Theme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeSelector() {
  const { theme: currentTheme, setTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                "hover:border-primary/50 hover:bg-accent",
                currentTheme === value
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-background"
              )}
            >
              <Icon
                className={cn(
                  "size-6",
                  currentTheme === value
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  currentTheme === value
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Select your preferred theme. System will follow your device settings.
        </p>
      </CardContent>
    </Card>
  );
}
