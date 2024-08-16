"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldErrors, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/inputWithoutBorder"
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react"
import { HiCheck, HiX } from "react-icons/hi";
import PhoneInput, { formatPhoneNumber } from "@/components/ui/phoneInput"
import { sendDataToBot } from "@/components/shared/sendToTelegram"
import { cn } from "@/lib/utils"
import { GlobalContext, GlobalContextType } from "@/components/shared/global"
import FilesDialog from "./filesDialog"
import OkDialog from "./okDialog"


type Props = {
  className?: string
  inputClassName?: string
}

const FormSchema = z.object({
  model: z.string(),
  phoneNumber: z.string().refine(val => val.length == 18, { message: "Пожалуйста, введите номер телефона!" })
})

export function InputForm({ className, inputClassName }: Props) {

  const [okDialog, setOkDialog] = useState(false)
  const [filesDialog, setFilesDialog] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [checkPhone, setCheckPhone] = useState(false)

  const { globalVariable } = useContext(GlobalContext) as GlobalContextType

  useEffect(() => {
    document.addEventListener('click', () => setCheckPhone(false));

    return () => {
      document.removeEventListener('click', () => setCheckPhone(false));
    }
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
      phoneNumber: ""
    },
  })

  const fileRef = useRef<HTMLInputElement>(null)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await sendDataToBot(data, files, globalVariable)

    if (res?.data.ok) {
      form.reset()
      setFiles([])
      setOkDialog(true)
    }
    else {
      toast({
        title: 'Ошибка при отправке',
        variant: 'destructive'
      })
      return
    }
  }

  const clickInput = () => {
    if (files.length == 0) fileRef.current?.click()
    else setFilesDialog(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filesArr = Array.from(e.target.files) as File[]

    filesArr.map(file => {
      {
        if (!file) return

        if (!file.type.includes('image')) {
          toast({
            title: 'Неверный тип файла',
            variant: 'destructive'
          })
          return
        }

        setFiles(prev => {
          if (prev.some(el => el.name == file.name)) {
            console.log('sueta');

            toast({
              title: 'Изображние уже загружено',
              variant: 'destructive'
            })
            return prev
          }

          toast({
            title: 'Изображение загружено',
            variant: 'default'
          })
          return [...prev, file]
        })
      }
    })
  }

  const handlePhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    if (!e) return

    setCheckPhone(false)
    form.setValue("phoneNumber", formatPhoneNumber((e.target as HTMLInputElement).value))
  }

  function onError(errors: FieldErrors<z.infer<typeof FormSchema>>) {
    if (errors.phoneNumber) setCheckPhone(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className={cn(className, "flex flex-col items-center gap-4")}>
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="w-full mx-[50%]">
              <FormControl>
                <Input className={cn(inputClassName, "bg-transparent p-5 text-left text-base rounded-2xl w-full relative")} placeholder="Марка, модель и год выпуска" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full mx-[50%]">
              <FormControl onChange={(e: FormEvent<HTMLInputElement>) => handlePhoneNumber(e)}>
                <PhoneInput className={cn(checkPhone ? "!border-red-500 !bg-red-500/10" : "", inputClassName, "bg-transparent p-5 text-left rounded-2xl duration-150")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-start w-full px-[5%]">
          <div className="flex flex-col w-[50%] items-center justify-center overflow-visible">
            <p className="text-center text-nowrap text-[90%]">Прикрепить фото</p>
            <Button className={cn(files.length == 0 ? "" : "ml-4", "rounded-xl bg-slate-800 text-white relative text-center w-max-[60%]")} type="button" onClick={() => clickInput()}>{files.length == 0 ? "Загрузить файлы" : "Загружено " + files.length + " файлов"}</Button>
            <Input className="hidden" ref={fileRef} multiple type="file" onChange={(e) => handleChange(e)}></Input>
          </div>
        </div>

        <div className="flex items-center justify-center mt-2 w-full">
          <Button className="w-full py-[30px] rounded-full bg-slate-800 text-white text-[110%] uppercase font-bold tracking-wide" >Оценить авто</Button>
        </div>

      </form>

      <OkDialog open={okDialog} setOpen={setOkDialog} />

      <FilesDialog open={filesDialog} setOpen={setFilesDialog} files={files} setFiles={setFiles} fileRef={fileRef} />

    </Form>

  )
}
