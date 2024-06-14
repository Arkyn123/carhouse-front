"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldErrors, useForm } from "react-hook-form"
import { ZodError, z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { HiCheck, HiX } from "react-icons/hi";
import PhoneInput, { formatPhoneNumber } from "../ui/phoneInput"
import { FilesCarousel } from "./filesCarousel"
import { sendDataToBot } from "../shared/sendToTelegram"
import { cn } from "@/lib/utils"
import { GlobalContext, GlobalContextType } from "../shared/global"

const FormSchema = z.object({
  model: z.string(),
  phoneNumber: z.string().refine(val => val.length == 18, { message: "Пожалуйста, введите номер телефона!" })
})

export function InputForm() {

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

  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleChange = (e: any) => {
    const filesArr = Array.from(e.target.files) as File[]

    filesArr.forEach(file => {
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

  const removeFile = (file: File) => {
    setFiles(prev => prev.filter(el => el.name != file.name))
    if (files.length == 1) setFilesDialog(false)
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
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-slate-100 p-5 text-left text-base rounded-2xl focus-visible:outline-0 focus-visible:ring-offset-0 focus-visible:ring-0" placeholder="Марка, модель и год выпуска" {...field} />
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
              {/* <FormMessage className="text-red-500 text-sm text-center" /> */}
            </FormItem>
          )}
        />

        <div className="flex flex-col w-[50%] items-start justify-center">
          <p className="ml-3 text-[90%]">Прикрепить фото</p>
          <Button className="rounded-xl bg-slate-800 text-white relative text-center w-max-[60%]" type="button" onClick={() => clickInput()}>{files.length == 0 ? "Загрузить файлы" : "Загружено " + files.length + " файлов"}</Button>
          <Input className="hidden" ref={fileRef} multiple type="file" onChange={(e) => handleChange(e)}></Input>
        </div>

        <div className="flex items-center justify-center pt-2">
          <Button className="px-[70px] py-[30px] rounded-full bg-slate-800 text-white text-[110%] uppercase font-bold tracking-wide" type="submit">Оценить авто</Button>
        </div>

      </form>

      <Dialog open={okDialog}>
        <DialogContent className="flex flex-col items-center border-none min-w-[300px] w-[20%] h-[15%] bg-white">
          <Button className="-p-4 -m-5 sticky left-[100%] aspect-square text-red-500 text-xl bg-white hover:bg-white" onClick={() => setOkDialog(false)}><HiX /></Button>
          <HiCheck className="text-center text-[500%] text-green-500" />
          <p className="text-center text-black text-[90%] whitespace-nowrap">Спасибо! Данные успешно отправлены.</p>
        </DialogContent>
      </Dialog>

      <Dialog open={filesDialog}>
        <DialogContent className="flex flex-col items-center border-none min-w-[300px] bg-white">
          <Button
            className="-p-4 -m-5 sticky left-[100%] aspect-square text-red-500 text-xl bg-white hover:bg-white"
            onClick={() => setFilesDialog(false)}
          >
            <HiX />
          </Button>

          <div className="flex-1 flex items-center justify-center">
            <FilesCarousel removeFile={removeFile} files={files}></FilesCarousel>
          </div>

          <Button
            onClick={() => fileRef.current?.click()}
            className="w-full mt-4 bg-slate-900">
            Добавить изображение
          </Button>
        </DialogContent>

      </Dialog>

    </Form>

  )
}
