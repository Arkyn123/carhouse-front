"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
import { FormEventHandler, useState } from "react"
import { HiCheck, HiX } from "react-icons/hi";
import { PhoneInput } from "@/components/ui/phone-input"
import { formatPhoneNumber } from "../shared/functions"

const FormSchema = z.object({
  model: z.string(),
  phoneNumber: z.string().refine(val => val.length == 17, { message: "Пожалуйста, введите номер телефона!" })
})

export function InputForm() {

  const [dialog, setDialog] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
      phoneNumber: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    setDialog(true)
  }

  const handlePhoneNumber = (e: any) => {
    if (!e) return

    form.setValue("phoneNumber", formatPhoneNumber(e.target.value))
  }

  function onError(errors: any) {
    console.log(errors);

    toast({
      title: Object.values(errors).map((el: any) => el.message).join(', '),
      variant: "destructive"
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="text-slate-900 bg-slate-100 p-5 text-left text-base rounded-2xl" placeholder="Марка, модель и год выпуска" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl onChange={(e) => { handlePhoneNumber(e) }}>
                <Input maxLength={18} className="text-slate-900 p-5 bg-slate-100 text-left text-base rounded-2xl" placeholder="+7 (999) 999 99 99"  {...field}></Input>
              </FormControl>
              {/* <FormMessage className="text-red-500 text-sm text-center" /> */}
            </FormItem>
          )}
        />
        <section>
          <p className="text-sm ml-[15px]">Прикрепить фото</p>
          <Button onClick={(e) => {
            e.preventDefault();
            console.log("sueta");
          }} className="rounded-2xl bg-slate-800 text-white relative">Загрузить файлы</Button>
        </section>

        <div className="flex items-center justify-center pt-2">
          <Button className="relative px-[70px] py-[30px] rounded-full bg-slate-800 text-white text-lg uppercase font-bold btn-alt" type="submit">Оценить авто</Button>
        </div>

      </form>

      <Dialog open={dialog}>
        <DialogContent className="flex flex-col items-center border-none min-w-[300px] w-[20%] h-[15%] bg-white">
          <Button className="-p-4 -m-5 sticky left-[100%] aspect-square text-red-500 text-xl bg-white hover:bg-white" onClick={() => setDialog(false)}><HiX /></Button>
          <HiCheck className="text-center text-[500%] text-green-500" />
          <p className="text-center text-black text-[90%] whitespace-nowrap">Спасибо! Данные успешно отправлены.</p>
        </DialogContent>
      </Dialog>

    </Form>
  )
}
