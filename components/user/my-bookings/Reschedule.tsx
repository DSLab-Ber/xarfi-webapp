import { CloseIcon } from '@/components/constants/Icons';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SheetClose } from '@/components/ui/sheet'
import { useWeekNavigator } from '@/lib/week-utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { ReactNode } from 'react'

type Props = {
    open: boolean;
    onOpenChange: (_:boolean)=>void;
}

function Reschedule({ open, onOpenChange }: Props) {
    const { week, monthYear, goNextWeek, goPreviousWeek, jumpWeeks } = useWeekNavigator();
    const availableTime = ["04:22 AM", "05:22 AM", "06:22 AM", "07:22 AM", "08:22 AM", "09:22 AM", "10:22 AM", "11:22 AM", "12:22 AM",]
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                {/* <DialogTrigger></DialogTrigger> */}
                <DialogContent showCloseButton={false} className='border-none p-[30px] !max-w-[429px] w-full'>
                    <div className='w-full'>
                        <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                            <p className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Reschedule Booking</p>
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
                                        {week.map((day, i) => (
                                            <div key={i} className="bg-[#F3F3F3] dark:bg-[#252424] py-[17px]  rounded-[100px] flex flex-col items-center justify-center gap-1 cursor-pointer">
                                                <p className="!text-[#ACACAC] dark:!text-[#ACACAC] font-urbanist font-normal text-[12px] leading-[100%] tracking-[0.03em]">{day.dayName?.slice(0, 3)}</p>
                                                <p className="!text-[#ACACAC] dark:!text-[#ACACAC] font-urbanist font-bold text-[24px] leading-[100%] tracking-[0]">{day.dayNumber}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-[15px]">
                                <div className="w-full">
                                    <div className="w-full flex justify-between mb-[15px]">
                                        <h5 className="font-urbanist font-bold text-[14px] leading-[100%] tracking-[0]">Select Time</h5>
                                    </div>
                                    <div className="w-full grid grid-cols-3 gap-[12.33px] mb-[15px]">
                                        {availableTime.map((a, i) => {
                                            return (
                                                <div key={i} className="border p-[11px] rounded-[8px] font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center cursor-pointer">
                                                    {a}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="font-urbanist font-medium text-[12px] leading-[14px] tracking-[0]"><span className="text-xarfi-orange">Note:</span> Bookings less than 24 hours can not be rescheduled.</p>
                                </div>
                            </div>
                            <DialogClose asChild>
                                <button className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-sm leading-[20px] tracking-[0] !text-white">
                                    Rechedule
                                </button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default Reschedule