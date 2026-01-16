import Navbar from "@/components/layout/public/Navbar/Navbar.tsx";
import Footer from "@/components/layout/public/Footer/Footer.tsx";
import {ReactNode} from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        // bg-background: Mengubah seluruh background web jadi biru sangat gelap
        <div className="min-h-screen flex flex-col bg-background text-white font-body" id="home">
            <Navbar />

            <main className="flex-grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                {children}
            </main>

            <Footer />
        </div>
    );
}
