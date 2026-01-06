import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        // bg-lara-dark: Mengubah seluruh background web jadi biru sangat gelap
        <div className="min-h-screen flex flex-col bg-lara-dark text-white font-body" id="home">
            <Navbar />

            <main className="flex-grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                {children}
            </main>

            <Footer />
        </div>
    );
}
