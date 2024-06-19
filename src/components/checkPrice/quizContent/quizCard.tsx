'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiArrowLeft, HiArrowRight, HiCheck } from "react-icons/hi"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import workerImage from '@public/worker_image.jpg'
import Image from "next/image"
import QuizContent from "./quizContent"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FillForm from "./steps/fillForm"
import ThanksCard from "@/components/shared/thanksCard"

type Props = {
    className?: string
}

export const FormSchema = z.object({
    model: z.string(),
    mileage: z.string(),
    condition: z.string(),
    legal: z.string(),
    urgency: z.string(),
    price: z.string(),
    phoneNumber: z.string().refine(val => val.length == 18, { message: "Пожалуйста, введите номер телефона!" }),
})

export default function QuizCard({ className }: Props) {
    const [step, setStep] = useState(0)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            model: "",
            mileage: "130 000",
            condition: "",
            legal: "",
            urgency: "",
            price: "",
            phoneNumber: ""
        }
    })

    const checkNext = (): boolean => {
        const { model, mileage, condition, legal, urgency } = form.getValues()
        switch (step) {
            case 0:
                return !!model
            case 1:
                return !!mileage
            case 2:
                return !!condition
            case 3:
                return !!legal
            case 4:
                return !!urgency
        }

        return true
    }

    if (step == 7) return (
        <div className="pt-5 flex items-center justify-center">
            <ThanksCard className="w-[80%] h-[600px] " iconSize="text-[200px]" textSize="text-3xl" />
        </div>
    )

    if (step == 6) return (
        <FillForm form={form} setStep={setStep} />
    )

    return (
        <div className="flex justify-center px-[5%]">
            <Card className="rounded-r-none h-[600px] flex flex-col basis-3/4">

                <QuizContent step={step} setStep={setStep} form={form} />

                <CardFooter className="flex justify-end gap-3 mt-auto border-t-2 pt-5">
                    <div className="w-full mr-[5%] flex flex-col">
                        <span className="ml-2 mb-3">Готово: <span className="font-bold text-slate-700">{Math.ceil(step * 100 / 6)}%</span></span>
                        <Progress className="h-2 mb-1 bg-slate-300" value={step * 100 / 6} />
                    </div>

                    <Button onClick={() => setStep(prev => prev > 0 ? prev - 1 : 0)} className="rounded-full" variant="outline" disabled={step == 0}><HiArrowLeft /></Button>
                    <Button onClick={() => setStep(prev => prev < 6 ? prev + 1 : 6)} className="bg-slate-700 text-lg gap-1 rounded-full" disabled={!checkNext()}>
                        {step == 5 ? <span className="mb-1">Последний шаг</span> : <><span className="mb-1">Далее</span><HiArrowRight /></>}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="flex basis-1/4 rounded-l-none bg-slate-100">
                <CardHeader>
                    <div className="flex flex-row items-center justify-center mt-5 ">
                        <Image className="rounded-full" src={workerImage} alt="workerImage" height={60} width={60} />
                        <span className="ml-5">
                            Шинкарь
                            <p className="lowercase text-xs text-gray-500">инженер-программист первой категории</p>
                        </span>
                    </div>

                    <CardTitle>
                        <div className="ml-[9%] w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-slate-300 border-r-[10px] border-r-transparent" />
                        <div className="-mt-1 bg-slate-300 h-auto min-h-[40px] my-3 w-full rounded-md text-base font-normal p-2">{
                            step == 0 && `От этих характеристик напрямую зависит сумма выкупа авто` ||
                            step == 1 && `Укажите пробег, чтобы мы примерно понимали техническое состояние двигателя` ||
                            step == 2 && `Выберите состояние вашего авто` ||
                            step == 3 && `Выберите юридические сведения о вашем авто` ||
                            step == 4 && `Укажите срочность продажи авто` ||
                            step == 5 && `Ориентируясь на этот ответ мы предложим лучшую для вас цену`
                        }
                        </div>

                    </CardTitle>

                </CardHeader>

            </Card>
        </div>
    )
}
