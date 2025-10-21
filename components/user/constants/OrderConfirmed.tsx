"use client"
import { CalendarIcon, LocPin, MapPin, MastercardIcon, SuccessCircleIcon } from '@/components/constants/Icons';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SheetClose } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useProductStore } from '@/stores/productCart';
import { Clock } from 'lucide-react';
import Image from '@/components/constants/Image';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'
import { toggleOrderNotifcation } from '@/lib/api/user/User';
import { toast } from 'sonner';

type Props = {
    className?: string;
    open?: boolean;
    setOpen: (open: boolean) => void;
    orderDetails?: any;
}

function OrderConfirmed({ className, open, setOpen, orderDetails }: Props) {
    const { id }: any = useParams()
    const [checked, setChecked] = useState(false)
        const [reminderLoader, setReminderLoader] = useState(false)
    const onCheckedChange = () => {
        setChecked(!checked)
    }
    const {
        getProductsForOwner,
        removeProductForOwner,
        clearProductsForOwner
    } = useProductStore();
    const productList = getProductsForOwner(id)
    useEffect(() => {
        console.log("Dialog open:", open);
    }, [open]);

    const reminder = async () => {
        setReminderLoader(true);
        await toggleOrderNotifcation(orderDetails?._id)
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
            <Dialog open={open} onOpenChange={(nextOpen) => {
                console.log(nextOpen, 'Dialog state')
                setOpen(nextOpen)
                if (!nextOpen) {
                    clearProductsForOwner(id)

                }
            }}
            >
                <DialogContent showCloseButton={false} className='border-none md:p-[50px] py-6 px-4 !max-w-[861px] w-full max-md:h-screen overflow-auto'>
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <div className='flex flex-col items-center gap-3'>
                            <SuccessCircleIcon />
                            <p className='font-urbanist font-semibold text-[24px] leading-[20px] tracking-[0] text-center'>Order Confirmed</p>
                            <h4 className='font-urbanist font-bold text-[32px] leading-[80%] tracking-[0] text-center !text-[#FF8C26]'>€ {orderDetails?.total}</h4>
                        </div>
                        <div className='w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-5'>
                            <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Order Details</p>
                                <h5 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[20px] tracking-[0]'>Products</h5>
                                <div className='w-full grid gap-2.5'>
                                    {orderDetails?.items?.map((a: any, i: number) => (
                                        <div key={i} className="bg-[#F3F3F3] dark:bg-[#252424] py-2.5 px-2.5 rounded-[8px] flex justify-between items-center">
                                            <div className="flex items-center gap-2.5 ">
                                                <Image width={51} height={51} alt='prduct' src={a?.product?.image} className='rounded-2xl w-[51px] aspect-square object-cover' />
                                                <div className='grid gap-2.5'>
                                                    <h5 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[130%] tracking-[0]'>({a?.quantity}x) {a?.product?.name}</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex gap-[15px] flex-col items-end'>
                                                    <h4 className="font-urbanist font-bold md:text-[16px] text-[20px] leading-[80%] tracking-[0]">€ {a?.productPrice}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='h-full flex justify-between flex-col'>
                                    <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                        <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Salon Details</p>
                                        <h5 className='font-urbanist font-bold text-[20px] leading-[130%] tracking-[0] mb-0'>Coiffeur bei Yousef</h5>
                                        <div className='flex items-center gap-1.5 font-urbanist font-medium text-[14px] leading-[130%] tracking-[0]'>
                                            <LocPin />
                                            Berlin, Germany | 1.2 Kms Away
                                        </div>
                                    </div>
                                    <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                        <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[20px] tracking-[0] !text-[#FF8C26] bg-background absolute top-[-10px] px-[3px] left-[18px]'>Payment Method</p>
                                        <div className='flex items-center justify-between'>
                                            <h5 className='font-urbanist font-bold text-[20px] leading-[130%] tracking-[0] mb-0'>***************4854</h5>
                                            <MastercardIcon />
                                        </div>
                                    </div>
                                    <div className='border border-[#FF8C264D] rounded-2xl  p-[15px] pt-5 grid gap-2.5 relative'>
                                        <div className='flex items-center justify-between'>
                                            <h5 className='font-urbanist font-bold md:text-[20px] text-sm leading-[130%] tracking-[0] mb-0'>Send Reminder</h5>
                                            <Switch
                                                checked={checked}
                                                onCheckedChange={reminder}
                                                className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
      `}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <button className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-base leading-[20px] tracking-[0] !text-white">
                                Done
                            </button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default OrderConfirmed