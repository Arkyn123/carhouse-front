import CheckPrice from "@/components/checkPrice/checkPrice";
import Examples from "@/components/carsExamples/examples";
import LexusForm from "@/components/lexusForm/lexusForm";
import WhyWe from "@/components/whyWe/whyWe";
import Messengers from "@/components/messengers/messengers";
import Feedback from "@/components/feedback/feedback";
import WannaSell from "@/components/wannaSell/wannaSell";
import Bottom from "@/components/bottom/bottom";

export default function Home() {
  return (
    <main className="flex flex-col">
      <LexusForm />
      <CheckPrice />
      <WhyWe />
      <Examples />
      <Messengers />
      <Feedback />
      <WannaSell />
      <Bottom />
    </main>


  );
}
