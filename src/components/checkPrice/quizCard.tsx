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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "../ui/input"
import PhoneInput from "../shared/phoneInput"

type Props = {
    className?: string
}

export default function QuizCard({ className }: Props) {
    const [step, setStep] = useState(0)

    const FormSchema = z.object({
        model: z.string(),
        mileage: z.string(),
        condition: z.string(),
        legal: z.string(),
        urgency: z.string(),
        price: z.string()
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            model: "",
            mileage: "130 000",
            condition: "",
            legal: "",
            urgency: "",
            price: ""
        }
    })

    const onSubmit = () => {

    }

    const onError = () => {

    }

    if (step == 6) return (
        <div className="pl-[23%] pt-5 flex">

            <Card className="w-[73%] h-[600px] mb-10 flex flex-col items-center justify-center">
                <CardHeader>
                    <span className="text-center mt-12 text-3xl font-sans font-normal">
                        Заполните форму, чтобы получить <br /> оценку стоимости своего автомобиля
                    </span>
                    <span className="text-center text-lg font-sans font-light" >
                        Мы уже произвели расчет по указанным параметрам. <br /> Результаты отправим в течение 5 минут
                    </span>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl onChange={(e: FormEvent<HTMLInputElement>) => handlePhoneNumber(e)}>
                                            <PhoneInput className="text-slate-900 p-5 bg-slate-100 text-left text-base rounded-2xl" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 mt-auto pt-5">


                </CardFooter>
            </Card>
        </div>
    )

    return (
        <div className="pl-[23%] pt-5 flex">
            <Card className="w-[53%] rounded-r-none h-[600px] mb-10 flex flex-col">

                <QuizContent step={step} setStep={setStep} form={form} />

                <CardFooter className="flex justify-end gap-3 mt-auto border-t-2 pt-5">
                    <div className="w-full mr-[5%] flex flex-col">
                        <span className="ml-2 mb-3">Готово: <span className="font-bold text-slate-700">{Math.ceil(step * 100 / 6)}%</span></span>
                        <Progress className="h-2 mb-1 bg-slate-300" value={step * 100 / 6} />
                    </div>

                    <Button onClick={() => setStep(prev => prev > 0 ? prev - 1 : 0)} className="rounded-full" variant="outline"><HiArrowLeft /></Button>
                    <Button onClick={() => setStep(prev => prev < 6 ? prev + 1 : 6)} className="bg-slate-700 text-lg gap-1 rounded-full">
                        {step == 5 ? <span className="mb-1">Последний шаг</span> : <><span className="mb-1">Далее</span><HiArrowRight /></>}
                    </Button>
                </CardFooter>
            </Card>
            <Card className="w-[20%] rounded-l-none bg-slate-100 mb-10">
                <CardHeader>
                    <div className="flex flex-row items-center justify-center mt-5">
                        <Image className="rounded-full" src={workerImage} alt="workerImage" height={60} width={60} />
                        <span className="ml-5">
                            Шинкарь
                            <p className="lowercase text-xs text-gray-500">инженер-программист первой категории</p>
                        </span>
                    </div>

                    <CardTitle>
                        <div className="ml-[9%] w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-slate-300 border-r-[10px] border-r-transparent" />
                        {/* <div className="absolute transform rotate-90 -top-[28%] left-[45%] w-0.5 bg-gray-500 z-10 h-[900px]"></div>  */}
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
