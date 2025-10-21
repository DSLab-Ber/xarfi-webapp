import React, { useState } from 'react'
import { InputField, RadioOption } from '../../../components/constants/Form'
import galleryIcon from './../../../assets/galleryIcon.png'
import { CheckIcon } from '../../../components/constants/Icons';
import { Steps, Button, message } from 'antd';
import UploadImage from '../../../components/constants/UploadImage';


function SaloonDetails({ next }) {
    const [salonName, setSalonName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [vat, setVat] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('cash') // 'cash' | 'card' | 'both'
    const [staffSize, setStaffSize] = useState('solo') // 'solo' | '2-5' | '6-10' | '11+'
    const [image, setImage] = useState(null)
    const [timingOpt, setTimingOpt] = useState('Same timing for all days')
    const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"])
    const [timing, setTiming] = useState([{
        day: "",
        startTime: '',
        endTime: ''
    }])
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
        }
    }
    return (
        <>
            <div className="w-full ">
                <div className='flex w-full gap-5 '>

                    {/* Image Upload */}
                    <div className="w-1/3">
                        <UploadImage handleImageUpload={handleImageUpload} image={image}/>
                    </div>

                    {/* Right Section */}
                    <div className="w-2/3">
                        <div className="grid gap-[15px] grid-cols-2">
                            <InputField placeholder="Salon Name" value={salonName} onChange={setSalonName} />
                            <InputField placeholder="Business Email (Optional)" value={email} onChange={setEmail} />
                            <InputField placeholder="Business Phone Number (Optional)" value={phone} onChange={setPhone} />
                            <InputField placeholder="Location" value={location} onChange={setLocation} />
                            <InputField placeholder="Business Registration Number" value={registrationNumber} onChange={setRegistrationNumber} />
                            <InputField placeholder="GST/VAT (if applicable)" value={vat} onChange={setVat} />

                            {/* Payment Method */}
                            <div className="col-span-2 px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                                <div className="flex items-center gap-[30px] flex-1">
                                    <span className="text-[#ACACAC] font-urbanist text-[16px]">In Store Payment Mode:</span>
                                    <div className="flex gap-[46px]">
                                        {['cash', 'card', 'both'].map((option) => (
                                            <RadioOption
                                                key={option}
                                                label={option === 'cash' ? 'Cash Only' : option === 'card' ? 'Card Only' : 'Both'}
                                                selected={paymentMethod === option}
                                                onClick={() => setPaymentMethod(option)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Staff Size */}
                            <div className="col-span-2 px-[15px] py-[12.5px] bg-background-secondary flex items-center rounded-2xl">
                                <div className="flex items-center gap-[30px] flex-1">
                                    <span className="text-[#ACACAC] font-urbanist text-[16px]">Team Size:</span>
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        {[
                                            { label: 'It’s just me', value: 'solo' },
                                            { label: '2-5 People', value: '2-5' },
                                            { label: '6-10 People', value: '6-10' },
                                            { label: '11+ People', value: '11+' },
                                        ].map((opt) => (
                                            <div
                                                key={opt.value}
                                                className={`font-urbanist cursor-pointer font-semibold text-[18px] py-2 px-[25px] rounded-lg ${staffSize === opt.value ? 'bg-xarfi-orange text-white' : ''
                                                    }`}
                                                onClick={() => setStaffSize(opt.value)}
                                            >
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full border-[3px] border-[#1E1E1E] rounded-2xl p-5 flex gap-[50px] mt-5'>
                    <div className=''>
                        <h5 className='font-bold text-lg leading-[100%]'>Salon Timings</h5>
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <RadioOption
                            label={'Same timing for all days'}
                            selected={timingOpt === "Same timing for all days"}
                            className="p-1 border border-xarfi-orange"
                            icon={false}
                            onClick={() => setTimingOpt('Same timing for all days')} />
                        {timingOpt === "Same timing for all days" ?
                            <>
                                <div className='flex gap-[10px]'>
                                    {days.map((a) => (
                                        <div className={`rounded-full cursor-pointer border border-[#FF8C26] text-white bg-[#FF8C261A] w-11 h-11 flex items-center justify-center font-semibold text-[16px] leading-[20px] tracking-[0px] font-urbanist ${timing.filter(obj => obj.day === a).length ? 'bg-xarfi-orange' : ''}`}
                                            onClick={() => {
                                                let arr = [...timing]
                                                let exist = arr.filter(obj => obj.day === a)?.[0]
                                                if (exist) {
                                                    arr.splice(arr.indexOf(exist), 1)
                                                    setTiming(arr)
                                                } else {
                                                    setTiming([...arr, {
                                                        day: a,
                                                        startTime: '',
                                                        endTime: ''
                                                    }])
                                                    // setTiming(arr)
                                                }

                                            }}
                                        >
                                            {a[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex gap-2 justify-between'>
                                    <div className=''>
                                        <InputField type='time' placeholder="Start Time" onChange={(value) => {
                                            let arr = arr.map((day) => {
                                                return {
                                                    ...day,
                                                    startTime: value
                                                }
                                            })
                                            setTiming(arr)

                                        }} />
                                    </div>
                                    <div className=''>
                                        <InputField type='time' placeholder="End Time" onChange={(value) => {
                                            let arr = arr.map((day) => {
                                                return {
                                                    ...day,
                                                    endTime: value
                                                }
                                            })
                                            setTiming(arr)

                                        }} />
                                    </div>
                                </div>
                            </>
                            : null}
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <RadioOption
                            label={'Different timings for some days'}
                            selected={timingOpt === "Different timings for some days"}
                            className="p-1 border border-xarfi-orange"
                            icon={false}
                            onClick={() => setTimingOpt('Different timings for some days')} />
                        {timingOpt === "Different timings for some days" ?
                            <>
                                {days.map((day, i) => (
                                    <div className='flex gap-[38px] items-center'>
                                        <div className='min-w-[109px]'>

                                            <RadioOption
                                                label={day}
                                                selected={timing.filter(obj => obj.day === day).length}
                                                textClassName="!font-medium !text-[14px] !leading-[100%] !tracking-[0px] !text-center !font-urbanist"
                                                onClick={() => {
                                                    let arr = [...timing]
                                                    let exist = arr.filter(obj => obj.day === day)?.[0]
                                                    console.log(exist, 'exist')
                                                    if (exist) {
                                                        arr.splice(arr.indexOf(exist), 1)
                                                        setTiming(arr)
                                                    } else {
                                                        setTiming([...arr, {
                                                            day: day,
                                                            startTime: '',
                                                            endTime: ''
                                                        }])
                                                        // setTiming(arr)
                                                    }

                                                }}
                                            />
                                        </div>
                                        <div className='flex gap-2 justify-between'>
                                            <div className=''>
                                                <InputField disabled={!timing.filter(obj => obj.day === day).length} type='time' placeholder="Start Time" value={timing.filter(obj => obj.day === day)?.[0]?.startTime} onChange={(value) => {
                                                    let arr = timing.map((dayTime) => {
                                                        if (day === dayTime.day) {

                                                            return {
                                                                ...dayTime,
                                                                startTime: value
                                                            }
                                                        } else {
                                                            return dayTime
                                                        }
                                                    })
                                                    setTiming(arr)

                                                }} />
                                            </div>
                                            <div className=''>
                                                <InputField disabled={!timing.filter(obj => obj.day === day).length} type='time' placeholder="End Time" value={timing.filter(obj => obj.day === day)?.[0]?.endTime} onChange={(value) => {
                                                    let arr = timing.map((dayTime) => {
                                                        if (day === dayTime.day) {
                                                            return {
                                                                ...day,
                                                                endTime: value
                                                            }
                                                        } else {
                                                            return dayTime
                                                        }
                                                    })
                                                    setTiming(arr)

                                                }} />
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </>
                            : null}
                    </div>
                </div>
            </div >
            <div className='px-3 pt-10 flex justify-center items-center w-full'>
                <button className='text-white max-w-[465px] bg-xarfi-orange rounded-2xl w-full py-[22.5px] font-urbanist font-semibold text-[20px] leading-[100%]' onClick={next}>
                    Next
                </button>
            </div>
        </>

    )
}

export default SaloonDetails