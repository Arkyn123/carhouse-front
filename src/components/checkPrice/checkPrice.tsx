import QuizCard from "./quizCard";

export default function CheckPrice() {


    return (
        <div className="relative h-[600px] bg-slate-200">
            <div className="relative pt-[30px] pl-[20%] text-[230%] text-slate-700 font-extrabold">
                Узнайте предварительную <br />
                стоимость вашего автомобиля
            </div>
            <QuizCard></QuizCard>
        </div>)
}