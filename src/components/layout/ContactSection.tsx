import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { HiPaperAirplane } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";

export default function ContactSection() {
    // State untuk Form Data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // State untuk UI (Loading, Success, Error)
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
        "idle"
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle Input Change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Hapus error realtime saat user mengetik
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    // Validasi Sederhana
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

    // Handle Submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus("submitting");

        // --- SIMULASI API CALL (Nanti diganti axios.post) ---
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Reset status ke idle setelah 3 detik
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    return (
        <section
            id="contact"
            className="py-24 relative overflow-hidden bg-[#050914]"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Ready to{" "}
                        <span className="text-lara-blue">Collaborate</span>?
                    </h2>
                    <p className="text-slate-400">
                        Got a project in mind? Let's turn your ideas into
                        reality.
                    </p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0a101f] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                    {/* Spotlight Effect Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lara-blue to-transparent opacity-50" />

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10"
                    >
                        {/* Row 1: Name & Email */}
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
                                    className={`w-full bg-[#050914] border ${
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
                                    className={`w-full bg-[#050914] border ${
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

                        {/* Row 2: Message */}
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
                                className={`w-full bg-[#050914] border ${
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
