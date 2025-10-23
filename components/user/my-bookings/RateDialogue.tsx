import { CloseIcon } from '@/components/constants/Icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SheetClose } from '@/components/ui/sheet';
import React, { ReactNode, useEffect, useState } from 'react'
import Rating from '../constants/Rating';
import { useParams } from 'next/navigation';
import { bookingRating } from '@/lib/api/user/User';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Spinner from '@/components/constants/Spinner';

type Props = {
    open: boolean;
    onOpenChange: any;
    setGivenRating: any;
    masterId: string;
    ownerId: string;
    bookingId: string;

}

function RateDialogue({ open, onOpenChange, setGivenRating, masterId, ownerId,bookingId }: Props) {
    const { lang, id } = useParams()
    const [data, setData] = useState({
        owner: ownerId,
        master: masterId,
        salonRating: 0,
        salonReview: "",
        masterRating: 0,
        masterReview: "",
        bookingAppointment: ""
    })
    useEffect(() => {
        if (open) {
            setData(prv => ({ ...prv, owner: ownerId, master: masterId, bookingAppointment: bookingId }))
        }
    }, [ownerId, masterId, open])

    const mutation = useMutation({
        mutationFn: () => bookingRating(data, lang as string),
        onSuccess: ({ data }) => {

        },
        onError: (err: any) => {
            toast.error(err.message || "Invalid credentials");
        },
    });


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className='border-none p-[30px] !max-w-[429px] w-full'>
                <div className='w-full'>
                    {/* <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                        <p className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>Rate Salon</p>
                        <SheetClose asChild>
                            <button><CloseIcon /></button>
                        </SheetClose>
                    </div> */}
                    <div className='grid gap-5'>
                        <div className='w-full'>
                            <div className='w-full grid gap-2.5'>
                                <p className='font-urbanist font-bold text-[18px] leading-[28px] tracking-[0]'>Rate Salon</p>
                                <div className='flex justify-center'>
                                    <Rating rating={data?.salonRating} setRating={(r: number) => {
                                        setData(prv => ({ ...prv, salonRating: r }))
                                    }} />
                                </div>
                                <textarea rows={6} value={data.salonReview} className='font-urbanist w-full font-normal text-[16px] leading-[14px] tracking-[0] p-[15px] rounded-2xl bg-[#EBEBEB] dark:bg-[#1E1E1E]' placeholder='Write a review'
                                    onChange={(ev) => {
                                        setData(prv => ({ ...prv, salonReview: ev.target.value }))
                                    }}
                                >

                                </textarea>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full grid gap-2.5'>
                                <p className='font-urbanist font-bold text-[18px] leading-[28px] tracking-[0]'>Rate Master</p>
                                <div className='flex justify-center'>
                                    <Rating rating={data?.masterRating} setRating={(r: number) => {
                                        setData(prv => ({ ...prv, masterRating: r }))
                                    }} />
                                </div>
                                <textarea rows={6} value={data.masterReview} className='font-urbanist w-full font-normal text-[16px] leading-[14px] tracking-[0] p-[15px] rounded-2xl bg-[#EBEBEB] dark:bg-[#1E1E1E]' placeholder='Write a review'
                                    onChange={(ev) => {
                                        setData(prv => ({ ...prv, masterReview: ev.target.value }))
                                    }}
                                >

                                </textarea>
                            </div>
                        </div>
                        <SheetClose asChild>
                            <button disabled={mutation.isPending} className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-sm leading-[20px] tracking-[0] !text-white"
                                onClick={() => {
                                    mutation.mutate()
                                }}
                            >

                                {mutation.isPending ? <Spinner /> : 'Submit'}
                            </button>
                        </SheetClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default RateDialogue