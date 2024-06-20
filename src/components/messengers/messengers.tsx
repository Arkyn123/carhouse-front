import { Button } from "../ui/button";
import PointerImage from "./pointer.svg"
import DialogImage from "./dialog.png"
import Image from "next/image";

export default function Messengers() {

    return (
        <div className="bg-white">
            <div className="container relative flex items-center justify-between my-24 md:px-[10%] 2xl:px-[7%] ">
                <div className="relative flex flex-col">
                    <span className="text-[230%] font-extrabold mb-5 text-slate-800 tracking-wide">
                        Проведём онлайн <br /> оценку вашего авто <br /> в мессенджерах
                    </span>
                    <span className="text-[130%] text-slate-800 font-light mb-10">
                        Отправьте фото своего авто и мы назовём <br /> предварительную цену выкупа в течение 2 минут
                    </span>
                    <div className="flex gap-6 items-center justify-start mt-5">
                        <Button className="bg-green-500 hover:bg-green-700 rounded-full py-[35px] px-[15%] text-[110%] font-bold">
                            WhatsApp
                        </Button>

                        <Button className="bg-blue-500 hover:bg-blue-700 rounded-full py-[35px] px-[15%] text-[110%] font-bold">
                            Telegram
                        </Button>

                    </div>

                </div>
                <Image src={PointerImage} alt={PointerImage} className="absolute left-[43%] top-[15%] xl:visible lg:invisible" />
                <Image src={DialogImage} alt={DialogImage.src} width={350} className="" />
            </div>
        </div>)
}