import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../ui/button";
import { CarProps } from "../../examples";
import Image from "next/image"



export default function CarCard({ car: { name, price, year, mileage, image }, setOpen }: { car: CarProps, setOpen: Dispatch<SetStateAction<boolean>> }) {

    return (
        <div className="flex flex-col bg-white rounded-3xl w-[400px]">
            <Image src={image} alt={image.src} className="rounded-3xl" />
            <div className="flex flex-col gap-2 py-4 px-6">
                <span className="text-xl font-bold">
                    {name}
                </span>
                <div className="flex items-center justify-between">
                    <span className=" font-normal">
                        Стоимость: <br />
                        <span className="font-semibold text-[130%] tracking-wide">
                            {price} ₽
                        </span>
                    </span>
                    <div className="flex flex-col">
                        <span className="">
                            Год выпуска:&nbsp;
                            <span className="font-semibold tracking-wide">
                                {year} г
                            </span>
                        </span>
                        <span className="">
                            Пробег:&nbsp;
                            <span className="font-semibold tracking-wide">
                                {mileage} км
                            </span>
                        </span>
                    </div>
                </div>
                <Button className="text-[110%] uppercase font-bold tracking-wide mt-5 py-8 mx-[10%] rounded-full" onClick={() => setOpen(true)}>
                    Продать авто
                </Button>
            </div>
        </div>
    )
}