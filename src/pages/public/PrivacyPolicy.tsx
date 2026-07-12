import { useEffect } from "react";
import PublicLayout from "@/components/layout/public/PublicLayout.tsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ClipboardList,
    Eye,
    Database,
    Globe,
    Scale,
    Mail,
    ArrowLeft,
    Shield,
    type LucideIcon,
} from "lucide-react";
import {
    PRIVACY_POLICY_LAST_UPDATED,
    PRIVACY_POLICY_INTRO,
    PRIVACY_POLICY_SECTIONS,
    type PrivacyPolicySectionIconName,
} from "./constants/privacy-policy.constants.ts";

const SECTION_ICON_MAP: Record<PrivacyPolicySectionIconName, LucideIcon> = {
    ClipboardList,
    Eye,
    Database,
    Globe,
    Scale,
    Mail,
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (sectionIndex: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: sectionIndex * 0.07 },
    }),
};

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PublicLayout>
            <section className="relative overflow-hidden">
                {/* Decorative glow orbs */}
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4 relative z-10 max-w-3xl">
                    {/* Breadcrumb / Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-10"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                            <Shield className="w-3.5 h-3.5" />
                            Legal Document
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">
                            Privacy <span className="text-primary">Policy</span>.
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Last updated:{" "}
                            <span className="text-foreground font-medium">
                                {PRIVACY_POLICY_LAST_UPDATED}
                            </span>
                        </p>
                    </motion.div>

                    {/* Intro Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative bg-card/80 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl mb-4 overflow-hidden"
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
                        <p className="text-muted-foreground leading-relaxed">
                            {PRIVACY_POLICY_INTRO}
                        </p>
                    </motion.div>

                    {/* Section Cards */}
                    <div className="space-y-3 mt-3">
                        {PRIVACY_POLICY_SECTIONS.map((section, index) => {
                            const SectionIcon = SECTION_ICON_MAP[section.iconName];
                            return (
                                <motion.div
                                    key={section.id}
                                    custom={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-40px" }}
                                    variants={sectionVariants}
                                    className="group relative bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon badge */}
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                            <SectionIcon className="w-5 h-5 text-primary" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-2.5 pt-0.5 min-w-0">
                                            <h3 className="text-base font-heading font-semibold text-foreground">
                                                {section.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {section.content}
                                            </p>
                                            {section.list && (
                                                <ul className="space-y-1.5 mt-1">
                                                    {section.list.map((listItem, listItemIndex) => (
                                                        <li
                                                            key={listItemIndex}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                            {listItem}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Section number */}
                                        <span className="shrink-0 text-xs font-mono text-muted-foreground/30 pt-1 select-none">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
