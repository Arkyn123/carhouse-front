
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

type Props = {
    text: string
}

export default function ConditionButton({ text }: Props) {


    return (



        <Button className="font-normal text-md text-start relative pl-4 flex justify-start text-balance h-auto" variant="outline">
            <Checkbox className="bg-slate-300 border-none mr-4 h-[20px] w-[20px]" />

            {text}
        </Button>

    )
}