'use client'

import { GlobalContext, GlobalContextType } from "@/components/shared/global";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

export default function AdminPage() {
    const [acces, setAcces] = useState(true)
    const [checkUsername, setCheckUsername] = useState(false)
    const [checkPassword, setCheckPassword] = useState(false)
    const [input, setInput] = useState("")

    const { globalVariable, setGlobalVariable } = useContext(GlobalContext) as GlobalContextType

    useEffect(() => {
        document.addEventListener('click', () => {
            setCheckUsername(false)
            setCheckPassword(false)
        })

        return () => {
            document.removeEventListener('click', () => {
                setCheckUsername(false)
                setCheckPassword(false)
            })
        }
    }, [])


    const secret = "kerix"

    const FormSchema = z.object({
        username: z.string().refine(val => val == secret),
        password: z.string().refine(val => val == secret)
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = () => {
        setAcces(true)
    }

    const onError = (errors: FieldErrors<z.infer<typeof FormSchema>>) => {
        if (errors.password) setCheckPassword(true)
        if (errors.username) setCheckUsername(true)
    }

    if (!acces) return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex items-center justify-center h-full bg-slate-300/20">
                <div className="flex flex-col items-center justify-center gap-5 shadow-xl h-[25%] w-[40%] bg-white">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-[60%]">
                                <FormControl onChange={() => setCheckUsername(false)}>
                                    <Input className={cn(checkUsername ? "bg-red-500/10 border-red-500" : "", "duration-150 focus-visible:outline-0 focus-visible:ring-offset-0 focus-visible:ring-0")} placeholder="Username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-[60%]">
                                <FormControl onChange={() => setCheckPassword(false)}>
                                    <Input className={cn(checkPassword ? "bg-red-500/10 border-red-500" : "", "duration-150 focus-visible:outline-0 focus-visible:ring-offset-0 focus-visible:ring-0")} placeholder="Password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button className="w-[20%]" variant={"outline"}>Вход</Button>
                </div>
            </form>

        </Form >

    )

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col  gap-8 items-center justify-center h-[30%] w-[40%] shadow-xl">
                <span className="text-center">Текущий ChatID: {globalVariable}
                    <br /> Узнать ChatID&nbsp;
                    <a target="_blank" className="underline" href="https://t.me/chatIDrobot">
                        тут
                    </a>
                </span>

                <Input value={input} onInput={(e) => setInput((e.target as HTMLInputElement).value)} className="w-[40%] text-center focus-visible:outline-0 focus-visible:ring-offset-0 focus-visible:ring-0" placeholder="Введите новый ChatID" />
                <Button onClick={() => setGlobalVariable(input)} variant={"outline"}>Изменить</Button>
            </div>
        </div>
    )
}