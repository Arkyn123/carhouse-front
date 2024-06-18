import CheckPrice from "@/components/checkPrice/checkPrice";
import Examples from "@/components/examples/examples";
import LexusForm from "@/components/lexusForm/lexusForm";
import WhyWe from "@/components/whyWe/whyWe";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-500 z-10 ml-[551px]"></div> */}
      <LexusForm />
      <CheckPrice />
      <WhyWe />
      {/* <Examples /> */}
    </main>


  );
}
