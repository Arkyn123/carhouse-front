'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiArrowLeft, HiArrowRight, HiCheck } from "react-icons/hi"
import { Progress } from "@/components/ui/progress"
import { FormEvent, useContext, useEffect, useState } from "react"
import workerImage from '@public/worker_image.jpg'
import Image from "next/image"
import QuizContent from "./quizContent"
import { z } from "zod"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "../ui/input"
import PhoneInput, { formatPhoneNumber } from "../ui/phoneInput"
import { cn } from "@/lib/utils"
import { sendDataToBot } from "../shared/sendToTelegram"
import { motion, AnimatePresence } from "framer-motion";
import { CiWarning } from "react-icons/ci";
import { toast } from "../ui/use-toast";
import { GlobalContext, GlobalContextType } from "../shared/global";

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
    const [step, setStep] = useState(5)
    const [agree, setAgree] = useState(false)
    const [checkAgree, setCheckAgree] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)

    const { globalVariable } = useContext(GlobalContext) as GlobalContextType

    useEffect(() => {
        document.addEventListener('click', () => {
            setCheckPhone(false)
            setCheckAgree(false)
        })

        return () => {
            document.removeEventListener('click', () => {
                setCheckPhone(false)
                setCheckAgree(false)
            })
        }
    }, [])

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

    const handlePhoneNumber = (e: FormEvent<HTMLInputElement>) => {
        if (!e) return
        setCheckPhone(false)
        form.setValue("phoneNumber", formatPhoneNumber((e.target as HTMLInputElement).value))
    }


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

    const onSubmit = async () => {
        if (!agree) {
            setCheckAgree(true)
            return
        }

        const res = await sendDataToBot(form.getValues(), [], globalVariable)

        if (!res?.data.ok) {
            toast({
                title: 'Ошибка при отправке',
                variant: 'destructive'
            })
            return
        }
        form.reset()
        setStep(prev => prev + 1)
    }

    const onError = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
        setCheckPhone(true)
    }

    if (step == 7) return (
        <div className="pt-5 flex items-center justify-center">

            <Card className="w-[73%] h-[600px] mb-10 flex flex-col items-center justify-center">
                <CardHeader>

                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center gap-5 text-3xl font-light drop-shadow-2xl">
                    Спасибо! Данные успешно отправлены.
                    <HiCheck className="text-[500%] text-green-500" />
                </CardContent>

                <CardFooter className="">


                </CardFooter>
            </Card>
        </div>
    )

    if (step == 6) return (
        <div className="pt-5 flex items-center justify-center">

            <Card className="w-[80%] h-[600px] mb-10 flex flex-col items-center justify-center">
                <CardHeader>
                    <span className="text-center text-3xl font-sans font-normal">
                        Заполните форму, чтобы получить <br /> оценку стоимости своего автомобиля
                    </span>
                    <span className="text-center text-lg font-sans font-light" >
                        Мы уже произвели расчет по указанным параметрам. <br /> Результаты отправим в течение 5 минут
                    </span>
                </CardHeader>

                <CardContent className="border border-slate-300 rounded-sm w-[45%] h-auto" style={{ boxShadow: '0 0 600px rgba(0, 0, 0, 0.2)' }}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col mt-8">
                                        <FormControl onChange={(e: FormEvent<HTMLInputElement>) => handlePhoneNumber(e)}>
                                            <div>
                                                <span className="uppercase font-bold text-slate-500 text-[90%] -mb-2">Введите телефон</span>
                                                <PhoneInput className={cn(checkPhone ? "border-red-500 bg-red-500/10" : "", "p-6 !pl-12 duration-150")} {...field} />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <Button
                                className="rounded-full mt-[10%] w-full px-[70px] py-[30px] bg-slate-800 text-white text-[110%] font-semibold text-center tracking-wide"
                                type="submit"
                            >
                                Получить расчет стоимости
                            </Button>
                        </form>
                    </Form>

                    <div className="m-4 !cursor-pointer flex justify-center items-center" onClick={() => setAgree(!agree)}>
                        <Input type="checkbox" checked={agree} className="mr-2 size-8" />

                        <span className="text-pretty text-left text-[90%] text-slate-900">Я соглашаюсь на&nbsp;
                            <a href="/" className="underline hover:text-slate-500 hover:no-underline">обработку персональный данных </a>
                            согласно&nbsp;
                            <a href="/" className="underline hover:text-slate-500 hover:no-underline">политике конфиденциальности</a>
                        </span>
                    </div>

                    <AnimatePresence>
                        {checkAgree && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex flex-col relative duration-500">
                                    <div className="z-10 absolute -top-6 left-[15.5px] w-0 h-0 border-l-[10px] border-l-transparent border-b-[17px] border-b-slate-300 border-r-[10px] border-r-transparent"></div>
                                    <div className="absolute -top-6 left-[12.5px] w-0 h-0 border-l-[13px] border-l-transparent border-b-[20px] border-b-black border-r-[13px] border-r-transparent"></div>
                                    <div className="pl-2 flex absolute -top-3 right-[5%] w-[160%] h-auto bg-slate-300 text-left text-balance whitespace-normal overflow-auto border-[0.5px] border-black">
                                        <CiWarning size={50} />
                                        <span className="pl-2 text-sm flex items-center justify-center">Пожалуйста, ознакомьтесь и примите Положение об обработке персональных данных и Политику конфиденциальности, поставив галочку</span>
                                    </div>
                                </div>
                            </motion.div>)}
                    </AnimatePresence>


                </CardContent>

                <CardFooter className="">


                </CardFooter>
            </Card>
        </div>
    )

    return (
        <div className="flex justify-center px-[5%]">
            <Card className="rounded-r-none h-[600px] mb-10 flex flex-col basis-3/4">

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

            <Card className="flex basis-1/4 rounded-l-none bg-slate-100 mb-10">
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
