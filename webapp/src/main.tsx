import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TrpcProvider } from "./lib/trpc.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrpcProvider>
      <App />
    </TrpcProvider>
  </StrictMode>
);
