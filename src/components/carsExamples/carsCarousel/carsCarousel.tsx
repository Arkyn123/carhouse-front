'use client'

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState } from "react"
import { defaultCars } from "./_default"
import CarCard from "./ui/carCard"
import PriceDialog from "./checkPriceDialog"

export default function CarsCarousel() {

    const [priceDialog, setPriceDialog] = useState(false)

    return (
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="">
                {defaultCars.map((car, index) => (
                    <CarouselItem key={index} className="flex basis-1/3">
                        <CarCard car={car} setOpen={setPriceDialog} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-[45%] top-[110%] size-12" />
            <CarouselNext className="right-[45%] top-[110%] size-12" />
            <PriceDialog open={priceDialog} setOpen={setPriceDialog} />
        </Carousel>
    )
}