"use client"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import SaloonCard, { SaloonCardSkeleton } from "@/components/constants/SaloonCard"
import { salonQueries } from "@/lib/saloonQueries"
import { useEffect, useState } from "react"
import Image from "@/components/constants/Image"

export const SaloonsListing = ({
  lang,
  longitude,
  latitude,
  isLoading,
  isFetchingNextPage,
  salons }
  : {
    lang: string;
    longitude?: number;
    latitude?: number;
    salons?: any;
    isLoading?: boolean;
    isFetchingNextPage: boolean;
  }) => {
  const [salonsList, setSalongList] = useState<any[]>([])
  useEffect(() => {
    let arr: any[] = []
    salons?.map((salon: any) => {
      if (salon) {
        arr.push(salon)
      }
    })
    setSalongList(arr)
  }, [salons?.length])
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[27px] gap-2.5 w-full">
      {salonsList.map((salon: any, i: any) => (
        <SaloonCard key={salon?._id ?? i} salon={salon} />
      ))}

      {(isLoading || isFetchingNextPage) &&
        [1, 2, 3, 4].map((n) => <SaloonCardSkeleton key={n} />)}

      {!isLoading && !salonsList?.length ?
        <div className="col-span-2 h-full py-20 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center text-center gap-3 opacity-20">
            <Image width={100} height={100} alt="empty" src={'/assets/list-empty.png'}/>
            <p className="text-xl capitalize">No Salon with given filters</p>
          </div>
        </div>
        : null}
    </div>
  )
}
