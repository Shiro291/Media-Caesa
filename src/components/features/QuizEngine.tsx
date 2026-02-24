import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { Link } from 'react-router-dom';
import MediaShell from '../layout/MediaShell';
import GameControls from '../ui/GameControls';
import type { QuizQuestion } from '../../data/quizzes';

interface QuizResultConfig {
    title: string;
    perfectMessage: string;
    goodMessage: string;
    bgClass: string;
    textClass: string;
}

interface QuizEngineProps {
    title: string;
    questions: QuizQuestion[];
    bgClass: string;
    resultConfig: QuizResultConfig;
}

export default function QuizEngine({ title, questions, bgClass, resultConfig }: QuizEngineProps) {
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
            <MediaShell bgClass={resultConfig.bgClass}>
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full space-y-8 animate-bounce">
                    <h1 className={`text-4xl font-bold ${resultConfig.textClass}`}>{resultConfig.title}</h1>
                    <div className={`text-6xl ${resultConfig.textClass} font-black`}>
                        {score} / {questions.length}
                    </div>
                    <p className="text-xl text-gray-500">
                        {score === questions.length ? resultConfig.perfectMessage : resultConfig.goodMessage}
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
        );
    }

    // Determine option styles based on selection state
    const getOptionStyle = (idx: number) => {
        if (selectedOpt !== null) {
            if (idx === currentQ.ans) return 'bg-green-500 text-white border-green-500 shadow-lg scale-105';
            if (idx === selectedOpt) return 'bg-red-500 text-white border-red-500';
            return 'bg-gray-100 text-gray-400 border-transparent';
        }
        return 'bg-white border-2 border-gray-200 hover:border-brand-blue text-gray-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md';
    };

    return (
        <MediaShell
            title={`${title} | Skor: ${score}`}
            currentSlide={qIndex}
            totalSlides={questions.length}
            bgClass={bgClass}
            onSoundToggle={() => playSound('click')}
        >
            <div className="w-full max-w-2xl px-4">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 text-center space-y-6">
                            {currentQ.storyContext && (
                                <div className="bg-blue-50 border-l-4 border-brand-blue p-4 rounded-r-xl text-left mb-6 shadow-sm">
                                    <p className="text-lg md:text-xl text-gray-700 font-medium whitespace-pre-line leading-relaxed">
                                        {currentQ.storyContext}
                                    </p>
                                </div>
                            )}

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{currentQ.q}</h2>

                            <div className="h-48 md:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
                                {currentQ.img ? (
                                    <img src={currentQ.img} alt="Question" loading="lazy" className="h-full object-contain" />
                                ) : (
                                    <div className={`text-6xl whitespace-pre-wrap leading-relaxed ${currentQ.isShapeSelection ? '' : 'animate-pulse'}`}>
                                        {currentQ.emoji}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {currentQ.opts.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        disabled={selectedOpt !== null}
                                        className={`
                                            p-4 md:p-6 rounded-xl text-2xl md:text-3xl font-bold transition-all duration-200
                                            ${getOptionStyle(idx)}
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
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
