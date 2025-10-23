"use client"
import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import { CalendarIcon, ClockIcon, EmailIcon, HeartFilledIcon, HeartIcon, InfoCircleIcon, MailIcon, RatingStar, TimeIcon } from '@/components/constants/Icons'
import { Badge } from '@/components/ui/badge'
import Image from '@/components/constants/Image'
import React, { useEffect, useState } from 'react'
import { toggleFavouriteBooking } from '@/lib/api/user/User'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import RateDialogue from './RateDialogue'
import { formatDateTime, minutesToReadableTime } from '@/lib/utils'
import Reschedule from './Reschedule'
import BookAgain from './BookAgain'

type Props = {
    BookingDetail: any
}

const RescheduleButton = ({ setRescheduleDialogue }: any) => {
    return (
        <button className="bg-xarfi-orange max-w-[589px] w-full rounded-2xl py-[18px] font-urbanist font-semibold text-[16px] leading-[16px] tracking-[0] !text-white"
            onClick={() => {
                setRescheduleDialogue(true)
            }}
        >
            Reschedule
        </button>
    )
}
const RateServiceButton = ({ setRatingDialogue }: any) => {
    return (
        <button className="bg-xarfi-orange max-w-[589px] w-full rounded-2xl py-[18px] font-urbanist font-semibold text-[16px] leading-[16px] tracking-[0] !text-white"
            onClick={() => {
                setRatingDialogue(true)
            }}
        >
            Rate Service
        </button>
    )
}
const BookAgainButton = ({setBookAgainDialogue}:any) => {
    return (
        <button className="border max-w-[589px] w-full rounded-2xl py-[18px] font-urbanist font-semibold text-[16px] leading-[16px] tracking-[0] "
            onClick={() => {
                setBookAgainDialogue(true)
            }}
        >
            Book Again
        </button>
    )
}

const UpcomingStatus = () => {
    return (
        <div>
            <div className='bg-[#FF8C261A] border border-[#FF8C26] !text-[#FF8C26] rounded-[100px] md:px-[25px] px-2 md:py-3 py-[3px] font-urbanist font-normal md:text-[18px] text-[12px] leading-[16px] tracking-[0]'>
                Upcoming
            </div>
        </div>
    )
}

const PastStatus = ({ favourite, setFavourite, favoriteFunc }: any) => {
    return (
        <div className='flex items-center gap-[25px]'>
            <div className='bg-[#16A34A1A] border border-[#00FF5E] !text-[#00FF5E] rounded-[100px] md:px-[25px] px-2 md:py-3 py-[3px] font-urbanist font-normal md:text-[18px] text-[12px] leading-[16px] tracking-[0]'>
                Completed
            </div>
            <div className='flex flex-col items-center gap-[5px] cursor-pointer' onClick={() => {
                favoriteFunc()
            }}>
                {favourite ?
                    <HeartFilledIcon size={32} className="max-md:w-5 max-md:h-5" />
                    :
                    <HeartIcon size={32} strokeColor={'currentColor'} className="max-md:w-5 max-md:h-5" />
                }
            </div>
        </div>
    )
}


const FavoriteStatus = ({ favourite, setFavourite, rating, favoriteFunc }: any) => {
    return (
        <div className='flex items-center md:gap-[25px] gap-2.5'>
            <div className='bg-[#16A34A1A] border border-[#00FF5E] !text-[#00FF5E] rounded-[100px] md:px-[25px] px-2 md:py-3 py-[3px] font-urbanist font-normal md:text-[18px] text-[12px] leading-[16px] tracking-[0]'>
                Completed
            </div>
            <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold md:text-[16px] text-[12px] leading-[84%] tracking-[0]'>
                <RatingStar size={16} className="max-md:w-3 max-md:h-3" />
                {rating}
            </div>
            <div className='flex flex-col items-center gap-[5px] cursor-pointer' onClick={() => {
                favoriteFunc()
            }}>
                {favourite ?
                    <HeartFilledIcon size={32} className="max-md:w-5 max-md:h-5" />
                    :
                    <HeartIcon size={32} strokeColor={'currentColor'} className="max-md:w-5 max-md:h-5" />
                }
            </div>
        </div>
    )
}

