import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dispatch, FormEvent, useContext, useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion";
import { CiWarning } from "react-icons/ci";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, UseFormReturn } from "react-hook-form"
import { FormSchema } from "../quizCard"
import { z } from "zod"
import PhoneInput, { formatPhoneNumber } from "@/components/ui/phoneInput"
import { Input } from "@/components/ui/inputWithoutBorder"
import { toast } from "@/components/ui/use-toast"
import { sendDataToBot } from "@/components/shared/sendToTelegram"
import { GlobalContext, GlobalContextType } from "@/components/shared/global"

type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
    setStep: Dispatch<React.SetStateAction<number>>
}

export default function FillForm({ form, setStep }: Props) {

    const [agree, setAgree] = useState(false)
    const [checkAgree, setCheckAgree] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)
    const [privacyDialog, setPrivacyDialog] = useState(false)

    const { globalVariable } = useContext(GlobalContext) as GlobalContextType

    const handlePhoneNumber = (e: FormEvent<HTMLInputElement>) => {
        if (!e) return
        setCheckPhone(false)
        form.setValue("phoneNumber", formatPhoneNumber((e.target as HTMLInputElement).value))
    }

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

    return (
        <div className="flex items-center justify-center">

            <Card className="w-[90%] h-[600px] flex flex-col items-center justify-start xs:pt-2 lg:pt-10">
                <CardHeader>
                    <span className="text-center lg:text-3xl xs:text-xl font-sans font-normal">
                        Заполните форму, чтобы получить <br /> оценку стоимости своего автомобиля
                    </span>
                    <span className="text-center lg:text-lg xs:text-md font-sans font-light" >
                        Мы уже произвели расчет по указанным параметрам. <br /> Результаты отправим в течение 5 минут
                    </span>
                </CardHeader>

                <CardContent className="border border-slate-300 rounded-sm xs:w-[90%] lg:w-[45%] h-auto xs:pb-2 lg:pb-6" style={{ boxShadow: '0 0 600px rgba(0, 0, 0, 0.2)' }}>
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
                                className="rounded-full mt-[10%] w-full xs:py-[10px] lg:py-[30px] bg-slate-800 text-white xs:text-[90%] lg:text-[110%] font-semibold text-center tracking-wide"
                                type="submit"
                            >
                                Получить расчет стоимости
                            </Button>
                        </form>
                    </Form>

                    <div className="m-4 !cursor-pointer flex justify-center items-center" onClick={() => setAgree(!agree)}>
                        <Input type="checkbox" checked={agree} className="mr-2 xs:size-28 lg:size-8" />

                        <span className="text-pretty text-left xs:text-[80%] lg:text-[90%] text-slate-900">Я соглашаюсь на&nbsp;
                            <a className="underline hover:text-slate-500 hover:no-underline">обработку персональный данных </a>
                            согласно&nbsp;
                            <a onClick={() => setPrivacyDialog(true)} className="underline hover:text-slate-500 hover:no-underline">политике конфиденциальности</a>
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

                {/* <CardFooter className="">


                </CardFooter> */}
            </Card>
        </div>
    )
}