import Image from "next/image"
import headerImage from "@public/header_image.svg"
import telegramImage from "@public/telegram.svg"
import whatsappImage from "@public/whatsapp.svg"

export default function Header() {
    return (
        <header className="shadow-md bg-white text-black py-8  flex flex-row justify-center items-center">
            <a href="/" className="fixed left-[20%] flex col-1">
                <Image
                    className=""
                    alt="Header image"
                    height={250}
                    src={headerImage}
                    width={250}
                />
            </a>
            <div className="fixed flex items-center justify-center right-[22%] gap-6">
                <p className="text-[110%] font-medium">+7 (963) 478-67-27</p>
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
        </header>
    )
}