import { CloseIcon, DeleteIcon } from '@/components/constants/Icons'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Minus, Plus, PlusIcon } from 'lucide-react'
import Image from '@/components/constants/Image'
import React, { ReactNode, useEffect, useState } from 'react'
import OrderConfirmed from '../OrderConfirmed'
import { useProductStore } from '@/stores/productCart'
import { useParams } from 'next/navigation'
import { sumProductPrices } from '@/lib/utils'
import { checkoutProduct } from '@/lib/api/user/User'
import Spinner from '@/components/constants/Spinner'
import { toast } from 'sonner'
interface PropType {
    children: ReactNode;
    className: string;
    checkout: any;
}

const ServiceCard = ({ data }: any) => {
    const { id }: any = useParams()
    const [quantity, setQuantity] = useState(data.quantity)
    const {
        removeProductForOwner,
        updateProductForOwner
    } = useProductStore();

    useEffect(() => {
        updateProductForOwner(id, {
            ...data,
            quantity
        })
    }, [quantity])
    return (
        <div className="bg-[#F3F3F3] dark:bg-[#252424] py-2.5 px-6 rounded-[8px] flex justify-between items-center">
            <div className="flex items-center gap-2.5 ">
                <Image width={74} height={74} alt={data?.name} src={data?.imageUrl} className='rounded-2xl w-[74px] aspect-square' />
                <div className='grid gap-2.5'>
                    <h5 className='font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]'>{data?.name}</h5>
                    <h4 className="font-urbanist font-bold text-[20px] leading-[80%] tracking-[0]">€ {data?.price}</h4>
                </div>
            </div>
            <div>
                <div className='flex gap-[15px] flex-col items-end'>
                    <div className='flex items-center'>
                        <button className='bg-foreground md:w-[18px] w-[14.62px] aspect-square rounded-full text-background flex justify-center items-center'
                            onClick={() => {
                                let q = quantity
                                if ((q - 1) > Number(data?.totalQuantity)) {
                                    toast.error(`This product has ${data?.totalQuantity} in stock`)
                                    setQuantity(Number(data?.totalQuantity))
                                } else if ((q - 1) > 0) {
                                    setQuantity(q - 1)
                                } else {
                                    setQuantity(1)
                                }
                            }}
                        ><Minus size={12} className='text-background' /></button>
                        <input className='hideNumberArrow w-[16px] text-center font-urbanist font-semibold outline-none md:text-[16px] text-[14px] leading-[14px] tracking-[0] align-middle text-xarfi-orange' value={quantity} type='number'
                            onChange={(e: any) => {
                                if (e.target.value > Number(data?.totalQuantity)) {
                                    setQuantity(Number(data?.totalQuantity))
                                } else if (e.target.value > 0) {
                                    setQuantity(e.target.value)
                                } else {
                                    setQuantity(1)
                                }
                            }}
                        />
                        <button className='bg-foreground md:w-[18px] w-[14.62px] aspect-square rounded-full text-background flex justify-center items-center'><Plus size={12} className='text-background'
                            onClick={() => {
                                let q = quantity
                                if ((q + 1) > Number(data?.totalQuantity)) {
                                    setQuantity(Number(data?.totalQuantity))
                                } else if ((q + 1) > 0) {
                                    setQuantity(q + 1)
                                } else {
                                    setQuantity(1)
                                }
                            }}
                        /></button>
                    </div>
                    <button className='cursor-pointer'
                        onClick={() => {
                            removeProductForOwner(id, data?._id)
                        }}
                    >
                        <span className="sr-only">Delete Item</span>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

function ProductPopup({ children, className, checkout }: PropType) {
    const { id }: any = useParams()
    const [loader, setLoader] = useState(false)
    const {
        getProductsForOwner,
        removeProductForOwner,
        clearProductsForOwner
    } = useProductStore();
    const productList = getProductsForOwner(id)




    return (
        <Sheet>
            <SheetTrigger className={className}>{children}</SheetTrigger>
            <SheetContent className="rounded-tl-2xl rounded-bl-2xl border-none py-[50px] px-5 !max-w-[430px] w-full">
                <div className="grid gap-5 max-h-full overflow-auto">
                    <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                        <p className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Checkout</p>
                        <SheetClose asChild>
                            <button><CloseIcon /></button>
                        </SheetClose>
                    </div>
                    <div className="grid gap-[15px] max-md:mb-[97px]">
                        <div className="w-full">
                            <div className="w-full flex justify-between">
                                <h5>Products</h5>
                                <button className="bg-foreground flex items-center justify-center font-urbanist font-normal text-[12px] leading-[20px] tracking-[0] !text-background py-0.5 px-1.5 rounded-2xl gap-1"><PlusIcon size={10} /> Add More</button>
                            </div>
                        </div>
                        <div className="grid gap-2.5">
                            {productList?.map((data, i) => {
                                return (
                                    <ServiceCard key={i} data={data} />
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-full max-md:bg-background max-md:fixed max-md:bottom-0 max-md:right-0 max-md:px-4 max-md:py-4'>
                        <button disabled={loader} className={`bg-xarfi-orange w-full rounded-2xl py-[22.5px] font-urbanist font-semibold text-[20px] leading-[20px] tracking-[0] !text-white ${loader ? "flex items-center py-0 h-[65px]  justify-center" : ''}`}
                            onClick={() => {
                                checkout()
                            }}
                        >
                            {loader ?
                                <Spinner className="w-6 h-6 fill-[#fff] text-gray-600" />
                                :
                                <>
                                    Pay Now (€ {sumProductPrices(productList)})
                                </>
                            }
                        </button>

                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ProductPopup