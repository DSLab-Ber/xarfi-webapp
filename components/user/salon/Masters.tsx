"use client"
import { BackIcon, CloseIcon, DotIcon, RatingStar } from '@/components/constants/Icons'
import Tabs from '@/components/constants/Tabs'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { getMasterDetailApi } from '@/lib/api/user/User'
import { formatTimingObject, pad } from '@/lib/utils'
import { useServiceStore } from '@/stores/serviceCart'
import Image from '@/components/constants/Image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import BookingPopup from '../constants/BookingPopup/BookingPopup'
import Reviews from './Reviews'
import Services from './Services'
import Styles from './Styles'
interface Proptype {
    data?: any;
    activeCat?: string;
    loader?: boolean;
    setLoader?: any;
}


const MasterDetailDialog = ({ open, setOpen, tabs, activeTab, setActiveTab, category, activeCategory, setActiveCategory,
    master,
    styles,
    services,
    reviews,
    clearAll
}: any) => {
    const { id }: any = useParams()
    const {
        addServiceForOwner,
        getServicesForOwner,
    } = useServiceStore();
    const serviceList = getServicesForOwner(id)

    return (
        <Dialog open={open} onOpenChange={(e) => {
            if (!e) {
                setOpen(e)
                setTimeout(() => {
                    clearAll()
                }, 100)
            }
        }}>
            <DialogContent className='border-none md:p-[50px] p-0 md:!max-w-[780px] !max-w-full !w-full md:h-[calc(100vh-100px)] h-screen overflow-auto' showCloseButton={false}>
                <div className='w-full flex md:justify-between items-center max-md:px-4 max-md:pt-6'>
                    <DialogClose asChild className='md:hidden'>
                        <button
                            className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
                        >
                            <BackIcon />
                        </button>
                    </DialogClose>
                    <p className='font-urbanist font-semibold md:text-[20px] text-[20px] leading-[130%] tracking-[0]'>Master Details</p>
                    <DialogClose asChild className='max-md:hidden'>
                        <button><CloseIcon /></button>
                    </DialogClose>
                </div>
                <div className='flex md:gap-5 gap-[17px] items-center px-4'>
                    <Image alt="masterImage" width={178} height={171} src={master?.image} className='rounded-2xl w-[134px] aspect-square object-top object-cover max-md:w-[107px] max-md:h-[107px]' />
                    <div className=' flex-1 grid gap-2.5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <h5 className='font-urbanist font-semibold md:text-[24px] text-[18px] leading-[130%] tracking-[0]'>{master?.masters?.name}</h5>
                                <span className='px-[10px] rounded-full bg-xarfi-orange font-urbanist font-normal text-[10px] leading-[20px] tracking-[0]'>{master?.experience} Years</span>
                            </div>
                            <div className='flex items-end flex-col gap-0.5'>
                                <div className='bg-background-secondary py-[5px] px-1.5 rounded-[7px] flex items-center gap-[5px] w-fit font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0]'>
                                    <RatingStar size={16} />
                                    4.5
                                </div>
                            </div>
                        </div>
                        <div className='bg-background-secondary py-[4.5px] px-[14px] rounded-full w-fit'>
                            <p className='font-urbanist font-medium md:text-[16px] text-xs leading-[130%] tracking-[0]'>
                                {master?.specificDailyTimings?.length ?
                                    <>
                                        {master?.specificDailyTimings.map((a: any, i: number) => {
                                            return (
                                                <>
                                                    {a.day} {a.timing?.start + '-' + a.timing?.end}{master?.specificDailyTimings?.length - 1 === i ? '' : ','}
                                                </>
                                            )
                                        })}
                                    </>
                                    : master?.generalTiming?.length ? formatTimingObject(master?.generalTiming) : '-'}
                            </p>
                        </div>
                        <p className='font-urbanist text-left font-medium md:text-[14px] text-xs leading-[130%] tracking-[0] !text-[#00FF5E]'>Next Available: 12 May 2025, 3:00 AM</p>
                    </div>
                </div>
                <div className=''>
                    <div className='max-w-[445px] w-full mx-auto'>
                        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className='grid-cols-3 max-md:rounded-none mb-5' />
                        <div className='p-1.5 px-2.5 rounded-full bg-background-secondary grid grid-cols-4 gap-2.5 max-w-[307px] mx-auto'>
                            {category.map((a: any, i: number) => (
                                <div key={i} className={`${activeCategory === a ? 'bg-background' : ''} w-full py-[6px] text-center rounded-full font-urbanist font-semibold md:text-[14px] text-[12px] leading-[130%] tracking-[0] cursor-pointer`}
                                    onClick={() => {
                                        setActiveCategory(a)
                                    }}
                                >
                                    {a}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full px-4'>
                    {activeTab === 'Services' ?
                        <>
                            <Services className='lg:grid-cols-2 grid-cols-1 mb-10' data={services} activeCategory={activeCategory} addToServiceList={addServiceForOwner} serviceList={serviceList} />
                            <BookingPopup className='py-[3px] pr-[3px] pl-5 bg-xarfi-orange rounded-2xl font-urbanist font-semibold text-[18px] leading-[20px] tracking-[0] flex justify-center h-[56px] gap-16 items-center z-10 text-center relative w-full !text-white max-w-[362px] mx-auto mt-10'>
                                Book Now
                                <span className='bg-[#A34D00] aspect-square rounded-[13px] flex items-center justify-center py-[15px] px-[13px] absolute right-[13px] !text-white '>
                                    {pad(serviceList.length)}
                                </span>
                            </BookingPopup>
                        </>
                        : activeTab === 'Styles' ?
                            <Styles className='lg:grid-cols-2 grid-cols-2' data={styles} />
                            : activeTab === "Review" ?
                                <Reviews className='lg:grid-cols-2 grid-cols-1' data={reviews} />
                                : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function Masters({ data, activeCat, loader, setLoader }: Proptype) {
    const { lang }: any = useParams()
    const tabs = ['Services', 'Styles', 'Review']
    const [activeTab, setActiveTab] = useState('Services')
    const category = ['All', 'Men', 'Women', 'Children']
    const [activeCategory, setActiveCategory] = useState('All')
    const [open, setOpen] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState(null)
    const [styles, setStyles] = useState<any>([])
    const [services, setServices] = useState<any>([])
    const [reviews, setReviews] = useState<any>([])

    const clearAll = () => {
        setSelectedMaster(null)
        setStyles([])
        setServices([])
        setReviews([])
    }

    const getMasterDetail = async (id: string) => {
        try {
            setLoader(true)
            let { data } = await getMasterDetailApi(lang, id)
            console.log(data, 'masterData')
            if (data.master) {
                setSelectedMaster(data.master)
            }
            if (data?.styles?.length) {
                console.log(data?.styles, 'data?.stylesdata?.styles')
                setStyles(data?.styles)
            }
            if (data?.services?.length) {
                setServices(data?.services)
            }
            if (data?.reviews?.length) {
                let reviews = data?.reviews?.map((a: any, i: number) => {
                    return {
                        name: a?.user?.name,
                        image: a?.user?.image,
                        rating: a?.masterRating,
                        review: a?.masterReview
                    }
                })
                setReviews(reviews)
            }
            setOpen(true)

        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 md:gap-x-[21px] gap-x-[16px] md:gap-y-[20px] gap-y-[15px]'>
                {data?.map((master: any, i: number) => master?.services.filter((obj: any) => obj?.targetGroup?.includes(activeCat))?.length ? (
                    <div key={i} className='md:aspect-[413/383] aspect-[177/200] bg-cover bg-center rounded-2xl flex items-end overflow-hidden relative cursor-pointer' style={{ backgroundImage: `url(${master?.image})` }}
                        onClick={() => {
                            getMasterDetail(master?._id)
                        }}
                    >

                        <div className='w-full p-2.5 bg-white/0 backdrop-blur-[9.5px] absolute bottom-0 max-md:grid max-md:gap-[3px]'>
                            <div className='w-full flex justify-between max-md:flex-col md:items-center items-start mb-[3px]'>
                                <p className='font-urbanist font-semibold md:text-[18px] text-[16px] leading-[130%] tracking-[0] !text-white mb-0'>{master?.name}</p>
                                <span className='bg-xarfi-orange font-urbanist font-normal md:text-[13px] text-[10px] leading-[20px] tracking-[0] px-2.5 rounded-2xl  !text-white'>{master?.experience} Years</span>
                            </div>
                            <div className='flex items-center gap-1 mb-[9px] max-md:hidden'>
                                <p className='!text-white'>Haircut</p>
                                <DotIcon />
                                <p className='!text-white'>Body Massage</p>
                                <DotIcon />
                                <p className='!text-white'>Beard Trim</p>
                            </div>
                            <div className='text-left flex justify-start'>
                                <p className='font-urbanist text-left font-medium md:text-[14px] text-[10px] leading-[130%] tracking-[0] !text-[#00FF5E]'>Next Available: 12 May 2025, 3:00 AM</p>
                            </div>
                        </div>
                    </div>
                ) : null)}
                <MasterDetailDialog open={open} setOpen={setOpen} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} category={category} activeCategory={activeCategory} setActiveCategory={setActiveCategory} master={selectedMaster} setMaster={setSelectedMaster}
                    styles={styles}
                    services={services}
                    reviews={reviews}
                    clearAll={clearAll}
                />
            </div >
        </>
    )
}

export default Masters