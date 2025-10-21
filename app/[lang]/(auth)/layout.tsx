"use client"
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/providers/theme-provider';
import BackButton from '@/components/constants/BackButton';
import { Metadata } from 'next';

function LoginLayout({ children }: any) {
    const { logo } = useTheme();

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    // }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }
    return (
        <div className='LoginLayout h-screen grid grid-cols-10 bg-background'>
            {/* Left Outlet (42%) */}
            <div className='lg:col-span-4 col-span-10 px-6 overflow-auto flex justify-center '>
                <div className='loginForm max-w-[456px] py-6 w-full flex flex-col gap-[30px]'>
                    <div className='header flex items-center'>
                        <BackButton />
                        <img width={153} height={55} src={logo} alt='Xarfi Logo' className='lg:w-[153px] lg:h-[53px] w-[108px] h-[39px] object-contain'/>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Slider (58%) */}
            <div className='col-span-6 bg-xarfi-orange flex items-center justify-center max-lg:hidden'>
                <div className='w-full h-full'>
                    <Slider {...settings}>
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className='h-full flex items-center justify-between'>
                                <div className='flex px-20 py-6 w-full mx-auto'>
                                    <div className='w-[85%] mx-auto flex flex-col gap-[50px]'>
                                        <img
                                            src={'/assets/loginSlider1.jpg'}
                                            className='w-full rounded-4xl object-cover shadow-[0px_4px_79.8px_0px_#00000040]'
                                        />
                                        <div className='content flex flex-col gap-[15px]'>
                                            <h4 className='font-urbanist font-bold text-[32px] leading-[100%] tracking-[0px] text-center !text-white'>
                                                Multilingual Booking
                                            </h4>
                                            <p className='font-urbanist font-medium text-[20px] leading-[100%] tracking-[0px] text-center !text-white'>
                                                Clients can book in their language - no awkward calls, no confusion. Salons attract more local clients from different communities, without needing a translator.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default LoginLayout