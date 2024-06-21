'use client'

import Image from "next/image"
import headerImage from "@public/header_image.svg"
import telegramImage from "@public/telegram.svg"
import whatsappImage from "@public/whatsapp.svg"
import { useState } from "react"
import PrivacyDilaog from "./privacyDialog"

export default function Bottom() {

    const [privacy, setPrivacy] = useState(false)

    return (
        <div className="bg-white">
            <div className="container my-5 flex items-end justify-between px-[5%]">
                <div className="flex flex-col gap-2">
                    {/* <Image
                        alt="Header image"
                        width={230}
                        src={headerImage}
                    /> */}
                    <span className="text-slate-800 font-light uppercase">
                        ИП Ковальчук Кирилл Керикс <br />
                        ИНН sueta, ОГРНИП sueta
                    </span>

                    <span className="text-[90%] text-slate-800 underline cursor-pointer" onClick={() => setPrivacy(true)}>
                        Политика конфиденциальности
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    {/* <div className="flex justify-end gap-4">
                        <a href="https://api.whatsapp.com/send/?phone=79925027262&text&type=phone_number&app_absent=0" className="size-sm">
                            <Image
                                className="flex"
                                alt="Telergam image"
                                height={35}
                                src={whatsappImage}
                            />
                        </a>
                        <a href="https://tlgg.ru/carhouse74" className="size-sm">
                            <Image
                                className="flex"
                                alt="Telergam image"
                                height={35}
                                src={telegramImage}
                            />
                        </a>
                    </div> */}
                    <span className="text-right text-[110%] font-light tracking-wide">
                        +7 (963) 478-67-27<br />
                        г. Магнитогорск
                    </span>
                </div>

                <PrivacyDilaog open={privacy} setOpen={setPrivacy} />
            </div>
        </div>
    )
}