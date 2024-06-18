import Image from "next/image"
import okImage from "@public/ok.svg"

type Props = {
    first_word: string
    sec_word: string
}

export default function Clause({ first_word, sec_word }: Props) {
    return (
        <div className="flex flex-row items-start">
            <Image
                className="mr-[10px] pt-3.5"
                alt="Ok image"
                height={20}
                src={okImage}
                width={20}
            />
            <span>{first_word}  <br /> {sec_word}</span>
        </div>
    )
}