"use client"
import React from 'react'
import Container from '../constants/Container'
import businessBgTexture from './../../assets/businessBgTexture.png'
import { CTAArrow } from '../constants/Icons'
import { useLanguage } from '../../providers/language-provider'
import Image from '../constants/Image'
function Business() {
    const { t } = useLanguage();

    return (
        <div className='Business bg-background py-[50px]'>
            <Container>
                <div className='w-full bg-background-secondary rounded-[50px] md:px-[60px] md:pt-[46px] md:pb-[38px] p-6'>
                    <div
                        className='w-full flex md:flex-row flex-col justify-between items-center'
                        style={{ backgroundImage: `url('${businessBgTexture}')` }}
                    >
                        <div className='max-w-[580px] w-full'>
                            <h4
                                className='font-urbanist font-bold md:text-[64px] text-[50px] leading-[100%] tracking-[0] mb-5'
                                data-aos='fade-right'
                            >
                                <span className='text-xarfi-orange'>Xarfi</span> {t('business.for')}
                                <br className='max-md:hidden' /> {t('business.title')}
                            </h4>
                            <p
                                className='font-urbanist font-normal text-[24px] leading-[100%] tracking-[0] mb-5'
                                data-aos='fade-right'
                            >
                                {t('business.description')}
                            </p>
                            <div className='flex flex-col gap-3 mt-5'>
                                {[0, 1, 2].map((i) => (
                                    <p
                                        key={i}
                                        className='flex items-center font-urbanist font-normal text-[20px] leading-[100%] tracking-[0]'
                                        data-aos='fade-right'
                                        data-aos-delay={200 * (i + 1)}
                                    >
                                        <span className='mr-[17px]'>
                                            <Image alt='barbar.png' width={300} height={300} src={'/assets/barbarSeat.svg'} />
                                        </span>
                                        {t(`business.point${i + 1}`)}
                                    </p>
                                ))}
                            </div>
                            <button
                                className='bg-xarfi-orange text-white flex items-center justify-center gap-1 h-[65px] max-w-[309px] w-full font-urbanist font-semibold text-[20px] leading-[20px] tracking-[0] rounded-2xl mt-[39px]'
                                data-aos='fade-right'
                            >
                                {t('business.cta')} <CTAArrow />
                            </button>
                        </div>
                        <div className='max-md:p-6' data-aos='fade-zoom-in'>
                            <Image alt='barbar.png' width={300} height={300} src={'/assets/barbar.png'} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Business