'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from '@/components/constants/Image'
import React, { useState } from 'react'
import Slider from 'react-slick'

const StyleCard = ({ images, style }: any) => {
    const [current, setCurrent] = useState(0);
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };
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
        <div className='md:aspect-[305/381] aspect-[177/229] relative rounded-2xl overflow-hidden'>
            <Slider {...settings} className='w-full md:aspect-[1.7452] aspect-[177/229]'>
                {style?.imageUrls?.map((img: any, i: any) => (
                    <div key={i}>
                        <Image width={305} height={381} alt='buzzcut' src={img} className='w-full h-full object-cover object-center rounded-2xl' />
                    </div>
                ))}
            </Slider>
            <div className='absolute top-0 left-0 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_23.36%,rgba(0,0,0,0.8)_60.94%,rgba(0,0,0,0.9)_77.89%,#000000_100%)] flex items-end md:px-[15px] px-[10px] py-[13px]'>
                <div className='absolute top-1/2 -translate-y-1/2 md:w-[calc(100%-30px)] w-[calc(100%-20px)] flex justify-between'>
                    <button className='bg-white rounded-full md:w-[30px] md:h-[30px] w-[20px] h-[20px] flex items-center justify-center'
                        onClick={prevSlide}
                    >
                        <ChevronLeft color='#000' />
                    </button>
                    <button className='bg-white rounded-full md:w-[30px] md:h-[30px] w-[20px] h-[20px] flex items-center justify-center'
                        onClick={nextSlide}
                    >
                        <ChevronRight color='#000' />
                    </button>
                </div>
                <div className='w-full'>
                    <p className='font-urbanist font-semibold md:text-[18px] text-[16px] leading-[130%] tracking-[0] mb-[2px] !text-white '>{style.name}</p>
                    <p className='font-urbanist font-normal md:text-[14px] text-[12px] leading-[130%] tracking-[0] text-xarfi-orange'>{style.masterName}</p>
                </div>
            </div>
        </div>
    )
}
interface props {
    className?: any;
    data?: any;
}
function Styles({ className = '2xl:grid-cols-4 lg:grid-cols-4 grid-cols-2', data }: props) {
    console.log(data, 'datadata styles')
    return (
        <div className={`grid md:gap-x-[21px] gap-x-[16px] md:gap-y-[20px] gap-y-[10px] ${className}`}>
            {data?.map((style: any, i: number) => (
                <StyleCard key={i} images={style?.imageUrls || []} style={style} />
            ))}
        </div>
    )
}

export default Styles