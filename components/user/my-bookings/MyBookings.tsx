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

const BookingCard = ({ index, activeTab }: any) => {
    const [notify, setNotify] = useState(false)
    const [favourite, setFavourite] = useState(false)
    return (

        <div className='p-[15px] border border-[#ACACAC] rounded-2xl flex justify-between'>
            <Link href={`/my-bookings/${1}`}>
                <div className='grid gap-[9px]'>
                    <div>
                        <h4 className='font-urbanist font-bold md:text-[18px] text-base leading-[130%] tracking-[0]'>Coiffeur bei Yousef</h4>
                        <p className='flex items-center font-urbanist font-medium text-[15px] leading-[130%] tracking-[0] mb-2.5 opacity-50 max-md:hidden'><span className='w-3 inline-block mr-1.5'><LocPin width={12} /></span>Berlin, Germany | 1.2 Kms Away</p>
                    </div>
                    <div className='grid gap-[8px]'>
                        <p className='font-urbanist font-medium md:text-[15px] text-[13px] leading-[83%] tracking-[0] max-md:opacity-50'>Haircut <span>●</span> Body Massage <span>●</span> Beard Trim</p>
                        <p className='font-urbanist font-medium md:text-[15px] text-[13px] leading-[130%] tracking-[0]'>7 May 2025 at 2:00 PM  <span>●</span> <span className='!text-[#FF8C26] font-bold'>€ 60</span></p>
                    </div>
                </div>
            </Link>
            {activeTab === 'Upcoming' ?
                <div className='flex flex-col justify-between items-end'>
                    <div className='flex flex-col items-center gap-[5px] cursor-pointer' onClick={() => {
                        setNotify(!notify)
                    }}>
                        <BellIconFilled fillColor={notify ? '#FF8C26' : 'currentColor'} />
                        <p className={`font-urbanist font-semibold text-[11px] leading-[83%] max-md:hidden tracking-[0] ${notify ? "!text-[#FF8C26]" : ''}`}>Notify Me</p>
                    </div>
                    <Reschedule>
                        <button disabled={index % 2 !== 0} className={`bg-xarfi-orange py-[9px] md:px-3 px-2.5 rounded-[4px] !text-white disabled:!bg-[#777777] disabled:!cursor-not-allowed font-urbanist font-medium md:text-[14px] text-xs leading-[83%] tracking-[0]`}
                        >
                            Reschedule
                        </button>
                    </Reschedule>
                </div>
                : activeTab === 'Past' ?
                    <div className='flex flex-col justify-between items-end'>
                        <div className='flex flex-col items-center gap-[5px] cursor-pointer' onClick={() => {
                            setFavourite(!favourite)
                        }}>
                            {favourite ?
                                <HeartFilledIcon />
                                :
                                <HeartIcon />
                            }
                            <p className={`font-urbanist font-semibold text-[11px] leading-[83%] tracking-[0] max-md:hidden`}>Favorite</p>
                        </div>
                        {index % 2 !== 0 ?
                            <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0]'>
                                <RatingStar size={16} />
                                4.5
                            </div>
                            :
                            <RateDialogue>
                                <button className={`bg-[#FFC300] py-[9px] px-[8px] rounded-[4px] !text-black disabled:!bg-[#777777] disabled:!cursor-not-allowed font-urbanist font-medium md:text-[14px] text-xs leading-[83%] tracking-[0]`}
                                >
                                    Rate Service
                                </button>
                            </RateDialogue>
                        }
                    </div>
                    : activeTab === 'Favorite' ?
                        <div className='flex flex-col justify-between items-end'>
                            <div className='flex flex-col items-center gap-[5px] cursor-pointer'>
                                <HeartFilledIcon />
                                <p className={`font-urbanist font-semibold text-[11px] leading-[83%] tracking-[0] max-md:hidden`}>Favorite</p>
                            </div>
                            <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0]'>
                                <RatingStar size={16} />
                                4.5
                            </div>
                        </div> : null}
        </div>
    )
}

function MyBookings({ }: Props) {
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
                    {new Array(15).fill('').map((_, i) => (
                        <BookingCard key={i} index={i} activeTab={activeTab} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyBookings