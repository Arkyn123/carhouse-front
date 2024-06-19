import CheckPrice from "@/components/checkPrice/checkPrice";
import Examples from "@/components/carsExamples/examples";
import LexusForm from "@/components/lexusForm/lexusForm";
import WhyWe from "@/components/whyWe/whyWe";
import Messengers from "@/components/messengers/messengers";

export default function Home() {
  return (
    <main className="flex flex-col">
      <LexusForm />
      <CheckPrice />
      <WhyWe />
      <Examples />
      <Messengers />
    </main>


  );
}
