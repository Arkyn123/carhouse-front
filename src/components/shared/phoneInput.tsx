import { ControllerRenderProps } from "react-hook-form";
import { Input, InputProps } from "../ui/input";

type Props = {
    field: any
    maxLength: number
    className: string
    placeholder: string
}


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
    } else if (value.length > 6) {
      formattedValue += value.slice(3, 6) + ' ' + value.slice(6, 10)
    }
    
    return `+7 ${formattedValue}`
  }

export default function PhoneInput(props: InputProps) {

    return (
        <Input maxLength={18} placeholder="+7 (999) 999 99 99" {...props}></Input>
    )
}