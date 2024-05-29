import { Input, InputProps } from "../ui/input";
import React, { forwardRef } from 'react';

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
    formattedValue += value.slice(3, 6) + ' ' + value.slice(6, 8)
  } else if (value.length > 8) {
    formattedValue += value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10)
  }

  if (!formattedValue) return formattedValue
  return `+7 ${formattedValue}`
}

const PhoneInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input maxLength={19} placeholder="+7 (999) 999 99 99" {...props} ref={ref} />
  );
});

export default PhoneInput;
