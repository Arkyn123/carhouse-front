import okImage from "@public/ok.svg"
import Image from "next/image"
import Clause from "./clause"


export default function OfferText() {
    const year: string = new Date().toString().split(' ')[3]

    return (
        <div className="text-[230%] text-slate-100 flex flex-col gap-8">

            <div className="font-extrabold uppercase">
                Купим ваш автомобиль
                <p className="-mt-3">По новым ценам {year}г</p>
            </div>

            <div className="text-[60%] font-medium">
                Выкупаем любые автомобили <br />
                на <span className="font-bold">15% дороже конкурентов</span>
            </div>

            <div className="flex flex-col gap-[20px] text-base font-medium pb-[10%]">
                <Clause first_word="Предложим максимальную цену" sec_word="на ваш автомобиль" />
                <Clause first_word="Бесплатно приедем" sec_word="и оценим" />
                <Clause first_word="Дороже на 15% чем" sec_word="Trade-In и Автосалоны" />

            </div>

        </div>
    )
}