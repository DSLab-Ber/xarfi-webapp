"use client"
import React, { useEffect, useState } from 'react'
import Container from '../constants/Container'
import { LuMapPin } from "react-icons/lu";
import { EmailIcon, MapPin, PhoneIcon, SunIocn, UserIcon } from '../constants/Icons';
import { useTheme } from '../../providers/theme-provider';
import { RxHamburgerMenu } from "react-icons/rx";
import { languages } from '../../lib/i18n';
import { useLanguage } from '../../providers/language-provider';
import Flag from 'react-world-flags'

// shadcn/ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';

function Header({ }) {
  const [active, setActive] = useState('home')
  const { theme, toggleTheme, logo } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, setLanguage, language, languageFlag, setLanguageFlag } = useLanguage();

  let navigations = [
    { name: 'home', path: '#' },
    { name: 'categories', path: '#' },
    { name: 'salons', path: '#' },
    { name: 'contact', path: '#' },
    { name: 'about', path: '#' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top contact bar */}
      <div className='w-full pt-[22px] pb-[19px] max-md:hidden'>
        <Container>
          <div className='flex justify-between'>
            <div className='address'>
              <p className='flex items-center'>
                <span className='mr-[10px]'><MapPin /></span>
                {t('address')}
              </p>
            </div>
            <div className='flex gap-5'>
              <p className='flex items-center'>
                <span className='mr-[10px]'><EmailIcon /></span>
                {t('email')}
              </p>
              <p className='flex items-center'>
                <span className='mr-[10px]'><PhoneIcon /></span>
                {t('phone')}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className={`w-full mainHeader transition-all duration-300 ${isScrolled ? 'fixed left-0 top-0 z-50 bg-background-secondary py-3 shadow shadow-black' : ''}`}>
        <Container>
          <div className='w-full relative'>
            <div className='xl:px-[30px] px-[0] xl:h-[86px] flex justify-between items-center w-full'>
              <div className='absolute left-0 bg-background-secondary opacity-40 z-0 h-full w-full rounded-[25px]' />

              {/* Logo */}
              <div className='logoDiv z-10 relative'>
                <img width={122} height={56} src={logo} alt='Xarfi Logo' />
              </div>

              {/* Navigation */}
              <div className='bg-card-background max-lg:hidden rounded-[25px] h-full flex items-center justify-center gap-[23px] z-10 xl:px-[30px] px-6 xl:py-[18px] py-3 relative'>
                {navigations.map((nav, i) => (
                  <Link
                    key={i}
                    href={nav.path}
                    className={`xl:py-[15px] py-3 xl:px-[12.5px] px-2 font-medium xl:text-[18px] text-base xl:leading-[20px] tracking-[0] font-urbanist ${active === nav.name ? 'text-white bg-xarfi-orange rounded-[10px] shadow-lg' : 'text-secondary-color'}`}
                  >
                    {t(`navigation.${nav.name}`)}
                  </Link>
                ))}
              </div>

              {/* Right-side Actions */}
              <div className='flex gap-[21px] relative'>
                {/* Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='max-lg:hidden bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'>
                      <UserIcon className="xl:w-[33px] w-7 xl:h-[34px] h-7" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>{t('dropdown.accountTitle')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{t('dropdown.viewProfile')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('dropdown.setting')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('dropdown.logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Language Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='max-lg:hidden bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'>
                      <Flag code={languageFlag} className='rounded-full xl:w-[40px] w-8 xl:h-[40px] h-8 object-cover' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>{t('dropdown.languageTitle')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languages.map((lang, i) => (
                      <DropdownMenuItem key={i} onClick={() => { setLanguage(lang.code); setLanguageFlag(lang.flag); }}>
                        <div className='flex items-center'>
                          <Flag code={lang.flag} style={{ width: 24, height: 16 }} className='mr-3' />
                          {lang.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className='max-lg:hidden bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'
                >
                  <SunIocn className='xl:w-[33px] w-7 xl:h-[34px] h-7' />
                </button>

                {/* Mobile Menu (Sheet) */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className='bg-[#252424] lg:hidden text-[25px] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'>
                      <RxHamburgerMenu />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className='bg-background-secondary w-3/4'>
                    <div className='h-full flex flex-col justify-between'>
                      <div>
                        <div className='logoDiv z-10'>
                          <img width={122} height={56} src={logo} />
                        </div>

                        <div className='bg-card-background flex-col rounded-[25px] flex items-start mt-10 justify-center gap-[16px] z-10 px-3 py-3'>
                          {navigations.map((a, i) => (
                            <Link key={i} href={a.path} className={`py-2 capitalize px-2 font-medium text-base font-urbanist w-full ${active === a.name ? 'text-white bg-xarfi-orange rounded-[10px] shadow-lg' : 'text-secondary-color'}`}>{a.name}</Link>
                          ))}
                        </div>
                      </div>

                      <div className='flex gap-[21px] w-full justify-around'>
                        <button className='bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'><UserIcon className="xl:w-[33px] w-7 xl:h-[34px] h-7" /></button>
                        <button className='bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center'>
                          <img width={47} height={47} className='rounded-full xl:w-[47px] w-8 xl:h-[47px] h-8' src={'/assets/germany.svg'} />
                        </button>
                        <button className='bg-[#252424] xl:w-[53px] w-10 xl:h-[53px] h-10 rounded-full flex items-center justify-center' onClick={toggleTheme}>
                          <SunIocn className="xl:w-[33px] w-7 xl:h-[34px] h-7" />
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Header
