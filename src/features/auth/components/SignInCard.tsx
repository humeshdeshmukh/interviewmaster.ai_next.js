"use client";
import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { useAuthActions } from "@convex-dev/auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SignInCardProps {
    setState: (state: AuthFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [account, setAccount] = useState({
        email: "",
        password: ""
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const signInByOAuth = async (provider: "github" | "google") => {
        try {
            setPending(true);
            setError(null);
            await signIn(provider);
        } catch (err) {
            setError(`Failed to sign in with ${provider}. Please try again or use email.`);
        } finally {
            setPending(false);
        }
    }

    const signInByEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!account.email || !account.password) {
            setError("Please fill in all fields");
            return;
        }
        
        try {
            setPending(true);
            setError(null);
            await signIn("password", {
                email: account.email,
                password: account.password,
                flow: "signIn",
            });
        } catch (err) {
            setError("Invalid credentials. Please try again or continue without login.");
        } finally {
            setPending(false);
        }
    }

    return (
        <Card className="border-none shadow-2xl bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-xl">
            <CardHeader className="space-y-4">
                <div className="flex justify-center">
                    <Logo className="h-12 animate-pulse" />
                </div>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-[#fcba28] to-[#fcba28]/70 bg-clip-text text-transparent font-bold">
                    Welcome Back!
                </CardTitle>
                <CardDescription className="text-center text-[#fcba28]/70">
                    Sign in to continue your journey
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20"
                    >
                        <TriangleAlert className="h-4 w-4" />
                        <p>{error}</p>
                    </motion.div>
                )}

                <form onSubmit={signInByEmail} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={account.email}
                            onChange={(e) => {
                                setError(null);
                                setAccount({ ...account, email: e.target.value });
                            }}
                            disabled={pending}
                            required
                            className="bg-white/5 border-[#fcba28]/20 focus:border-[#fcba28] transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={account.password}
                                onChange={(e) => {
                                    setError(null);
                                    setAccount({ ...account, password: e.target.value });
                                }}
                                disabled={pending}
                                required
                                className="bg-white/5 border-[#fcba28]/20 focus:border-[#fcba28] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fcba28]/70 hover:text-[#fcba28] transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <Button
                            type="submit"
                            className="w-full bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium"
                            disabled={pending}
                        >
                            {pending ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-background/30 border-t-background animate-spin rounded-full" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </motion.div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#fcba28]/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-[#fcba28]/70">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            variant="outline"
                            onClick={() => signInByOAuth("google")}
                            disabled={pending}
                            className="w-full bg-white/5 border-[#fcba28]/20 hover:bg-[#fcba28]/10 hover:border-[#fcba28]/30 transition-colors"
                        >
                            <FcGoogle className="mr-2 h-5 w-5" />
                            Google
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            variant="outline"
                            onClick={() => signInByOAuth("github")}
                            disabled={pending}
                            className="w-full bg-white/5 border-[#fcba28]/20 hover:bg-[#fcba28]/10 hover:border-[#fcba28]/30 transition-colors"
                        >
                            <FaGithub className="mr-2 h-5 w-5" />
                            GitHub
                        </Button>
                    </motion.div>
                </div>

                <div className="text-center text-sm">
                    <span className="text-[#fcba28]/70">Don't have an account?</span>{" "}
                    <button
                        onClick={() => setState("signUp")}
                        className="text-[#fcba28] hover:text-[#fcba28]/90 font-medium hover:underline transition-colors"
                        disabled={pending}
                    >
                        Sign up
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};