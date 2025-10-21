"use client"
import React from 'react'
import Container from '../constants/Container'
import footerBg from './../../assets/footerBg.png'
import { FacebookIcon, LinkedInIcon, TwiterIcon } from '../constants/Icons'
import { useTheme } from '../../providers/theme-provider'
import { useLanguage } from '../../providers/language-provider'
import Link from 'next/link'
function Footer() {
    const { theme, toggleTheme, logo } = useTheme();
    const { t } = useLanguage();

    return (
            <div className='Footer bg-background'>
      <div className='w-full' style={{ backgroundImage: `url('${footerBg}')` }}>
        <Container>
          <div className='w-full grid lg:grid-cols-4 grid-cols-2 lg:grid-row-1 grid-row-2 gap-6 pt-[50px] pb-7'>
            <div>
              <img width={180.55} height={83} src={logo} />
            </div>
            <div className='flex flex-col items-start'>
              <h6 className="font-urbanist font-medium text-white text-[20px] leading-[100%] tracking-[0] px-[7px] bg-xarfi-orange rounded-[7px]">
                {t('footer.quickLinks')}
              </h6>
              <div className='flex flex-col mt-[25px] gap-[15px]'>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.home')}</Link>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.categories')}</Link>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.services')}</Link>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.contactUs')}</Link>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.aboutUs')}</Link>
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <h6 className="font-urbanist font-medium text-white text-[20px] leading-[100%] tracking-[0] px-[7px] bg-xarfi-orange rounded-[7px]">
                {t('footer.legal')}
              </h6>
              <div className='flex flex-col mt-[25px] gap-[15px]'>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.terms')}</Link>
                <Link href='#' className='font-normal text-[18px] font-urbanist'>{t('footer.privacy')}</Link>
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <h6 className="font-urbanist font-medium text-white text-[20px] leading-[100%] tracking-[0] px-[7px] bg-xarfi-orange rounded-[7px]">
                {t('footer.contact')}
              </h6>
              <div className='flex flex-col mt-[25px] gap-[20px]'>
                <a href='mailto:info@xarfi.com' className='font-normal text-[18px] font-urbanist'>
                  {t('footer.email')}
                </a>
                <a href='tel:555-567-8901' className='font-normal text-[18px] font-urbanist'>
                  {t('footer.phone')}
                </a>
                <p className='font-normal text-[18px] font-urbanist'>
                  {t('footer.address.line1')} <br />
                  {t('footer.address.line2')}
                </p>
              </div>
            </div>
          </div>

          <div className='w-full border-t border-t-[#252424] py-[30px] flex md:flex-row justify-between flex-col max-md:gap-6'>
            <div className='flex gap-5 max-md:justify-center'>
              <a href="#" className=' hover:text-xarfi-orange'><LinkedInIcon className={""} /></a>
              <a href="#" className=' hover:text-xarfi-orange'><FacebookIcon className={""} /></a>
              <a href="#" className=' hover:text-xarfi-orange'><TwiterIcon className={""} /></a>
            </div>
            <div className='font-normal text-[18px] max-md:text-center font-urbanist'>
              {t('footer.copyright')}
            </div>
          </div>
        </Container>
      </div>
    </div>
    )
}

export default Footer