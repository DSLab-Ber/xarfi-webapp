import SaloonDetailPage from '@/components/user/salon/SaloonDetailPage'
import axios from 'axios';
import { Metadata } from 'next'
import React from 'react'
import { cookies } from 'next/headers'
import SalonApiFallback from '@/components/user/salon/SalonApiFallback';

interface ParamTypes {
  lang: string;
  role: string;
  id: string;
}

interface PropType {
  params: ParamTypes
}

export const metadata: Metadata = {
  title: "Salon",
  description: "",
}

async function page({ params }: PropType) {
  try {
    const { lang, role, id } = params;

    // ✅ Get coords from cookies (SSR)
    const cookieStore = cookies();
    const coordsCookie = (await cookieStore).get("coords")?.value;

    let lat: number | undefined;
    let lng: number | undefined;

    if (coordsCookie) {
      try {
        const parsed = JSON.parse(coordsCookie);
        if (Array.isArray(parsed) && parsed.length === 2) {
          lat = parsed[0];
          lng = parsed[1];
        }
      } catch (e) {
        console.warn("Invalid coords cookie:", e);
      }
    }

    // ✅ Build API URL with optional lat/lng
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/salon-detail/${id}?lang=${lang}${lat ? `&latitude=${lat}` : ''}${lng ? `&longitude=${lng}` : ''}`
    );

    // ✅ Fetch from API
    const res = await axios.get(url.toString());
    const data = await res?.data?.data;

    return (
      <SaloonDetailPage lang={lang} role={role} data={data} />
    )
  } catch (error) {
    console.error(error, 'salonDetailError')
    return <SalonApiFallback />
  }
}

export default page;
