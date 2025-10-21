"use client"

import { useSearchParams } from "next/navigation"
import { SaloonsListing } from "./SaloonListing"

export default function SaloonsWrapper({
    longitude,
    latitude,
    lang,
}: {
    longitude: any
    latitude: any
    lang: string
}) {
    const searchParams = useSearchParams()


    return (
        <SaloonsListing lang={lang} />
    )
}
