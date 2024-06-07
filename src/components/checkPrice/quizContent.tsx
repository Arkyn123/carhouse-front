import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";
import ConditionButton from "./conditionButton";

type Props = {
  step: number
  setStep: Function
  form: any
}

export default function QuizContent({ step, setStep, form }: Props) {

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

  const handleChoose = (e: any, field: any) => {
    if (!e.target.textContent) return
    if (e.target.tagName != "BUTTON") return

    if (field.value == e.target.textContent) field.onChange("")
    else field.onChange(e.target.textContent)
    return setStep((prev: number) => prev < 5 ? prev + 1 : 5)
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
            <form onSubmit={form.handleSubmit()} className="space-y-4">
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
            <form onSubmit={form.handleSubmit()} className="space-y-4">
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
                    </>)
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
            <form onSubmit={form.handleSubmit()} className="space-y-4">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onClick={(e) => handleChoose(e, field)}>
                      <div className="grid grid-cols-2 gap-5 mt-12">
                        <ConditionButton text="В отличном состоянии" value={field.value} />
                        <ConditionButton text="Машина на ходу (нужен мелкий ремонт)" value={field.value} />
                        <ConditionButton text="Машина неисправна (нужен капитальный ремонт)" value={field.value} />
                        <ConditionButton text="Машина после аварии" value={field.value} />
                      </div>
                    </FormControl>
                  </FormItem>)
                } />
            </form>
          </Form>
        </CardContent>
      </>}

      {step == 3 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            Укажите юридические сведения об автомобиле
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit()} className="space-y-4">
              <FormField
                control={form.control}
                name="legal"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onClick={(e) => handleChoose(e, field)}>
                      <div className="grid grid-cols-2 gap-5 mt-12">
                        <ConditionButton text="Юридически чистый автомобиль" value={field.value} />
                        <ConditionButton text="Имеется ограничение на регистрацию" value={field.value} />
                        <ConditionButton text="Имеется арест" value={field.value} />
                        <ConditionButton text="Имеется залог" value={field.value} />
                        <ConditionButton text="Имеется автокредит" value={field.value} />
                      </div>
                    </FormControl>
                  </FormItem>)
                } />
            </form>
          </Form>
        </CardContent>
      </>}

      {step == 4 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            Когда планируете продать машину?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit()} className="space-y-4">
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onClick={(e) => handleChoose(e, field)}>
                      <div className="grid grid-cols-2 gap-5 mt-12">
                        <ConditionButton text="Срочно (сегодня/завтра)" value={field.value} />
                        <ConditionButton text="В ближайшее время (1-2 недели)" value={field.value} />
                        <ConditionButton text="Пока просто прицениваюсь" value={field.value} />
                      </div>
                    </FormControl>
                  </FormItem>)
                } />
            </form>
          </Form>
        </CardContent>
      </>}

      {step == 5 && <>
        <CardHeader>
          <CardTitle className="font-normal">
            Укажите желаемую цену за авто
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit()} className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-slate-200 p-6 text-slate-700 text-xl" placeholder="Например: 700 000 рублей" {...field} />
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