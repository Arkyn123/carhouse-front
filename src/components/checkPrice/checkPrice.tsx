import QuizCard from "./quizContent/quizCard";

export default function CheckPrice() {


    return (
        <div className="bg-slate-200">
            <div className="container my-10">
                <div className="text-[230%] mb-5 text-slate-700 font-extrabold leading-[50px]">
                    Узнайте предварительную <br />
                    стоимость вашего автомобиля
                </div>

                <QuizCard/>
            </div>
        </div>)
}