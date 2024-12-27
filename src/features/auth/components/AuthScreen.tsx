"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthFlow } from "@/features/auth/lib/types";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthScreenProps {
  onClose?: () => void;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const AuthScreen = ({ onClose }: AuthScreenProps) => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleContinueWithoutLogin = () => {
    document.cookie = "bypass_auth=true; path=/; max-age=7200";
    if (onClose) onClose();
    router.push(redirectUrl);
  };

  return (
    <section className="relative flex flex-col items-center justify-center p-8 rounded-2xl min-h-[500px]">
      {/* Close button with glow effect */}
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute right-6 top-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 group"
        >
          <X className="h-5 w-5 text-[#fcba28] opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-[#fcba28]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}

      <motion.div 
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-[420px] space-y-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={authFlow}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            {authFlow === "signIn" ? (
              <SignInCard setState={setAuthFlow} />
            ) : (
              <SignUpCard setState={setAuthFlow} />
            )}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#fcba28]/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 text-[#fcba28]/60 bg-background/40 backdrop-blur-xl">
                Or continue with
              </span>
            </div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <Button
              variant="outline"
              onClick={handleContinueWithoutLogin}
              className="w-full bg-[#fcba28]/5 border border-[#fcba28]/20 hover:bg-[#fcba28]/10 hover:border-[#fcba28]/30 text-[#fcba28] relative overflow-hidden group"
            >
              <span className="relative z-10">
                Continue Without Login
                <span className="text-xs text-[#fcba28]/60 ml-2 group-hover:text-[#fcba28]/80 transition-colors">
                  (Limited Access)
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/0 via-[#fcba28]/5 to-[#fcba28]/0 group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-[#fcba28]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};