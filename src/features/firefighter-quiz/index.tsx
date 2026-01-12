import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { Link } from 'react-router-dom';
import MediaShell from '../../components/layout/MediaShell';
import GameControls from '../../components/ui/GameControls';


const questions = [
    // 1-5 Counting
    {
        q: "Hitung ada berapa mobil pemadam kebakaran!",
        img: "/assets/quiz/count_trucks_new_q1_1767599925520.png",
        opts: ["2", "3", "4", "5"],
        ans: 1 // Index of correct answer
    },
    {
        q: "Hitung berapa helm pemadam kebakaran!",
        img: "/assets/quiz/count_helmets_new_q2_1767599943833.png",
        opts: ["3", "4", "5", "6"],
        ans: 1
    },
    {
        q: "Berapa banyak api? Hitung ya!",
        emoji: "🔥🔥🔥🔥🔥🔥🔥",
        opts: ["5", "6", "7", "8"],
        ans: 2
    },
    {
        q: "Hitung berapa pemadam kebakaran!",
        img: "/assets/quiz/count_firefighters_6_1767598583887.png",
        opts: ["4", "5", "6", "7"],
        ans: 2
    },
    {
        q: "Berapa banyak alat pemadam api?",
        img: "/assets/quiz/count_extinguishers_8_1767598600576.png",
        opts: ["6", "7", "8", "9"],
        ans: 2
    },
    // 6-10 More Counting
    {
        q: "Hitung ada berapa selang air!",
        img: "/assets/quiz/count_hoses_5_1767598615569.png",
        opts: ["3", "4", "5", "6"],
        ans: 2
    },
    {
        q: "Berapa banyak sepatu boot?",
        emoji: "👢👢👢👢👢\n👢👢👢👢👢",
        opts: ["8", "9", "10", "11"],
        ans: 2
    },
    {
        q: "Hitung berapa kapak pemadam!",
        img: "/assets/quiz/count_axes_2_1767598652753.png",
        opts: ["1", "2", "3", "4"],
        ans: 1
    },
    {
        q: "Berapa mobil pemadam yang ada?",
        img: "/assets/quiz/count_firetrucks_5_1767599089711.png",
        opts: ["3", "4", "5", "6"],
        ans: 2
    },
    {
        q: "Hitung berapa api yang menyala!",
        img: "/assets/quiz/count_fires_9_1767599104386.png",
        opts: ["7", "8", "9", "10"],
        ans: 2
    },
    // 11-13 Math
    {
        q: "3 pemadam + 2 pemadam = ...",
        emoji: "👨‍🚒👨‍🚒👨‍🚒 + 👨‍🚒👨‍🚒",
        opts: ["4", "5", "6", "7"],
        ans: 1
    },
    {
        q: "4 selang + 3 selang = ...",
        img: "/assets/quiz/addition_visual_4_plus_3_1767598686165.png",
        opts: ["5", "6", "7", "8"],
        ans: 2
    },
    {
        q: "2 mobil + 1 mobil = ...",
        img: "/assets/quiz/addition_visual_2_plus_1_1767598702092.png",
        opts: ["2", "3", "4", "5"],
        ans: 1
    },
    // 14-15 Subtraction
    {
        q: "6 api - 2 padam = ...",
        emoji: "🔥🔥🔥🔥🔥🔥 - 💧💧",
        opts: ["3", "4", "5", "6"],
        ans: 1
    },
    {
        q: "8 helm - 3 dipakai = ...",
        emoji: "⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️ - 👨‍🚒👨‍🚒👨‍🚒",
        opts: ["4", "5", "6", "7"],
        ans: 1
    }
];

export default function FirefighterQuiz() {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const { playSound } = useSound();

    const currentQ = questions[qIndex];

    const handleAnswer = (optIndex: number) => {
        if (selectedOpt !== null) return; // Prevent double click
        setSelectedOpt(optIndex);

        if (optIndex === currentQ.ans) {
            playSound('success');
            setScore(s => s + 1);
        } else {
            playSound('click'); // Error sound
        }

        // Auto advance
        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex(i => i + 1);
                setSelectedOpt(null);
            } else {
                setIsFinished(true);
                playSound('success');
            }
        }, 1500);
    };

    if (isFinished) {
        return (
            <MediaShell bgClass="bg-brand-bg">
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full space-y-8 animate-bounce">
                    <h1 className="text-4xl font-bold text-brand-blue">Kuis Selesai! 🎉</h1>
                    <div className="text-6xl text-brand-red font-black">
                        {score} / {questions.length}
                    </div>
                    <p className="text-xl text-gray-500">
                        {score === questions.length ? "Wow! Sempurna! Kamu Hebat!" : "Kerja bagus! Belajar lagi yuk!"}
                    </p>
                    <div className="flex flex-col gap-4">
                        <GameControls
                            isFinished={true}
                            onRestart={() => window.location.reload()}
                        />
                    </div>
                    <Link
                        to="/library"
                        className="block mt-8 text-gray-500 underline"
                    >
                        Kembali ke Pustaka
                    </Link>
                </div>
            </MediaShell>
        )
    }

    return (
        <MediaShell
            title={`Kuis Pemadam | Skor: ${score}`}
            currentSlide={qIndex}
            totalSlides={questions.length}
            bgClass="bg-gray-100"
            onSoundToggle={() => playSound('click')}
        >
            <div className="w-full max-w-2xl px-4">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 text-center space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800">{currentQ.q}</h2>

                            <div className="h-48 md:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
                                {currentQ.img ? (
                                    <img src={currentQ.img} alt="Question" className="h-full object-contain" />
                                ) : (
                                    <div className="text-6xl whitespace-pre-wrap leading-relaxed">
                                        {currentQ.emoji}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {currentQ.opts.map((opt, idx) => {
                                    let statusColor = 'bg-white border-2 border-gray-200 hover:border-brand-blue text-gray-700';

                                    if (selectedOpt !== null) {
                                        if (idx === currentQ.ans) statusColor = 'bg-green-500 text-white border-green-500';
                                        else if (idx === selectedOpt) statusColor = 'bg-red-500 text-white border-red-500';
                                        else statusColor = 'bg-gray-100 text-gray-400 border-transparent';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={selectedOpt !== null}
                                            className={`
                                                    p-4 md:p-6 rounded-xl text-2xl md:text-3xl font-bold transition-all transform duration-200
                                                    ${statusColor}
                                                    ${selectedOpt === null ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}
                                                `}
                                        >
                                            {opt}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls hidden but spacing needed to match others */}
            <div className="absolute bottom-10 left-0 right-0 h-20 pointer-events-none"></div>

        </MediaShell>
    );
}
