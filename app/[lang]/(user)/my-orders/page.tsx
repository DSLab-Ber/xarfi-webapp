import MyOrder from '@/components/user/my-orders/MyOrder'
import { Metadata } from 'next';
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: "My Orders",
  description: "",
};

function page({ }: Props) {
    return (
        <MyOrder />
    )
}

export default page