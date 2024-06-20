import * as React from "react"
import { StaticImageData } from "next/image"
import CarsCarousel from "./carsCarousel/carsCarousel"

export type CarProps = {
    name: string
    price: string
    year: string
    mileage: string
    image: StaticImageData
}

export default function CarsExamples() {
    return (
        <div className="bg-slate-300">

            <div className="container flex flex-col mt-10 mb-28">
                <span className="text-[230%] text-slate-800 font-extrabold leading-[50px]">
                    Примеры выкупленных  <br /> авто за 2023 год
                </span>
                <span className="text-[130%] text-slate-800 font-light mb-10">
                    Выкупаем любые автомобили
                </span>

                <CarsCarousel />
            </div>
        </div>)
}