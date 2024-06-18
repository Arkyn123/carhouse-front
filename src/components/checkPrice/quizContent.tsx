import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/inputWithoutBorder"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import ConditionButton from "./conditionButton";
import { ControllerRenderProps, Field, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./quizCard";
import ChooseModel from "./quizContent/chooseModel";
import ChooseMileage from "./quizContent/chooseMileage";
import ChooseCondition from "./quizContent/chooseCondition";
import ChooseLegal from "./quizContent/chooseLegal";
import ChooseUrgency from "./quizContent/chooseUrgency";
import ChoosePrice from "./quizContent/choosePrice";

type Props = {
  step: number
  setStep: Function
  form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
}

export default function QuizContent({ step, setStep, form }: Props) {

  function formatMileage(val: string) {
    val = val.replace(/\D/g, '').replace(/\s/g, '')

    if (val.length <= 3) {
      return val
    }

    const lastThree = val.slice(-3);
    const beforeLastThree = val.slice(0, -3);

    return beforeLastThree + ' ' + lastThree;
  }

  const handleChoose = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, field: ControllerRenderProps<z.infer<typeof FormSchema>, any>) => {

    if (!(e.target as HTMLElement).textContent) return
    if ((e.target as HTMLElement).tagName != "BUTTON") return

    if (field.value == (e.target as HTMLElement).textContent) return field.onChange("")

    field.onChange((e.target as HTMLElement).textContent)
    setStep((prev: number) => (prev < 5) ? prev + 1 : 5)
  }

  const handlePrice = (e: FormEvent<HTMLElement>, field: ControllerRenderProps<z.infer<typeof FormSchema>, any>) => {
    return (e.target as HTMLInputElement).value
  }

  return (
    <>
      {step == 0 && <ChooseModel form={form} />}

      {step == 1 && <ChooseMileage form={form} />}

      {step == 2 && <ChooseCondition form={form} handleChoose={handleChoose} />}

      {step == 3 && <ChooseLegal form={form} handleChoose={handleChoose} />}

      {step == 4 && <ChooseUrgency form={form} handleChoose={handleChoose} />}

      {step == 5 && <ChoosePrice form={form} handlePrice={handlePrice} />}
    </>)
}
