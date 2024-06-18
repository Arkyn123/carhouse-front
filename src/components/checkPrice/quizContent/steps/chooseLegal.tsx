import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FormSchema } from "../quizCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import ConditionButton from "../../ui/conditionButton"

type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
    handleChoose: Function
}

export default function ChooseLegal({ form, handleChoose }: Props) {

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    Укажите юридические сведения об автомобиле
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="legal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl onClick={(e) => {
                                        e.preventDefault()
                                        handleChoose(e, field)
                                    }}>
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
        </>
    )
}