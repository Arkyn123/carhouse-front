import ThanksCard from "@/components/shared/thanksCard"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function OkDialog({ open, setOpen }: Props) {

    return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center bg-white !p-0" onInteractOutside={() => setOpen(false)}>
                <ThanksCard className="h-[200px] w-full" textSize="text-xl" iconSize="text-[100px]" />
            </DialogContent>
        </Dialog>
    )
}