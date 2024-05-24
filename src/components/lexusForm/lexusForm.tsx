import { cn } from "@/lib/utils";
import { Ubuntu } from "next/font/google";
import lexusImage from "@public/lexus.png"
import okImage from "@public/ok.svg"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { InputForm } from "./priceCard";
import { Toaster } from "../ui/toaster";
import { InputForm } from "./priceCard";

export default function LexusForm() {
    const year: string = new Date().toString().split(' ')[3]

    return (
        <div className="relative h-[570px] bg-slate-600" >
            <section className="relative pt-[30px] pl-[20%] text-[230%] text-slate-100">
                <div className="font-extrabold">
                    КУПИМ ВАШ АВТОМОБИЛЬ
                    <p className="-mt-3">ПО НОВЫМ ЦЕНАМ {year}Г</p>
                </div>

                <div className="text-[60%] font-medium">
                    Выкупаем любые автомобили <br />
                    на <span className="font-bold">15% дороже конкурентов</span>
                </div>

                <div className="flex flex-col gap-[20px] text-base relative top-[60px] font-medium">
                    <div className="flex flex-row items-start">
                        <Image
                            className="mr-[10px] pt-3.5"
                            alt="Ok image"
                            height={20}
                            src={okImage}
                            width={20}
                        />
                        <span>Предложим максимальную цену  <br /> на ваш автомобиль</span>
                    </div>

                    <div className="flex flex-row items-start ">
                        <Image
                            className="mr-[10px] pt-3.5"
                            alt="Ok image"
                            height={20}
                            src={okImage}
                            width={20}
                        />
                        <span>Бесплатно приедем <br /> и оценим</span>
                    </div>

                    <div className="flex flex-row items-start">
                        <Image
                            className="mr-[10px] pt-3.5"
                            alt="Ok image"
                            height={20}
                            src={okImage}
                            width={20}
                        />
                        <span>Дороже на 15% чем <br /> Trade-In и Автосалоны</span>
                    </div>
                </div>
            </section>
            
            <Image
                className="relative bottom-[35%] left-[33%]"
                alt="Lexus image"
                height={600}
                src={lexusImage}
                width={600}
            />

            <Card className="rounded-3xl shadow flex flex-col items-center relative left-[60%] bottom-[115%] bg-slate-50/90 text-black h-[80%] w-[330px]">
                <CardHeader className="text-center items-center">
                    <CardTitle className="pt-3 pb-2 text-xl">
                        Узнайте цену вашего авто <br /> за 2 минуты
                    </CardTitle>
                    <CardDescription className="text-[80%] w-[65%]">Для определения стоимости авто заполните форму</CardDescription>
                </CardHeader>
                <CardContent className="h-full">

                    <InputForm></InputForm>

                </CardContent>
            </Card>
        </div>
    )
}