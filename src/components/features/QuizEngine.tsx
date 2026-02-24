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
    const [subjectiveInput, setSubjectiveInput] = useState("");
    const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const { playSound } = useSound();

    const currentQ = questions[qIndex];

    const handleAnswer = (optIndex: number) => {
        if (selectedOpt !== null) return; // Prevent double click
        setSelectedOpt(optIndex);
        setUserAnswers(prev => ({ ...prev, [qIndex]: optIndex }));

        if (optIndex === currentQ.ans) {
            playSound('success');
            setScore(s => s + 1);
        } else {
            playSound('click'); // Error sound
        }

        autoAdvance();
    };

    const handleSubmitSubjective = () => {
        if (!subjectiveInput.trim()) return;

        setUserAnswers(prev => ({ ...prev, [qIndex]: subjectiveInput }));
        playSound('success');
        autoAdvance();
    };

    const autoAdvance = () => {
        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex(i => i + 1);
                setSelectedOpt(null);
                setSubjectiveInput("");
            } else {
                setIsFinished(true);
                playSound('success');
            }
        }, 1200);
    };

    if (isFinished) {
        return (
            <MediaShell bgClass={resultConfig.bgClass}>
                <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-2xl space-y-8 animate-bounce" style={{ animationIterationCount: 1 }}>
                    <div className="text-center">
                        <h1 className={`text-4xl font-bold ${resultConfig.textClass} mb-2`}>{resultConfig.title}</h1>
                        <div className={`text-6xl ${resultConfig.textClass} font-black mb-2`}>
                            {score} / {questions.filter(q => q.type !== 'subjective').length}
                        </div>
                        <p className="text-xl text-gray-500">
                            {score === questions.length ? resultConfig.perfectMessage : resultConfig.goodMessage}
                        </p>
                    </div>

                    <div className="mt-8 text-left space-y-4 max-h-[40vh] overflow-y-auto px-2">
                        <h3 className="text-xl font-bold text-gray-800 sticky top-0 bg-white pt-2 pb-4">Jawaban Kamu:</h3>
                        {questions.map((q, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="font-semibold text-gray-800 whitespace-pre-line">{idx + 1}. {q.q}</p>
                                <p className="mt-2 text-brand-blue font-medium">
                                    Jawab: {
                                        q.type === 'subjective'
                                            ? (userAnswers[idx] || <span className="text-gray-400 italic">Tidak dijawab</span>)
                                            : typeof userAnswers[idx] === 'number'
                                                ? q.opts[userAnswers[idx] as number]
                                                : <span className="text-gray-400 italic">Tidak dijawab</span>
                                    }
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                        <GameControls
                            isFinished={true}
                            onRestart={() => window.location.reload()}
                        />
                    </div>
                    <Link
                        to="/library"
                        className="block mt-4 text-center text-gray-500 hover:text-gray-700 underline"
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

                            {currentQ.type === 'subjective' ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={subjectiveInput}
                                        onChange={(e) => setSubjectiveInput(e.target.value)}
                                        placeholder="Ketik jawabanmu di sini..."
                                        className="w-full p-4 md:p-6 rounded-xl text-xl md:text-2xl border-2 border-gray-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 transition-all min-h-[120px] resize-y text-gray-800 bg-white"
                                    />
                                    <button
                                        onClick={handleSubmitSubjective}
                                        disabled={!subjectiveInput.trim()}
                                        className="w-full p-4 md:p-6 rounded-xl text-xl md:text-2xl font-bold bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Lanjut
                                    </button>
                                </div>
                            ) : (
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
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls hidden but spacing needed to match others */}
            <div className="absolute bottom-10 left-0 right-0 h-20 pointer-events-none"></div>

        </MediaShell>
    );
}
