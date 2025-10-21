"use client"

import { useState } from "react"
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
  type DehydratedState,
} from "@tanstack/react-query"

export default function HydrateClient({
  children,
  state,
}: {
  children: React.ReactNode
  state: DehydratedState
}) {
  const [queryClient] = useState(() => new QueryClient())

  // Hydrate client with the server-side state
  hydrate(queryClient, state)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
