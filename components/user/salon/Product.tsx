import { CloseIcon } from '@/components/constants/Icons'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getProductDetailApi } from '@/lib/api/user/User'
import { useProductStore } from '@/stores/productCart'
import { Minus, Plus } from 'lucide-react'
import Image from '@/components/constants/Image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface proptype {
    data?: any
}
const ProductDetailDialogue = ({ open, setOpen, product }: any) => {
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
                    <Image alt="masterImage" width={601} height={401} src={product?.image} className='rounded-2xl w-full ' />
                    <div className='p-[15px] grid gap-[10px]'>
                        <div className='flex justify-between items-center'>
                            <p className='font-urbanist font-semibold text-[24px] leading-[130%] tracking-[0] mb-0'>{product?.name}</p>
                            <div className='flex items-center'>
                                <button className='bg-foreground w-[25px] aspect-square rounded-full text-background flex justify-center items-center'><Minus size={12} className='text-background' /></button>
                                <input className='hideNumberArrow w-[27px] text-center font-urbanist font-semibold outline-none text-[22px] leading-[14px] tracking-[0] align-middle text-xarfi-orange' value={1} type='number' />
                                <button className='bg-foreground w-[25px] aspect-square rounded-full text-background flex justify-center items-center'><Plus size={12} className='text-background' /></button>
                            </div>
                        </div>
                        <p className='font-urbanist font-light text-[18px] leading-[100%] tracking-[0] text-left'>
                            {product?.description}
                        </p>
                        <div className='flex items-center justify-between'>
                            <div className='font-urbanist font-bold text-[28px] leading-[80%] tracking-[0] text-xarfi-orange'>
                                € {product?.price}
                            </div>
                            <button className='bg-xarfi-orange font-urbanist font-semibold text-[18px] leading-[100%] tracking-[0] py-1.5 px-[15px] rounded-[6px] !text-white '>Add to Cart</button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

const ProductCard = ({ product, setOpen, getProductDetail, addProductForOwner, id }: any) => {
    const [quantity, setQuantity] = useState<number>(1)
    return (
        <>

            <div className='rounded-2xl bg-background-secondary cursor-pointer'>
                <Image width={413} height={257} alt='prduct' src={product?.imageUrl} className='rounded-2xl w-full md:aspect-[413/283.26] aspect-[180/136] object-cover cursor-pointer'
                    onClick={() => {
                        setOpen(true)
                        getProductDetail(product?._id)
                    }}
                />
                <div className='md:p-[15px] p-[10px] grid gap-[7px]'>
                    <div className='flex justify-between items-center'>
                        <p className='font-urbanist font-semibold md:text-[18px] text-[14px] leading-[130%] tracking-[0] mb-0'>{product?.name}</p>
                        <div className='flex items-center'>
                            <button className='bg-foreground md:w-[18px] w-[14.62px] aspect-square rounded-full text-background flex justify-center items-center'
                                onClick={() => {
                                    let q = quantity
                                    if ((q - 1) > Number(product.quantity)) {
                                        setQuantity(Number(product.quantity))
                                    } else if ((q - 1) > 0) {
                                        setQuantity(q - 1)
                                    } else {
                                        setQuantity(1)
                                    }
                                }}
                            ><Minus size={12} className='text-background' /></button>
                            <input className='hideNumberArrow w-[16px] text-center font-urbanist font-semibold outline-none md:text-[16px] text-[14px] leading-[14px] tracking-[0] align-middle text-xarfi-orange' value={quantity} type='number'
                                onChange={(e: any) => {
                                    if (e.target.value > Number(product.quantity)) {
                                        setQuantity(Number(product.quantity))
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
                                    if ((q + 1) > Number(product.quantity)) {
                                        toast.error(`This product has ${product.quantity} in stock`)
                                        setQuantity(Number(product.quantity))
                                    } else if ((q + 1) > 0) {
                                        setQuantity(q + 1)
                                    } else {
                                        setQuantity(1)
                                    }
                                }}
                            /></button>
                        </div>
                    </div>
                    <p className='font-urbanist font-light md:text-[14px] text-[10px] leading-[100%] tracking-[0] line-clamp-2 text-left'>{product?.description} <span className='text-xarfi-orange'>See More</span></p>
                    <div className='flex items-center justify-between'>
                        <div className='font-urbanist font-bold text-[18px] leading-[80%] tracking-[0]'>
                            € {product?.price}
                        </div>
                        {product.quantity ?

                            <button className='bg-xarfi-orange font-urbanist font-semibold md:text-[14px] text-[10px] leading-[100%] tracking-[0] py-1.5 px-[15px] rounded-[6px] !text-white '
                                onClick={() => {
                                    addProductForOwner(id, {
                                        ...product,
                                        totalQuantity: product?.quantity,
                                        quantity: quantity
                                    })
                                }}
                            >Add to Cart</button>
                            :
                            <button disabled className='bg-xarfi-orange font-urbanist font-semibold md:text-[14px] text-[10px] leading-[100%] tracking-[0] py-1.5 px-[15px] rounded-[6px] !text-white !cursor-not-allowed'
                                onClick={() => {
                                    addProductForOwner(id, {
                                        ...product,
                                        totalQuantity: product?.quantity,
                                        quantity: quantity
                                    })
                                }}
                            >Out Of Stock</button>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
function Product({ data }: proptype) {
    const { lang, id }: any = useParams()
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState([])
    const {
        addProductForOwner
    } = useProductStore();
    const getProductDetail = async (id: string) => {
        let { data } = await getProductDetailApi(lang, id)
        console.log(data, 'productDetail')
        if (data.productDetail) {
            setProduct(data.productDetail)
        }
    }



    return (
        <div className='grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-2 md:gap-x-[21px] gap-x-[10px] md:gap-y-[20px] gap-y-[10px]'>
            {data?.map((product: any, i: number) => (
                <ProductCard product={product} setOpen={setOpen} getProductDetail={getProductDetail} addProductForOwner={addProductForOwner} id={id} />
            ))}
            <ProductDetailDialogue open={open} setOpen={setOpen} product={product} />
        </div>
    )
}

export default Product