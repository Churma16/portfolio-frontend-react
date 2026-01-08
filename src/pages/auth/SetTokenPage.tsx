import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    HiOutlineKey,
    HiOutlineTrash,
    HiArrowLeft,
    HiCheck,
} from "react-icons/hi2";
import PublicLayout from "../../components/layout/public/PublicLayout.tsx";
import { setAdminToken, getGuestToken } from "@/lib/auth.ts";
import apiClient from "@/api/axios.ts";

export default function SetTokenPage() {
    const navigate = useNavigate();
    const guestToken = getGuestToken();
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [copied, setCopied] = useState(false);

    const handleSetToken = (e: React.FormEvent) => {
        e.preventDefault();
        if (token.trim()) {
            // Simpan token dan abilities kosong (user manual set token)
            setAdminToken(token, ["admin"]);
            setCopied(true);
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1000);
        }
    };

    const handleClearToken = () => {
        if (window.confirm("Are you sure you want to clear the token?")) {
            localStorage.removeItem("token");
            setToken("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isValidToken = token.trim() && token !== guestToken;

    return (
        <PublicLayout>
            <style>{`
                .token-input-glow {
                    box-shadow: 0 0 20px rgba(50, 138, 241, 0.1);
                    transition: box-shadow 0.3s ease;
                }
                .token-input-glow:focus {
                    box-shadow: 0 0 30px rgba(50, 138, 241, 0.3);
                }
                .gradient-border {
                    background: linear-gradient(135deg, rgba(50, 138, 241, 0.5) 0%, rgba(26, 171, 139, 0.5) 100%);
                    padding: 1px;
                    border-radius: 1rem;
                }
                .gradient-border-inner {
                    background: #010618;
                    border-radius: calc(1rem - 1px);
                    padding: 2rem;
                }
            `}</style>

            <div className="min-h-screen flex items-center justify-center py-10 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lara-blue/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cat-testing/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 w-full max-w-2xl px-4">
                    <div className="gradient-border">
                        <div className="gradient-border-inner">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-lara-blue/20 rounded-xl border border-lara-blue/50">
                                        <HiOutlineKey className="w-8 h-8 text-lara-blue" />
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-3 font-heading">
                                    Bearer Token
                                </h1>
                                <p className="text-lara-sky/80 text-lg max-w-md mx-auto">
                                    Set your admin authentication token
                                </p>
                            </div>

                            <form
                                onSubmit={handleSetToken}
                                className="space-y-6"
                            >
                                {/* Token Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold uppercase tracking-widest text-lara-sky/60 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-lara-blue rounded-full" />
                                        Admin Token
                                    </label>
                                    <div className="relative group">
                                        <textarea
                                            value={token}
                                            onChange={(e) =>
                                                setToken(e.target.value)
                                            }
                                            placeholder="Paste your admin bearer token here (must start with admin_)..."
                                            className="token-input-glow w-full h-32 rounded-xl p-4 bg-lara-dark/50 border border-lara-border text-lara-sky placeholder:text-lara-sky/30 font-mono text-sm outline-none resize-none focus:border-lara-blue"
                                        />
                                        {token && (
                                            <button
                                                type="button"
                                                onClick={copyToClipboard}
                                                className="absolute top-3 right-3 p-2 rounded-lg bg-lara-border/50 hover:bg-lara-blue/20 transition-colors"
                                                title="Copy token"
                                            >
                                                {copied ? (
                                                    <HiCheck className="w-5 h-5 text-cat-testing" />
                                                ) : (
                                                    <HiOutlineKey className="w-5 h-5 text-lara-sky/60" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                {token && (
                                    <div
                                        className={`p-4 rounded-xl flex items-center gap-3 ${
                                            isValidToken
                                                ? "bg-cat-testing/10 border border-cat-testing/30"
                                                : "bg-cat-framework/10 border border-cat-framework/30"
                                        }`}
                                    >
                                        <HiCheck
                                            className={`w-5 h-5 flex-shrink-0 ${
                                                isValidToken
                                                    ? "text-cat-testing"
                                                    : "text-cat-framework"
                                            }`}
                                        />
                                        <p
                                            className={`text-sm ${
                                                isValidToken
                                                    ? "text-cat-testing-light"
                                                    : "text-cat-framework-light"
                                            }`}
                                        >
                                            {isValidToken
                                                ? "✓ Valid token - can access admin panel"
                                                : "⚠ Token cannot be same as guest token"}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={
                                            !token.trim() || !isValidToken
                                        }
                                        className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-lara-blue hover:bg-lara-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        <HiCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Save & Continue
                                    </button>
                                    {token && (
                                        <button
                                            type="button"
                                            onClick={handleClearToken}
                                            className="px-6 py-4 rounded-xl font-bold text-white bg-cat-framework/30 hover:bg-cat-framework/50 transition-colors border border-cat-framework/30 hover:border-cat-framework/50 flex items-center justify-center gap-2"
                                            title="Clear token"
                                        >
                                            <HiOutlineTrash className="w-5 h-5" />
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="w-full py-3 rounded-xl font-bold text-lara-sky/70 bg-lara-border/20 hover:bg-lara-border/40 transition-colors border border-lara-border/40 hover:border-lara-border/70 flex items-center justify-center gap-2 group"
                                >
                                    <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Back to Home
                                </button>
                            </form>

                            {/* Info Section */}
                            <div className="mt-8 space-y-4">
                                <div className="p-4 rounded-xl bg-lara-blue/5 border border-lara-blue/20">
                                    <p className="text-xs text-lara-sky/60 leading-relaxed">
                                        <span className="text-lara-blue font-semibold">
                                            💡 Admin Token:
                                        </span>{" "}
                                        Once you set a token, it will be stored
                                        in browser's local storage and used for
                                        API requests.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-cat-testing/5 border border-cat-testing/20">
                                    <p className="text-xs text-lara-sky/60 leading-relaxed">
                                        <span className="text-cat-testing font-semibold">
                                            📌 Guest Token:
                                        </span>{" "}
                                        When no admin token is set, guest token{" "}
                                        <code className="bg-lara-dark/50 px-2 py-1 rounded text-xs">
                                            {guestToken.substring(0, 20)}...
                                        </code>{" "}
                                        is used automatically.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
