import { QueryClient, dehydrate } from "@tanstack/react-query"
import HydrateClient from "@/lib/HydrateClient"
import SaloonsWrapper from "./salonWrapper"
import { getCoordinates } from "@/lib/getCoordinates"
import { salonQueries } from "@/lib/saloonQueries"
import { SaloonsListing } from "./SaloonListing"

export default async function Salon({ params, searchParams }: any) {
  const { lang } = params
  const { page = 1 } = searchParams

  const { longitude, latitude } = await getCoordinates(lang)
  const queryClient = new QueryClient()

  // Prefetch data on the server
  await queryClient.prefetchQuery(salonQueries.list(lang, {
    page,
    longitude,
    latitude,
  }))

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrateClient state={dehydratedState}>
      <SaloonsListing lang={lang} longitude={longitude} latitude={latitude} />
    </HydrateClient>
  )
}
