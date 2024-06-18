import QuizCard from "./quizCard";

export default function CheckPrice() {


    return (
        <div className="bg-slate-200">
            <div className="container">
                <div className="text-[230%] mt-10 mb-5 text-slate-700 font-extrabold">
                    Узнайте предварительную <br />
                    стоимость вашего автомобиля
                </div>

                <QuizCard/>
            </div>
        </div>)
}