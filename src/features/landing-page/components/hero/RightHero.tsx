import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mic, Bot, BrainCircuit, Code2, GitBranch, Database, Sparkles, MessageSquare, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

// Interview scenarios for the simulation
const interviewScenarios = [
    {
        type: "System Design",
        question: "Design a real-time chat application",
        concepts: ["Scalability", "WebSocket", "Load Balancing"],
        difficulty: "Advanced"
    },
    {
        type: "Algorithms",
        question: "Implement a distributed cache",
        concepts: ["Time Complexity", "Distributed Systems", "Caching"],
        difficulty: "Expert"
    },
    {
        type: "Backend",
        question: "Design a rate limiter",
        concepts: ["API Design", "Throttling", "Redis"],
        difficulty: "Intermediate"
    }
];

const DifficultyBadge = ({ level }) => {
    const colors = {
        Intermediate: "text-green-400 bg-green-400/10 border-green-400/20",
        Advanced: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        Expert: "text-red-400 bg-red-400/10 border-red-400/20"
    };

    return (
        <div className={`px-3 py-1 rounded-full text-xs border ${colors[level]}`}>
            {level}
        </div>
    );
};

const InterviewSimulation = ({ scenario, isAnalyzing }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative p-6 rounded-xl bg-black/20 border border-white/10 overflow-hidden"
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
            >
                <Code2 className="w-5 h-5 text-[#fcba28]" />
                <span className="text-sm font-medium text-[#fcba28]">{scenario.type}</span>
            </motion.div>
            <DifficultyBadge level={scenario.difficulty} />
        </div>

        {/* Question */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <div className="text-xl font-semibold text-white/90 mb-2">{scenario.question}</div>
            <div className="flex flex-wrap gap-2">
                {scenario.concepts.map((concept, index) => (
                    <motion.div
                        key={concept}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 text-xs"
                    >
                        {concept}
                    </motion.div>
                ))}
            </div>
        </motion.div>

        {/* AI Analysis Overlay */}
        <AnimatePresence>
            {isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/20 to-transparent backdrop-blur-sm"
                >
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="w-12 h-12 rounded-full border-2 border-[#fcba28] border-t-transparent mx-auto mb-4"
                            />
                            <p className="text-sm text-white/60">AI analyzing response patterns...</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Interactive Elements */}
        <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-[#fcba28]/20 text-[#fcba28]"
                >
                    <Mic className="w-5 h-5" />
                </motion.button>
                <div className="h-2 w-32 rounded-full bg-[#fcba28]/20">
                    <motion.div
                        animate={{
                            width: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="h-full rounded-full bg-[#fcba28]"
                    />
                </div>
            </div>
            <Link 
                href="/products/mock-interviews/visual-simulation"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fcba28] text-black font-medium text-sm hover:bg-[#fcba28]/90 transition-colors"
            >
                Try Now
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    </motion.div>
);

const FeatureHighlight = ({ icon: Icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
    >
        <motion.div
            animate={{
                y: [-2, 2, -2],
                rotate: [-5, 5, -5],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="p-3 rounded-xl bg-[#fcba28]/20"
        >
            <Icon className="w-6 h-6 text-[#fcba28]" />
        </motion.div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-white/60">{description}</p>
    </motion.div>
);

const FloatingIcon = ({ icon: Icon, delay = 0, x = 0, y = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
            y: [y, y - 10, y],
            x: [x, x + 5, x],
            rotate: [0, 10, 0]
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className="absolute"
    >
        <div className="p-2 rounded-lg bg-[#fcba28]/10 backdrop-blur-sm">
            <Icon className="w-5 h-5 text-[#fcba28]" />
        </div>
    </motion.div>
);

const AnimatedStats = ({ label, value, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex items-center gap-2"
    >
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#fcba28]"
        />
        <span className="text-sm text-white/60">
            <span className="font-medium text-white">{value}</span> {label}
        </span>
    </motion.div>
);

export const RightHero = () => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                setCurrentScenarioIndex((prev) => (prev + 1) % interviewScenarios.length);
            }, 2000);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Floating Icons */}
            <FloatingIcon icon={Code2} x={-20} y={-40} delay={0.2} />
            <FloatingIcon icon={BrainCircuit} x={60} y={-30} delay={0.4} />
            <FloatingIcon icon={GitBranch} x={140} y={-45} delay={0.6} />
            <FloatingIcon icon={Database} x={200} y={-25} delay={0.8} />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                scale: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="relative p-2 rounded-xl bg-[#fcba28]/20"
                        >
                            <motion.div
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 rounded-xl bg-[#fcba28]/20"
                            />
                            <Bot className="w-8 h-8 text-[#fcba28]" />
                        </motion.div>
                        <div>
                            <h3 className="text-xl font-bold">AI Interview Simulator</h3>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-sm text-white/60">
                                    <span className="flex items-center gap-1">
                                        <motion.span
                                            animate={{ 
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-2 h-2 rounded-full bg-green-400"
                                        />
                                        Live Demo
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <AnimatedStats label="Success Rate" value="95%" delay={0.3} />
                                    <AnimatedStats label="Questions" value="1000+" delay={0.4} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animated Label */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-end gap-2"
                    >
                        <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-3 py-1 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 text-sm font-medium text-[#fcba28]"
                        >
                            AI-Powered
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-0.5 bg-gradient-to-r from-[#fcba28]/50 to-transparent"
                        />
                    </motion.div>
                </div>

                {/* Interview Simulation */}
                <InterviewSimulation
                    scenario={interviewScenarios[currentScenarioIndex]}
                    isAnalyzing={isAnalyzing}
                />

                {/* AI Features Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <FeatureHighlight
                        icon={BrainCircuit}
                        title="Smart Analysis"
                        description="Real-time feedback on your responses"
                        delay={0.2}
                    />
                    <FeatureHighlight
                        icon={Sparkles}
                        title="Custom Scenarios"
                        description="Role-specific interview simulations"
                        delay={0.3}
                    />
                    <FeatureHighlight
                        icon={MessageSquare}
                        title="Instant Feedback"
                        description="Detailed performance insights"
                        delay={0.4}
                    />
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(252,186,40,0.2) 0%, transparent 70%)"
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-[#fcba28]/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl"
            />
        </div>
    );
};