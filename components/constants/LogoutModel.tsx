"use client"
import React, { ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog'
import { LogoutIcon } from './Icons'
import { useAuthStore } from '@/stores/auth'
import { useParams, useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { useLanguage } from '@/providers/language-provider'
import { useProfileStore } from '@/stores/profile'

type Props = {
    children: ReactNode
}

function LogoutModel({ children }: Props) {
    const router = useRouter()
    const { lang }: any = useParams()
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const clearProfile = useProfileStore((state) => state.clearProfile);
    const { language } = useLanguage();

    return (
        <Dialog>
            <DialogTrigger className='w-full'>{children}</DialogTrigger>
            <DialogContent showCloseButton={false} className='border-none p-[50px] !max-w-[516px] w-full rounded-2xl'>
                <div className='w-full flex flex-col items-center justify-center gap-5'>
                    <LogoutIcon />
                    <div className='text-center gap-1'>
                        <h5 className='font-urbanist font-bold md:text-[20px] text-[18px] leading-[28px] tracking-[0]'>Logging Out?</h5>
                        <p className='font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center'>Are you sure you want to logout on this device?</p>
                    </div>
                    <div className='grid grid-cols-2 gap-5 w-full'>
                        <DialogClose>
                            <button className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[14px] font-urbanist font-semibold md:text-[20px] text-[16px] leading-[20px] tracking-[0] !text-white">
                                No
                            </button>
                        </DialogClose>
                        <button className='font-urbanist font-semibold text-[16px] leading-[20px] !text-white tracking-[0] rounded-2xl bg-[#FF0F0F] w-full md:py-[18px] py-[16px]'
                            onClick={() => {
                                console.log('asdasdasdasdas')
                                Cookies.remove("token")
                                Cookies.remove("role")
                                clearAuth()
                                clearProfile()
                                router.push(`/${lang}/user/login`); // redirect after logout
                            }}
                        >
                            Yes, Logout
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutModel