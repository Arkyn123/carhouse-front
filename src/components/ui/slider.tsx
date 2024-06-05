"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="group cursor-pointer block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <div className="hidden group-focus:block relative bottom-[280%] right-[180%]">

        <div className="bg-slate-300 w-[80px] h-[30px] rounded-md flex justify-center items-center text-nowrap">{props.value + " 000"}</div>

        <div className="ml-[180%] w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-slate-300 border-r-[8px] border-r-transparent" />

      </div>

      {/* <span className="hidden group-focus:block relative bottom-[150%] right-[130%] text-nowrap">{props.value + " 000"}</span> */}
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
