"use client"
import React, { useRef } from 'react'
import bgTexture from './../../assets/bgTexture.png'
import Container from '../constants/Container'
import SubHeading from '../constants/SubHeading'
import Heading from '../constants/Heading'

import Slider from 'react-slick'
import SalonImages from './../../assets/SalonImages.png'
import { ArrowIcon, LocPin, RatingStar } from '../constants/Icons'
import { useLanguage } from '../../providers/language-provider'

function Salon() {
    const sliderRef = useRef<any>(null)
    const { t } = useLanguage();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }
    return (
        <div className='bg-xarfi-orange'>
            <div className='Salon py-[43px]' style={{ backgroundImage: `url('${bgTexture}')` }}>
                <Container>
                    <div className='flex justify-center items-center flex-col gap-[23px]'>
                        <SubHeading title={t('salons.salons')} className="border-black !text-black !bg-[#1212121A] !px-10" />
                        <Heading title={t('salons.most_visited_salons')} className={"text-white"} />
                    </div>
                    <div className='w-full mt-[82px] relative ' >
                        <button
                            className={"absolute z-10 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-lg xl:w-[70px] w-[50px] aspect-square flex items-center justify-center left-[-10px]"}
                            // style={{ ...style, display: "block" }}
                            onClick={() => {
                                sliderRef.current?.slickPrev()
                            }}
                            data-aos="fade-zoom-in" data-aos-delay="400"
                        >
                            <ArrowIcon />
                        </button>
                        <div className='w-full' data-aos="fade-zoom-in">

                            <Slider ref={sliderRef}  {...settings}>
                                {[1, 2, 3, 4].map(() => (
                                    <div className='px-[10px]'>

                                        <div className='bg-background-secondary rounded-[25px] overflow-hidden'>
                                            <div className='w-full aspect-[1.7452] bg-cover bg-center p-[25px] flex justify-end items-start' style={{ backgroundImage: `url('${SalonImages}')` }}>
                                                <div className='bg-[#16A34A] rounded-full font-urbanist font-semibold text-[18px] leading-[130%] tracking-[0] text-white py-[5px] px-[19px]'>
                                                    Open
                                                </div>
                                            </div>
                                            <div className='p-[25px] flex justify-between items-start'>
                                                <div>
                                                    <p className="font-urbanist font-bold text-[24px] leading-[130%] tracking-[0] mb-[5px]">Coiffeur bei Yousef</p>
                                                    <p className='flex items-center font-urbanist font-medium text-[16px] leading-[130%] tracking-[0] mb-[10px] text-[#ACACAC]'><LocPin className="mr-[6px]" /> Berlin, Germany | 1.2 Kms Away</p>
                                                    <p className="font-urbanist font-medium text-[16px] leading-[130%] tracking-[0] !text-[#00FF5E]">Next Available: Today, 3:00 AM</p>
                                                </div>
                                                <div className="font-urbanist font-semibold text-[22px] leading-[84%] tracking-[0] flex items-center">
                                                    <RatingStar className="mr-[5px]" />
                                                    4.5
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <button
                            className={"absolute rotate-180 z-10 top-[50%] translate-y-[-50%] bg-white rounded-full shadow-lg xl:w-[70px] w-[50px] aspect-square flex items-center justify-center right-[-10px]"}
                            // style={{ ...style, display: "block" }}
                            onClick={() => {
                                sliderRef.current?.slickNext()
                            }}
                            data-aos="fade-zoom-in" data-aos-delay="400"
                        >
                            <ArrowIcon />
                        </button>
                    </div>
                    <div className='w-full flex justify-center mt-20' data-aos="fade-zoom-in">
                        <button className='bg-background font-urbanist font-semibold text-[20px] leading-[20px] tracking-[0px] px-[91px] py-[22.5px] rounded-2xl'>
                            {t('viewMore')}
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Salon