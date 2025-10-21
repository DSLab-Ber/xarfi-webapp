import React from 'react'
interface SubHeadingProp {
    title?: any
    className?: any
}
function Heading({ title, className }: SubHeadingProp) {
    return (
        <h3 className={`font-urbanist font-semibold md:text-[40px] text-[32px] md:leading-[100%] tracking-[0px] ${className}`} data-aos="fade-zoom-in" data-aos-delay="200">
            {title}
        </h3>
    )
}

export default Heading