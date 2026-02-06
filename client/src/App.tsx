import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";
import { StrictMode } from "react";
import { queryClient } from "./lib/queryclient";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";

export function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
