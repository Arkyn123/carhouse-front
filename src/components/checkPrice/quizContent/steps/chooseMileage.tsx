import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../quizCard";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputWithoutBorder";
import { Slider } from "@/components/ui/slider";


type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
}

export default function ChooseMileage({ form }: Props) {

    const formatMileage = (val: string) => {
        val = val.replace(/\D/g, '').replace(/\s/g, '')

        if (val.length <= 3) {
            return val
        }

        const lastThree = val.slice(-3);
        const beforeLastThree = val.slice(0, -3);

        return beforeLastThree + ' ' + lastThree;
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    Укажите пробег автомобиля
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="mileage"
                            render={({ field }) => {
                                const [sliderValue, setSliderValue] = useState(130)

                                useEffect(() => {
                                    setSliderValue(+form.getValues().mileage.replace(/\s/g, "") / 1000)
                                }, [field.value]);

                                return (
                                    <>
                                        <FormItem className="-mt-">
                                            <FormControl onChange={(e: any) => form.setValue("mileage", formatMileage(e.target.value))}>
                                                <Input maxLength={7} className="m-2 py-6 text-slate-700 text-xl xs:max-w-[40%] lg:max-w-[25%]" {...field} />
                                            </FormControl>
                                        </FormItem>
                                        <div className="pt-6">
                                            <Slider
                                                className="pt-2"
                                                value={[sliderValue]}
                                                onValueChange={(e: number[]) => setSliderValue(e[0])}
                                                onValueCommit={() => { form.setValue("mileage", formatMileage((sliderValue * 1000).toString())) }}
                                                max={500}
                                                min={5}
                                                step={5}
                                            />
                                        </div>

                                        <div className="flex justify-between text-sm font-sans">
                                            <span className="-ml -mt-2">5 000</span>
                                            <span className="-mr- -mt-2">500 000</span>
                                        </div>
                                    </>)
                            }}
                        />
                    </form>
                </Form>
            </CardContent>
        </>
    )
}