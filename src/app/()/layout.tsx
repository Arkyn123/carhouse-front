import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji, Noto_Sans, Nunito_Sans, Open_Sans, Raleway } from "next/font/google";
import "../globals.css";
import LayoutWrap from "@/components/shared/layout";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["cyrillic"] });
const font2 = Nunito_Sans({ subsets: ["cyrillic"] })

export const metadata: Metadata = {
  title: "Срочный выкуп любых автомобилей в Магнитогорске и области",
  description: "Carhouse",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // <html lang="en">
    <body className={cn(font.className, "bg-slate-200 h-screen")}>
      <LayoutWrap>
        {children}
      </LayoutWrap>
      {/* <Toaster /> */}
    </body>
    // </html>
  );
}