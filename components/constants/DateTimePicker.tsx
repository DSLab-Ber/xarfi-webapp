"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CloseIcon, CalendarCustomIcon } from "./Icons"

interface PropType {
  setDateState: (_: string) => void;
  dateState: string | null; // timestamp string from parent
}

export function DateTimePicker({ setDateState, dateState }: PropType) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [hours, setHours] = React.useState("12")
  const [minutes, setMinutes] = React.useState("00")
  const [amPm, setAmPm] = React.useState<"AM" | "PM">("AM")

  // ✅ Sync prop → local state when dateState changes (e.g. from URL)
  React.useEffect(() => {
    if (dateState) {
      const parsed = new Date(Number(dateState))
      if (!isNaN(parsed.getTime())) {
        setDate(parsed)

        // set hours/minutes/amPm from parsed date
        let h = parsed.getHours()
        const mins = parsed.getMinutes().toString().padStart(2, "0")

        let ampm: "AM" | "PM" = "AM"
        if (h >= 12) {
          ampm = "PM"
          if (h > 12) h -= 12
        } else if (h === 0) {
          h = 12
        }

        setHours(String(h).padStart(2, "0"))
        setMinutes(mins)
        setAmPm(ampm)
      }
    }
  }, [dateState])

  const handleSet = () => {
    if (!date) return
    let h = Number(hours)

    // ✅ convert to 24h format
    if (amPm === "PM" && h < 12) h += 12
    if (amPm === "AM" && h === 12) h = 0

    const d = new Date(date)
    d.setHours(h)
    d.setMinutes(Number(minutes))

    setDateState(String(d.getTime()))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] h-16 justify-start text-left text-xarfi-orange font-normal bg-background-secondary rounded-2xl border-none py-4 px-5 max-lg:w-full"
        >
          <span className="text-white dark:text-black text-4xl">
            <CalendarCustomIcon width={32} height={32} className="mr-2 h-8 w-8" />
          </span>
          <span className="text-xarfi-orange font-urbanist font-medium md:text-[16px] text-[14px] leading-[100%] tracking-[0]">
            {date
              ? `${format(date, "PPP")} ${hours}:${minutes} ${amPm}`
              : "Select date & time"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-[#FAFAFA] dark:bg-[#1e1e1e] border-none text-white p-4 rounded-xl w-[310px] gap-[25px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-urbanist font-semibold md:text-[20px] text-base leading-[130%] tracking-[0]">
            Select Date and Time
          </span>
          <button onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md bg-black p-2 calenderSelect w-full calenderCustomClass"
          classNames={{
            day_selected:
              "bg-[#FF8C26] text-white hover:bg-[#FF8C26] hover:text-white focus:bg-[#FF8C26] focus:text-white",
            row: "flex w-full",
          }}
        />

        {/* Time input */}
        <div className="flex items-center gap-2 justify-center my-4">
          <Input
            type="number"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-16 text-center bg-background-secondary text-white border-gray-600 font-poppins font-medium text-[25px]"
          />
          <span className="text-xl font-poppins font-medium">:</span>
          <Input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-16 text-center bg-background-secondary text-white border-gray-600 font-poppins font-medium text-[25px]"
          />
          <div className="flex border border-[#FF8C26] rounded-[4px]">
            <div
              className={`cursor-pointer text-[10px] p-1 rounded-[2px] w-8 text-center ${amPm === "AM" ? "bg-xarfi-orange !text-white" : ""}`}
              onClick={() => setAmPm("AM")}
            >
              AM
            </div>
            <div
              className={`cursor-pointer text-[10px] p-1 rounded-[2px] w-8 text-center ${amPm === "PM" ? "bg-xarfi-orange !text-white" : ""}`}
              onClick={() => setAmPm("PM")}
            >
              PM
            </div>
          </div>
        </div>

        {/* Set button */}
        <Button
          onClick={handleSet}
          className="w-full bg-[#ff8c00] hover:bg-[#e67a00] text-white font-semibold rounded-md py-[22px]"
        >
          Set
        </Button>
      </PopoverContent>
    </Popover>
  )
}
