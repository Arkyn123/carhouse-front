import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/inputWithoutBorder";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../quizCard";
import { z } from "zod";

type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
}  

export default function ChooseModel({ form }: Props) {

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    Укажите марку, модель и год выпуска вашего автомобиля
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-slate-200 p-6 text-slate-700 text-xl" placeholder="Например: Kia Rio 2012" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </form>
                </Form>
            </CardContent>
        </>
    )
}