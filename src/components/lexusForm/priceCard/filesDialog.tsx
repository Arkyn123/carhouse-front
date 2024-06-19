import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HiX } from "react-icons/hi";
import { FilesCarousel } from "./filesCarousel";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>>
    fileRef: RefObject<HTMLInputElement>
}

export default function FilesDialog({ open, setOpen, files, setFiles, fileRef }: Props) {

    const removeFile = (file: File) => {
        setFiles(prev => prev.filter(el => el.name != file.name))
        if (files.length == 1) setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogContent className="flex flex-col items-center border-none min-w-[300px] bg-white" onInteractOutside={() => setOpen(false)}>

                <div className="flex-1 flex items-center justify-center">
                    <FilesCarousel removeFile={removeFile} files={files}></FilesCarousel>
                </div>

                <Button
                    onClick={() => fileRef.current?.click()}
                    className="w-full mt-4 bg-slate-900">
                    Добавить изображение
                </Button>
            </DialogContent>

        </Dialog>
    )
}