import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    index: number;
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
    return (
        <motion.div
            // Animasi Stagger: Muncul berurutan (kiri, tengah, kanan)
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            
            // Styling Kartu:
            // - bg-[#0f172a]/40: Latar transparan gelap
            // - group: Untuk trigger efek child saat parent di-hover
            className="group relative p-8 rounded-2xl bg-[#0f172a]/40 border border-white/5 hover:border-lara-blue/30 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Efek Glow di belakang ikon (Default invisible, muncul pas hover) */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-lara-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon Wrapper */}
            <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 text-slate-400 group-hover:text-lara-blue group-hover:bg-lara-blue/10 transition-colors duration-300">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-lara-blue transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}