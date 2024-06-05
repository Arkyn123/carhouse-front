import { useForm } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "../ui/button";
import ConditionButton from "./conditionButton";

type Props = {
  step: number
}

export default function QuizContent({ step }: Props) {

  const FormSchema = z.object({
    model: z.string(),
    mileage: z.string(),
    condition: z.string().array()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
      mileage: "130 000",
      condition: []
    },
  })

  function formatMileage(val: string) {
    val = val.replace(/\D/g, '').replace(/\s/g, '')

    // if (+val > 500000 || val.length > 6) return val

    if (val.length <= 3) {
      return val
    }

    const lastThree = val.slice(-3);
    const beforeLastThree = val.slice(0, -3);

    return beforeLastThree + ' ' + lastThree;
  }

  const onSubmit = () => {
    console.log("sueta");

  }

  const onError = () => {


  }

  return (
    <>
      {step == 0 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            Укажите марку, модель и год выпуска вашего автомобиля
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
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
      </>}

      {step == 1 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            Укажите пробег автомобиля
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
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
                          <Input maxLength={7} className="m-2 py-6 text-slate-700 text-xl max-w-[25%]" {...field} />
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
                    </>
                  );
                }}
              />
            </form>
          </Form>
        </CardContent>
      </>}

      {step == 2 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            В каком состоянии находится ваш автомобиль?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* <Input className="bg-slate-200 p-6 text-slate-700 text-xl" placeholder="Например: Kia Rio 2012" {...field} /> */}
                      <div className="grid grid-cols-2 gap-4 mt-12">
                        <ConditionButton text="В отличном состоянии" />
                        <ConditionButton text="Машина на ходу (нужен мелкий ремонт)" />
                        <ConditionButton text="фывфывфывфывфывфывфывasdasdasdasdasdasdasdasdsad" />
                      </div>

                    </FormControl>
                  </FormItem>
                )} />
            </form>
          </Form>

        </CardContent>
      </>}
    </>
  )
}
