import Header from "./header";

export default function LayoutWrap({ children }: { children: React.ReactNode }) {
    return (
        <main className="">
            <Header />
            {children}
        </main>
    )
} 