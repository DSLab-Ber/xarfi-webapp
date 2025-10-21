"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function RangeSliderWithTooltip({
  setPriceRange,
  priceRange,
}: {
  setPriceRange: (range: [number, number]) => void
  priceRange: [number, number]
}) {
  const [range, setRange] = useState<[number, number]>([0, 0])

  const min = 0
  const max = 1000

  // ✅ Sync parent → local
  useEffect(() => {
    if (priceRange?.length === 2) {
      setRange(priceRange)
    }
  }, [priceRange])

  return (
    <div>
      <div className="relative w-full">
        <SliderPrimitive.Root
          value={range}
          onValueChange={(val: number[]) => {
            setRange(val as [number, number]) // local update while dragging
          }}
          onValueCommit={(val: number[]) => setPriceRange(val as [number, number])} // final commit to parent
          min={min}
          max={max}
          step={10}
          className="relative flex w-full touch-none select-none items-center"
        >
          {/* Track */}
          <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-300">
            <SliderPrimitive.Range className="absolute h-full bg-orange-500 rounded-full" />
          </SliderPrimitive.Track>

          {/* Thumbs */}
          {range.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              className={cn(
                "block h-5 w-5 rounded-full border-2 border-orange-500 bg-white shadow-md cursor-pointer"
              )}
            />
          ))}
        </SliderPrimitive.Root>

        {/* Tooltips */}
        {range.map((val, i) => (
          <div
            key={i}
            className="absolute -top-12 flex items-center justify-center transition-all"
            style={{
              left: `calc(${((val - min) / (max - min)) * 100}% - 30px)`,
            }}
          >
            <div className="rounded-2xl bg-orange-500 px-[21px] py-[13px] text-white text-sm shadow-md relative font-urbanist font-normal text-[14px] leading-[100%] text-center">
              €{val}
              <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 
                border-l-8 border-r-8 border-t-8 
                border-l-transparent border-r-transparent border-t-orange-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="mt-4 flex justify-between text-sm opacity-30 font-urbanist font-normal text-[16px] leading-[100%]">
        <span>€{min}</span>
        <span>€{max}</span>
      </div>
    </div>
  )
}
