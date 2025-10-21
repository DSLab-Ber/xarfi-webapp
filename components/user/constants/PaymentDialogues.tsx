import { RadioOption } from '@/components/constants/Form';
import { CloseIcon } from '@/components/constants/Icons';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SheetClose } from '@/components/ui/sheet';
import Image from '@/components/constants/Image';
import React, { ReactNode, useState } from 'react'
import BookingConfirmed from './BookingConfirmed';
import { getTotalPrice } from '@/lib/utils';
import { useServiceStore } from '@/stores/serviceCart';
import { useParams } from 'next/navigation';

type Props = {
    children?: ReactNode;
    className?: string;
    setBooking: any;

    salon?: any;
    selectedSlot?: any;
    date?: any;
    clearAll?: any;
}

function PaymentDialogues({ children, className, setBooking, salon, selectedSlot, date, clearAll }: Props) {
    const { id, lang }: any = useParams()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const {
        clearServicesForOwner,
        getServicesForOwner,
    } = useServiceStore();
    const serviceList = getServicesForOwner(id)
    const paymentMethods = [
        {
            image: '/assets/cashIcon.svg',
            method: 'Pay in Salon',
            suggested: '(Cash or Card)'
        },
        {
            image: '/assets/appleIcon.svg',
            method: 'Apple Pay',
            suggested: ''
        },
        {
            image: '/assets/googleIcon.svg',
            method: 'Google Pay',
            suggested: ''
        },
        {
            image: '/assets/paypalIcon.svg',
            method: 'PayPal',
            suggested: ''
        },
        {
            image: '/assets/klarnaIcon.svg',
            method: 'Klarna',
            suggested: ''
        },
    ]
    return (
        <Dialog>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent showCloseButton={false} className='border-none p-[50px] !max-w-[512px] !w-full'>
                <div className='grid gap-5'>
                    <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                        <p className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Book Appointment</p>
                        <SheetClose asChild>
                            <button><CloseIcon /></button>
                        </SheetClose>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <p className='font-urbanist font-semibold text-[24px] leading-[20px] tracking-[0] text-center'>Total Amount</p>
                        <h4 className='font-urbanist font-bold text-[32px] leading-[80%] tracking-[0] text-center !text-[#FF8C26]'>€ {getTotalPrice(serviceList)}</h4>
                    </div>
                    <div className='grid gap-2.5'>
                        {paymentMethods.map((a, i) => (
                            <div className={`px-[15.5px] py-2 flex justify-between items-center h-[65px] border rounded-2xl ${selectedPaymentMethod === a.method ? "border-[#FF8C26] bg-[#FF8C261A]" : 'border-[#EBEBEB] dark:border-[#1E1E1E]'}`}
                                onClick={() => setSelectedPaymentMethod(a.method)}

                            >
                                <div className='flex gap-2.5'>
                                    <Image alt={a.method} width={40} height={30} src={a.image} className='object-contain' />
                                    <div className='flex flex-col justify-center'>
                                        <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>{a.method}</p>
                                        {a.suggested ?
                                            <p className='font-urbanist font-medium text-[11px] leading-[15px] tracking-[0] !text-[#FF8C26]'>{a.suggested}</p>
                                            : null}
                                    </div>
                                </div>
                                <RadioOption
                                    key={a.method}
                                    label={false}
                                    selected={selectedPaymentMethod === a.method}
                                    onClick={() => setSelectedPaymentMethod(a.method)}
                                />
                            </div>
                        ))}
                    </div>
                    <BookingConfirmed className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-[14px] leading-[20px] tracking-[0] !text-white"
                        setBooking={setBooking}

                        salon={salon}
                        selectedSlot={selectedSlot}
                        date={date}
                        clearAll={clearAll}
                    />
                    {/* <BookingConfirmed SheetClosePayment={SheetClose} className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-[14px] leading-[20px] tracking-[0] !text-white">
                        Continue
                    </BookingConfirmed> */}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentDialogues