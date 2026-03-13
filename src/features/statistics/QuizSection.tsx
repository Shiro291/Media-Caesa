import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { CheckCircle, XCircle } from 'lucide-react';
import { questions } from './data/quizQuestions';

export default function QuizSection() {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const { playSound } = useSound();

    const currentQ = questions[qIndex];

    const handleAnswer = (optIndex: number) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(optIndex);

        if (optIndex === currentQ.ans) {
            playSound('success');
            setScore((s: number) => s + 1);
        } else {
            playSound('click');
        }

        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex((i: number) => i + 1);
                setSelectedOpt(null);
            } else {
                setIsFinished(true);
                playSound('success');
            }
        }, 2000);
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-6 py-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-8xl"
                >
                    {score === questions.length ? '🏆' : score >= 7 ? '⭐' : '📚'}
                </motion.div>
                <h2 className="text-4xl font-bold text-brand-blue">Kuis Selesai!</h2>
                <div className="text-6xl font-black text-brand-orange">
                    {score} / {questions.length}
                </div>
                <p className="text-xl text-gray-600">
                    {score === questions.length
                        ? "Sempurna! Kamu menguasai statistik!"
                        : score >= 7
                            ? "Hebat! Kamu sudah paham statistik!"
                            : "Bagus! Coba belajar lagi ya!"}
                </p>
                <button
                    onClick={() => {
                        setQIndex(0);
                        setScore(0);
                        setSelectedOpt(null);
                        setIsFinished(false);
                    }}
                    className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition"
                >
                    Ulangi Kuis
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Soal {qIndex + 1} dari {questions.length}
                </h2>
                <div className="text-lg font-semibold text-brand-blue">
                    Skor: {score}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                        <p className="text-xl font-semibold text-gray-800 whitespace-pre-line mb-4">
                            {currentQ.q}
                        </p>
                        {currentQ.visual && (
                            <div className="my-6">
                                {currentQ.visual}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.opts.map((opt: string, idx: number) => {
                            let statusClass = 'bg-white border-2 border-gray-200 hover:border-brand-blue text-gray-700';

                            if (selectedOpt !== null) {
                                if (idx === currentQ.ans) {
                                    statusClass = 'bg-green-500 text-white border-green-500 shadow-lg';
                                } else if (idx === selectedOpt) {
                                    statusClass = 'bg-red-500 text-white border-red-500';
                                } else {
                                    statusClass = 'bg-gray-50 text-gray-400 border-transparent';
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selectedOpt !== null}
                                    className={`relative p-4 rounded-xl text-lg font-semibold transition-all ${statusClass} ${selectedOpt === null ? 'hover:scale-[1.02]' : ''
                                        }`}
                                >
                                    {selectedOpt !== null && idx === currentQ.ans && (
                                        <CheckCircle className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full" size={24} />
                                    )}
                                    {selectedOpt !== null && idx === selectedOpt && idx !== currentQ.ans && (
                                        <XCircle className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full" size={24} />
                                    )}
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {selectedOpt !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl ${selectedOpt === currentQ.ans ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'
                                }`}
                        >
                            <p className="font-semibold">{currentQ.explanation}</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
