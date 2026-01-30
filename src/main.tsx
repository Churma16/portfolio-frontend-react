import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {Toaster} from "sonner";

// 1. Import dari React Query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// 2. Import ApiProvider
import {ApiProvider} from "@/contexts/ApiContext";

// 3. Buat instance client-nya
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* 👇 QueryProvider MUST be the parent */}
        <QueryClientProvider client={queryClient}>
            {/* 👇 ApiProvider is the child */}
            <ApiProvider>
                <App/>
                <Toaster richColors position="top-right"/>
            </ApiProvider>
        </QueryClientProvider>
    </StrictMode>
);
