/**
 * Wrapper around fecth to make requests to the API
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


const IgamingQueryClient = new QueryClient()

export const IgamingQueryProvider = ({ children }: { children : ReactNode}) => { 

    return (
        <QueryClientProvider client={IgamingQueryClient}>
            {children}
        </QueryClientProvider>
    )
}

