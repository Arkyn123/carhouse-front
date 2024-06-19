import { Button } from "../ui/button";
import PointerImage from "./pointer.svg"
import DialogImage from "./dialog.png"
import Image from "next/image";

export default function Messengers() {

    return (
        <div className="bg-white">
            <div className="container flex items-center justify-start my-64 px-[5%]">
                <div className="relative flex flex-col">
                    <span className="text-balance text-[230%] font-extrabold mb-5 text-slate-800 tracking-wide">
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
                    <Image src={PointerImage} alt={PointerImage} className="absolute left-[85%] bottom-[90%]" />
                    <Image src={DialogImage} alt={DialogImage.src} width={350} className="absolute left-[130%] -bottom-[40%]" />
                </div>
            </div>
        </div>
    )
}