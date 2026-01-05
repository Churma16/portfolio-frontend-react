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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            
            // --- BAGIAN YANG DIPERBAIKI ---
            // 1. bg-transparent: Hapus background default biar ga kotak banget
            // 2. border-white/5: Border sangat tipis (hampir ga keliatan) buat struktur
            // 3. hover:bg-white/[0.02]: Pas di-hover baru muncul background SANGAT TIPIS
            className="group relative p-8 rounded-2xl border border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-lara-blue/30 transition-all duration-300"
        >
            {/* Glow Effect (Opsional: Kita kurangi opacity-nya biar ga norak) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-lara-blue/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon Wrapper: Ubah jadi transparent juga biar clean */}
            <div className="relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg text-lara-blue group-hover:scale-110 transition-transform duration-300">
                {/* Kita kasih background kotak ikonnya HANYA saat hover */}
                <div className="absolute inset-0 bg-lara-blue/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                    {icon}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-lara-blue transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {description}
            </p>
        </motion.div>
    );
}