import { cn } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import { HiCheck } from "react-icons/hi"

type Props = {
    className?: string
    textSize?: string
    iconSize?: string
}

export default function ThanksCard({ className, textSize, iconSize }: Props) {

    return (
        <Card className={cn(className, "flex flex-col items-center justify-center border-none p-4")}>
            <CardContent className={cn(textSize, "flex flex-col items-center justify-center gap-5 text-nowrap font-light drop-shadow-2xl p-0")}>
                <HiCheck className={cn(iconSize, "text-green-500")} />
                Спасибо! Данные успешно отправлены.
            </CardContent>
        </Card>
    )
}