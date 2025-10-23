"use client"
import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import { BellIconFilled, HeartFilledIcon, HeartIcon, LocPin, RatingStar } from '@/components/constants/Icons'
import Tabs from '@/components/constants/Tabs'
import { act, useEffect, useState } from 'react'
import Reschedule from './Reschedule'
import RateDialogue from './RateDialogue'
import Link from 'next/link'
import { formatDateTime, isWithin48Hours, shortAddress } from '@/lib/utils'
import { toggleBookingNotifcation, toggleFavouriteBooking } from '@/lib/api/user/User'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useBookingsStore } from '@/stores/useBookingsStore'
import { BookingCardSkeleton } from './MyBookingsFallBack'
import Cookies from "js-cookie";

type Props = {

}

export const BookingCard = ({ index, activeTab, booking }: any) => {
    const { lang } = useParams()
    let token: any = Cookies.get("token")
    const [notify, setNotify] = useState(false)
    const [bookingDetail, setBookingDetail] = useState<any>(null)
    const [favourite, setFavourite] = useState(false)
    const [reminderLoader, setReminderLoader] = useState(false)
    const [rescheduleDialogue, setRescheduleDialogue] = useState(false)
    const [ratingDialogue, setRatingDialogue] = useState(false)
    const [favouriteLoader, setFavouriteLoader] = useState(false)
    const [givenRating, setGivenRating] = useState(0)
    const {
        fetchBookings,
    } = useBookingsStore();

    useEffect(() => {
        if (booking) {
            setNotify(booking?.notify)
            setBookingDetail(booking)
            setFavourite(booking?.favorite)
            let rating = (booking?.reviews?.[0]?.masterRating + booking?.reviews?.[0]?.salonRating) / 2
            console.log(rating,'ratingrating')
            setGivenRating(rating)
        }
    }, [booking])
    const reminder = async () => {
        setReminderLoader(true);
        await toggleBookingNotifcation(bookingDetail?._id, lang as string)
            .then((data) => {
                console.log("then");
                setReminderLoader(false);
                setNotify(!notify);
                toast.success(data?.message);
                fetchBookings(token, lang as string)
            })
            .catch((err) => {
                console.log("catch");
                setReminderLoader(false);
                setNotify(notify);
                toast.error(err?.message || "failed");
            });
    };

    const favorite = async () => {
        setFavouriteLoader(true);
        await toggleFavouriteBooking(bookingDetail?._id, lang as string)
            .then((data) => {
                console.log("then");
                setFavouriteLoader(false);
                setFavourite(!favourite);
                toast.success(data?.message);
                fetchBookings(token, lang as string)
            })
            .catch((err) => {
                console.log("catch");
                setFavouriteLoader(false);
                setFavourite(favourite);
                toast.error(err?.message || "failed");
            });
    };


    return (

        <div className='p-[15px] border border-[#ACACAC] rounded-2xl flex justify-between'>
            <Link href={`/${lang}/my-bookings/${bookingDetail?._id}`}>
                <div className='grid gap-[9px]'>
                    <div>
                        <h4 className='font-urbanist capitalize font-bold md:text-[18px] text-base leading-[130%] tracking-[0]'>{bookingDetail?.salon?.name}</h4>
                        <p className='flex items-center capitalize font-urbanist font-medium text-[15px] leading-[130%] tracking-[0] mb-2.5 opacity-50 max-md:hidden'><span className='w-3 inline-block mr-1.5'><LocPin width={12} /></span>{shortAddress(bookingDetail?.salon?.location?.address)} | {bookingDetail?.distance}</p>
                    </div>
                    <div className='grid gap-[8px]'>
                        <p className='font-urbanist capitalize font-medium md:text-[15px] text-[13px] leading-[83%] tracking-[0] max-md:opacity-50'>{bookingDetail?.categories?.split(',')?.map((a: string, i: number) => (
                            <>

                                {a}
                                {bookingDetail?.categories?.split(',')?.[i + 1] ?
                                    <span>●</span>
                                    : ''}
                            </>
                        ))}</p>
                        <p className='font-urbanist font-medium md:text-[15px] text-[13px] leading-[130%] tracking-[0]'>{formatDateTime(bookingDetail?.date, bookingDetail?.time)?.[0]} at {formatDateTime(bookingDetail?.date, bookingDetail?.time)?.[1]}  <span>●</span> <span className='!text-[#FF8C26] font-bold'>€ {bookingDetail?.total}</span></p>
                    </div>
                </div>
            </Link>
            {activeTab === 'Upcoming' ?
                <div className='flex flex-col justify-between items-end'>
                    <div className={`flex flex-col items-center gap-[5px] cursor-pointer ${reminderLoader ? 'opacity-50' : ''}`} onClick={() => {
                        if (!reminderLoader) {
                            reminder()
                        }
                    }}>
                        <BellIconFilled fillColor={notify ? '#FF8C26' : 'currentColor'} />
                        <p className={`font-urbanist font-semibold text-[11px] leading-[83%] max-md:hidden tracking-[0] ${notify ? "!text-[#FF8C26]" : ''}`}>Notify Me</p>
                    </div>
                    <button className={`bg-xarfi-orange py-[9px] md:px-3 px-2.5 rounded-[4px] !text-white ${isWithin48Hours(bookingDetail?.date, bookingDetail?.time) ? 'disabled:!bg-[#777777] disabled:!cursor-not-allowed' : ''} font-urbanist font-medium md:text-[14px] text-xs leading-[83%] tracking-[0]`}
                        onClick={() => {
                            if (isWithin48Hours(bookingDetail?.date, bookingDetail?.time)) {
                                toast.error('Your appointment is now less than 48 hours away. If you need to make any changes, please contact your barber directly.')
                            } else {
                                setRescheduleDialogue(true)
                            }
                        }}
                    >
                        Reschedule
                    </button>
                    <Reschedule open={rescheduleDialogue} onOpenChange={setRescheduleDialogue} />
                </div>
                : activeTab === 'Past' ?
                    <div className='flex flex-col justify-between items-end'>
                        <div className={`flex flex-col items-center gap-[5px] cursor-pointer ${favouriteLoader ? 'opacity-50' : ''}`} onClick={() => {
                            // setFavourite(!favourite)
                            if (!favouriteLoader) {
                                favorite()
                            }
                        }}>
                            {favourite ?
                                <HeartFilledIcon />
                                :
                                <HeartIcon />
                            }
                            <p className={`font-urbanist font-semibold text-[11px] leading-[83%] tracking-[0] max-md:hidden`}>Favorite</p>
                        </div>
                        {givenRating ?
                            <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0]'>
                                <RatingStar size={16} />
                                {givenRating}
                            </div>
                            :
                            <>
                                <button className={`bg-[#FFC300] py-[9px] px-[8px] rounded-[4px] !text-black disabled:!bg-[#777777] disabled:!cursor-not-allowed font-urbanist font-medium md:text-[14px] text-xs leading-[83%] tracking-[0]`}
                                    onClick={() => {
                                        setRatingDialogue(true)
                                    }}
                                >
                                    Rate Service
                                </button>
                                <RateDialogue open={ratingDialogue} onOpenChange={setRatingDialogue} setGivenRating={setGivenRating} masterId={bookingDetail?.master} ownerId={bookingDetail?.owner} bookingId={bookingDetail?._id} />
                            </>
                        }
                    </div>
                    : activeTab === 'Favorite' ?
                        <div className='flex flex-col justify-between items-end'>
                            <div className={`flex flex-col items-center gap-[5px] cursor-pointer ${favouriteLoader ? 'opacity-50' : ''}`} onClick={() => {
                                // setFavourite(!favourite)
                                if (!favouriteLoader) {
                                    favorite()
                                }
                            }}>
                                <HeartFilledIcon />
                                <p className={`font-urbanist font-semibold text-[11px] leading-[83%] tracking-[0] max-md:hidden`}>Favorite</p>
                            </div>
                            {givenRating ?
                                <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0]'>
                                    <RatingStar size={16} />
                                    {givenRating}
                                </div>
                                : null}
                        </div> : null}
        </div>
    )
}

