import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 1. Import dari React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. Buat instance client-nya
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
);
