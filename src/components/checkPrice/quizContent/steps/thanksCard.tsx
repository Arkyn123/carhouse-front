import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HiCheck } from "react-icons/hi";

export default function ThanksCard() {

    return (
        <div className="pt-5 flex items-center justify-center">

            <Card className="w-[80%] h-[600px] flex flex-col items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center gap-5 text-3xl font-light drop-shadow-2xl">
                    Спасибо! Данные успешно отправлены.
                    <HiCheck className="text-[500%] text-green-500" />
                </CardContent>
            </Card>
        </div>
    )
}