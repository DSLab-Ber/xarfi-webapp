import { CloseIcon } from '@/components/constants/Icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SheetClose } from '@/components/ui/sheet';
import React, { ReactNode, useState } from 'react'
import Rating from '../constants/Rating';

type Props = {
    children: ReactNode;
}

function RateDialogue({ children }: Props) {
    const [rating, setRating] = useState(0)
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
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
                                    <Rating rating={rating} setRating={setRating} />
                                </div>
                                <textarea rows={6} className='font-urbanist w-full font-normal text-[16px] leading-[14px] tracking-[0] p-[15px] rounded-2xl bg-[#EBEBEB] dark:bg-[#1E1E1E]' placeholder='Write a review'>

                                </textarea>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full grid gap-2.5'>
                                <p className='font-urbanist font-bold text-[18px] leading-[28px] tracking-[0]'>Rate Master</p>
                                <div className='flex justify-center'>
                                    <Rating rating={rating} setRating={setRating} />
                                </div>
                                <textarea rows={6} className='font-urbanist w-full font-normal text-[16px] leading-[14px] tracking-[0] p-[15px] rounded-2xl bg-[#EBEBEB] dark:bg-[#1E1E1E]' placeholder='Write a review'>

                                </textarea>
                            </div>
                        </div>
                        <SheetClose asChild>
                            <button className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-sm leading-[20px] tracking-[0] !text-white">
                                Submit
                            </button>
                        </SheetClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default RateDialogue