import Clause from "./clause"


export default function OfferText() {
    const year: string = new Date().toString().split(' ')[3]

    return (
        <div className="text-[230%] text-slate-100 flex flex-col xs:gap-4 lg:gap-8 xs:text-center xs:items-center lg:text-left lg:items-start">

            <div className="font-extrabold uppercase leading-[50px]">
                Купим ваш автомобиль <br />По новым ценам {year}г
            </div>

            <div className="text-[60%] font-medium">
                Выкупаем любые автомобили <br />
                на <span className="font-bold">15% дороже конкурентов</span>
            </div>

            <div className="flex flex-col gap-[20px] xs:hidden lg:flex text-base font-medium">
                <Clause first_word="Предложим максимальную цену" sec_word="на ваш автомобиль" />
                <Clause first_word="Бесплатно приедем" sec_word="и оценим" />
                <Clause first_word="Дороже на 15% чем" sec_word="Trade-In и Автосалоны" />

            </div>

        </div>
    )
}