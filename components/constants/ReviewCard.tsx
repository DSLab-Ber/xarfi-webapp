import Image from './Image'
import React from 'react'
import { RatingStar } from './Icons'

function ReviewCard({ data }: any) {
    console.log(data, 'datadatadatadata')
    return (
        <div className='bg-background-secondary p-[15px] rounded-2xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-[5px]'>
                    <Image width={24} height={24} alt='userImage' src={"/"+data?.image} className='rounded-full' />
                    <p className='font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0] mb-0'>{data?.name}</p>
                </div>
                <div className='flex items-center gap-[3px]'>
                    {new Array(5).fill("").map((_, i) => {
                        return (
                            <RatingStar size={16} fill={i + 1 <= data?.rating ? "#FFC300" : 'lightslategray'} />
                        )
                    })}
                    <span className='font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0] ml-[9px]'>{data.rating}</span>
                </div>
            </div>
            <p className='font-urbanist font-normal md:text-[14px] text-[12px] leading-[130%] tracking-[0] mb-0 mt-[10px]'>
                {data.review}
            </p>
        </div>
    )
}

export default ReviewCard