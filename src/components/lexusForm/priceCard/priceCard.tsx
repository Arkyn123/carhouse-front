import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputForm } from "./inputForm"

export default function PriceCard() {


    // return (
    //     <div className="flex flex-col items-center justify-start bg-slate-50/90 rounded-3xl w-[325px] z-30 p-8">
    //         <span className="text-center text-xl font-bold text-nowrap">
    //             Узнайте цену вашего авто <br /> за 2 минуты
    //         </span>
    //     </div>
    // )

    return (
        <Card className="flex flex-col items-center bg-slate-50/90 rounded-3xl w-[325px] z-30 py-2">
            <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-xl text-center">
                    Узнайте цену вашего авто <br /> за 2 минуты
                </CardTitle>
                <CardDescription className="text-[80%] text-center">Для определения стоимости авто заполните форму</CardDescription>
            </CardHeader>
            <CardContent className="pb-6 px-[6%] w-full">

                <InputForm inputClassName="placeholder:text-slate-700 border-slate-700" />

            </CardContent>
        </Card>
    )
}