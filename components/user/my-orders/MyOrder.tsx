"use client"
import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import { BellIconFilled, LocPin } from '@/components/constants/Icons'
import Tabs from '@/components/constants/Tabs'
import React, { useState } from 'react'


const OrderCard = () => {
    return (
        <div className='p-[15px] border border-[#ACACAC] border-dashed rounded-2xl flex justify-between'>
            <div className='grid gap-[9px]'>
                <div>
                    <h4 className='font-urbanist font-bold text-[18px] leading-[130%] tracking-[0]'>Coiffeur bei Yousef</h4>
                    <p className='flex items-center font-urbanist font-medium text-[15px] leading-[130%] tracking-[0] mb-2.5 opacity-50'><span className='w-3 inline-block mr-1.5'><LocPin width={12} /></span>Berlin, Germany | 1.2 Kms Away</p>
                </div>
                <div className='grid gap-[8px]'>
                    <p className='font-urbanist font-medium text-[15px] leading-[83%] tracking-[0]'>Shaving Kit X 1</p>
                    <p className='font-urbanist font-medium text-[15px] leading-[130%] tracking-[0]'><span className='!text-[#FF8C26] font-bold'>€ 60</span></p>
                </div>
            </div>

        </div>
    )
}

function MyOrder() {
    const tabs = ['Pending', 'Collected']
    const [activeTab, setActiveTab] = useState('Pending')
    return (
        <div className='pb-[50px]'>
            <Container>
                <div className='flex gap-[15px] items-center bg-background sticky top-0 pt-[50px] pb-[30px]'>
                    <BackButton />
                    <h5 className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>My Orders</h5>
                </div>
                <div className='md:max-w-[300px] w-full '>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className='grid-cols-2 ' />
                </div>
                <div className='mt-5 w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {[new Array(15).fill("").map((_, i) => (
                        <OrderCard key={i} />
                    ))]}
                </div>
            </Container>
        </div>
    )
}

export default MyOrder