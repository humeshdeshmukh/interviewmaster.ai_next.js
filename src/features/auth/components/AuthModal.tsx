"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { AuthScreen } from "./AuthScreen";

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has seen the modal before
    const hasSeenAuth = localStorage.getItem("hasSeenAuth");
    if (!hasSeenAuth) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenAuth", "true");
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      <Dialog.Root open={isOpen} onOpenChange={handleClose}>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-xl"
            />
          </Dialog.Overlay>
          
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95vw] sm:max-w-[600px] p-0">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full overflow-hidden rounded-2xl"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#fcba28]/20 to-[#fcba28]/5 rounded-2xl p-[1px]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fcba28]/20 via-[#fcba28]/10 to-transparent blur-xl" />
                
                {/* Glass effect background */}
                <div className="relative bg-background/40 backdrop-blur-3xl rounded-2xl">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#fcba28]/10 to-transparent opacity-50 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative">
                    <AuthScreen onClose={handleClose} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AnimatePresence>
  );
};
