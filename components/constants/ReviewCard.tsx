import Image from './Image'
import React from 'react'
import { RatingStar } from './Icons'

function ReviewCard() {
    return (
        <div className='bg-background-secondary p-[15px] rounded-2xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-[5px]'>
                    <Image width={24} height={24} alt='userImage' src={'/assets/joseph.jpg'} className='rounded-full' />
                    <p className='font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0] mb-0'>Joseph</p>
                </div>
                <div className='flex items-center gap-[3px]'>
                    {new Array(5).fill("").map(() => {
                        return (
                            <RatingStar size={16} />
                        )
                    })}
                    <span className='font-urbanist font-semibold text-[16px] leading-[84%] tracking-[0] ml-[9px]'>4.5</span>
                </div>
            </div>
            <p className='font-urbanist font-normal md:text-[14px] text-[12px] leading-[130%] tracking-[0] mb-0 mt-[10px]'>
                Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
            </p>
        </div>
    )
}

export default ReviewCard