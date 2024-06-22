import { InputForm } from "../lexusForm/priceCard/inputForm";
import workerImage from '@public/worker_image.jpg'
import Image from "next/image"

export default function WannaSell() {

    return (
        <div className="bg-slate-600">
            <div className="container my-10 flex items-center justify-between px-[5%]">
                <div className="flex flex-col text-slate-200 gap-4">
                    <span className="text-[230%] font-extrabold tracking-wide leading-[50px]">
                        Хотите выгодно продать <br /> свой автомобиль?
                    </span>
                    <span className="text-[130%] font-light">
                        Заполните форму и узнайте цену вашего <br /> авто за 2 минуты
                    </span>

                    <InputForm className="w-[60%]" inputClassName="placeholder:text-slate-300 border-slate-300" />
                </div>

                <Image className="rounded-full" src={workerImage} alt="workerImage" height={400} width={400} />
            </div>
        </div>
    )
}