import {motion} from "framer-motion";
import {IconType} from "react-icons"; // 1. Ubah import dari ReactNode ke IconType

interface ServiceCardProps {
    title: string;
    description: string;
    icon: IconType; // 2. Ubah tipe data di sini
    index: number;
}

// 3. Destructuring: 'icon' di-alias menjadi 'Icon' (Wajib huruf besar untuk komponen React)
export default function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
    return (
        <motion.div
            // Animasi Stagger
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            
            // Styling Kartu
            className="group relative p-8 rounded-2xl bg-[#0f172a]/40 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Efek Glow */}
            <div
                className="absolute top-8 left-8 w-12 h-12 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

            {/* Icon Wrapper */}
            <div
                className="relative mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                {/* 4. Render Icon sebagai Komponen dan atur ukurannya di sini */}
                <Icon className="w-6 h-6" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}