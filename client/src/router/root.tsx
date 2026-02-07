import type { RouteObject } from "react-router";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { settingsObject } from "./setting";
import { indexObject } from "./index";

export const rootObject: RouteObject = {
  element: <Layout />,
  children: [indexObject, settingsObject],
};

function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-mobile": "16rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main className="h-full w-full pl-[--sidebar-width]">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
