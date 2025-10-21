"use client"
import React from 'react'
import Container from '../constants/Container'
import SubHeading from '../constants/SubHeading'
import { useLanguage } from '../../providers/language-provider'
import Image from '../constants/Image'

function DownloadSection() {
    const { t } = useLanguage();
    return (
        <div className='DownloadSection py-[50px]'>
            <Container>
                <div className='bg-[#FF8C261A] w-full md:py-9 md:pl-[70px] p-6 rounded-[50px]'>
                    <div className='w-full flex md:flex-row flex-col justify-between'>
                        <div className='flex-1/2 flex items-center'>
                            <div className='content flex flex-col gap-[25px] justify-center items-start'>
                                <SubHeading title={t('download.download')} />
                                <div className='flex flex-col gap-5'>
                                    <h1
                                        className='font-bold md:text-[55px] text-[40px] md:leading-[66px] leading-normal tracking-[0px] font-urbanist'
                                        data-aos='fade-right'
                                    >
                                        {t('download.heading_start')} <br />
                                        <span className='text-xarfi-orange'>{t('download.android')}</span> &{' '}
                                        <span className='text-xarfi-orange'>{t('download.ios')}</span>
                                    </h1>
                                    <p
                                        className='font-normal text-[16px] leading-[27px] tracking-[0%] font-urbanist'
                                        data-aos='fade-right'
                                    >
                                        {t('download.description')}
                                    </p>
                                </div>
                                <div className='flex gap-[35px]'>
                                    <button data-aos='fade-zoom-in' data-aos-delay='300'>
                                        <Image
                                            width={149}
                                            height={46}
                                            className='object-contain w-[149px] h-[46px]'
                                            src={'/assets/googleIdentification.png'}
                                            alt='Download on Play Store'
                                        />
                                    </button>
                                    <button data-aos='fade-zoom-in' data-aos-delay='600'>
                                        <Image
                                            width={149}
                                            height={46}
                                            className='object-contain w-[149px] h-[46px]'
                                            src={'/assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'}
                                            alt='Download on App Store'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1/2 pt-[64px]' data-aos='fade-zoom-in' data-aos-delay='600'>
                            <Image width={300} height={300} src={'/assets/Black-Titanium.png'} alt='App preview' />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DownloadSection