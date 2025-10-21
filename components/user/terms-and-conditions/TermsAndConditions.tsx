import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import React from 'react'

type Props = {
    data?:string
}

function TermsAndConditions({data}: Props) {
    return (
        <div className='pb-[50px]'>
            <Container>
                <div className='flex gap-[15px] items-center bg-background sticky top-0 pt-[50px] pb-[30px]'>
                    <BackButton />
                    <h5 className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>Terms & Conditions</h5>
                </div>
                <div className='grid gap-[30px]'>
                    <h5 className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0]'>Lasted updated on 06 March 2025</h5>
                    <div className='bg-background-secondary rounded-2xl p-[15px] gap-[15px]'>
                        {data}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TermsAndConditions