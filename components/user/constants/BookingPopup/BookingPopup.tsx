import { RadioOption } from "@/components/constants/Form"
import { BackIcon, CloseIcon, DeleteIcon, InfoCircleIcon } from "@/components/constants/Icons"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { BookingApi, getBookingSlotApi, getServiceMasterApi } from "@/lib/api/user/User"
import { months, pad } from "@/lib/utils"
import { useWeekNavigator } from "@/lib/week-utils"
import { useServiceStore } from "@/stores/serviceCart"
import { Check, ChevronLeft, ChevronRight, PlusIcon } from "lucide-react"
import Image from "@/components/constants/Image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BookingConfirmed from "../BookingConfirmed"
import { useProfileStore } from "@/stores/profile"
import PaymentDialogues from "../PaymentDialogues"
import { toast } from "sonner"
import { useBookingStore } from "@/stores/booking"

type Props = {
    children?: any;
    className?: any;
    salon?: any;
    refetch?: any
}

const ServiceCard = ({ data }: any) => {
    const { id }: any = useParams()
    const {
        addServiceForOwner,
        updateServiceForOwner,
        removeServiceForOwner,
        clearServicesForOwner,
        getServicesForOwner,
        setServicesForOwner,
    } = useServiceStore();
    return (
        <div className="bg-[#F3F3F3] dark:bg-[#252424] py-2.5 px-[15px] rounded-[8px] flex justify-between items-center">
            <div className="grid gap-2.5">
                <div className='flex items-center gap-[3px]'>
                    <h5 className='font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]'>{data?.name}</h5>
                    <span className='text-foreground'><InfoCircleIcon /></span>
                </div>
                <h4 className="font-urbanist font-bold text-[20px] leading-[80%] tracking-[0]">€ {data.price}</h4>
            </div>
            <div>
                <button className="cursor-pointer"
                    onClick={() => {
                        removeServiceForOwner(id, data?._id)
                    }}
                >
                    <span className="sr-only">Delete Item</span>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

const MasterSkeleton = () => {
    return (
        <div className="grid grid-1 items-center">
            <div className="w-[60px] aspect-square rounded-full relative">
                <Skeleton className="w-[60px] h-[60px] rounded-full" />
            </div>
            <Skeleton className="mt-2 h-3 w-[40px] mx-auto rounded-full" />
        </div>
    )
}

const Master = ({ index, master, selectedMaster, setSelectedMaster }: any) => {
    let active = master?._id === selectedMaster?._id
    return (
        <div className="grid grid-1 cursor-pointer" onClick={() => {
            // setActive(index)
            setSelectedMaster(master)
        }}>
            <div className={`w-[60px] aspect-square rounded-full relative ${active ? 'border-2 border-[#FF8C26]' : ''}`}>
                {active ?
                    <div className="border border-[#121212] text-[#121212] absolute top-[-9px] right-[5px] h-[18px] aspect-square bg-xarfi-orange rounded-full flex items-center justify-center">
                        <Check size={8} color="#121212" />
                    </div>
                    :
                    <></>
                }
                <Image width={60} height={60} alt={master?.name} src={master?.image} className="w-full h-full rounded-full object-cover object-center" />
            </div>
            <p className={`font-urbanist font-normal text-[12px] leading-[130%] tracking-[0] text-center ${active ? '!text-[#FF8C26]' : ''}`}>{master?.name}</p>
        </div>
    )
}

function BookingPopup({ children, className, salon, refetch }: Props) {
    const { id, lang }: any = useParams()
    const router = useRouter()
    const [active, setActive] = useState(1)
    const [open, setOpen] = useState(false)
    const { week, monthYear, goNextWeek, goPreviousWeek, jumpWeeks, goToWeek } = useWeekNavigator();
    const [bookingForSomeone, setBookingForSomeone] = useState(false)
    const [masterLoading, setMasterLoading] = useState(true)
    const [slotsLoading, setSlotsLoading] = useState(true)
    const [masters, setMasters] = useState<any[]>([])
    const [slots, setSlots] = useState<any[]>([])
    const [slotsMsg, setSlotsMsg] = useState('')
    const [guest, setGuest] = useState('')
    const [guestName, setGuestName] = useState('')
    const [selectedSlot, setSelectedSlot] = useState('')
    const [date, setDate] = useState<number | string>(0)
    const [bookingForDialogue, setBookingForDialogue] = useState(false)
    const [selectedMaster, setSelectedMaster] = useState<any>(null)
    const { profile } = useProfileStore(); // 👈 from Zustand
    const {
        setBookingSession,
        clearBookingSession,
        dateSession,
        masterIdSession,
        timeSlotSession,
        bookingForSession,
    } = useBookingStore();
    const {
        clearServicesForOwner,
        getServicesForOwner,
    } = useServiceStore();
    const serviceList = getServicesForOwner(id)
    // get master
    const getMasters = async () => {
        try {
            setMasterLoading(true)
            let mastersData = await getServiceMasterApi(lang, id, serviceList)
            console.log("masters", mastersData)
            setMasters(mastersData?.data?.masters)
            setMasterLoading(false)
        } catch (err) {
            console.log('master error', err)
            setMasterLoading(false)

        }
    }
    useEffect(() => {
        if (serviceList?.length) {
            getMasters()
        }
    }, [serviceList?.length])


    useEffect(() => {
        if (dateSession) {
            goToWeek(new Date(dateSession))
            setDate(String(new Date(dateSession).getDate()))
        }
        if (masterIdSession) {
            let master = masters.filter(obj => obj._id === masterIdSession)?.[0]
            setSelectedMaster(master)
        }
        if(timeSlotSession){
            setSelectedSlot(timeSlotSession)
        }
        if (selectedMaster) {
            setGuestName(bookingForSession)
        }
    }, [dateSession, masterIdSession, timeSlotSession, bookingForSession, masters])

    const getBooking = async () => {
        try {
            let selectedDate = `${monthYear.year}-${pad(months.indexOf(monthYear.month) + 1)}-${pad(date)}`
            setSlotsLoading(true)
            let slotsData = await getBookingSlotApi(lang, selectedMaster?._id, serviceList, selectedDate)
            console.log("slotData", slotsData?.data)
            setSlots(slotsData?.data || [])
            setSlotsMsg(slotsData?.message)
            setSlotsLoading(false)
            refetch()
        } catch (err) {
            console.log('master error', err)
            setSlotsLoading(false)

        }
    }
    useEffect(() => {
        if (selectedMaster && date) {
            getBooking()
        }
    }, [selectedMaster, date])


    // booking
    const clearAll = () => {
        setBookingForSomeone(false)
        setMasterLoading(true)
        setSlotsLoading(true)
        setMasters([])
        setSlots([])
        setSlotsMsg('')
        setGuest('')
        setGuestName('')
        setSelectedSlot('')
        setDate(0)
        setBookingForDialogue(false)
        setSelectedMaster(null)
        setOpen(false)
        clearServicesForOwner(id)
    }
    const setBooking = async () => {
        try {
            let selectedDate = `${monthYear.year}-${pad(months.indexOf(monthYear.month) + 1)}-${pad(date)}`
            await BookingApi(serviceList, selectedMaster._id, id, selectedDate, selectedSlot, bookingForSomeone, guestName)
                .then((res) => {
                    // clearAll()
                    toast.success(res?.message)

                })
            return 'a'
        } catch (err) {
            console.log(err)
        }
    }
    const handleSignupContinue = () => {
        let selectedDate = `${monthYear.year}-${pad(months.indexOf(monthYear.month) + 1)}-${pad(date)}`
        setBookingSession(selectedDate, selectedMaster._id, selectedSlot, guestName, id);
        router.push(`/${lang}/user/login`)
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={className}>{children}</SheetTrigger>
            <SheetContent className="rounded-tl-2xl rounded-bl-2xl border-none md:py-[50px] py-6 md:px-5 px-4 !max-w-[430px] w-full justify-start">
                <div className="flex flex-col gap-5 h-full  overflow-auto justify-start">
                    <div className='w-full flex md:justify-between items-center sticky top-0 z-10 bg-background pb-4'>
                        <SheetClose asChild className='md:hidden'>
                            <button
                                className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
                            >
                                <BackIcon />
                            </button>
                        </SheetClose>
                        <p className='font-urbanist font-semibold md:text-[20px] text-[16px] leading-[130%] tracking-[0]'>Book Appointment</p>
                        <SheetClose asChild className='max-md:hidden'>
                            <button><CloseIcon /></button>
                        </SheetClose>
                    </div>
                    <div className="grid gap-[15px]">
                        <div className="w-full">
                            <div className="w-full flex justify-between">
                                <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Services</h5>
                                <button className="bg-foreground flex items-center justify-center font-urbanist font-normal text-[12px] leading-[20px] tracking-[0] !text-background py-0.5 px-1.5 rounded-2xl gap-1"><PlusIcon size={10} /> Add More</button>
                            </div>
                        </div>
                        <div className="grid gap-2.5">
                            {serviceList.map((data, i) => (
                                <ServiceCard key={i} data={data} />
                            ))}
                        </div>
                    </div>
                    {serviceList?.length ?
                        <div className="grid gap-[15px]">
                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Master</h5>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center overflow-auto scrollbar-hide py-2">
                                {masterLoading ?
                                    <>
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <MasterSkeleton key={i} />
                                        ))}
                                    </>
                                    :
                                    <>
                                        {masters?.map((data, i) => (
                                            <Master key={i} index={i} active={active} setActive={setActive} master={data} selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} />
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                        : null}
                    {selectedMaster ?
                        <div className="grid gap-[15px]">
                            <div className="w-full">
                                <div className="w-full flex justify-between mb-4">
                                    <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Select Date</h5>
                                </div>
                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <button onClick={goPreviousWeek}>
                                            <ChevronLeft color="#FF8C26" />
                                        </button>
                                        <p>{monthYear.month}, {monthYear.year}</p>
                                        <button onClick={goNextWeek}>
                                            <ChevronRight color="#FF8C26" />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full grid grid-cols-7 gap-[11px] mt-6">
                                    {week.map((day, i) => {
                                        const currentDate = new Date()

                                        // get month index (0-based)
                                        const monthIndex = months.indexOf(monthYear.month)

                                        // build the full date for each cell
                                        const cellDate = new Date(Number(monthYear.year), monthIndex, Number(day.dayNumber))

                                        // disable if the date is in the past
                                        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                                        const disabled = cellDate < today

                                        return (
                                            <div
                                                key={i}
                                                className={`bg-[#F3F3F3] dark:bg-[#252424] py-[17px] rounded-[100px] flex flex-col items-center justify-center gap-1 cursor-pointer ${date === day.dayNumber ? "!bg-[#FF8C26]" : ''} ${disabled ? "opacity-40 !cursor-not-allowed" : ''}`}
                                                onClick={() => {
                                                    if (!disabled) {
                                                        setDate(day.dayNumber)
                                                    }
                                                }}
                                            >
                                                <p
                                                    className={`!text-[#817F7F] !dark:text-[#ACACAC] font-urbanist font-normal text-[12px] leading-[100%] tracking-[0.03em] ${date === day.dayNumber ? "!text-white" : ''}`}
                                                >
                                                    {day.dayName?.slice(0, 3)}
                                                </p>
                                                <p
                                                    className={`!text-[#817F7F] !dark:text-[#ACACAC] font-urbanist font-bold text-[24px] leading-[100%] tracking-[0] ${date === day.dayNumber ? "!text-white" : ''}`}
                                                >
                                                    {day.dayNumber}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        : null}
                    {date ?
                        <div className="grid gap-[15px]">
                            <div className="w-full">
                                <div className="w-full flex justify-between mb-[15px]">
                                    <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Select Time</h5>
                                </div>
                                <div className="w-full grid grid-cols-3 gap-[12.33px] mb-[15px]">
                                    {slotsLoading ?
                                        <>
                                            {[1, 2, 3].map(() => (
                                                <div className=" w-[122px] rounded-[8px] font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center cursor-pointer h-11">
                                                    <Skeleton className="w-full h-full " />
                                                </div>
                                            ))}
                                        </>
                                        :
                                        <>

                                            {slots?.length ? slots.map((a, i) => {
                                                return a?.available ? (
                                                    <div key={i} className={`border p-[11px] rounded-[8px] font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center cursor-pointer ${selectedSlot === a?.time ? "bg-xarfi-orange !text-white border-[#FF8C26]" : ""}`}
                                                        onClick={() => {
                                                            setSelectedSlot(a?.time)
                                                        }}
                                                    >
                                                        {a?.time}
                                                    </div>
                                                ) : null
                                            })
                                                :
                                                <div className="col-span-3 text-sm text-center opacity-80 py-5">
                                                    <p className=" ">{slotsMsg}</p>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                                <p className="font-urbanist font-medium text-[12px] leading-[14px] tracking-[0]"><span className="text-xarfi-orange">Note:</span> Bookings less than 24 hours can not be rescheduled.</p>
                            </div>
                        </div>
                        : null}
                    {selectedSlot ?
                        <div className="grid gap-[15px]">
                            <div className="w-full">
                                <div className="w-full flex justify-between mb-[15px]">
                                    <h5 className="font-urbanist font-semibold text-[16px] leading-[130%] tracking-[0]">Booking for <span className="font-semibold">(optional)</span></h5>
                                </div>
                                <div className="border border-[#1E1E1E] rounded-2xl w-full py-[18px] px-[15px] flex items-center justify-between">
                                    <p className="!text-[#FF8C26] font-urbanist font-bold text-[16px] leading-[20px] tracking-[0]">{guestName || "Myself"}</p>
                                    <Sheet open={bookingForDialogue} onOpenChange={setBookingForDialogue}>

                                        <SheetTrigger className="font-urbanist font-normal text-[12px] underline cursor-pointer">
                                            Change
                                        </SheetTrigger>
                                        <SheetContent
                                            side="bottom"
                                            className="w-full !max-w-[430px] mx-auto min-h-[300px] rounded-t-2xl border-none !bottom-0 !left-auto !right-0 rounded-tl-2xl rounded-tr-2xl"
                                        >
                                            <div className="pt-5 pb-[30px] px-4 w-full">
                                                <div className='w-full z-10 bg-background max-w-[402px]  mx-auto border-b border-[#535353]'>
                                                    <SheetTrigger asChild>
                                                        <div className="mx-auto h-[5px] w-12 rounded-[100px] bg-[#777] handleBar" />
                                                    </SheetTrigger>
                                                    <div className="flex justify-between items-center p-[15px]">
                                                        <p className='font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]'>Booking For</p>
                                                        <SheetClose asChild>
                                                            <button><CloseIcon /></button>
                                                        </SheetClose>
                                                    </div>
                                                </div>

                                                <div className="my-5">
                                                    <RadioOption
                                                        label={'I am booking for someone other than myself'}
                                                        selected={bookingForSomeone}
                                                        textClassName={'font-urbanist font-medium text-[16px] leading-[20px] tracking-[0px]'}
                                                        onClick={() => setBookingForSomeone(!bookingForSomeone)}
                                                    />
                                                </div>
                                                {bookingForSomeone ?
                                                    <>
                                                        <div className="">
                                                            <Input placeholder="Guest Name" className="rounded-2xl bg-background-secondary py-[21px] px-[15px] font-urbanist font-normal text-[16px] leading-[14px] tracking-[0] h-14" value={guest}
                                                                onChange={(ev) => {
                                                                    setGuest(ev.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                        <button className="bg-xarfi-orange w-full rounded-2xl py-[22.5px] font-urbanist font-semibold text-[20px] leading-[20px] tracking-[0] mt-5"
                                                            onClick={() => {
                                                                setGuestName(guest)
                                                                setBookingForDialogue(false)
                                                            }}
                                                        >
                                                            Add
                                                        </button>
                                                    </>
                                                    : null}
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </div>
                        : null}
                    {selectedSlot ?
                        <>
                            {profile?.id || profile?._id ?


                                <PaymentDialogues className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-[14px] leading-[20px] tracking-[0] !text-white"
                                    setBooking={setBooking}
                                    salon={salon}
                                    selectedSlot={selectedSlot}
                                    date={`${monthYear.year}-${monthYear.month}-${pad(date)}`}
                                    clearAll={clearAll}
                                >
                                    Continue
                                </PaymentDialogues>
                                :
                                <button className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[18px] font-urbanist font-semibold md:text-[20px] text-[14px] leading-[20px] tracking-[0] !text-white"
                                    onClick={() => {
                                        handleSignupContinue()
                                    }}
                                >
                                    Sign In & Continue
                                </button>
                            }
                        </> : null
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BookingPopup