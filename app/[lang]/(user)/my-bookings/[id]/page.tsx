import BookingDetails from '@/components/user/my-bookings/BookingDetails'
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {
  params: any
}


export const metadata: Metadata = {
  title: "Booking Detail",
  description: "",
};


async function page({ params }: Props) {
  const { lang, id } = params; // no await needed

  let BookingDetail = null; // ✅ only pass data
  try {
    const cookieStore = cookies(); // ✅ no await
    const token = (await cookieStore).get('token')?.value
    const categoriesRes = await axios.get(
      `${process.env.API_URL}/api/booking/booking-detail/${id}?lang=${lang}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
    );
    if (categoriesRes) {
      console.log("runnnn", categoriesRes)
      BookingDetail = categoriesRes.data.data; // ✅ only pass data
    }
  } catch (err) {
    console.log("error", err)
    BookingDetail = null
  }
  return (
    <BookingDetails BookingDetail={BookingDetail} />
  )
}

export default page