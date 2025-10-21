"use client"
import React, { useRef, useState } from 'react'
import Testimonialsbg from './../../assets/Testimonialsbg.png'
import Container from '../constants/Container'
import SubHeading from '../constants/SubHeading'
import Heading from '../constants/Heading'
import { ChevArrow, DoubleQuoted } from '../constants/Icons'
import Slider from 'react-slick'
import { useLanguage } from '../../providers/language-provider'
import Image from '../constants/Image'

function Testinomial() {
    const sliderRef = useRef<any>(null)
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [1, 2, 3, 4, 5]
    const settings = {
        className: "center",
        dots: true,
        centerMode: true,
        arrows: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerPadding: "10px",
                },
            }
        ],
        // draggable:true,
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    };
    return (
        <div className='Testinomial pt-[50px] pb-10' style={{ backgroundImage: `url('${Testimonialsbg}')` }}>
            <Container>
                <div className='flex justify-center items-center flex-col gap-[23px]'>
                    <SubHeading title={t('testimonial.reviews')} />
                    <div className='flex justify-between items-center md:gap-[84px] gap-6'>
                        <button onClick={() => sliderRef.current?.slickPrev()}>
                            <ChevArrow />
                        </button>
                        <Heading title={t('testimonial.what_clients_say')} className={"!text-white max-md:text-center"} />
                        <button className='rotate-180' onClick={() => sliderRef.current?.slickNext()}>
                            <ChevArrow />
                        </button>
                    </div>
                </div>
                <div className='sliderContainer TestinomialSlider mt-5 relative flex flex-col justify-center' data-aos="fade-zoom-in">
                    <Slider {...settings} ref={sliderRef}>
                        {slides.map((_, index) => {
                            let extraClass = '';
                            let image: any = '';
                            let imageClass = '';
                            if (index === currentSlide) {
                                extraClass = 'current-slide';
                                image = "/assets/sliderBg.png";
                            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                                extraClass = 'prev-slide';
                                image = "/assets/prvSlide.png";
                                imageClass = 'w-[76px] aspect-square rounded-full object-cover object-center absolute top-[-51px]';
                            } else if (index === (currentSlide + 1) % slides.length) {
                                extraClass = 'next-slide';
                                image = "/assets/nextSlide.png";
                            }
                            return (
                                <div className={`pt-[51px] mainSlide ${extraClass}`} key={index}>
                                    <div className='slide mx-auto flex justify-center items-centers max-w-[415px] w-full bg-contain bg-no-repeat' style={{ backgroundImage: `url('${image}')` }}>
                                        <div className='flex flex-col w-full justify-center items-center relative h-full px-[35px] pt-[88px] pb-[105px] slideContent'>
                                            <div className='imageBox absolute top-[-51px]'>
                                                <Image width={102} height={102} src={'/assets/clientImage.jpg'} alt='clientImage' className='w-[102px] aspect-square rounded-full object-cover object-center' />
                                            </div>
                                            <div className='content'>
                                                <div className='innerContent flex flex-col justify-center items-center'>
                                                    <h4 className='font-bold text-[24px] leading-[100%] tracking-[0%] text-center font-lato mb-[7px] !text-white'>Hannah Schmitt</h4>
                                                    <p className='font-normal text-[14px] leading-[100%] tracking-[0%] text-center font-urbanist mb-3 !text-white'>12345 Berlin, Germany</p>
                                                    <DoubleQuoted />
                                                    <p className='font-light text-[18px] leading-[22px] tracking-[0%] text-center font-urbanist mt-[7px] !text-white'>
                                                        {t('testimonial.testimonial_description')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </Container>
        </div>
    )
}

export default Testinomial




// let extraClass = ''
// let image = ""
// let imageClass = ""
// let nameClass = ""
// if (index === currentSlide) {
//     extraClass = 'current-slide'
//     image = sliderBg
//     imageClass = 'w-[102px] aspect-square rounded-full object-cover object-center absolute top-[-51px]'
//     nameClass = 'font-bold text-[24px] leading-[100%] tracking-[0%] text-center font-lato mb-[7px]'
// } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
//     extraClass = 'prev-slide'
//     image = prvSlide
//     imageClass = 'w-[76px] aspect-square rounded-full object-cover object-center absolute top-[-38px]'
//     nameClass = 'font-bold text-[18px] leading-[100%] tracking-[0%] text-center font-urbanist mb-[7px]'
// } else if (index === (currentSlide + 1) % slides.length) {
//     extraClass = 'next-slide'
//     image = nextSlide
//     imageClass = 'w-[76px] aspect-square rounded-full object-cover object-center absolute top-[-38px]'
//     nameClass = 'font-bold text-[18px] leading-[100%] tracking-[0%] text-center font-urbanist mb-[7px]'
// }