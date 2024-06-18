import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputForm } from "./inputForm"
import { cn } from "@/lib/utils"

type Props = {
    className?: string
}

export default function PriceCard({ className }: Props) {

    return (
        <div className={cn(className, "flex items-center z-10 h-full")}>
            <Card className="bg-slate-50/90 rounded-3xl h-[80%] w-[325px]">
                <CardHeader className="text-center items-center">
                    <CardTitle className="pt-3 pb-2 text-xl">
                        Узнайте цену вашего авто <br /> за 2 минуты
                    </CardTitle>
                    <CardDescription className="text-[80%] w-[65%]">Для определения стоимости авто заполните форму</CardDescription>
                </CardHeader>
                <CardContent className="">

                    <InputForm />

                </CardContent>
            </Card>
        </div>
    )
}