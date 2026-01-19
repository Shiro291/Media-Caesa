import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { CheckCircle, XCircle } from 'lucide-react';

const questions = [
    // Population vs Sample (3 questions)
    {
        q: "Semua siswa di SD Harapan Bangsa adalah contoh dari...",
        opts: ["Sampel", "Populasi", "Diagram", "Data"],
        ans: 1,
        explanation: "Benar! Semua siswa = Populasi (keseluruhan)"
    },
    {
        q: "Siswa kelas 4A yang dipilih untuk survei adalah contoh dari...",
        opts: ["Populasi", "Sampel", "Piktogram", "Statistik"],
        ans: 1,
        explanation: "Tepat! Sebagian siswa yang dipilih = Sampel"
    },
    {
        q: "Manakah yang merupakan POPULASI?",
        opts: ["5 pohon yang diukur", "Semua ikan di kolam", "10 siswa yang ditanya", "Kelas 4B saja"],
        ans: 1,
        explanation: "Benar! 'Semua ikan' berarti populasi (keseluruhan)"
    },

    // Reading Pictogram (3 questions)
    {
        q: "Berapa siswa yang suka apel?\n\n🍎🍎🍎🍎🍎",
        opts: ["3", "4", "5", "6"],
        ans: 2,
        explanation: "Benar! Ada 5 gambar apel = 5 siswa"
    },
    {
        q: "Olahraga mana yang paling banyak disukai?\n\n⚽⚽⚽⚽⚽⚽\n🏀🏀🏀\n🏐🏐🏐🏐",
        opts: ["Sepak Bola", "Basket", "Voli", "Sama semua"],
        ans: 0,
        explanation: "Tepat! Sepak bola memiliki 6 gambar (paling banyak)"
    },
    {
        q: "Berapa total siswa yang suka buah?\n\n🍎🍎🍎\n🍌🍌🍌🍌\n🍊🍊",
        opts: ["7", "8", "9", "10"],
        ans: 2,
        explanation: "Benar! 3 + 4 + 2 = 9 siswa"
    },

    // Reading Bar Chart (4 questions)
    {
        q: "Lihat diagram batang ini. Berapa siswa hadir hari Senin?",
        visual: (
            <div className="flex items-end justify-around h-48 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-red-500 w-16 rounded-t-lg" style={{ height: '60%' }}></div>
                    <span className="text-sm font-semibold">Senin</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-500 w-16 rounded-t-lg" style={{ height: '80%' }}></div>
                    <span className="text-sm font-semibold">Selasa</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-green-500 w-16 rounded-t-lg" style={{ height: '40%' }}></div>
                    <span className="text-sm font-semibold">Rabu</span>
                </div>
            </div>
        ),
        opts: ["4", "6", "8", "10"],
        ans: 1,
        explanation: "Benar! Batang Senin setinggi angka 6"
    },
    {
        q: "Hari apa yang paling banyak siswa hadir?",
        visual: (
            <div className="flex items-end justify-around h-48 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-red-500 w-16 rounded-t-lg" style={{ height: '50%' }}></div>
                    <span className="text-sm font-semibold">Senin</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-500 w-16 rounded-t-lg" style={{ height: '100%' }}></div>
                    <span className="text-sm font-semibold">Selasa</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-green-500 w-16 rounded-t-lg" style={{ height: '70%' }}></div>
                    <span className="text-sm font-semibold">Rabu</span>
                </div>
            </div>
        ),
        opts: ["Senin", "Selasa", "Rabu", "Sama semua"],
        ans: 1,
        explanation: "Tepat! Batang Selasa paling tinggi"
    },
    {
        q: "Berapa selisih siswa hadir antara hari Kamis dan Jumat?",
        visual: (
            <div className="flex items-end justify-around h-48 bg-gray-50 p-4 rounded-lg relative">
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>
                <div className="flex items-end justify-around w-full pl-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-purple-500 w-16 rounded-t-lg" style={{ height: '80%' }}></div>
                        <span className="text-sm font-semibold">Kamis</span>
                        <span className="text-xs">8</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-orange-500 w-16 rounded-t-lg" style={{ height: '50%' }}></div>
                        <span className="text-sm font-semibold">Jumat</span>
                        <span className="text-xs">5</span>
                    </div>
                </div>
            </div>
        ),
        opts: ["2", "3", "4", "5"],
        ans: 1,
        explanation: "Benar! 8 - 5 = 3 siswa"
    },
    {
        q: "Berapa total siswa yang hadir dalam 3 hari ini?",
        visual: (
            <div className="flex items-end justify-around h-48 bg-gray-50 p-4 rounded-lg relative">
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>
                <div className="flex items-end justify-around w-full pl-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-red-500 w-16 rounded-t-lg" style={{ height: '40%' }}></div>
                        <span className="text-sm font-semibold">Senin</span>
                        <span className="text-xs">4</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-blue-500 w-16 rounded-t-lg" style={{ height: '60%' }}></div>
                        <span className="text-sm font-semibold">Selasa</span>
                        <span className="text-xs">6</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-green-500 w-16 rounded-t-lg" style={{ height: '50%' }}></div>
                        <span className="text-sm font-semibold">Rabu</span>
                        <span className="text-xs">5</span>
                    </div>
                </div>
            </div>
        ),
        opts: ["13", "14", "15", "16"],
        ans: 2,
        explanation: "Tepat! 4 + 6 + 5 = 15 siswa"
    }
];

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
                        {currentQ.opts.map((opt, idx) => {
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
