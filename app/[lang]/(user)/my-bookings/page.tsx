import MyBookings from '@/components/user/my-bookings/MyBookings'
import MyBookingsFallBack from '@/components/user/my-bookings/MyBookingsFallBack';
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {
  params: any;
}

export const metadata: Metadata = {
  title: "My Booking",
  description: "",
};


async function page({ params }: Props) {
  const { lang } = await params; // no await needed

  try {
    const cookieStore = cookies(); // ✅ no await
    const token = (await cookieStore).get('token')?.value

    let upcomingBookings:any[] = []; // ✅ only pass data
    let pastBookings:any[] = []; // ✅ only pass data
    let favoriteBookings:any[] = []; // ✅ only pass data


    return (
      <MyBookings
     
      />
    )
  } catch (err) {
    return <MyBookingsFallBack />
  }
}

export default page