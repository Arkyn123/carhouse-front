import AdvantageCard from "./advantageCard";
import RubleImage from "./ruble.png"
import MoneyImage from "./money.png"
import CustomerImage from "./customer.png"
import DocumentsImage from "./documents.png"

export default function WhyWe() {
    return (
        <div className="bg-slate-100">
            <div className="container flex flex-col my-10">
                <span className="text-[230%] font-extrabold tracking-wide mb-5 text-slate-800">
                    Почему выбирают нас?
                </span>
                <div className="grid grid-cols-2 gap-8 px-[5%]">
                    <AdvantageCard name="Не занижаем стоимость" description="У нас нет комиссий и скрытых платежей. Оценка опирается на рыночную стоимость на авто.ру, авито и реальное состояние вашего автомобиля" image={RubleImage} />
                    <AdvantageCard name="Выплачиваем деньги сразу" description="Вы получаете всю сумму по договору сразу после подписания бумаг. Выплачиваем деньги наличными или на карту, что гарантирует безопасность сделки" image={MoneyImage} />
                    <AdvantageCard name="Выезд специалиста бесплатно" description="Оплачивать выезд специалиста не придется, даже если мы не договоримся о покупке автомобиля" image={CustomerImage} />
                    <AdvantageCard name="Оформляем документы" description="Наш сотрудник оформит все необходимые документы для купли-продажи автомобиля в соответствии с законодательством РФ" image={DocumentsImage} />
                </div>
            </div>
        </div>
    )
}