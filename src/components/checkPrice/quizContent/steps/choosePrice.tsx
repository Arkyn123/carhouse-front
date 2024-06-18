import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/inputWithoutBorder";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../quizCard";
import { z } from "zod";

type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
    handlePrice: Function
}

export default function ChoosePrice({ form, handlePrice }: Props) {

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    Укажите желаемую цену за авто
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => {

                                const { value, ...rest } = field

                                return (
                                    <FormItem>
                                        <FormControl onChange={(e) => form.setValue("price", handlePrice(e, field))}>
                                            <Input className="bg-slate-200 p-6 text-slate-700 text-xl" placeholder="Например: 700 000 рублей" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }} />
                    </form>
                </Form>
            </CardContent>
        </>
    )
}