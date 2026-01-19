import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { Link } from 'react-router-dom';
import MediaShell from '../../components/layout/MediaShell';
import GameControls from '../../components/ui/GameControls';

const questions = [
    // Colors
    {
        q: "Warna apa gambar balon ini?",
        emoji: "🎈",
        opts: ["Kuning", "Merah", "Biru", "Hijau"],
        ans: 1
    },
    {
        q: "Apa warna mobil ini?",
        emoji: "🚙",
        opts: ["Biru", "Merah", "Ungu", "Hitam"],
        ans: 0
    },
    {
        q: "Apa warna buah jeruk ini?",
        emoji: "🍊",
        opts: ["Merah", "Oren", "Pink", "Coklat"],
        ans: 1
    },
    {
        q: "Apa warna daun ini?",
        emoji: "🍃",
        opts: ["Kuning", "Hijau", "Biru", "Merah"],
        ans: 1
    },
    {
        q: "Apa warna anggur ini?",
        emoji: "🍇",
        opts: ["Ungu", "Hijau", "Kuning", "Putih"],
        ans: 0
    },

    // Shapes (Using CSS or Emojis representing shapes)
    {
        q: "Bentuk apa gambar ini?",
        emoji: "🟦",
        opts: ["Lingkaran", "Segitiga", "Kotak", "Bintang"],
        ans: 2
    },
    {
        q: "Bentuk apa gambar ini?",
        emoji: "🔴",
        opts: ["Kotak", "Lingkaran", "Persegi Panjang", "Segitiga"],
        ans: 1
    },
    {
        q: "Mana yang bentuknya Segitiga?",
        emoji: "❓",
        isShapeSelection: true,
        opts: ["🟣", "🔺", "⬛", "🔷"], // Emojis as options
        ans: 1
    },

    // Mix
    {
        q: "Warna apa bintang ini?",
        emoji: "⭐",
        opts: ["Kuning", "Hitam", "Biru", "Merah"],
        ans: 0
    },
    {
        q: "Bentuk apa Kue ini?",
        emoji: "🍩",
        opts: ["Kotak", "Segitiga", "Lingkaran", "Bintang"],
        ans: 2
    }
];

export default function SimpleQuiz() {
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
            setScore(s => s + 1);
        } else {
            playSound('click');
        }

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
            <MediaShell bgClass="bg-yellow-50">
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full space-y-8 animate-bounce">
                    <h1 className="text-4xl font-bold text-brand-orange">Hore! Selesai! 🎉</h1>
                    <div className="text-6xl text-brand-blue font-black">
                        {score} / {questions.length}
                    </div>
                    <p className="text-xl text-gray-500">
                        {score === questions.length ? "Hebat! Kamu tahu semua warna & bentuk!" : "Bagus! Ayo belajar lagi!"}
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
            title={`Kuis Warna & Bentuk | Skor: ${score}`}
            currentSlide={qIndex}
            totalSlides={questions.length}
            bgClass="bg-blue-50"
            onSoundToggle={() => playSound('click')}
        >
            <div className="w-full max-w-2xl px-4">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    >
                        <div className="p-8 text-center space-y-8">
                            <h2 className="text-3xl font-bold text-gray-800">{currentQ.q}</h2>

                            <div className="h-48 flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <div className="text-8xl animate-pulse">
                                    {currentQ.emoji}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {currentQ.opts.map((opt, idx) => {
                                    let statusColor = 'bg-white border-2 border-gray-100 hover:border-brand-blue text-gray-700';

                                    if (selectedOpt !== null) {
                                        if (idx === currentQ.ans) statusColor = 'bg-green-500 text-white border-green-500 shadow-lg scale-105';
                                        else if (idx === selectedOpt) statusColor = 'bg-red-500 text-white border-red-500';
                                        else statusColor = 'bg-gray-50 text-gray-300 border-transparent';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={selectedOpt !== null}
                                            className={`
                                                    p-6 rounded-2xl text-2xl font-bold transition-all duration-300
                                                    ${statusColor}
                                                    ${selectedOpt === null ? 'hover:shadow-md hover:-translate-y-1' : ''}
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
        </MediaShell>
    );
}
