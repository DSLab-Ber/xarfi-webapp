import React, { ReactNode } from 'react'
interface props {
    children: ReactNode;
    className?: string;
    outerClassName?: string;
}
function Container({ children, className,outerClassName }: props) {
    return (
        <div className={`px-4 w-full relative z-10 ${outerClassName}`}>
            <div className='Container max-w-[1280px] w-full mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default Container