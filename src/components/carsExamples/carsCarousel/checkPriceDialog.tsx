import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/inputWithoutBorder"
import PhoneInput from "@/components/ui/phoneInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { HiCheck, HiX } from "react-icons/hi"
import { z } from "zod"

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const FormSchema = z.object({
    model: z.string(),
    phoneNumber: z.string().refine(val => val.length == 18, { message: "Пожалуйста, введите номер телефона!" })
})

export default function OkDialog({ open, setOpen }: Props) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            model: "",
            phoneNumber: ""
        }
    })

    return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center justify-center gap-2 bg-white px-10" onInteractOutside={() => setOpen(false)}>
                <span className="text-[130%] font-semibold">
                    Оценить стоимость авто
                </span>

                <span>
                    Заполните форму для связи с вами
                </span>

                {/* <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-slate-100 p-5 text-left text-base rounded-2xl" placeholder="Марка, модель и год выпуска" {...field} />
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
                    </form>
                </Form > */}

                <Input className="bg-slate-100 p-5 text-base rounded-2xl mt-6" placeholder="Ваше имя" />

                <PhoneInput className="p-5 rounded-2xl" />

            </DialogContent>
        </Dialog>
    )
}