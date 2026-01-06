import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { HiPaperAirplane } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";

export default function ContactSection() {
    // State Form (Tidak Berubah)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
        "idle"
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name])
            setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.message) newErrors.message = "Message cannot be empty.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    return (
        // 1. HAPUS bg-[#050914], ganti jadi relative transparan
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* --- BACKGROUND SEAMLESS (GRID PATTERN) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]" // Opacity dinaikkan biar kelihatan
                    style={{
                        backgroundImage:
                            "radial-gradient(#94a3b8 1px, transparent 1px)", // Warna titik lebih terang (Slate-400)
                        backgroundSize: "32px 32px", // Jarak antar titik
                        // Masking lebih lebar supaya tidak habis di pinggir
                        maskImage:
                            "radial-gradient(circle at center, black 20%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at center, black 20%, transparent 100%)",
                    }}
                />
            </div>

            {/* Dekorasi Glow Ungu/Biru Samar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lara-blue/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Let's Work{" "}
                        <span className="text-lara-blue">Together</span>.
                    </h2>
                    <p className="text-slate-400">
                        I am currently available for full-time positions. Let's
                        discuss how I can contribute to your team.
                    </p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // 2. Ubah background kartu jadi semi-transparan + blur biar nyatu
                    className="bg-[#0a101f]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                    {/* Spotlight Effect Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lara-blue to-transparent opacity-50" />

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Input Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    // Input bg transparan gelap
                                    className={`w-full bg-[#050914]/50 border ${
                                        errors.name
                                            ? "border-red-500/50 focus:border-red-500"
                                            : "border-white/10 focus:border-lara-blue"
                                    } rounded-lg px-4 py-3 text-white outline-none transition-colors`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-400">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Input Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={`w-full bg-[#050914]/50 border ${
                                        errors.email
                                            ? "border-red-500/50 focus:border-red-500"
                                            : "border-white/10 focus:border-lara-blue"
                                    } rounded-lg px-4 py-3 text-white outline-none transition-colors`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">
                                Message
                            </label>
                            <textarea
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                className={`w-full bg-[#050914]/50 border ${
                                    errors.message
                                        ? "border-red-500/50 focus:border-red-500"
                                        : "border-white/10 focus:border-lara-blue"
                                } rounded-lg px-4 py-3 text-white outline-none transition-colors resize-none`}
                            />
                            {errors.message && (
                                <p className="text-xs text-red-400">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={
                                status === "submitting" || status === "success"
                            }
                            className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2
                                ${
                                    status === "success"
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gradient-to-r from-lara-blue to-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                }
                                disabled:opacity-70 disabled:cursor-not-allowed
                            `}
                        >
                            {status === "submitting" ? (
                                <>
                                    <CgSpinner className="animate-spin w-5 h-5" />
                                    Sending...
                                </>
                            ) : status === "success" ? (
                                "Message Sent Successfully! 🎉"
                            ) : (
                                <>
                                    Send Message{" "}
                                    <HiPaperAirplane className="-rotate-45 mb-1" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
