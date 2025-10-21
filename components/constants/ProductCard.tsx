import { Minus, Plus } from 'lucide-react'
import Image from './Image'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog'
import { CloseIcon } from './Icons'

interface proptype {
    data?: any
}

const ProductDetailDialogue = ({ open, setOpen }: any) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='border-none p-[50px] !max-w-[685px] !w-full h-[calc(100vh-100px)] overflow-auto' showCloseButton={false}>
                <div className='w-full flex justify-between items-center'>
                    <p className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>Product Details</p>
                    <button onClick={() => {
                        setOpen(false)
                    }}>
                        <CloseIcon />
                    </button>
                </div>
                <div className=''>
                    <Image alt="masterImage" width={601} height={401} src="/assets/product.jpg" className='rounded-2xl' />
                    <div className='p-[15px] grid gap-[10px]'>
                        <div className='flex justify-between items-center'>
                            <p className='font-urbanist font-semibold text-[24px] leading-[130%] tracking-[0] mb-0'>Shaving Kit</p>
                            <div className='flex items-center'>
                                <button className='bg-foreground w-[25px] aspect-square rounded-full text-background flex justify-center items-center'><Minus size={12} className='text-background' /></button>
                                <input className='hideNumberArrow w-[27px] text-center font-urbanist font-semibold outline-none text-[22px] leading-[14px] tracking-[0] align-middle text-xarfi-orange' value={1} type='number' />
                                <button className='bg-foreground w-[25px] aspect-square rounded-full text-background flex justify-center items-center'><Plus size={12} className='text-background' /></button>
                            </div>
                        </div>
                        <p className='font-urbanist font-light text-[18px] leading-[100%] tracking-[0] text-left'>Jorem ipsum dolor sit amet, consec tetur adipiscing elit. Jorem ipsum dolor sit amet, consec tetur adipiscing elit. Jorem ipsum dolor sit amet, consec tetur adipiscing elit. Jorem ipsum dolor sit amet, consec tetur adipiscing elit.Jorem ipsum dolor sit amet, consec tetur adipiscing elit. Jorem ipsum dolor sit amet, consec tetur adipiscing elit.Jorem ipsum dolor sit amet, consec tetur adipiscing elit. Jorem ipsum dolor sit amet, consec tetur adipiscing elit.</p>
                        <div className='flex items-center justify-between'>
                            <div className='font-urbanist font-bold text-[28px] leading-[80%] tracking-[0] text-xarfi-orange'>
                                € 60
                            </div>
                            <button className='bg-xarfi-orange font-urbanist font-semibold text-[18px] leading-[100%] tracking-[0] py-1.5 px-[15px] rounded-[6px] !text-white '>Add to Cart</button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

function ProductCard({ data }: proptype) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(open)
    }, [open])

    return (
        // 6884059c974523c3d1525ef0
        <div className='rounded-2xl bg-background-secondary cursor-pointer'
            onClick={() => {
                setOpen(true)
            }}
        >
            <Image width={413} height={257} alt='prduct' src={data?.imageUrl} className='rounded-2xl w-full md:aspect-[413/283.26] aspect-[180/136] object-cover' />
            <div className='md:p-[15px] p-[10px] grid gap-[7px]'>
                <div className='flex justify-between items-center'>
                    <p className='font-urbanist font-semibold md:text-[18px] text-[14px] leading-[130%] tracking-[0] mb-0'>{data?.name}</p>
                    <div className='flex items-center'>
                        <button className='bg-foreground md:w-[18px] w-[14.62px] aspect-square rounded-full text-background flex justify-center items-center'><Minus size={12} className='text-background' /></button>
                        <input className='hideNumberArrow w-[16px] text-center font-urbanist font-semibold outline-none md:text-[16px] text-[14px] leading-[14px] tracking-[0] align-middle text-xarfi-orange' value={1} type='number' />
                        <button className='bg-foreground md:w-[18px] w-[14.62px] aspect-square rounded-full text-background flex justify-center items-center'><Plus size={12} className='text-background' /></button>
                    </div>
                </div>
                <p className='font-urbanist font-light md:text-[14px] text-[10px] leading-[100%] tracking-[0] line-clamp-2 text-left'>{data?.description} <span className='text-xarfi-orange'>See More</span></p>
                <div className='flex items-center justify-between'>
                    <div className='font-urbanist font-bold text-[18px] leading-[80%] tracking-[0]'>
                        € {data?.price}
                    </div>
                    <button className='bg-xarfi-orange font-urbanist font-semibold md:text-[14px] text-[10px] leading-[100%] tracking-[0] py-1.5 px-[15px] rounded-[6px] !text-white '>Add to Cart</button>
                </div>
            </div>
            <ProductDetailDialogue open={open} setOpen={setOpen} />
        </div>

    )
}

export default ProductCard