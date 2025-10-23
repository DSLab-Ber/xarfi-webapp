"use client"
import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import { BellIconFilled, HeartFilledIcon, HeartIcon, LocPin, RatingStar } from '@/components/constants/Icons'
import Tabs from '@/components/constants/Tabs'
import { useState } from 'react'
import Reschedule from './Reschedule'
import RateDialogue from './RateDialogue'
import Link from 'next/link'

type Props = {}

export const BookingCardSkeleton = () => {
  return (
    <div className="p-[15px] border border-[#ACACAC] rounded-2xl flex justify-between animate-pulse">
      {/* Left Section */}
      <div className="w-full grid gap-[9px]">
        <div>
          <div className="h-5 bg-gray-300 rounded w-[70%] mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-[60%] mb-3"></div>
        </div>
        <div className="grid gap-[8px]">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-[80%]"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-end">
        <div className="h-6 w-6 bg-gray-300 rounded-full mb-2"></div>
        <div className="h-7 w-[90px] bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}



function MyBookingsFallBack({ }: Props) {
    const tabs = ['Upcoming', 'Past', 'Favorite']
    const [activeTab, setActiveTab] = useState('Upcoming')

    return (
        <div className='pb-[50px]'>
            <Container>
                <div className='flex gap-[15px] items-center bg-background sticky top-0 pt-[50px] pb-[30px]'>
                    <BackButton />
                    <h5 className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>My Bookings</h5>
                </div>
                <div className='max-w-[445px] w-full '>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className='grid-cols-3' />
                </div>
                <div className='mt-5 w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {new Array(4).fill('').map((_, i) => (
                        <BookingCardSkeleton key={i}/>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyBookingsFallBack