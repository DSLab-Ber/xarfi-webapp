"use client"
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Flag from 'react-world-flags';
import { languages } from '../../../../lib/i18n';
import { useLanguage } from '../../../../providers/language-provider';
import { useTheme } from '../../../../providers/theme-provider';

// shadcn/ui
import Container from '@/components/constants/Container';
import { BellIcon, CalendarCustomIcon, CheckCircleIcon, ClockIcon, LocationIcon, LocPin, MailIcon, MapPin, SunIocn, UserIcon } from '@/components/constants/Icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import Image from '@/components/constants/Image';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import LogoutModel from '@/components/constants/LogoutModel';
import ChangePassword from '@/components/constants/ChangePassword';
import HelpAndSupportDialog from '@/components/constants/HelpAndSupportDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useProfileStore } from '@/stores/profile';
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie"
import { changeLanguageApi } from '@/lib/api/user/settings';
import { toast } from 'sonner';
import { useLocation } from '@/lib/LocationProvider';
interface props {
    className?: string
    style?: any;
}

const SearchBar = () => {
    const { t, setLanguage, language, languageFlag, setLanguageFlag } = useLanguage();
    const { location } = useLocation()
    return (
        <label className='bg-background-secondary p-[15px] rounded-2xl w-full flex items-center gap-[15px]'>
            <span>
                <MapPin width='35' height='35' outerFill='#FF8C26' iconFill='#fff' />
            </span>
            <input placeholder={t('hero.placeholder')} className='mr-[15px] flex-1 outline-none' value={`${location?.[0]}, ${location?.[1]}`}/>
            <LocationIcon />
        </label>
    )
}

