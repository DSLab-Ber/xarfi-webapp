import MyBookings from '@/components/user/my-bookings/MyBookings'
import { Metadata } from 'next';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: "My Booking",
  description: "",
};

function page({ }: Props) {
    return (
        <MyBookings />
    )
}

export default page