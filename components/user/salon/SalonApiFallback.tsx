import React from 'react'
import Header from '../constants/header/header'
import { Skeleton } from '@/components/ui/skeleton'
import BackButton from '@/components/constants/BackButton'
import { InfoCircleIcon, LocationIcon, LocPin, RatingStar, ShareIcon, TimeIcon } from '@/components/constants/Icons'
import Container from '@/components/constants/Container'
import BookingPopup from '../constants/BookingPopup/BookingPopup'

type Props = {}

function SalonApiFallback({ }: Props) {
    return (
        <div className='salonDetailpage relative'>

            <div className='w-full md:aspect-[1440/432] aspect-[490/280] bg-cover bg-center bg-no-repeat relative'>
                <Skeleton className='w-full h-full' />
                <Header className='!absolute top-[24px] bg-transparent max-md:hidden' style={{
                    backdropFilter: 'blur(10px)',
                    padding: '12px'
                }} />
                <div className='w-full px-[13px] pt-[53px] justify-between flex absolute top-0 z-10'>
                    <div className='md:hidden'>
                        <BackButton />
                    </div>
                    <div className='flex flex-col gap-2.5 md:hidden'>
                        <button
                            className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
                        >
                            <ShareIcon />
                        </button>

                        <button
                            className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
                        >
                            <LocPin />
                        </button>
                    </div>
                </div>
            </div>
            <Container>
                <div className='w-full grid lg:grid-cols-[735px_1fr] grid-cols-[80%_1fr] md:py-[30px] py-[15px]'>
                    <div className=''>
                        <div className='flex items-center gap-2.5 mb-2.5'>
                            <h5 className='font-urbanist font-bold md:text-[32px] text-xl md:leading-[100%] leading-[130%] tracking-[0] mb-0 capitalize'><Skeleton className='h-[40px] w-[250px]' /></h5>
                            <button className='h-[39px] aspect-square bg-background-secondary rounded-[10px] flex items-center justify-center max-md:hidden' >
                                <ShareIcon />
                            </button>
                            <button className='h-[39px] aspect-square bg-background-secondary rounded-[10px] flex items-center justify-center text-foreground max-md:hidden'>
                                <LocPin />
                            </button>
                        </div>
                        <p className='flex items-center font-urbanist font-medium md:text-[16px] text-[14px] leading-[130%] tracking-[0] mb-2.5'><span className='w-3 inline-block mr-1.5'><LocPin width={12} /></span><Skeleton className='h-[30px] w-[80px]' /></p>
                        <div className='bg-background-secondary w-fit md:px-3.5 px-[14px] md:py-[4.5px] py-[6px] rounded-full md:mb-2.5'>
                            {/* <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0] mb-0'>Mon - Sat, 09:00 AM - 06:00 PM</p> */}
                            <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0] mb-0'>
                                <Skeleton className='h-[30px] w-[200px]' /></p>
                        </div>
                        <p className='font-urbanist font-medium text-[16px] leading-[130%] tracking-[0] !text-[#00FF5E] mb-[30px] max-md:hidden'>Next Available: 12 May 2025, 3:00 AM</p>

                    </div>
                    <div className='flex justify-end items-start'>
                        <div className='grid gap-[27px]'>
                            <div className='bg-[#16A34A] font-urbanist font-semibold md:text-[16px] text-xs leading-[130%] tracking-[0] px-[15px] py-[5px] rounded-full'>
                                Open
                            </div>
                            <div className='flex items-end flex-col gap-0.5'>
                                <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold md:text-[16px] text-[14px] leading-[84%] tracking-[0]'>
                                    <RatingStar size={16} className="max-md:w-[12px]" />
                                    <Skeleton className='h-[30px] w-[30px]' />
                                </div>
                                <p className='font-urbanist font-medium md:text-[12px] text-[8px] leading-[130%] tracking-[0]'><Skeleton className='h-[10px] w-[30px]' /> Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container outerClassName="!px-0">
                <div className='max-w-[735px] w-full mx-auto'>
                    <Skeleton className='w-full h-[40px]' />
                </div>
            </Container>
            <Container>
                            <h5 className='font-urbanist font-semibold text-[20px] leading-[130%] tracking-[0] mb-2.5 capitalize'>
                                <Skeleton className='h-[30px] w-[100px]' />
                            </h5>
                <div className='w-full grid grid-cols-3 gap-5 md:py-[23px] py-[15px]'>
{[1,2,3,4,5].map(()=>(

                    <>
                        <div className='w-full'>
                            <div className={`grid gap-x-[22px] gap-y-[15px] `}>

                                <div
                                    className='py-[9.5px] px-2.5 rounded-2xl bg-background-secondary flex items-center justify-between'
                                >
                                    <div className='flex items-center gap-[10px]'>
                                        <Skeleton className='rounded-[8px] object-cover object-center w-[77px] h-[75px]' />

                                        <div className='grid gap-[14px]'>
                                            <div>
                                                <div className='flex items-center gap-[3px]'>
                                                    <h5 className='font-urbanist font-semibold text-[18px] leading-[130%] tracking-[0]'>
                                                        <Skeleton className='h-[30px] w-[100px]' />
                                                    </h5>
                                                    <span className='text-foreground'>
                                                        <InfoCircleIcon />
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-[3px] opacity-40 font-urbanist font-normal text-[13px] leading-[130%] tracking-[0]'>
                                                    <TimeIcon />
                                                    <Skeleton className='h-[20px] w-[20px]' />
                                                </div>
                                            </div>
                                            <h6 className='font-urbanist font-bold text-[22px] leading-[80%] tracking-[0] flex gap-1'>
                                                € <Skeleton className='h-[20px] w-[50px]' />
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        <Skeleton className=' bg-xarfi-orange rounded-[8px] py-[3px] px-[15px] font-urbanist font-semibold text-[14px] leading-[20px] tracking-[0] !text-white cursor-pointer disabled:opacity-50 cursor-not-allowed w-[80px] h-[30px]' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className='py-[3px] pr-[3px] pl-5 bg-xarfi-orange rounded-2xl font-urbanist font-semibold text-[18px] leading-[20px] tracking-[0] flex justify-between h-[56px] gap-16 items-center fixed bottom-3 right-3 z-10 !text-white'

                        >
                            {/* <button> */}
                            Book Now
                            <Skeleton className='bg-[#A34D00] aspect-square rounded-[13px] flex items-center justify-center py-[15px] px-[13px] !text-white' />

                            {/* </button> */}
                        </button>

                    </>
))}

                </div>
            </Container>

        </div>
    )
}

export default SalonApiFallback