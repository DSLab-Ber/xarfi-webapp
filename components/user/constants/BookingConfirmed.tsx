"use client"
import { CalendarIcon, LocPin, MastercardIcon, SuccessCircleIcon } from '@/components/constants/Icons';
import Spinner from '@/components/constants/Spinner';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toggleBookingNotifcation } from '@/lib/api/user/User';
import { useServiceStore } from '@/stores/serviceCart';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    children?: ReactNode;
    SheetClosePayment?: any;
    className: string;
    setBooking: any;

    salon?: any;
    selectedSlot?: any;
    date?: any;
    clearAll?: any;
}

function BookingConfirmed({ children, SheetClosePayment, className, setBooking, salon, selectedSlot, date, clearAll }: Props) {
    const { id, lang }: any = useParams()
    const [checked, setChecked] = useState(false)
    const [loader, setLoader] = useState(false)
    const [open, setOpen] = useState(false)
    const [reminderLoader, setReminderLoader] = useState(false)
    const [bookingData, setBookingData] = useState<any>(null)
    const onCheckedChange = () => {
        setChecked(!checked)
    }

    const {
        clearServicesForOwner,
        getServicesForOwner,
    } = useServiceStore();
    const serviceList = getServicesForOwner(id)
    
const reminder = async () => {
    setReminderLoader(true);
    await toggleBookingNotifcation(bookingData?._id)
        .then((data) => {
            console.log("then");
            setReminderLoader(false);
            setChecked(!checked);
            toast.success(data?.message);
        })
        .catch((err) => {
            console.log("catch");
            setReminderLoader(false);
            setChecked(checked);
            toast.error(err?.message || "failed");
        });
};

    return (
        <>
            <button disabled={loader} className={className}
                onClick={() => {
                    setLoader(true)
                    setBooking().then((res: any) => {
                        console.log('runnnnnnnnn', res?.data)
                        setBookingData(res?.data)
                        toast.success(res?.message)
                        setOpen(true)
                    }).catch((err: any) => {
                        toast.error(err?.message || "Something went wrong");
                        setLoader(false)
                    })
                }}
            >
                {loader ?
                    <Spinner className="w-6 h-6 fill-[#fff] text-gray-600" />
                    :
                    `Continue`
                }
            </button>
            <Dialog
                open={open}
                onOpenChange={(nextOpen) => {
                    console.log(nextOpen, 'Dialog state')
                    setOpen(nextOpen)
                    if (!nextOpen) {
                        clearAll()
                        clearServicesForOwner(id)

                    }
                }}
            >

                <DialogTitle>
                    <DialogContent showCloseButton={false} className='border-none md:p-[50px] py-6 px-4 !max-w-[861px] w-full max-md:h-screen overflow-auto'>
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <div className='flex flex-col items-center gap-3'>
                                <SuccessCircleIcon />
                                <p className='font-urbanist font-semibold text-[24px] leading-[20px] tracking-[0] text-center'>Booking Confirmed</p>
                                <h4 className='font-urbanist font-bold text-[32px] leading-[80%] tracking-[0] text-center !text-[#FF8C26]'>€ {bookingData?.total}</h4>
                            </div>
                            <div className='w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-5'>
                                <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative '>
                                    <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Booking Details</p>
                                    {/* <div> */}
                                    <h5 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[20px] tracking-[0]'>Services</h5>
                                    <div className='w-full grid gap-2.5'>
                                        {serviceList.map((data: any, i: number) => (
                                            <div key={i} className='bg-[#F3F3F3] dark:bg-[#252424] py-2.5 px-[15px] rounded-[8px] flex justify-between items-center'>
                                                <p className='font-urbanist font-semibold md:text-[14px] text-[12px] leading-[130%] tracking-[0]'>{data.name}</p>
                                                <p className='font-urbanist font-bold text-[16px] leading-[80%] tracking-[0]'>€ {data.price}</p>
                                            </div>
                                        ))}
                                        {/* </div> */}
                                    </div>
                                    <div>
                                        <h5 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[20px] tracking-[0]'>Date & Time</h5>
                                        <div className='flex items-center gap-[15px]'>
                                            <div className='flex items-center gap-1.5 font-urbanist font-semibold md:text-[14px] text-xs  tracking-[0]'>
                                                <CalendarIcon className="max-md:w-[15px]" />
                                                <span>{date}</span>
                                            </div>
                                            <div className='flex items-center gap-1.5 font-urbanist font-semibold md:text-[14px] text-xs  tracking-[0]'>
                                                <Clock className="max-md:w-[15px]" />
                                                <span>{selectedSlot}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='h-full flex justify-between flex-col'>
                                        <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                            <p className='font-urbanist font-medium md:text-[16px] text-[14px] leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Salon Details</p>
                                            <h5 className='font-urbanist font-bold text-[20px] leading-[130%] tracking-[0] mb-0'>{salon?.name}</h5>
                                            <div className='flex items-center gap-1.5 font-urbanist font-medium text-[14px] leading-[130%] tracking-[0]'>
                                                <LocPin />
                                                {salon?.location?.address} | {salon?.distance}
                                            </div>
                                        </div>
                                        <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                            <p className='font-urbanist font-medium md:text-[16px] text-[14px] leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Payment Method</p>
                                            <div className='flex items-center justify-between'>
                                                <h5 className='font-urbanist font-bold text-[20px] leading-[130%] tracking-[0] mb-0'>***************4854</h5>
                                                <MastercardIcon />
                                            </div>
                                        </div>
                                        <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                            <div className='flex items-center justify-between'>
                                                <h5 className='font-urbanist font-bold md:text-[20px] text-[sm leading-[130%] tracking-[0] mb-0'>Send Reminder</h5>
                                                <Switch
                                                disabled={reminderLoader}
                                                    checked={checked}
                                                    onCheckedChange={reminder}
                                                    className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#F3F3F3] dark:bg-[#252424] py-[15px] px-[20px] rounded-2xl w-full gap-2.5 grid'>
                                <h5 className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0] !text-[#FF8C26]'>NOTE:</h5>
                                <ul className=''>
                                    <li className='font-urbanist font-medium md:text-[14px] text-[12px] leading-[130%] tracking-[0] align-middle'>
                                        🞗 You can only reschedule booking 24 hours before the booking time. for more details <span className='!text-[#FF8C26]'>Contact Barber</span>
                                    </li>
                                    <li className='font-urbanist font-medium md:text-[14px] text-[12px] leading-[130%] tracking-[0] align-middle'>
                                        🞗 If payment method is cash then please carry full cash with you while visiting barber
                                    </li>
                                </ul>
                            </div>
                            <DialogClose className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-base leading-[20px] tracking-[0] !text-white">
                                Done
                            </DialogClose>
                        </div>
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </>
    )
}

export default BookingConfirmed