function Header({ className, style }: props) {
    const router = useRouter()
    const params = useParams();
    const pathname = usePathname();
    const langParam = params?.lang as string; // "de" in your exampl
    const [active, setActive] = useState('home')
    const { theme, toggleTheme, logo } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, setLanguage, language, languageFlag, setLanguageFlag } = useLanguage();
    const { profile } = useProfileStore(); // 👈 from Zustand

    let navigations = [
        { name: 'home', path: '#' },
        { name: 'categories', path: '#' },
        { name: 'salons', path: '#' },
        { name: 'contact', path: '#' },
        { name: 'about', path: '#' },
    ]
    const notifications = [
        {
            day: "Today",
            notification: [
                {
                    type: 'Reminder',
                    icon: <ClockIcon />
                },
                {
                    type: 'Success',
                    icon: <CheckCircleIcon />
                },
                {
                    type: 'Booking Confirmed',
                    icon: <CalendarCustomIcon width={18} height={20} className="" />

                }
            ],
        },
        {
            day: "Yesterday",
            notification: [
                {
                    type: 'Reminder',
                    icon: <ClockIcon />
                },
                {
                    type: 'Success',
                    icon: <CheckCircleIcon />
                },
                {
                    type: 'Booking Confirmed',
                    icon: <CalendarCustomIcon width={18} height={20} className="" />

                }
            ],
        }
    ]
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const mutation = useMutation({
        mutationFn: (lang: string) => changeLanguageApi(lang),
        onSuccess: (data) => {
            toast.success(data?.message || "Language changed");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to change language");
        },
    });


    const changeLanguage = (lang: any) => {
        setLanguage(lang.code);
        setLanguageFlag(lang.flag);

        const pathname = usePathname();
        const router = useRouter();
        const searchParams = useSearchParams();

        // split pathname and swap lang segment
        const segments = pathname.split("/");
        segments[1] = lang.code;

        // rebuild query string if present
        const query = searchParams.toString();
        const newUrl = query ? `${segments.join("/")}?${query}` : segments.join("/");

        mutation.mutate(lang.code);
        router.push(newUrl);
    };


    return (
        <>
            {/* ${isScrolled ? 'fixed left-0 top-0 z-50 py-3 shadow shadow-black' : ''} */}
            <div className={`w-full mainHeader relative transition-all duration-300  ${className}`}
            // style={style}
            >
                <Container>
                    <div className='w-full relative rounded-2xl' style={style}>
                        <div className='xl:px-[30px] px-[0] xl:h-[75px] flex justify-between items-center w-full gap-3'>
                            <div className='absolute left-0 bg-white dark:bg-[#1e1e1e] opacity-40 z-0 h-full w-full rounded-[25px] max-lg:hidden' />

                            {/* Logo */}
                            <div className='logoDiv z-10 relative flex items-center'>
                                <button className='max-md:hidden' onClick={() => {
                                    router.back()
                                }}><ChevronLeft /></button> <img width={122} height={56} src={logo} alt='Xarfi Logo' className='max-md:w-[89px] max-md:h-[32px]' />
                            </div>

                            {/* Navigation */}
                            <div className='z-10 relative max-w-[582px] w-full max-lg:hidden'>
                                <SearchBar />
                            </div>

                            {/* Right-side Actions */}
                            <div className='flex max-lg:gap-[21px] gap-2.5 relative'>
                 
                                {/* Account Dropdown */}
                                {profile?._id || profile?.id ?


                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className='bg-[#F3F3F3] dark:bg-[#252424] xl:w-[53px] xl:h-[53px] md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center'>
                                                <UserIcon className="xl:w-[33px] md:w-7 xl:h-[34px] md:h-7 h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="md:w-[402px] w-full bg-[#EBEBEB] dark:bg-[#121212] border-none rounded-2xl">
                                            <div className='py-[20px]  h-full  overflow-hidden'>

                                                <div className='overflow-auto  h-full grid gap-5'>

                                                    <div className='px-5'>
                                                        <h5 className='font-urbanist font-bold text-xl leading-[130%] tracking-[0]'>Profile Settings</h5>
                                                    </div>
                                                    <Link href={`/${langParam}/profile`} className='px-5'>
                                                        <div className='bg-xarfi-orange rounded-2xl py-[14px] px-2.5 flex justify-between items-center'>
                                                            <div className='flex gap-2.5'>
                                                                <div className='rounded-full overflow-hidden'>
                                                                    <Image height={70} width={70} alt={profile?.name || 'unknown'} src={profile?.image ? profile?.image : '/assets/joseph.jpg'} className='rounded-full aspect-square object-cover object-center' />
                                                                </div>
                                                                <div className='grid gap-1.5'>
                                                                    <div className='flex items-center gap-[6px]'>
                                                                        <p className='font-urbanist font-bold text-[18px] leading-[20px] tracking-[0] !text-white mb-0'>{profile?.name}</p>
                                                                        <span className='font-urbanist font-semibold text-[10px] leading-[130%] tracking-[0] bg-[#121212] rounded-full py-[3px] px-2.5 !text-white capitalize'>{profile?.gender}</span>
                                                                    </div>
                                                                    <div>
                                                                        <div className='flex gap-1.5 !text-white items-center'>
                                                                            <span className=' !text-white font-urbanist font-medium text-[12px] leading-[130%] tracking-[0]'>
                                                                                <MailIcon height='14' width='14' />
                                                                            </span>
                                                                            {profile?.email}
                                                                        </div>
                                                                        <div className='flex gap-1.5 !text-white items-center'>
                                                                            <span className=' !text-white font-urbanist font-medium text-[12px] leading-[130%] tracking-[0]'>
                                                                                <Phone width={14} height={14} fill='#fff' className='' />
                                                                            </span>
                                                                            {profile?.phoneNumber}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ChevronRight height={11} color='#fff' />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <hr className='bg-black dark:bg-white opacity-10' />
                                                    <div className='grid gap-2.5'>
                                                        <Link href={`/${langParam}/my-bookings`} className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                            <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>My Booking</p>
                                                            <ChevronRight className='w-3' />
                                                        </Link>
                                                        <Link href={`/${langParam}/my-orders`} className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                            <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>My Orders</p>
                                                            <ChevronRight className='w-3' />
                                                        </Link>
                                                        <Link href={'#'} className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                            <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>My Cards</p>
                                                            <ChevronRight className='w-3' />
                                                        </Link>
                                                        <ChangePassword>
                                                            <div className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                                <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>Change Password</p>
                                                                <ChevronRight className='w-3' />
                                                            </div>
                                                        </ChangePassword>
                                                        <Link href={`/${langParam}/terms-and-conditions`} className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                            <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>Terms & Conditions</p>
                                                            <ChevronRight className='w-3' />
                                                        </Link>
                                                        <Link href={`/${langParam}/privacy-and-policy`} className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                            <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>Privacy Policy</p>
                                                            <ChevronRight className='w-3' />
                                                        </Link>
                                                        <HelpAndSupportDialog>
                                                            <div className='px-5 flex justify-between items-center hover:bg-white hover:dark:bg-white/5 py-2.5'>
                                                                <p className='font-urbanist font-medium text-[14px] leading-[20px] tracking-[0]'>Help & Support</p>
                                                                <ChevronRight className='w-3' />
                                                            </div>
                                                        </HelpAndSupportDialog>
                                                    </div>
                                                    <hr className='bg-black dark:bg-white opacity-10' />
                                                    {/* <DropdownMenuSeparator className='bg-black/10 dark:bg-white/10'/> */}
                                                    <div className='px-5'>
                                                        <LogoutModel>
                                                            <button className='font-urbanist font-semibold text-[16px] leading-[20px] !text-white tracking-[0] rounded-2xl bg-[#FF0F0F] w-full py-[18px]'>
                                                                Logout
                                                            </button>
                                                        </LogoutModel>
                                                    </div>
                                                </div>
                                            </div>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    :
                                    <button className='bg-[#F3F3F3] dark:bg-[#252424] xl:w-[53px] xl:h-[53px] md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center'
                                        onClick={() => {
                                            router.push(`/${langParam}/user/login`)
                                        }}
                                    >
                                        <UserIcon className="xl:w-[33px] md:w-7 xl:h-[34px] md:h-7 h-5 w-5" />
                                    </button>
                                }
                                {/* Language Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className='bg-[#F3F3F3] dark:bg-[#252424] xl:w-[53px]  xl:h-[53px] md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center'>
                                            <BellIcon className="xl:w-[33px] md:w-7 xl:h-[34px] md:h-7 h-5 w-5" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="md:w-[402px] max-w-screen w-full bg-[#EBEBEB] dark:bg-[#121212] border-none rounded-2xl">
                                        <div className='py-[20px]  h-full  overflow-hidden'>

                                            <div className='overflow-auto  h-full'>

                                                <div className='px-5'>
                                                    <h5 className='font-urbanist font-bold text-xl leading-[130%] tracking-[0]'>Notifications</h5>
                                                </div>
                                                <div className='grid gap-2.5'>
                                                    {notifications?.map((a, i) => (
                                                        <>
                                                            <h6 className='px-5 mb-2.5 mt-5'>{a.day}</h6>
                                                            {a.notification.map((b, j) => (

                                                                <div className='flex px-4 py-[15px] relative gap-2.5 items-center'>
                                                                    <div className={`${j === 0 ? '!bg-white dark:bg-xarfi-orange' : 'bg-[#fff] dark:bg-[#F3F3F3]'} opacity-100 dark:opacity-10 absolute top-0 left-0 w-full h-full`} />
                                                                    <div className='bg-xarfi-orange rounded-[12px] w-[35px] h-[35px] relative aspect-square flex items-center justify-center '>
                                                                        {b.icon}
                                                                    </div>
                                                                    <div className='flex-1 relative'>
                                                                        <div className='w-full flex justify-between items-center mb-[5px]'>
                                                                            <div className='flex items-center gap-[5px]'>
                                                                                <p className='font-urbanist mb-0 font-semibold text-[14px] leading-[16px] tracking-[0]'>{b.type}</p>
                                                                                <span className='font-urbanist font-normal text-[12px] leading-[16px] tracking-[0] text-xarfi-orange'>*New</span>
                                                                            </div>
                                                                            <p className='text-[#ACACAC] mb-0 font-urbanist font-normal text-[10px] leading-[100%] tracking-[0]'>1 hr ago</p>
                                                                        </div>
                                                                        <div className='mb-[5px]'>
                                                                            <p className='font-urbanist font-normal text-[12px] leading-[100%] tracking-[0]'>You have booking at 09:00 PM today at Coiffeur
                                                                                bei Yousef. To schedule contact barber.</p>
                                                                        </div>
                                                                        {b.type === 'Reminder' ?
                                                                            <div className='bg-[#EBEBEB] dark:bg-[#121212] p-2.5 rounded-[8px]'>
                                                                                <p className='font-urbanist font-normal text-[10px] leading-[130%] tracking-[0]'>Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulput ate libero et velit interdum, ac aliquet odio mattis.</p>
                                                                            </div>
                                                                            : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Language Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className='bg-[#F3F3F3] dark:bg-[#252424] xl:w-[53px] xl:h-[53px] md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center'>
                                            <Flag code={languageFlag} className='rounded-full xl:w-[40px] md:w-8 xl:h-[40px] md:h-8 w-[30px] h-[30px] object-cover' />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        <DropdownMenuLabel>{t('dropdown.languageTitle')}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {languages.map((lang, i) => (
                                            <DropdownMenuItem key={i} onClick={() => {
                                                changeLanguage(lang)
                                            }}>
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
                                    className='bg-[#F3F3F3] dark:bg-[#252424] xl:w-[53px] md:w-10 xl:h-[53px] md:h-10 w-8 h-8 rounded-full flex items-center justify-center'
                                >
                                    <SunIocn className='xl:w-[33px] md:w-7 xl:h-[34px] md:h-7 w-4 h-4 text-foreground' />
                                </button>


                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Header