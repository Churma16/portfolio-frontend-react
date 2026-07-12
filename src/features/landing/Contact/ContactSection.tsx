import {FormEvent, useState} from "react";
import {motion} from "framer-motion";
import {HiPaperAirplane} from "react-icons/hi2";
import {CgSpinner} from "react-icons/cg";
import {useCreateMessage} from "@/hooks/useMessages.ts";

export default function ContactSection() {
    // Mutation hook untuk send message
    const mutation = useCreateMessage();

    // State Form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
        gotcha: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (errors[e.target.name])
            setErrors({...errors, [e.target.name]: ""});
    };

    const validate = () => {
        // Honeypot validation - if gotcha is filled, it's a bot
        if (formData.gotcha) {
            return false; // Silently reject, don't show error message
        }

        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!formData.content) newErrors.content = "Message cannot be empty.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.gotcha) {
            setFormData({name: "", email: "", content: "", gotcha: ""});

            return;
        }

        if (!validate()) return;

        // Kirim data ke API menggunakan mutation
        mutation.mutate(formData, {
            onSuccess: () => {
                // Reset form setelah sukses
                setFormData({name: "", email: "", content: "", gotcha: ""});
                // Auto reset status setelah 3 detik
                setTimeout(() => {
                    mutation.reset();
                }, 3000);
            },
        });
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
                            "radial-gradient(hsl(var(--border)) 1px, transparent 1px)", // Semantic border color
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
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"/>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                        Let's Work{" "}
                        <span className="text-primary">Together</span>.
                    </h2>
                    <p className="text-muted-foreground">
                        I’m currently available for full-time positions or freelance projects. If you have a question or
                        just want to say hi, my inbox is always open!
                    </p>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    // 2. Ubah background kartu jadi semi-transparan + blur biar nyatu
                    className="bg-card/80 backdrop-blur-md border border-border p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                    {/* Spotlight Effect Top Border */}
                    <div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"/>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10"
                    >
                        <div
                            style={{
                                display: "none",
                                opacity: 0,
                                visibility: "hidden",
                            }}
                        >
                            <label htmlFor="gotcha">
                                Jangan diisi jika Anda manusia
                            </label>
                            <input
                                type="text"
                                name="gotcha"
                                id="gotcha"
                                tabIndex={-1}
                                autoComplete="off"
                                // Sambungkan ke state form Anda
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Input Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    // Input bg transparan gelap
                                    className={`w-full bg-background/50 border ${
                                        errors.name
                                            ? "border-destructive/50 focus:border-destructive"
                                            : "border-border focus:border-primary"
                                    } rounded-lg px-4 py-3 text-foreground outline-none transition-colors`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Input Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={`w-full bg-background/50 border ${
                                        errors.email
                                            ? "border-destructive/50 focus:border-destructive"
                                            : "border-border focus:border-primary"
                                    } rounded-lg px-4 py-3 text-foreground outline-none transition-colors`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Message
                            </label>
                            <textarea
                                name="content"
                                rows={5}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Hi Fathan! I have an idea for a backend system and I'd love to discuss how your Go, Laravel, and Express experience can help. Let's talk!"
                                className={`w-full bg-background/50 border ${
                                    errors.content
                                        ? "border-destructive/50 focus:border-destructive"
                                        : "border-border focus:border-primary"
                                } rounded-lg px-4 py-3 text-foreground outline-none transition-colors resize-none`}
                            />
                            {errors.content && (
                                <p className="text-xs text-lara-accent-red-light">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={mutation.isPending || mutation.isSuccess}
                            className={`w-full py-4 rounded-lg font-bold text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2
                                ${
                                mutation.isSuccess
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-primary hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/50"
                            }
                                disabled:opacity-70 disabled:cursor-not-allowed
                            `}
                        >
                            {mutation.isPending ? (
                                <>
                                    <CgSpinner className="animate-spin w-5 h-5"/>
                                    Sending...
                                </>
                            ) : mutation.isSuccess ? (
                                "Message Sent Successfully! 🎉"
                            ) : (
                                <>
                                    Send Message{" "}
                                    <HiPaperAirplane className="-rotate-45 mb-1"/>
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
