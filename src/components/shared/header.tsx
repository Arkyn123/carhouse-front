import Image from "next/image"
import headerImage from "@public/header_image.svg"
import telegramImage from "@public/telegram.svg"
import whatsappImage from "@public/whatsapp.svg"

export default function Header() {
    return (
        <div className="fixed inset-x-0 top-0 z-30 bg-white py-2 shadow-slate-700 shadow-md">
            <div className="container flex flex-row justify-between items-center">

                <a href="/">
                    <Image
                        alt="Header image"
                        width={250}
                        src={headerImage}
                    />
                </a>

                <div className="flex flex-row justify-center items-center gap-4">
                    <p className="text-[110%] font-medium mr-6">+7 (963) 478-67-27</p>

                    <a href="https://api.whatsapp.com/send/?phone=79925027262&text&type=phone_number&app_absent=0" className="size-sm">
                        <Image
                            className="flex"
                            alt="Telergam image"
                            height={30}
                            src={whatsappImage}
                            width={30}
                        />
                    </a>
                    <a href="https://tlgg.ru/carhouse74" className="size-sm">
                        <Image
                            className="flex"
                            alt="Telergam image"
                            height={30}
                            src={telegramImage}
                            width={30}
                        />
                    </a>
                </div>

            </div>
        </div>
    )
}