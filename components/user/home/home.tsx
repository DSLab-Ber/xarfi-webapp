"use client"
import Container from '@/components/constants/Container'
import Header from '../constants/header/header'
import FilterSidebar from '../constants/filterSidebar/FilterSidebar'
import SaloonCard from '@/components/constants/SaloonCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CloseIcon, FilterControlsIcon } from '@/components/constants/Icons'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SaloonsListing } from './SaloonListing'
import axios from 'axios'
import { getCoordinates } from '@/lib/getCoordinates'
import Salon from './Salon'
import Cookies from "js-cookie"
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

type HomeProps = {
    categories: any;
};



function Home({ categories }: HomeProps) {
    const { lang }: any = useParams()
    // let cookieCoords: any = Cookies.get('coords')
    // let coords = cookieCoords ? JSON.parse(cookieCoords) : []
    // let longitude = coords?.[0]
    // let latitude = coords?.[1]
    // const [selectedCategory, setSelectedCategory] = useState('')

    const [filters, setFilters] = useState<any>({
        page: 1,
        targetGroup: '',
        Service_names: '',
        rating: 0,
        minPrice: 0,
        maxPrice: 0,
        date: '',
        longitude: "",
        latitude: "",
    })

    console.log(filters, 'filtersfilters')

    // React Query Infinite Query
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
        status,
    } = useInfiniteQuery({
        queryKey: [
            'salons',
            lang,
            filters.date,
            filters.targetGroup,
            filters.minPrice,
            filters.maxPrice,
            filters.rating,
            filters.longitude,
            filters.latitude,
            filters.Service_names, // ✅ included in queryKey
        ],
        queryFn: async ({ pageParam = 1 }) => {
            const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/api/user/nearest?lang=${lang}${pageParam ? `&page=${pageParam}` : ''
                }${filters.latitude ? `&latitude=${filters.latitude}` : ''}${filters.longitude ? `&longitude=${filters.longitude}` : ''
                }${filters.date ? `&date=${filters.date}` : ''}${filters.targetGroup ? `&targetGroup=${filters.targetGroup}` : ''
                }${filters.rating ? `&rating=${filters.rating}` : ''}${filters.minPrice ? `&minPrice=${filters.minPrice}` : ''
                }${filters.maxPrice ? `&maxPrice=${filters.maxPrice}` : ''}${filters.Service_names?.length
                    ? `&Service_names=${filters.Service_names}`
                    : ''
                }`

            const res = await axios.get(apiURL)
            return res.data.data
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
                return lastPage.pagination.currentPage + 1
            }
            return undefined
        },
        initialPageParam: 1,
    })

    // Infinite scroll
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null

        const handleScroll = () => {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 200
                ) {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage()
                    }
                }
            }, 150)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])
    console.log()
    const salons = data?.pages.flatMap((page) => page.salons) ?? []
    const pagination = data?.pages[0]?.pagination
    const totalItems = pagination?.totalItems ?? 0

    return (
        <div className='md:pt-[24px] pt-6'>
            <div className='shadow-[0px_50px_40px_-50px_#00000080] md:pb-[50px] pb-[10px]'>
                <Header />
                <Container>
                    <div className='flex gap-5 mt-[30px] max-lg:overflow-auto items-center w-full overflow-auto scrollbar-hide'>
                        {categories?.length ? categories?.map((a: any, i: any) => (
                            <div className='md:aspect-[197/119] md:min-w-[197px] aspect-[113/69] min-w-[113px] group relative bg-center bg-cover rounded-2xl overflow-hidden cursor-pointer flex items-end p-[15px]' style={{ backgroundImage: `url('${a?.image || '/assets/categoryImage.jpg'}')` }}
                                onClick={() => {
                                    setFilters((prv: any) => ({
                                        ...prv,
                                        Service_names: a.name
                                    }))
                                }}
                            >
                                <div className={`${filters.Service_names === a?.name ? 'opacity-100' : 'opacity-0'}  group-hover:opacity-100 bg-[linear-gradient(180deg,rgba(255,140,38,0)_0%,rgba(255,140,38,0.8)_79.81%,#FF8C26_100%)] absolute top-0 right-0 h-full w-full flex items-end `} style={{ transition: '0.2s' }} />
                                <div className={`${filters.Service_names === a?.name ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 bg-[linear-gradient(180deg,rgba(30,30,30,0)_0%,rgba(30,30,30,0.8)_79.81%,#1E1E1E_100%)] absolute top-0 right-0 h-full w-full flex items-end `} style={{ transition: '0.2s' }} />
                                <p className='font-urbanist !text-white relative font-semibold md:text-[18px] text-xs leading-[100%] tracking-[0px]'>
                                    {a.name}
                                </p>
                            </div>
                        ))
                            :
                            <>
                                {[1, 2, 3, 4, 5]?.map(() => (
                                    <div className='md:aspect-[197/119] md:min-w-[197px] aspect-[113/69] min-w-[113px] group relative bg-center bg-cover rounded-2xl overflow-hidden cursor-pointer flex items-end ' >
                                        <Skeleton className='w-full h-full' />
                                    </div>
                                ))}
                            </>
                        }
                        <div className='md:aspect-[197/119] md:min-w-[197px] aspect-[113/69] min-w-[113px] group relative bg-center bg-cover rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center p-[15px] border dark:border-white'>
                            <p className='font-urbanist text-white relative font-semibold md:text-[18px] text-xs leading-[100%] tracking-[0px]'>
                                See More
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className='md:py-[50px] py-[10px]'>
                <Container>
                    <div className='w-full grid gap-[50px] lg:grid-cols-[305px_1fr] grid-cols-1 relative'>
                        <div className='w-full max-lg:hidden'>
                            <FilterSidebar filters={filters} setFilters={setFilters} totalItems={totalItems} categories={categories} />
                        </div>
                        <div className='w-full'>
                            <h5 className='font-urbanist font-bold md:text-[24px] text-[18px] leading-[100%] tracking-[0px] !text-[#FF8C26] lg:hidden max-md:mb-5'>{totalItems} Salons</h5>
                            <div className='w-full col-span-2 md:mb-[27px] mb-5'>
                                <div className='grid w-full md:grid-cols-[582px_1fr] grid-cols-1 gap-[25px]'>
                                    <div className='relative flex items-center'>
                                        <Input className='bg-background-secondary px-[15px] py-6 rounded-2xl w-full flex items-center font-urbanist font-normal text-[16px] leading-[16px] tracking-[0] outline-none border-none focus:outline-none focus:shadow-none h-[65px]'
                                            placeholder='Search by salon name, stylist'
                                        />
                                        <Sheet>
                                            <SheetTrigger className='absolute right-2.5'>
                                                <button className='w-8 h-8 rounded-[6px] bg-xarfi-orange lg:hidden flex items-center justify-center '>
                                                    <FilterControlsIcon size={18} />
                                                </button>
                                            </SheetTrigger>
                                            <SheetContent className="rounded-tl-2xl rounded-bl-2xl border-none md:py-[50px] md:px-5 py-4 !max-w-[430px] w-full">
                                                <div className='w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4 lg:hidden max-md:px-4 border-b border-b-[#535353]'>
                                                    <p className='font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0]'>Filter</p>
                                                    <SheetClose asChild>
                                                        <button className='w-6 h-6'><CloseIcon clasName={'max-md:w-6 max-md:h-6'} /></button>
                                                    </SheetClose>
                                                </div>
                                                <FilterSidebar />
                                                <div className='grid grid-cols-2 gap-5 bg-background max-md:px-4'>
                                                    <button className='rounded-2xl border border-[#FF0F0F] !text-[#FF0F0F] font-urbanist font-semibold text-[16px] leading-[20px] tracking-[0] py-[18px]'>
                                                        Reset
                                                    </button>
                                                    <button className='!text-white bg-xarfi-orange rounded-2xl  font-urbanist font-semibold text-[16px] leading-[20px] tracking-[0] py-[18px]'>
                                                        Show Result
                                                    </button>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                    <div className='max-md:hidden'>
                                        <Select>
                                            <SelectTrigger className="bg-background-secondary px-[15px] py-6 rounded-2xl w-full flex items-center font-urbanist font-normal text-[16px] leading-[16px] tracking-[0] outline-none border-none focus:outline-none focus:shadow-none !h-[65px] [&>span]:!font-urbanist [&>span]:!font-normal [&>span]:!text-[16px] [&>span]:!leading-[16px] [&>span]:!tracking-[0]">
                                                <SelectValue placeholder="Sort by" className='font-urbanist font-normal !text-[16px] !leading-[16px] tracking-[0]' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <SaloonsListing lang={lang} longitude={filters?.longitude} latitude={filters?.latitude} salons={salons} isLoading={isLoading} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )

}

export default Home