// src/components/Auth/LoginForm.tsx
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiArrowRight,
    HiQrCode,
    HiCommandLine,
} from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";

interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    status: "idle" | "loading" | "success" | "error";
    errorMessage: string;
    isGlitch: boolean;
    onSubmit: (e: FormEvent) => void;
}

export default function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    status,
    errorMessage,
    isGlitch,
    onSubmit,
}: LoginFormProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative z-10 transition-none
                ${
                    isGlitch
                        ? "hacked-effect font-mono"
                        : "bg-[#0a101f]/80 backdrop-blur-md border border-white/10"
                }
            `}
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h1
                    className={`text-3xl font-bold mb-2 ${
                        !isGlitch && "font-heading text-white"
                    }`}
                >
                    {isGlitch ? "⚠️ SYSTEM_BREACH ⚠️" : "Welcome Back."}
                </h1>
                <p className={`text-sm ${!isGlitch && "text-slate-400"}`}>
                    {isGlitch
                        ? "UNAUTHORIZED ACCESS DETECTED..."
                        : "Enter your credentials to access the admin area."}
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {status === "error" && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-2">
                    <p className="text-sm text-slate-400 mb-4 text-center">
                        Or{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/set-token")}
                            className="text-lara-blue hover:underline font-semibold"
                        >
                            set bearer token manually
                        </button>
                    </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {isGlitch ? "TARGET_ID" : "Email Address"}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {isGlitch ? (
                                <HiCommandLine className="w-5 h-5 animate-pulse" />
                            ) : (
                                <HiOutlineEnvelope className="w-5 h-5 text-slate-500" />
                            )}
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full rounded-lg pl-10 pr-4 py-3 outline-none transition-none ${
                                !isGlitch &&
                                "bg-[#050914]/50 border border-white/10 focus:border-lara-blue text-white placeholder:text-slate-600"
                            }`}
                            placeholder={isGlitch ? "X_X_X_X" : "admin@churma.dev"}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {isGlitch ? "DECRYPT_KEY" : "Password"}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {isGlitch ? (
                                <HiQrCode className="w-5 h-5 animate-pulse" />
                            ) : (
                                <HiOutlineLockClosed className="w-5 h-5 text-slate-500" />
                            )}
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full rounded-lg pl-10 pr-4 py-3 outline-none transition-none ${
                                !isGlitch &&
                                "bg-[#050914]/50 border border-white/10 focus:border-lara-blue text-white placeholder:text-slate-600"
                            }`}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`w-full py-3.5 rounded-lg font-bold transition-none flex items-center justify-center gap-2 mt-4 ${
                        !isGlitch
                            ? status === "success"
                                ? "bg-green-500 text-white"
                                : "bg-lara-blue text-white hover:bg-blue-600"
                            : ""
                    }`}
                >
                    {status === "loading" ? (
                        <>
                            <CgSpinner className="animate-spin w-5 h-5" /> Processing...
                        </>
                    ) : (
                        <>
                            {isGlitch ? "OVERRIDE_SECURITY" : "Sign In"}{" "}
                            <HiArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}