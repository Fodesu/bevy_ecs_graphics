import type { RouteObject } from "react-router";

function Settings() {
  return <div>This is Settings Page</div>;
}

export const settingsObject: RouteObject = {
  path: "settings",
  element: <Settings />,
};
