import { InfoCircleIcon, TimeIcon } from '@/components/constants/Icons'
import { minutesToReadableTime } from '@/lib/utils';
import Image from '@/components/constants/Image'
import { useParams } from 'next/navigation';
import React from 'react'
interface props {
    className?: string;
    data?: any;
    activeCategory?: any;
    addToServiceList: any;
    serviceList: any[]
}
function Services({ className = '2xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1', data, activeCategory, addToServiceList, serviceList }: props) {
    const { id }: any = useParams()
    console.log(data, 'datservices')
    return (
        <>
            {data?.map((a: any, i: number) => {
                const filteredServices = a.services.filter(
                    (service: any) => service?.targetGroup?.includes(activeCategory)
                );

                if (filteredServices.length === 0) return null;

                return (
                    <div className='w-full' key={i}>
                        <h5 className='font-urbanist font-semibold text-[20px] leading-[130%] tracking-[0] mb-2.5 capitalize'>
                            {a.name}
                        </h5>
                        <div className={`grid gap-x-[22px] gap-y-[15px] ${className}`}>
                            {filteredServices.map((service: any, index: number) => (
                                <div
                                    key={index}
                                    className='py-[9.5px] px-2.5 rounded-2xl bg-background-secondary flex items-center justify-between'
                                >
                                    <div className='flex items-center gap-[10px]'>
                                        <Image
                                            alt="haircut image"
                                            width={77}
                                            height={75}
                                            src={service?.image}  // 👈 yahan service?.img ko service?.image kiya
                                            className='rounded-[8px] object-cover object-center w-[77px] h-[75px]'
                                        />

                                        <div className='grid gap-[14px]'>
                                            <div>
                                                <div className='flex items-center gap-[3px]'>
                                                    <h5 className='font-urbanist font-semibold text-[18px] leading-[130%] tracking-[0]'>
                                                        {service?.name}
                                                    </h5>
                                                    <span className='text-foreground'>
                                                        <InfoCircleIcon />
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-[3px] opacity-40 font-urbanist font-normal text-[13px] leading-[130%] tracking-[0]'>
                                                    <TimeIcon />
                                                    {minutesToReadableTime(service?.duration)}
                                                </div>
                                            </div>
                                            <h6 className='font-urbanist font-bold text-[22px] leading-[80%] tracking-[0]'>
                                                € {service?.price}
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        {serviceList.filter((obj: any) => obj?._id === service?._id)?.length ?
                                            <button className=' bg-xarfi-orange rounded-[8px] py-[3px] px-[15px] font-urbanist font-semibold text-[14px] leading-[20px] tracking-[0] !text-white cursor-pointer disabled:opacity-50 cursor-not-allowed' disabled>
                                                Selected
                                            </button>
                                            :
                                            <button className=' bg-xarfi-orange rounded-[8px] py-[3px] px-[15px] font-urbanist font-semibold text-[14px] leading-[20px] tracking-[0] !text-white cursor-pointer'
                                                onClick={() => {
                                                    addToServiceList(id,service)
                                                }}
                                            >
                                                Select
                                            </button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

        </>
    )
}

export default Services