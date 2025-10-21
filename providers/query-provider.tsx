"use client";

import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query"
import { ReactNode, useState } from "react";

export default function QueryProvider({ children, dehydratedState }: { children: ReactNode; dehydratedState?: unknown }) {
  // Stable client
  const [queryClient] = useState(() => new QueryClient());
  hydrate(queryClient, dehydratedState)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
