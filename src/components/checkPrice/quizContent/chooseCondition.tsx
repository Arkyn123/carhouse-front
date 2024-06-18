import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FormSchema } from "../quizCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import ConditionButton from "../conditionButton"

type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>, any, undefined>
    handleChoose: Function
}

export default function ChooseCondition({ form, handleChoose }: Props) {

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    В каком состоянии находится ваш автомобиль?
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="condition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl onClick={(e) => {
                                        e.preventDefault()
                                        handleChoose(e, field)
                                    }}>
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
        </>
    )
}