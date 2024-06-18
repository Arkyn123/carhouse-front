import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../../ui/button"
import { HiX } from "react-icons/hi"

type Props = {
    files: File[]
    removeFile: Function
}

export function FilesCarousel({ files, removeFile }: Props) {

        if (!files.length) return (<div className="bg-slate-300/60 p-3 rounded-2xl shadow-sm shadow-slate-500/50 border-slate-700">Изображений не найдено</div>)
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {files.map((el, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card className="relative">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                    <div className="relative">
                                        <Image
                                            src={URL.createObjectURL(el)}
                                            alt={el.name}
                                            height="0"
                                            width="0"
                                            sizes="100vw"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </CardContent>
                                <Button
                                    className="absolute top-0 right-0 bg-white/0 text-slate-900 hover:bg-white/0 rounded-md w-5 h-5 m-1 p-0"
                                    onClick={() => removeFile(el)}
                                >
                                    <HiX size={20} />
                                </Button>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {<CarouselPrevious />}
            {<CarouselNext />}
        </Carousel>
    )
}
