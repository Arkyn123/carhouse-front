'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import workerImage from '@public/worker_image.jpg'
import Image from "next/image"
import QuizContent from "./quizContent"

type Props = {
    className?: string
}

export default function QuizCard({ className }: Props) {
    const [progress, setProgress] = useState(0)

    return (
        <div className="pl-[23%] pt-5 flex">
            <Card className="w-[53%] rounded-r-none h-[600px] mb-10 flex flex-col">

                <QuizContent step={progress} />

                <CardFooter className="flex justify-end gap-3 mt-auto border-t-2 pt-5">
                    <div className="w-full mr-[5%] flex flex-col">
                        <span className="ml-2 mb-3">Готово: <span className="font-bold text-slate-700">{Math.ceil(progress * 100/6)}%</span></span>
                        <Progress className="h-2 mb-1 bg-slate-300" value={progress * 100/6} />
                    </div>

                    <Button onClick={() => setProgress(prev => prev > 0 ? prev - 1 : 0)} className="rounded-full" variant="outline"><HiArrowLeft /></Button>
                    <Button onClick={() => setProgress(prev => prev < 5 ? prev + 1 : 5)} className="bg-slate-700 text-lg gap-1 rounded-full">Далее<HiArrowRight /></Button>
                </CardFooter>
            </Card>
            <Card className="w-[20%] rounded-l-none bg-slate-100 mb-10">
                <CardHeader>
                    <div className="flex flex-row items-center justify-center mt-5">
                        <Image className="rounded-full" src={workerImage} alt="sueta" height={60} width={60} />
                        <span className="ml-5">
                            Шинкарь
                            <p className="lowercase text-xs text-gray-500">инженер-программист первой категории</p>
                        </span>
                    </div>

                    <CardTitle>
                        <div className="ml-[9%] w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-slate-300 border-r-[10px] border-r-transparent" />
                        {/* <div className="absolute transform rotate-90 -top-[28%] left-[45%] w-0.5 bg-gray-500 z-10 h-[900px]"></div>  */}
                        <div className="-mt-1 bg-slate-300 h-auto min-h-[40px] my-3 w-full rounded-md text-base font-normal p-2">{
                            progress == 0 && `От этих характеристик напрямую зависит сумма выкупа авто` ||
                            progress == 1 && `Укажите пробег, чтобы мы примерно понимали техническое состояние двигателя` ||
                            progress == 2 && `Выберите один или несколько вариантов о состоянии вашего авто` ||
                            progress == 3 && `Я долбаеб` ||
                            progress == 4 && `Укажите срочность продажи авто` ||
                            progress == 5 && `Ориентируясь на этот ответ мы предложим лучшую для вас цену`
                        }
                        </div>

                    </CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter className="flex justify-between">

                </CardFooter>
            </Card>
        </div>
    )
}
