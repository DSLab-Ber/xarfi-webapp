"use client"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import SaloonCard, { SaloonCardSkeleton } from "@/components/constants/SaloonCard"
import { salonQueries } from "@/lib/saloonQueries"

export const SaloonsListing = ({
  lang,
  longitude,
  latitude,
  isLoading,
  salons }
  : {
    lang: string;
    longitude?: number;
    latitude?: number;
    salons?: any;
    isLoading?: boolean
  }) => {


  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[27px] gap-2.5 w-full">
      {salons.map((salon: any, i: any) => (
        <SaloonCard key={salon?._id ?? i} salon={salon} />
      ))}

      {isLoading &&
        [1, 2, 3, 4].map((n) => <SaloonCardSkeleton key={n} />)}
    </div>
  )
}