function BookingDetails({ BookingDetail }: Props) {
    const { lang } = useParams()
    const [favourite, setFavourite] = useState(false)
    const [givenRating, setGivenRating] = useState(0)
    const [favouriteLoader, setFavouriteLoader] = useState(false)
    const [ratingDialogue, setRatingDialogue] = useState(false)
    const [rescheduleDialogue, setRescheduleDialogue] = useState(false)
    const [bookAgainDialogue, setBookAgainDialogue] = useState(false)
    useEffect(() => {
        if (BookingDetail) {
            setFavourite(BookingDetail?.favorite)
            console.log(BookingDetail, 'BookingDetailBookingDetail')
            let rating = (BookingDetail?.reviews?.[0]?.masterRating + BookingDetail?.reviews?.[0]?.salonRating) / 2
            console.log(rating, 'ratingrating')
            setGivenRating(rating)
        }
    }, [BookingDetail])

    const favorite = async () => {
        setFavouriteLoader(true);
        await toggleFavouriteBooking(BookingDetail?._id, lang as string)
            .then((data) => {
                console.log("then");
                setFavouriteLoader(false);
                setFavourite(!favourite);
                toast.success(data?.message);
            })
            .catch((err) => {
                console.log("catch");
                setFavouriteLoader(false);
                setFavourite(favourite);
                toast.error(err?.message || "failed");
            });
    };

    return (
        <div className='pb-[50px]'>
            <Container >
                <div className='flex justify-between items-center bg-background sticky top-0 pt-[50px] pb-[30px]'>
                    <div className='flex items-center md:gap-[15px]'>
                        <BackButton />
                        <h5 className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Booking Details</h5>
                    </div>
                    <div className='flex items-center md:gap-[25px] gap-2.5'>
                        {BookingDetail?.status === "pending" ?
                            <div className='bg-[#FF8C261A] border border-[#FF8C26] !text-[#FF8C26] rounded-[100px] md:px-[25px] px-2 md:py-3 py-[3px] font-urbanist font-normal md:text-[18px] text-[12px] leading-[16px] tracking-[0]'>
                                Upcoming
                            </div>
                            : BookingDetail?.status === "completed" ?
                                <div className='bg-[#16A34A1A] border border-[#00FF5E] !text-[#00FF5E] rounded-[100px] md:px-[25px] px-2 md:py-3 py-[3px] font-urbanist font-normal md:text-[18px] text-[12px] leading-[16px] tracking-[0]'>
                                    Completed
                                </div>
                                : null}
                        {givenRating ?
                            <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold md:text-[16px] text-[12px] leading-[84%] tracking-[0]'>
                                <RatingStar size={16} className="max-md:w-3 max-md:h-3" />
                                {givenRating}
                            </div>
                            : null}
                        <div className='flex flex-col items-center gap-[5px] cursor-pointer' onClick={() => {
                            favorite()
                        }}>
                            {favourite ?
                                <HeartFilledIcon size={32} className="max-md:w-5 max-md:h-5" />
                                :
                                <HeartIcon size={32} strokeColor={'currentColor'} className="max-md:w-5 max-md:h-5" />
                            }
                        </div>
                    </div>
                    {/* {BookingDetail?.status === "pending" ?
                        <UpcomingStatus />
                        : BookingDetail?.status === "completed" && favourite  ?
                            <FavoriteStatus favoriteFunc={favorite} favourite={favourite} setFavourite={setFavourite} rating={givenRating} />
                            : BookingDetail?.status === "completed" && !favourite ?
                                <PastStatus favoriteFunc={favorite} favourite={favourite} setFavourite={setFavourite} />
                                : null} */}
                </div>
                <div className='grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-3 gap-5'>
                    <div className='grid gap-2.5 max-lg:order-1'>
                        <p className='font-urbanist font-semibold md:text-[18px] text-base leading-[130%] tracking-[0] !text-[#ACACAC]'>Salon Details</p>
                        <div className='bg-[#EBEBEB] dark:bg-[#1E1E1E] md:py-[22px] py-2.5 px-2.5 rounded-2xl flex gap-[10px] items-center md:h-[110px]'>
                            <Image alt="salonImage" width={80} height={65} src={BookingDetail?.salon?.images?.[0]} className='!w-20 !h-[65px] object-cover object-center rounded-[6px]' />
                            <div className='grid gap-1.5'>
                                <h5 className='font-urbanist font-bold md:text-[20px] text-lg leading-[20px] tracking-[0] mb-0'>{BookingDetail?.salon?.name}</h5>
                                <p className='flex items-center gap-1.5 font-urbanist font-normal md:text-[14px] text-xs leading-[130%] tracking-[0]'><span><MailIcon width={'16px'} height={"16px"} /></span> jospehdome123@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2.5 max-lg:order-3'>
                        <p className='font-urbanist font-semibold md:text-[18px] text-base leading-[130%] tracking-[0] !text-[#ACACAC]'>Preferred Master</p>
                        <div className='lg:bg-[#EBEBEB] dark:lg:bg-[#1E1E1E] lg:py-[22px] px-2.5 rounded-2xl flex gap-[10px] items-center h-[110px]'>
                            <Image alt="salonImage" width={55} height={55} src={BookingDetail?.master?.image} className='rounded-full object-center object-cover md:w-[55px] md:h-[55px] w-10 h-10' />
                            <div className='grid gap-1.5'>
                                <h5 className='font-urbanist font-bold md:text-[20px] text-[14px] leading-[20px] tracking-[0] mb-0'>{BookingDetail?.master?.name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2.5 max-lg:order-2'>
                        <p className='font-urbanist font-semibold md:text-[18px] text-base leading-[130%] tracking-[0] !text-[#ACACAC]'>Date & Time</p>
                        <div className='lg:bg-[#EBEBEB] dark:lg:bg-[#1E1E1E] pl-[15px] py-[3.5px] pr-[3.5px] rounded-2xl flex gap-[10px] items-center h-[110px] justify-between'>
                            <div className='grid gap-2.5'>
                                <p className='flex items-center gap-1.5 font-urbanist font-semibold md:text-[18px] text-sm  leading-[130%] tracking-[0]'><span className='!text-[#FF8C26]'><CalendarIcon size={24} className="max-md:w-5" /></span> {formatDateTime(BookingDetail?.date, BookingDetail?.time)?.[0]}</p>
                                <p className='flex items-center gap-1.5 font-urbanist font-semibold md:text-[18px] text-sm  leading-[130%] tracking-[0]'><span className='!text-[#FF8C26]'><ClockIcon size={24} className="max-md:w-5" /></span> {formatDateTime(BookingDetail?.date, BookingDetail?.time)?.[1]}</p>
                            </div>
                            {BookingDetail?.status === "pending" ?
                                <div className='bg-[#583b20] h-full rounded-[12px] flex flex-col'>
                                    <div className='w-full pt-[7px] pb-[3px] px-[25px] text-center bg-[#836e5a] rounded-t-[12px] rounded-b-[2px] font-urbanist font-medium text-[12px] leading-[130%] tracking-[0]'>
                                        Duration
                                    </div>
                                    <div className='px-[26px] flex-1 flex items-center flex-col justify-center'>
                                        <h4 className='font-urbanist font-extrabold text-[42px] leading-[100%] tracking-[0] !text-white'>{BookingDetail?.serviceDuration}</h4>
                                        <p className='font-urbanist font-medium text-[12px] leading-[130%] tracking-[0] text-center'>Mins</p>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
                <div className='w-full mt-5 mb-[200px]'>
                    <p className='font-urbanist font-semibold md:text-[18px] text-base leading-[130%] tracking-[0] !text-[#ACACAC] mb-[15px]'>Services</p>
                    <div className='grid grid-cols-3 gap-x-[2.4px] gap-y-[1.6] rounded-2xl overflow-hidden max-md:hidden'>
                        {/* header */}
                        <div className='bg-[#FF8C261A] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[22px] text-center'>Service</div>
                        <div className='bg-[#FF8C261A] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[22px] text-center'>Duration</div>
                        <div className='bg-[#FF8C261A] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[22px] text-center'>Amount</div>
                        {BookingDetail?.items.map(({ service }: any, i: number) => (
                            <React.Fragment key={i}>
                                <div key={i + 1} className='bg-[#EBEBEB] dark:bg-[#1E1E1E] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[11px] text-center flex justify-center items-center'>
                                    <div className='flex justify-center items-center gap-[15px]'>
                                        <Image alt="haircut image" width={60} height={60} src={service?.image} className='rounded-[8px] object-cover object-center w-[77px] h-[75px]' />
                                        <h5 className='flex items-center gap-[5px] font-urbanist font-semibold text-[18px] leading-[130%] tracking-[0]'>{service?.name}<span><InfoCircleIcon /></span></h5>
                                    </div>
                                </div>
                                <div key={i + 2} className='bg-[#EBEBEB] dark:bg-[#1E1E1E] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[11px] text-center flex justify-center items-center'>{minutesToReadableTime(service?.duration)}</div>
                                <div key={i + 3} className='bg-[#EBEBEB] dark:bg-[#1E1E1E] font-urbanist font-semibold text-[20px] leading-[100%] tracking-[0] align-middle py-[11px] text-center flex justify-center items-center'>€ {service?.price}</div>
                            </React.Fragment>
                        ))}
                        {/* footer */}
                        <div className='bg-[#EBEBEB] dark:bg-[#1E1E1E] font-urbanist font-medium text-[24px] leading-[100%] tracking-[0] align-middle py-[20.5px] text-center flex justify-center items-center col-span-2'>Total Amount:</div>
                        <div className='bg-[#EBEBEB] dark:bg-[#1E1E1E] font-urbanist font-semibold text-[24px] leading-[100%] tracking-[0] align-middle py-[20.5px] text-center flex justify-center items-center !text-[#FF8C26]'>€ {BookingDetail?.total}</div>
                    </div>
                    <div className='gap-2.5 hidden max-md:grid'>
                        <div className='bg-[#EBEBEB] dark:bg-[#1E1E1E] p-2.5 rounded-2xl flex items-center justify-between'>
                            <div className='flex items-center gap-[10px]'>
                                <Image alt="haircut image" width={77} height={75} src={'/assets/categoryImage.jpg'} className='rounded-[8px] object-cover object-center w-[77px] h-[75px]' />
                                <div className='grid gap-[14px]'>
                                    <div className='grid grid-1'>
                                        <div className='flex items-center gap-[3px]'>
                                            <h5 className='font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]'>Mullet Haircut</h5>
                                            <span className='text-foreground'><InfoCircleIcon /></span>
                                        </div>
                                        <div className='flex items-center gap-[3px] opacity-40 font-urbanist font-normal text-[11px] leading-[130%] tracking-[0]'>
                                            <TimeIcon className="max-md:w-3" />
                                            30 Mins
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6 className='font-urbanist font-bold text-[20px] leading-[80%] tracking-[0] !text-[#FF8C26]'>€ 60</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className='fixed bottom-0 max-md:bg-[#EBEBEB] max-md:dark:bg-[#1E1E1E] w-full max-md:rounded-t-[25px] max-md:pt-4 z-30 bg-background'>
                <div className='hidden max-md:flex items-center justify-between px-4'>
                    <h5 className='font-urbanist font-bold text-[16px] leading-[130%] tracking-[0] mb-0'>Total Amount:</h5>
                    <p className='font-urbanist font-bold text-[16px] leading-[130%] tracking-[0] mb-0'>€ 360</p>
                </div>
                <div className='w-full flex gap-[18px] justify-center  z-10 pt-[15px] pb-[25px] px-4'>

                    {BookingDetail?.status === "pending" ?
                        <>
                            <RescheduleButton setRescheduleDialogue={setRescheduleDialogue} />
                            <Reschedule open={rescheduleDialogue} onOpenChange={setRescheduleDialogue} />
                        </>
                        : BookingDetail?.status === "completed" ?
                            <>
                                <BookAgainButton setBookAgainDialogue={setBookAgainDialogue} />
                                <BookAgain open={bookAgainDialogue} onOpenChange={setBookAgainDialogue} BookingDetail={BookingDetail}/>
                            </>
                            : null}
                    {BookingDetail?.status === "completed" && !givenRating ?
                        <>
                            <RateServiceButton setRatingDialogue={setRatingDialogue} />
                            <RateDialogue open={ratingDialogue} onOpenChange={setRatingDialogue} setGivenRating={setGivenRating} masterId={BookingDetail?.master} ownerId={BookingDetail?.owner} bookingId={BookingDetail?._id} />

                        </>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default BookingDetails