function MyBookings({ }: Props) {
    const { lang } = useParams()
    let token: any = Cookies.get("token")
    const tabs = ['Upcoming', 'Past', 'Favorite']
    const [activeTab, setActiveTab] = useState('Upcoming')
    const [loader, setLoader] = useState(false)

    const {
        upcomingBookings,
        pastBookings,
        favoriteBookings,
        // loading,
        error,
        fetchBookings,
    } = useBookingsStore();
    console.log(upcomingBookings, pastBookings, favoriteBookings, 'sadsadsadsadasdsa')

    useEffect(() => {
        if (token) {
            setLoader(true)
            fetchBookings(token, lang as string, () => {
                setLoader(false)
            })
        }
    }, [token])



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
                    {loader ?
                        <>
                            {[1, 2, 3, 4]?.map(() => (
                                <BookingCardSkeleton />
                            ))}
                        </>
                        :
                        <>
                            {activeTab === 'Upcoming' ?
                                upcomingBookings.map((booking, i) => (
                                    <BookingCard key={i} index={i} activeTab={activeTab} booking={booking} />
                                ))
                                : activeTab === 'Past' ?
                                    pastBookings.map((booking, i) => (
                                        <BookingCard key={i} index={i} activeTab={activeTab} booking={booking} />
                                    ))
                                    : activeTab === 'Favorite' ?
                                        favoriteBookings.map((booking, i) => (
                                            <BookingCard key={i} index={i} activeTab={activeTab} booking={booking} />
                                        ))
                                        : null}
                        </>}

                </div>
            </Container>
        </div>
    )
}

export default MyBookings