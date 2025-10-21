import ReviewCard from '@/components/constants/ReviewCard'
import Image from '@/components/constants/Image'
import React from 'react'

interface props {
    className?: any;
    data: any
}

function Reviews({ className = '2xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1', data }: props) {
    return (
        <div className={`grid gap-x-[10px] gap-y-[20px] ${className}`}>
            {data.map((a: any, i: number) => (
                <ReviewCard />
            ))}
        </div>
    )
}

export default Reviews