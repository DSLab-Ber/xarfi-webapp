import BackButton from '@/components/constants/BackButton'
import Container from '@/components/constants/Container'
import React from 'react'

type Props = {
    data:any;
}

function PrivacyAndPolicy({data }: Props) {
    return (
        <div className='pb-[50px]'>
            <Container>
                <div className='flex gap-[15px] items-center bg-background sticky top-0 pt-[50px] pb-[30px]'>
                    <BackButton />
                    <h5 className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>Privacy & Policy</h5>
                </div>
                <div className='grid gap-[30px]'>
                    <h5 className='font-urbanist font-medium md:text-[16px] text-sm leading-[130%] tracking-[0]'>Lasted updated on 06 March 2025</h5>
                    <div className='bg-background-secondary rounded-2xl p-[15px] gap-[15px]'>
                        {data}
                        {/* <div className='grid gap-[7px]'>
                            <h3 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[130%] tracking-[0]'>1. Heading</h3>
                            <p className='font-urbanist font-normal md:text-[14px] text-xs leading-[130%] tracking-[0]'>
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                <br />
                                <br />
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                        <div className='grid gap-[7px]'>
                            <h3 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[130%] tracking-[0]'>1. Heading</h3>
                            <p className='font-urbanist font-normal md:text-[14px] text-xs leading-[130%] tracking-[0]'>
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                <br />
                                <br />
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                        <div className='grid gap-[7px]'>
                            <h3 className='font-urbanist font-semibold md:text-[16px] text-sm leading-[130%] tracking-[0]'>1. Heading</h3>
                            <p className='font-urbanist font-normal md:text-[14px] text-xs leading-[130%] tracking-[0]'>
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                <br />
                                <br />
                                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div> */}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PrivacyAndPolicy