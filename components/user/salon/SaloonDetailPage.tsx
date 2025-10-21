"use client"
import React, { useEffect, useState } from 'react'
import Header from '../constants/header/header'
import { Share2Icon } from 'lucide-react'
import Container from '@/components/constants/Container'
import { InfoCircleIcon, LocationIcon, LocPin, RatingStar, ShareIcon, TimeIcon } from '@/components/constants/Icons'
import Image from '@/components/constants/Image'
import Services from './Services'
import Masters from './Masters'
import Styles from './Styles'
import Product from './Product'
import Reviews from './Reviews'
import Tabs from '@/components/constants/Tabs'
import BookingPopup from '../constants/BookingPopup/BookingPopup'
import ProductPopup from '../constants/ProductPopup/ProductPopup'
import BackButton from '@/components/constants/BackButton'
import { set } from 'date-fns'
import { useParams, useSearchParams } from 'next/navigation'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from 'react-slick'
import { formatTimingObject, pad } from '@/lib/utils'
import Cookies from "js-cookie"
import { useServiceStore } from '@/stores/serviceCart'
import { useProductStore } from '@/stores/productCart'
import { BookingApi, checkoutProduct, getSaloon } from '@/lib/api/user/User'
import Spinner from '@/components/constants/Spinner'
import OrderConfirmed from '../constants/OrderConfirmed'
interface PropType {
    lang: string;
    role: string
    data: any;
}
function SaloonDetailPage({ role, data }: PropType) {
    const { id, lang }: any = useParams()
    let cookieCoords: any = Cookies.get("coords")
    let coords = cookieCoords ? JSON.parse(cookieCoords) : []
    let longitude = coords?.[0]
    let latitude = coords?.[1]
    const [salonData, setSalonData] = useState<any>(null)
    const searchParams = useSearchParams()
    const bookingDetailsParam = searchParams.get("bookingDetails")
    const tabs = ['Services', 'Masters', 'Styles', 'Products', 'Review']
    const category = ['All', 'Men', 'Women', 'Children']
    const [activeTab, setActiveTab] = useState('Services')
    const [activeCategory, setActiveCategory] = useState('All')
    const [salon, setSalon] = useState<any>(null)
    const [loader, setLoader] = useState(false)
    const [styles, setStyles] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    const [services, setServices] = useState<any>([])
    const [master, setMaster] = useState<any>([])
    const [reviews, setReviews] = useState<any>([])

    const [orderCompleted, setOrderCompleted] = useState(false)
    const [orderDetails, setOrderDetail] = useState(false)
    const refetch = async () => {
        let data = await getSaloon(id, lang, latitude, longitude)
        setSalonData(data)
    }

    const checkout = async () => {
        try {
            setLoader(true);

            const data = await checkoutProduct(productList, id);

            // clearProductsForOwner(id);
            setOrderDetail(data.data);
            refetch()

            // ✅ open dialog only AFTER success
            setOrderCompleted(true);

        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (data) {
            setSalonData(data)
        }
    }, [data])


    const [copied, setCopied] = useState(false);
    const {
        addServiceForOwner,
        updateServiceForOwner,
        removeServiceForOwner,
        clearServicesForOwner,
        getServicesForOwner,
        setServicesForOwner,
    } = useServiceStore();
    const serviceList = getServicesForOwner(id)
    const {
        getProductsForOwner,
    } = useProductStore();
    const productList = getProductsForOwner(id)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };



    useEffect(() => {
        console.log(salonData, 'salonDatasalonData')
        if (salonData?.salon?.length) {
            console.log(salonData?.salon?.[0], 'asdasdasdasd')
            setSalon(salonData?.salon?.[0])
        }
        if (salonData?.styles?.length) {
            setStyles(salonData?.styles)
        }
        if (salonData?.products?.length) {
            setProducts(salonData?.products)
        }
        if (salonData?.services?.length) {
            setServices(salonData?.services)
        }
        if (salonData?.masters?.length) {
            setMaster(salonData?.masters)
        }
        if (salonData?.reviews?.length) {
            setReviews(salonData?.reviews)
        }

    }, [salonData])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    }
    console.log(salon, 'salonsalonsalon')
    // const setBooking = async (bookingData: any, services: any) => {
    //     try {
    //         console.log(bookingData, "bookingData")
    //         setLoader(true)
    //         await BookingApi(services, bookingData?.master, bookingData?.owner, bookingData?.date, bookingData?.time, bookingData?.bookingFor?.otherThenMyself, bookingData?.bookingFor?.guestName)
    //         clearServicesForOwner(id)
    //     } catch (err) {
    //         setLoader(false)
    //         console.log(err)
    //     } finally {
    //         setLoader(false)
    //     }
    // }

    // useEffect(() => {
    //     if (bookingDetailsParam) {
    //         let obj: any = JSON.parse(bookingDetailsParam)
    //         const services = obj?.items.map((a: any, i: number) => {
    //             return {
    //                 _id: a.service,
    //                 quantity: 1
    //             }
    //         })
    //         setBooking(obj, services)
    //     }
    // }, [bookingDetailsParam])


    return (
        <div className='salonDetailpage relative'>
            {loader && (
                <div className="fixed inset-0 z-[9999999] flex items-center justify-center">
                    {/* Blurred background overlay */}
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[5px]" />

                    {/* Centered loader */}
                    <div className="relative">
                        <Spinner className="w-6 h-6 fill-[#fff] text-gray-600" />
                    </div>
                </div>
            )}
            <div className='w-full md:aspect-[1440/432] aspect-[490/280] bg-cover bg-center bg-no-repeat relative'>
                <Slider {...settings} className='w-full h-full'>
                    {salon?.images?.map((img: string, i: number) => (
                        // <div className='w-full md:aspect-[1.7452] aspect-[370/162]' >
                        <div className='md:aspect-[1440/432] aspect-[490/280] w-full' key={i}>
                            <Image width={449} height={260} className='md:aspect-[1440/432] aspect-[490/280] w-full object-cover object-center' alt={"salon.name"} src={img} />
                        </div>
                        // </div>
                    ))}
                </Slider>
                <Header className='!absolute top-[24px] bg-transparent max-md:hidden' style={{
                    backdropFilter: 'blur(10px)',
                    padding: '12px'
                }} />
                <div className='w-full px-[13px] pt-[53px] justify-between flex absolute top-0 z-10'>
                    <div className='md:hidden' onClick={handleCopy}>
                        <BackButton />
                    </div>
                    <div className='flex flex-col gap-2.5 md:hidden'>
                        <button
                            className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
                        >
                            <ShareIcon />
                        </button>

                        <a
                            href={`https://www.google.com/maps?q=${salon?.location?.lat},${salon?.location?.lng}`} target='_blank'
                            className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"

                        >
                            <span className='sr-only'>Open Map</span>
                            <LocPin />
                        </a>
                    </div>
                </div>
            </div>
            <Container>
                <div className='w-full grid lg:grid-cols-[735px_1fr] grid-cols-[80%_1fr] md:py-[30px] py-[15px]'>
                    <div className=''>
                        <div className='flex items-center gap-2.5 mb-2.5'>
                            <h5 className='font-urbanist font-bold md:text-[32px] text-xl md:leading-[100%] leading-[130%] tracking-[0] mb-0 capitalize'>{salon?.name}</h5>
                            <button className='h-[39px] aspect-square bg-background-secondary rounded-[10px] flex items-center justify-center max-md:hidden' onClick={handleCopy}>
                                <ShareIcon />
                            </button>
                            <a href={`https://www.google.com/maps?q=${salon?.location?.lat},${salon?.location?.lng}`} target='_blank' className='h-[39px] aspect-square bg-background-secondary rounded-[10px] flex items-center justify-center text-foreground max-md:hidden'

                            >
                                <span className='sr-only'>Open Map</span>
                                <LocPin />
                            </a>
                        </div>
                        <p className='flex items-center font-urbanist font-medium md:text-[16px] text-[14px] leading-[130%] tracking-[0] mb-2.5'><span className='w-3 inline-block mr-1.5'><LocPin width={12} /></span>{salon?.location?.address} | {salon?.distance}</p>
                        <div className='bg-background-secondary w-fit md:px-3.5 px-[14px] md:py-[4.5px] py-[6px] rounded-full md:mb-2.5'>
                            {/* <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0] mb-0'>Mon - Sat, 09:00 AM - 06:00 PM</p> */}
                            <p className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0] mb-0'>
                                {salon?.specificDailyTimings?.length ?
                                    <>
                                        {salon?.specificDailyTimings.map((a: any, i: number) => {
                                            return (
                                                <>
                                                    {a.day} {a.timing?.start + '-' + a.timing?.end}{salon?.specificDailyTimings?.length - 1 === i ? '' : ','}
                                                </>
                                            )
                                        })}
                                    </>
                                    : salon?.generalTiming?.length ? formatTimingObject(salon?.generalTiming) : '-'}</p>
                        </div>
                        <p className='font-urbanist font-medium text-[16px] leading-[130%] tracking-[0] !text-[#00FF5E] mb-[30px] max-md:hidden'>Next Available: 12 May 2025, 3:00 AM</p>

                    </div>
                    <div className='flex justify-end items-start'>
                        <div className='grid gap-[27px]'>
                            <div className='bg-[#16A34A] font-urbanist font-semibold md:text-[16px] text-xs leading-[130%] tracking-[0] px-[15px] py-[5px] rounded-full'>
                                Open
                            </div>
                            <div className='flex items-end flex-col gap-0.5'>
                                <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold md:text-[16px] text-[14px] leading-[84%] tracking-[0]'>
                                    <RatingStar size={16} className="max-md:w-[12px]" />
                                    {pad(salon?.averageRating)}
                                </div>
                                <p className='font-urbanist font-medium md:text-[12px] text-[8px] leading-[130%] tracking-[0]'>{salon?.totalReviews} Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container outerClassName="!px-0">
                <div className='max-w-[735px] w-full mx-auto'>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className='grid-cols-5 max-md:rounded-none max-md:flex overflow-auto scrollbar-hide max-md:mb-[15px]' />
                </div>
                {activeTab === 'Masters' || activeTab === 'Services' ?
                    <div className='p-1.5 px-2.5 rounded-full bg-background-secondary grid grid-cols-4 gap-2.5 max-w-[307px] mx-auto'>
                        {category.map((a, i) => (
                            <div key={i} className={`${activeCategory === a ? 'bg-background' : ''} w-full py-[6px] text-center rounded-full font-urbanist font-semibold md:text-[14px] text-[12px] leading-[130%] tracking-[0] cursor-pointer`}
                                onClick={() => {
                                    setActiveCategory(a)
                                }}
                            >
                                {a}
                            </div>
                        ))}
                    </div>
                    : null}
            </Container>
            <Container>
                <div className='w-full grid gap-5 md:py-[23px] py-[15px]'>
                    {activeTab === 'Services' ?
                        <>
                            <Services data={services} activeCategory={activeCategory} addToServiceList={addServiceForOwner} serviceList={serviceList} />
                            {serviceList.length ?
                                <BookingPopup className='py-[3px] pr-[3px] pl-5 bg-xarfi-orange rounded-2xl font-urbanist font-semibold text-[18px] leading-[20px] tracking-[0] flex justify-between h-[56px] gap-16 items-center fixed bottom-3 right-3 z-10 !text-white'
                                    salon={salon}
                                    refetch={refetch}
                                >
                                    {/* <button> */}
                                    Book Now
                                    <span className='bg-[#A34D00] aspect-square rounded-[13px] flex items-center justify-center py-[15px] px-[13px] !text-white'>
                                        {pad(serviceList.length)}
                                    </span>
                                    {/* </button> */}
                                </BookingPopup>
                                : null}
                        </>
                        : activeTab === 'Masters' ?
                            <Masters data={master} activeCat={activeCategory} loader={loader} setLoader={setLoader} />
                            : activeTab === 'Styles' ?
                                <Styles data={styles} />
                                : activeTab === 'Products' ?
                                    <>
                                        <Product data={products} />
                                        {productList.length ?
                                            <ProductPopup className='py-[3px] pr-[3px] pl-5 bg-xarfi-orange rounded-2xl font-urbanist font-semibold text-[18px] leading-[20px] tracking-[0] flex justify-between h-[56px] gap-16 items-center fixed bottom-3 right-3 z-10 !text-white'
                                                checkout={checkout}
                                            >

                                                Proceed to checkout
                                                <span className='bg-[#A34D00] aspect-square rounded-[13px] flex items-center justify-center py-[15px] px-[13px] !text-white'>
                                                    {pad(productList.length)}
                                                </span>

                                            </ProductPopup>
                                            : null}
                                        <OrderConfirmed open={orderCompleted} setOpen={setOrderCompleted} orderDetails={orderDetails} />
                                    </>
                                    : activeTab === "Review" ?
                                        <Reviews data={reviews} />
                                        : null}
                </div>
            </Container>
            {/* <div className='flex justify-center items-end py-3 bg-background fixed bottom-0 w-full z-10'>
                <Container>
                    <div className='flex justify-end w-full'> */}

            {/* </div>
                </Container>
            </div> */}
        </div>
    )
}

export default SaloonDetailPage