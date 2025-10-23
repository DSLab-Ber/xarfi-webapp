"use client"
import { CloseIcon } from '@/components/constants/Icons';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SheetClose } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton';
import { BookingApi, getBookingSlotApi } from '@/lib/api/user/User';
import { months, pad } from '@/lib/utils';
import { useWeekNavigator } from '@/lib/week-utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'
import PaymentDialogues from '../constants/PaymentDialogues';

type Props = {
    open: boolean;
    onOpenChange: (_: boolean) => void;
    BookingDetail: any;
}

function BookAgain({ open, onOpenChange, BookingDetail }: Props) {
    const { lang } = useParams()
    const { week, monthYear, goNextWeek, goPreviousWeek, jumpWeeks, goToWeek } = useWeekNavigator();
    const [slotsLoading, setSlotsLoading] = useState(true)
    const [date, setDate] = useState<number | string>(0)
    const [slots, setSlots] = useState<any[]>([])
    const [slotsMsg, setSlotsMsg] = useState('')
    const [selectedSlot, setSelectedSlot] = useState('')

    const getBooking = async () => {
        try {
            let selectedDate = `${monthYear.year}-${pad(months.indexOf(monthYear.month) + 1)}-${pad(date)}`
            setSlotsLoading(true)
            let services = BookingDetail?.items?.map(({ service }: any) => {
                return service
            })
            console.log()
            let slotsData = await getBookingSlotApi(lang as string, BookingDetail?.master?._id, services, selectedDate)
            console.log("slotData", slotsData?.data)
            setSlots(slotsData?.data || [])
            setSlotsMsg(slotsData?.message)
            setSlotsLoading(false)
        } catch (err) {
            console.log('master error', err)
            setSlotsLoading(false)

        }
    }
    useEffect(() => {
        if (BookingDetail && date) {
            getBooking()
        }
    }, [BookingDetail, date])


    const setBooking = async () => {
        try {
            let services = BookingDetail?.items?.map(({ service }: any) => {
                return service
            })
            const selectedDate = `${monthYear.year}-${pad(months.indexOf(monthYear.month) + 1)}-${pad(date)}`;
            const res = await BookingApi(
                services,
                BookingDetail?.master?._id,
                BookingDetail?.owner,
                selectedDate,
                selectedSlot,
                BookingDetail?.bookingFor?.otherThenMyself,
                BookingDetail?.bookingFor?.guestName
            );

            // 👇 Handle API-level failure manually
            if (!res?.success) {
                throw new Error(res?.message || "Something went wrong");
            }

            return res;
        } catch (err) {
            console.error("Error in setBooking:", err);
            throw err; // rethrow so it reaches outer catch
        }
    };
    const clearAll = () => {
        onOpenChange(false)
        setSlotsLoading(true)
        setDate(0)
        setSlots([])
        setSlotsMsg('')
        setSelectedSlot('')
    }
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                {/* <DialogTrigger></DialogTrigger> */}
                <DialogContent showCloseButton={false} className='border-none p-[30px] !max-w-[429px] w-full'>
                    <div className='w-full'>
                        <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                            <p className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Book Again</p>
                            <SheetClose asChild>
                                <button><CloseIcon /></button>
                            </SheetClose>
                        </div>
                        <div className='grid gap-5'>
                            <div className="grid gap-[15px]">
                                <div className="w-full">
                                    <div className="w-full flex justify-between mb-4">
                                        <h5 className="font-urbanist font-bold text-[14px] leading-[100%] tracking-[0]">Select Date</h5>
                                    </div>
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <button onClick={goPreviousWeek}>
                                                <ChevronLeft color="#FF8C26" />
                                            </button>
                                            <p>{monthYear.month}, {monthYear.year}</p>
                                            <button onClick={goNextWeek}>
                                                <ChevronRight color="#FF8C26" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full grid grid-cols-7 gap-[11px] mt-6">
                                        {week.map((day, i) => {
                                            const currentDate = new Date()

                                            // get month index (0-based)
                                            const monthIndex = months.indexOf(monthYear.month)

                                            // build the full date for each cell
                                            const cellDate = new Date(Number(monthYear.year), monthIndex, Number(day.dayNumber))

                                            // disable if the date is in the past
                                            const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                                            const disabled = cellDate < today

                                            return (
                                                <div
                                                    key={i}
                                                    className={`bg-[#F3F3F3] dark:bg-[#252424] py-[17px] rounded-[100px] flex flex-col items-center justify-center gap-1 cursor-pointer ${date === day.dayNumber ? "!bg-[#FF8C26]" : ''} ${disabled ? "opacity-40 !cursor-not-allowed" : ''}`}
                                                    onClick={() => {
                                                        if (!disabled) {
                                                            setDate(day.dayNumber)
                                                        }
                                                    }}
                                                >
                                                    <p
                                                        className={`!text-[#817F7F] !dark:text-[#ACACAC] font-urbanist font-normal text-[12px] leading-[100%] tracking-[0.03em] ${date === day.dayNumber ? "!text-white" : ''}`}
                                                    >
                                                        {day.dayName?.slice(0, 3)}
                                                    </p>
                                                    <p
                                                        className={`!text-[#817F7F] !dark:text-[#ACACAC] font-urbanist font-bold text-[24px] leading-[100%] tracking-[0] ${date === day.dayNumber ? "!text-white" : ''}`}
                                                    >
                                                        {day.dayNumber}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {date ?
                                <div className="grid gap-[15px]">
                                    <div className="w-full">
                                        <div className="w-full flex justify-between mb-[15px]">
                                            <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Select Time</h5>
                                        </div>
                                        <div className="w-full grid grid-cols-3 gap-[12.33px] mb-[15px]">
                                            {slotsLoading ?
                                                <>
                                                    {[1, 2, 3].map(() => (
                                                        <div className=" w-[122px] rounded-[8px] font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center cursor-pointer h-11">
                                                            <Skeleton className="w-full h-full " />
                                                        </div>
                                                    ))}
                                                </>
                                                :
                                                <>

                                                    {slots?.length ? slots.map((a, i) => {
                                                        return a?.available ? (
                                                            <div key={i} className={`border p-[11px] rounded-[8px] font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center cursor-pointer ${selectedSlot === a?.time ? "bg-xarfi-orange !text-white border-[#FF8C26]" : ""}`}
                                                                onClick={() => {
                                                                    setSelectedSlot(a?.time)
                                                                }}
                                                            >
                                                                {a?.time}
                                                            </div>
                                                        ) : null
                                                    })
                                                        :
                                                        <div className="col-span-3 text-sm text-center opacity-80 py-5">
                                                            <p className=" ">{slotsMsg}</p>
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <p className="font-urbanist font-medium text-[12px] leading-[14px] tracking-[0]"><span className="text-xarfi-orange">Note:</span> Bookings less than 24 hours can not be rescheduled.</p>
                                    </div>
                                </div>
                                : null}
                            <PaymentDialogues className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-sm leading-[20px] tracking-[0] !text-white"
                                setBooking={setBooking}
                                salon={BookingDetail?.salon}
                                selectedSlot={selectedSlot}
                                date={`${monthYear.year}-${monthYear.month}-${pad(date)}`}
                                clearAll={clearAll}
                                bookAgain={true}
                                bookAgainService={BookingDetail?.items}
                            >

                                Rechedule

                            </PaymentDialogues>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default BookAgain