"use client"
import { DateTimePicker } from '@/components/constants/DateTimePicker'
import { RadioOption } from '@/components/constants/Form'
import TwoWaySliderWithPopover from '@/components/constants/RangeSelector'
import { Switch } from '@/components/ui/switch'
import { useLocation } from '@/lib/LocationProvider'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from "js-cookie"
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Rating from '../Rating'

function FilterSidebar({ filters, setFilters, totalItems, categories }: any) {
    const queryClient = useQueryClient()
const { location } = useLocation();
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    // filter states start
    const [targetGroup, setTargetGroup] = useState<string[]>([])
    const [rating, setRating] = useState(0)
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]) //[minPrice,maxPrice]
    const [date, setDate] = useState("")
    const [categoriesFiltered, setCategoriesFiltered] = useState<string[]>([])
    // filter states end
    const [loader, setLoader] = useState(false)
    const filter = [
        "All",
        "Men",
        "Women",
        "Other"
    ]
    const { lang } = useParams();
  // ✅ 1️⃣ Get fallback coords from cookie (before user gives location permission)
  const cookieCoords: any = Cookies.get("coords");
  const coords = cookieCoords ? JSON.parse(cookieCoords) : [];
  const longitudeCookie = coords?.[0];
  const latitudeCookie = coords?.[1];

  // ✅ 2️⃣ Always prefer live location (from LocationProvider) over cookie
  const longitude =
    Array.isArray(location) && location.length === 2
      ? location[0]
      : longitudeCookie;
  const latitude =
    Array.isArray(location) && location.length === 2
      ? location[1]
      : latitudeCookie;

  // ✅ 3️⃣ Whenever any filter OR location changes → update filters in parent
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters({
        ...filters,
        targetGroup: targetGroup.length ? targetGroup.join(",") : undefined,
        Service_names: categoriesFiltered.length
          ? categoriesFiltered.join(",")
          : undefined,
        rating: rating || undefined,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] || undefined,
        date: date || undefined,
        longitude,
        latitude,
      });
    }, 400); // small debounce

    return () => clearTimeout(handler);
  }, [
    targetGroup,
    rating,
    priceRange,
    date,
    longitude,
    latitude,
    categoriesFiltered,
  ]);

  // ✅ 4️⃣ Optional: immediately push filters once location is received (no delay)
  useEffect(() => {
    if (longitude && latitude) {
      setFilters((prev: any) => ({
        ...prev,
        longitude,
        latitude,
      }));
    }
  }, [longitude, latitude]);


    return (
        <div className='sidebar flex flex-col gap-[25px] max-md:px-4 sticky top-0 max-md:h-screen max-md:overflow-auto'>
            {loader ?
                <div className='absolute bg-background top-0 left-0 w-full h-full z-10 opacity-25 cursor-not-allowed' style={{ backdropFilter: 'blur(10px)' }} />
                : null}
            <div className='max-md:hidden'>
                <h5 className='font-urbanist font-bold text-[24px] leading-[100%] tracking-[0px] !text-[#FF8C26]'>{totalItems} Salons</h5>
            </div>
            <div className=''>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] mb-[15px]'>Availabilty</p>
                <DateTimePicker setDateState={setDate} dateState={date} />
            </div>
            <div className=''>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] mb-[15px]'>Filter By Gender</p>
                <div className='grid gap-[10px]'>
                    {filter.map((option) => (
                        <RadioOption
                            key={option}
                            label={option}
                            selected={targetGroup.includes(option)}
                            textClassName={'font-urbanist font-medium text-[16px] leading-[20px] tracking-[0px]'}
                            onClick={() => {
                                // setTimeout(() => {
                                let arr = [...targetGroup]
                                if (arr?.includes(option)) {
                                    arr.splice(arr.indexOf(option), 1)
                                    setTargetGroup(arr)
                                } else {
                                    arr.push(option)
                                    setTargetGroup(arr)
                                }
                                // }, 500)
                            }}
                        />
                    ))}
                </div>
            </div>
            {/* <div className='h-[500px] overflow-scroll scrollbar-hide relative'>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] mb-[15px] w-full py-2 sticky top-0 bg-background z-10'>Categories</p>
                {categories?.map((a: any, i: string) => (
                    <div className='flex justify-between items-center mb-4' key={a?._id}>
                        <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] '>{a?.name}</p>
                        <Switch
                            checked={categoriesFiltered.includes(a?.name)}
                            onCheckedChange={() => {
                                let cat = [...categoriesFiltered]
                                if (cat.includes(a?.name)) {
                                    cat.splice(cat.indexOf(a?.name), 1)
                                } else {
                                    cat = [...categoriesFiltered, a?.name]
                                }
                                setCategoriesFiltered(cat)

                            }}
                            className={`
                        data-[state=checked]:bg-[#FF8C26] 
                        data-[state=unchecked]:bg-neutral-200
                        [&>span]:bg-white
                      `}
                        />
                    </div>
                ))}
            </div> */}
     <div className='flex justify-between items-center'>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] '>Open Now</p>
                <Switch
                    // checked={checked}
                    // onCheckedChange={onCheckedChange}
                    className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
      `}
                />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] '>Pat Friendly</p>
                <Switch
                    // checked={checked}
                    // onCheckedChange={onCheckedChange}
                    className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
      `}
                />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] '>Pay by Card</p>
                <Switch
                    // checked={checked}
                    // onCheckedChange={onCheckedChange}
                    className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
      `}
                />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] '>Pay at Salon</p>
                <Switch
                    // checked={checked}
                    // onCheckedChange={onCheckedChange}
                    className={`
        data-[state=checked]:bg-[#FF8C26] 
        data-[state=unchecked]:bg-neutral-200
        [&>span]:bg-white
      `}
                />
            </div>
            <div className=''>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] mb-[15px]'>Rating</p>
                <Rating rating={rating} setRating={setRating} />
            </div>
            <div className=''>
                <p className='font-urbanist font-semibold md:text-[20px] text-[14px] leading-[100%] tracking-[0px] mb-[58px]'>Price Range</p>
                <div>
                    <TwoWaySliderWithPopover setPriceRange={setPriceRange} priceRange={priceRange} />
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar