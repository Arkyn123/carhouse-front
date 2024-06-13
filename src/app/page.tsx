import CheckPrice from "@/components/checkPrice/checkPrice";
import LexusForm from "@/components/lexusForm/lexusForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-500 z-10 ml-[551px]"></div> */}
      <LexusForm />
      <CheckPrice />
    </main>


  );
}
