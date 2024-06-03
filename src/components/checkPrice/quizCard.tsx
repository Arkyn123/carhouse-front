'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import workerImage from '@public/worker_image.jpg'
import Image from "next/image"

type Props = {
    className?: string
}

export default function QuizCard({ className }: Props) {
    const [progress, setProgress] = useState(0)

    return (
        <div className="pl-[23%] pt-5 flex">
            <Card className="w-[53%] rounded-r-none h-[600px] mb-10 flex flex-col">
                <CardHeader>
                    <CardTitle className="font-normal font-sans">Укажите марку, модель и год выпуска вашего автомобиля</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input className="bg-slate-200 p-6 text-slate-700 text-xl" id="name" placeholder="Например: Kia Rio 2012" />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 mt-auto border-t-2 pt-5">
                    <div className="w-full mr-[5%] flex flex-col">
                        <span className="ml-2 mb-3 ">Готово: <span className="font-bold text-slate-700">{progress * 20}%</span></span>
                        <Progress className="h-2 mb-1 bg-slate-300" value={progress * 20} />
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

                    <CardTitle></CardTitle>
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
