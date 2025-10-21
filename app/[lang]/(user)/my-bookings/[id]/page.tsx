import BookingDetails from '@/components/user/my-bookings/BookingDetails'
import { Metadata } from 'next';
import React from 'react'

type Props = {}


export const metadata: Metadata = {
  title: "Booking Detail",
  description: "",
};


function page({ }: Props) {
    return (
        <BookingDetails />
    )
}

export default page