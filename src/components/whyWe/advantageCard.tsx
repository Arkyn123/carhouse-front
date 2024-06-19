import Image, { StaticImageData } from "next/image"

type Props = {
    name: string
    description: string
    image: StaticImageData
}

export default function AdvantageCard({ name, description, image }: Props) {


    return (
        <div className="flex items-center rounded-lg shadow-xl bg-white p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Image
                src={image}
                alt="advantageImage"
                height={80}
                className="m-2"

            />
            <div className="flex flex-col ml-4 gap-2">
                <span className="text-nowrap font-bold text-[150%]">
                    {name}
                </span>
                <span className="text-balance font-light">
                    {description}
                </span>
            </div>
        </div>
    )
}