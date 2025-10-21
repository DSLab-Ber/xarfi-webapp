"use client"
import React from 'react'
import { LocPin, RatingStar } from './Icons'
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from './Image';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { useParams } from 'next/navigation';
interface PropType {
    salon: any;
}

export function SaloonCardSkeleton() {
    return (
        <div className="bg-background-secondary rounded-[25px] overflow-hidden">
            {/* Image / slider placeholder */}
            <div className="w-full md:aspect-[1.7452] aspect-[370/162] relative">
                <Skeleton className="w-full h-full" />
                <div className="absolute md:top-[25px] md:right-[25px] top-[10px] right-[10px]">
                    <Skeleton className="h-[28px] md:h-[36px] w-[70px] md:w-[90px] rounded-full" />
                </div>
            </div>

            {/* Content */}
            <div className="md:p-[25px] p-2.5 flex justify-between items-start">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 md:h-6 w-40" />
                    <Skeleton className="h-4 md:h-5 w-52" />
                    <Skeleton className="h-4 md:h-5 w-32" />
                </div>
                <Skeleton className="h-5 md:h-6 w-12" />
            </div>
        </div>
    )
}

function SaloonCard({ salon }: PropType) {
    const { lang } = useParams()
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    }
    return (
        <Link href={`/${lang}/home/salon/${salon?.owner}`}>
            <div className='bg-background-secondary rounded-[25px] overflow-hidden'>
                <div className='w-full md:aspect-[449/260] aspect-[370/162] bg-cover bg-center flex justify-end items-start relative salonCardSlider' >
                    <Slider {...settings} className='w-full md:aspect-[1.7452] aspect-[370/162]'>
                        {salon?.imageUrls?.map((img: string, i: number) => (
                            <div className='w-full md:aspect-[449/260] aspect-[370/162]' key={i}>
                                <Image width={449} height={260} alt={salon.name} src={img || '/assets/imageplaceholder.png'} className='md:aspect-[1.7452] max-md:aspect-[370/162] object-center object-cover'/>
                            </div>
                        ))}
                    </Slider>
                    <div className='bg-[#16A34A] absolute md:top-[25px] md:right-[25px] top-[10px] right-[10px] rounded-full font-urbanist font-semibold md:text-[18px] text-[12px] leading-[130%] tracking-[0] !text-white py-[5px] md:px-[19px] px-[15px]'>
                        Open
                    </div>
                </div>
                <div className='md:p-[25px] p-2.5 flex justify-between items-start'>
                    <div>
                        <p className="font-urbanist font-bold md:text-[20px] text-base leading-[130%] tracking-[0] mb-[5px]">{salon?.name}</p>
                        <p className='flex items-center font-urbanist font-medium md:text-[16px] text-[13px] leading-[130%] tracking-[0] mb-[10px] !text-[#ACACAC]'><LocPin className="mr-[6px] max-md:w-[11px]" /> {salon?.location?.address?.split(',')[0]} | {salon?.distance}</p>
                        <p className="font-urbanist font-medium md:text-[16px] text-[13px] leading-[130%] tracking-[0] !text-[#00FF5E]">{salon?.nextAvailable}</p>
                    </div>
                    <div className="font-urbanist font-semibold md:text-[20px] text-base leading-[84%] tracking-[0] flex items-center">
                        <RatingStar className="mr-[5px] max-md:w-[16px]" />
                        {salon?.averageRating || 0}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SaloonCard