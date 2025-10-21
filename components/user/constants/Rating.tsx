import { StarBadgeIcon } from '@/components/constants/Icons'
import React from 'react'

type Props = {
    rating: any;
    setRating: any;
}

function Rating({ rating, setRating }: Props) {
    return (
        <div className='flex items-center gap-[5px]'>
            {new Array(5).fill('').map((_, i) => {
                return (
                    <span className={`cursor-pointer ${rating >= i+1 ? 'text-xarfi-orange' : '!text-background'} `}
                        onClick={() => {
                            setRating(i+1)
                        }}>
                        <StarBadgeIcon key={i} className='max-md:w-6 max-md:h-6'/>
                    </span>
                )
            })}
        </div>
    )
}

export default Rating