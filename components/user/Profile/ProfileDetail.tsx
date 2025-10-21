"use client"
import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import DeleteAccount from '@/components/constants/DeleteAccount'
import { LocPin, MailIcon, PhoneInputIcon, UserIcon } from '@/components/constants/Icons'
import { useProfileStore } from '@/stores/profile'
import Image from '@/components/constants/Image'
import Link from 'next/link'
import React from 'react'

type Props = {
    lang: string;
}

function ProfileDetail({ lang }: Props) {
    const { profile } = useProfileStore(); // 👈 from Zustand



    return (
        <div className='pb-[50px]'>
            <Container>
                <div className='flex items-center justify-between md:pt-[50px] md:pb-[30px] pt-6 pb-5'>
                    <div className='flex gap-[15px] items-center bg-background sticky top-0 '>
                        <BackButton />
                        <h5 className='font-urbanist font-semibold md:text-[20px] text-xl leading-[130%] tracking-[0]'>Profile Details</h5>
                    </div>
                    <Link href={`/${lang}/profile/edit`}>
                        <button className='md:bg-[#FF8C261A] text-xarfi-orange py-[14px] px-[46px] rounded-[8px]'>
                            Edit
                        </button>
                    </Link>
                </div>
                <div className='lg:max-w-[456px] max-w-full w-full grid gap-[30px]'>
                    <div className='w-full'>
                        <Image width={189} height={189} alt={profile?.image || "unknown"} className='rounded-full mx-auto max-md:w-[118px] aspect-square' src={'/assets/joseph.jpg'} />
                    </div>
                    <div className='grid gap-5'>
                        {/* Full Name */}
                        <div className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                            <div className='flex flex-1 items-center justify-between gap-2.5'>
                                <span className='font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>{profile?.name}</span>
                                <span className='font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0] !text-[#FF8C26] capitalize'>{profile?.gender}</span>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                            <div className='flex flex-1 items-center gap-2.5 font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>
                                <UserIcon className="w-5" />
                                {profile?.name}
                            </div>
                        </div>

                        {/* Email */}
                        <div className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                            <div className='flex flex-1 items-center gap-2.5 font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>
                                <span className='!text-[#FF8C26]'>
                                    <MailIcon />
                                </span>
                                {profile?.name}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                            <div className='flex flex-1 items-center gap-2.5 font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>
                                <PhoneInputIcon />
                                {profile?.phoneNumber}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                            <div className='flex flex-1 items-center gap-2.5 font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>
                                <span className='!text-[#FF8C26]'>
                                    <LocPin />
                                </span>
                                {profile?.location?.address}
                            </div>
                        </div>
                    </div>
                    <div className='w-full max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:px-4 max-lg:py-[30px] max-lg:bg-background'>
                        <DeleteAccount lang={lang}>
                            <button className='font-urbanist font-semibold text-[16px] leading-[20px] !text-white tracking-[0] rounded-2xl bg-[#FF0F0F] w-full py-[18px] sticky'>
                                Delete Account
                            </button>
                        </DeleteAccount>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ProfileDetail