import { Button } from "./ui/button";

import { SearchIcon } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="bg-background relative top-0 z-50 w-full h-16 flex items-center border-b">
      <div className="flex w-full gap-4 items-center justify-between">
        <SidebarTrigger className="h-full" />
        <Button variant="outline" className="rounded-full h-1/2">
          <SearchIcon />
          <div className="text-gray-500 text-xs/3">Ctrl K</div>
        </Button>
        <Button variant="outline" className="text-xs">
          B
        </Button>
      </div>
    </header>
  );
}
