import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"
import { HiCheck, HiX } from "react-icons/hi"

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function OkDialog({ open, setOpen }: Props) {

    return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center border-none min-w-[300px] w-[20%] h-[15%] bg-white">
                <Button className="-p-4 -m-5 sticky left-[100%] aspect-square text-red-500 text-xl bg-white hover:bg-white" onClick={() => setOpen(false)}><HiX /></Button>
                <HiCheck className="text-center text-[500%] text-green-500" />
                <p className="text-center text-black text-[90%] whitespace-nowrap">Спасибо! Данные успешно отправлены.</p>
            </DialogContent>
        </Dialog>
    )
}