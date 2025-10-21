"use client"
import React from 'react'
import Container from '../constants/Container'
import { LocationIcon, MapPin } from '../constants/Icons'
import { useLanguage } from '../../providers/language-provider'
import Image from '../constants/Image'

function HeroSection() {
    const { t } = useLanguage();

    return (
        <div className='HeroSection'>
            <Container>
                <div className='flex justify-between gap-5 items-center md:pt-[107px] md:pb-[68px] md:pl-[47px] md:pr-6 px-3 py-5 pb-7'>
                    <div className='lg:max-w-[612px] w-full'>
                        <div>
                            <h1 className='font-bold xl:text-[60px] text-[50px] leading-[100%] tracking-[2px] font-urbanist' data-aos="fade-right">
                                <span className='text-xarfi-orange'>{t('hero.find')}</span>, <span className='text-xarfi-orange'>{t('hero.book')}</span> & <span className='text-xarfi-orange'>{t('hero.connect')}</span> {t('hero.with')}
                                <span className='text-xarfi-orange'> {t('hero.salons')}</span>
                            </h1>
                            <p className='font-semibold xl:text-[26px] text-5 leading-[100%] tracking-[0] font-urbanist mt-[26px]' data-aos="fade-right">
                                {t('hero.subtitle')}
                            </p>
                        </div>

                        <div className='bg-background px-[29.5px] py-[23.5px] rounded-[25px] flex flex-col items-center mt-[50px] gap-5 shadow-[0px_4px_34.5px_0px_#FF8C2626]' data-aos="flip-right">
                            <div className='bg-background-secondary py-[6px] px-[10px] rounded-full flex gap-[10px]'>
                                <div className='cursor-pointer text-foreground font-semibold text-[16px] py-[5px] px-[10px] leading-[130%] tracking-[0] font-urbanist'>{t('hero.all')}</div>
                                <div className='cursor-pointer text-foreground font-semibold text-[16px] py-[5px] px-[10px] leading-[130%] tracking-[0] font-urbanist'>{t('hero.men')}</div>
                                <div className='cursor-pointer text-foreground font-semibold text-[16px] py-[5px] px-[10px] leading-[130%] tracking-[0] font-urbanist'>{t('hero.women')}</div>
                                <div className='cursor-pointer text-foreground font-semibold text-[16px] py-[5px] px-[10px] leading-[130%] tracking-[0] font-urbanist'>{t('hero.children')}</div>
                            </div>

                            <label className='bg-background-secondary p-[15px] rounded-2xl w-full flex items-center gap-[15px]'>
                                <span>
                                    <MapPin width='35' height='35' outerFill='#FF8C26' iconFill='#fff' />
                                </span>
                                <input placeholder={t('hero.placeholder')} className='mr-[15px] flex-1 outline-none' />
                                <LocationIcon />
                            </label>

                            <button className='w-full bg-xarfi-orange rounded-2xl py-[18px]'>
                                {t('hero.button')}
                            </button>
                        </div>

                        <div className='mt-[50px]'>
                            <p className='font-urbanist font-normal text-[22px] leading-[100%] tracking-[0px]' data-aos="fade-zoom-in" data-aos-delay="100">{t('hero.download')}</p>
                            <div className='mt-5 flex gap-10'>
                                <button data-aos="fade-zoom-in" data-aos-delay="300">
                                    <Image alt='image' width={149} height={46} className='object-contain w-[149px] h-[46px]' src={'/assets/googleIdentification.png'} />
                                </button>
                                <button data-aos="fade-zoom-in" data-aos-delay="600">
                                    <Image alt='image' width={149} height={46} className='object-contain w-[149px] h-[46px]' src={'/assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='xl:max-w-[550px] max-w-[450px] relative w-full xl:aspect-[0.9322] aspect-square lg:flex hidden items-center'>
                        <Image alt='image' width={20} height={20} src={'/assets/lineArrow.png'} className='absolute left-0 top' />
                        <Image alt='image' width={400} height={400} src={'/assets/heroImage1.png'} className='absolute left-[7%] top-[7%] max-w-[36.8%] w-full object-cover aspect-square rounded-full' data-aos="fade-zoom-in" />
                        <Image alt='image' width={400} height={400} src={'/assets/heroImage2.png'} className='absolute right-0 top-0 max-w-[62.8%] w-full object-cover aspect-square rounded-full' data-aos="fade-zoom-in" data-aos-delay="200" />
                        <Image alt='image' width={400} height={400} src={'/assets/heroImage3.png'} className='absolute left-0 bottom-0 max-w-[54%] w-full object-cover aspect-square rounded-full' data-aos="fade-zoom-in" />
                        <Image alt='image' width={400} height={400} src={'/assets/heroImage4.png'} className='absolute right-[5%] bottom-[15%] max-w-[36.8%] w-full object-cover aspect-square rounded-full' data-aos="fade-zoom-in" data-aos-delay="200" />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HeroSection