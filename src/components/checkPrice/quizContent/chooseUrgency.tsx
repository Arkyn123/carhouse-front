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

export default function ChooseUrgency({ form, handleChoose }: Props) {

    return (
        <>
            <CardHeader>
                <CardTitle className="font-normal">
                    Когда планируете продать машину?
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="urgency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl onClick={(e) => {
                                        e.preventDefault()
                                        handleChoose(e, field)
                                    }}>
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
        </>
    )
}