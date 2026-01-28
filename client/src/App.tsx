import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";
import { StrictMode } from "react";
import "./index.css";

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
