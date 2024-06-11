import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"

type Props = {
    text: string
    value: string
}

export default function ConditionButton({ text, value }: Props) {
    const [checked, setChecked] = useState(false);
    const [border, setBorder] = useState("")

    useEffect(() => {
        setChecked(value === text)
        setBorder(value === text ? "border-slate-700" : "")
    }, [value]);

    return (
        <Button
            className={cn(border, "duration-300 rounded-lg font-normal text-md text-start relative pl-4 flex justify-start text-balance h-auto min-h-16")}
            variant="outline"
        >
            <Checkbox checked={checked} className="bg-slate-300 border-none mr-4 h-[20px] w-[20px]" />

            {text}
        </Button>
    );
}
{/* <Input className="bg-slate-300 border-none mr-4 h-[20px] w-[20px]" type="checkbox" checked={checked}></Input> */ }