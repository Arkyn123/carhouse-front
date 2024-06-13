import { HiPhone } from "react-icons/hi";
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";


export function formatPhoneNumber(value: string): string {
  value = value.replace('+7', '').replace(/\D/g, '').replace(/\s/g, '')

  let formattedValue = ''

  if (value.length > 0) {
    formattedValue += '('
  }
  if (value.length > 3) {
    formattedValue += value.slice(0, 3) + ') '
  } else {
    formattedValue += value
  }
  if (value.length > 3 && value.length <= 6) {
    formattedValue += value.slice(3)
  } else if (value.length > 6 && value.length <= 8) {
    formattedValue += value.slice(3, 6) + '-' + value.slice(6, 8)
  } else if (value.length > 8) {
    formattedValue += value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8, 10)
  }

  if (!formattedValue) return formattedValue
  return `+7 ${formattedValue}`
}

const PhoneInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="relative">
      <Input maxLength={19} placeholder="+7 (999) 999-99-99" {...props} ref={ref} className={cn("!pl-10 bg-slate-100 focus-visible:outline-0 focus-visible:ring-offset-0 focus-visible:ring-0 !text-[105%]", props.className)} />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiPhone className="text-gray-500" size={22} />
      </div>
    </div>
  )
});

export default PhoneInput;
