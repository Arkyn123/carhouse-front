import { GlobalContext, GlobalContextType } from "@/components/shared/global"
import { sendDataToBot } from "@/components/shared/sendToTelegram"
import ThanksCard from "@/components/shared/thanksCard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/inputWithoutBorder"
import PhoneInput, { formatPhoneNumber } from "@/components/ui/phoneInput"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { HiCheck, HiX } from "react-icons/hi"
import { z } from "zod"

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FormSchema = z.object({
    name: z.string(),
    phoneNumber: z.string().refine(val => val.length == 18, { message: "Пожалуйста, введите номер телефона!" })
})

export default function PriceDialog({ open, setOpen }: Props) {

    const [checkPhone, setCheckPhone] = useState(false)
    const [ok, setOk] = useState(false)

    const { globalVariable } = useContext(GlobalContext) as GlobalContextType

    useEffect(() => {
        document.addEventListener('click', () => {
            setCheckPhone(false)
        })

        return () => {
            document.removeEventListener('click', () => {
                setCheckPhone(false)
            })
        }
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            phoneNumber: ""
        }
    })

    const handlePhoneNumber = (e: FormEvent<HTMLInputElement>) => {
        if (!e) return
        setCheckPhone(false)
        form.setValue("phoneNumber", formatPhoneNumber((e.target as HTMLInputElement).value))
    }

    const onSubmit = async () => {
        const res = await sendDataToBot(form.getValues(), [], globalVariable)
        if (!res?.data.ok) {
            toast({
                title: 'Ошибка при отправке',
                variant: 'destructive'
            })
            return
        }
        form.reset()
        setOk(true)
    }

    const onError = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
        if (errors.phoneNumber) setCheckPhone(true)
    }


    if (ok) return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center justify-center gap-2 bg-white px-10" onInteractOutside={() => setOpen(false)}>
                <ThanksCard className="" iconSize="text-[100px]" textSize="text-xl" />
            </DialogContent>
        </Dialog>
    )
    return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center justify-center gap-2 bg-white px-10" onInteractOutside={() => setOpen(false)}>
                <span className="text-[130%] font-semibold">
                    Оценить стоимость авто
                </span>

                <span>
                    Заполните форму для связи с вами
                </span>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-slate-100 p-5 text-base rounded-2xl mt-6" placeholder="Ваше имя" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl onChange={(e: FormEvent<HTMLInputElement>) => handlePhoneNumber(e)}>
                                        <PhoneInput className={cn(checkPhone ? "border-red-500 bg-red-500/10" : "", "p-5 text-left rounded-2xl duration-150")} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="text-[110%] uppercase font-semibold tracking-wide mt-5 py-6 rounded-full w-full">Узнать стоимость авто</Button>
                    </form>
                </Form >


            </DialogContent>
        </Dialog>
    )
}