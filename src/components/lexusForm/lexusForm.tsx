import lexusImage from "@public/lexus.png"
import Image from "next/image"
import OfferText from "./offerText/offerText"
import PriceCard from "./priceCard/priceCard";

export default function LexusForm() {

    return (
        <div className="bg-slate-600">

            <div className="container px-[5%] flex justify-between my-10">

                <OfferText />

                <div className="absolute inset-x-0 flex items-center justify-center mt-32">
                    <Image
                        alt="Lexus image"
                        src={lexusImage}
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <PriceCard />
            </div>
        </div>)
}