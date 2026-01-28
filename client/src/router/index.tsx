import { Outlet, type RouteObject } from "react-router";

export const indexObject: RouteObject = {
  path: "/",
  element: <Index />,
};

function Index() {
  return (
    <div className="bg-background relative flex w-full h-full">
      <Outlet />
    </div>
  );
}
