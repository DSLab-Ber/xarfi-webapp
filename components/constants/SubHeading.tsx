import React from 'react'
interface SubHeadingProp {
    title?: any
    className?: any
}
function SubHeading({ title, className }:SubHeadingProp) {
    return (
        <div className={`bg-[#FF8C261A] md:py-[18px] py-[12px] md:px-[23px] px-[18px] border border-[#FF8C26] text-xarfi-orange rounded-full font-urbanist font-medium md:text-[18px] text-sm xl:leading-[20px] tracking-[0px] ${className}`} data-aos="fade-zoom-in">
            {title}
        </div>
    )
}

export default SubHeading