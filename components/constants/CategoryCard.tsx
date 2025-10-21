import React from 'react'
interface PropsType {
    image?: any;
    title?: any;
    animation?: any;
    animateDelay?: any;
}
function CategoryCard({ image, title, animation, animateDelay }: PropsType) {
    return (
        <div className='w-full bg-background-secondary lg:py-[65.5px] md:py-10 py-7 lg:px-[94.5px] md:px-[50px] px-8 rounded-[25px]' data-aos={animation} data-aos-delay={animateDelay}>
            <div className='flex flex-col items-center justify-center gap-[25px]'>
                <img src={image} className='lg:w-auto lg:h-auto w-[90px]' />
                <p className='font-urbanist font-bold lg:text-[26px] text-[20px] lg:leading-[31px]  tracking-[0px] text-center'>
                    {title}</p>
            </div>
        </div>
    )
}

export default CategoryCard