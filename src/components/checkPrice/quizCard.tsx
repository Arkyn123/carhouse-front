import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Props = {
    className: string
}

export default function QuizCard({ className }: Props) {
    return (
        <div className="relative left-[20%] top-[5%] flex flex-row">
            <Card className={"mb-10 h-[600px] w-[43%] rounded-r-none flex flex-col"}>
                <CardHeader>
                    <CardTitle>Укажите марку, модель и год выпуска вашего автомобиля</CardTitle>
                    {/* <CardDescription></CardDescription> */}
                </CardHeader>
                <CardContent className="flex-grow">
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="Например: Kia Rio 2012" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto">
                    <Button variant="outline">Cancel</Button>
                    <Button className=" rounded-lg">Deploy</Button>
                </CardFooter>
            </Card>
            <Card className={"mb-10 h-[600px] w-[16%] rounded-l-none flex flex-col bg-slate-100"}>
                <CardHeader>
                    <CardTitle></CardTitle>
                    {/* <CardDescription></CardDescription> */}
                </CardHeader>
                <CardContent className="flex-grow">
                  
                </CardContent>
                <CardFooter className="flex justify-between mt-auto">

                </CardFooter>
            </Card>
        </div>
    )
}
