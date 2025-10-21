import Header from '@/components/user/constants/header/header'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

function layout({ children }: Props) {
    return (
        <div className=''>
            {children}
        </div>
    )
}

export default layout