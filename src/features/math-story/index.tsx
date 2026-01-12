import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { CheckCircle } from 'lucide-react';
import type { PlaySound } from '../../types';
import { Link } from 'react-router-dom';
import MediaShell from '../../components/layout/MediaShell';
import GameControls from '../../components/ui/GameControls';

const slides = [
    {
        id: 1,
        content: ({ playSound }: { playSound: PlaySound }) => (
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-blue animate-bounce">
                    🔢 Petualangan Berhitung
                </h1>
                <div className="text-9xl cursor-pointer hover:scale-110 transition" onClick={() => playSound('siren')}>
                    👨‍🚒
                </div>
                <h2 className="text-2xl md:text-3xl text-brand-orange font-medium">
                    Bantu Budi Menghitung Barang!
                </h2>
            </div>
        )
    },
    // Story Intro
    {
        id: 2,
        bg: 'bg-white',
        content: () => (
            <div className="text-center space-y-4 max-w-2xl text-gray-800">
                <h2 className="text-3xl text-brand-red font-bold">Halo, namaku Budi! 👋</h2>
                <p className="text-xl">Aku adalah seorang petugas pemadam kebakaran.</p>
                <p className="text-xl">Hari ini aku akan bertugas menjaga kota.</p>
                <div className="text-6xl my-4">🚒</div>
                <p className="text-xl font-bold text-brand-blue">Tapi, aku butuh bantuanmu untuk menghitung barang-barangku!</p>
            </div>
        )
    },
    // Q1: Breakfast
    {
        id: 3,
        type: 'question',
        question: "1. Sarapan Pagi 🍳",
        desc: "Sebelum berangkat, Budi harus sarapan.",
        visual: (
            <div className="flex gap-4 text-4xl bg-orange-100 p-6 rounded-xl">
                <div>🍞🍞 <span className="block text-sm text-gray-500">(2 Roti)</span></div>
                <span className="font-bold text-brand-orange">+</span>
                <div>🥚🥚 <span className="block text-sm text-gray-500">(2 Telur)</span></div>
            </div>
        ),
        options: [
            { label: '3', correct: false },
            { label: '4', correct: true },
            { label: '5', correct: false },
        ]
    },
    // Q2: Uniform
    {
        id: 4,
        type: 'question',
        question: "2. Memakai Seragam 🧥",
        desc: "Budi memakai perlengkapannya.",
        visual: (
            <div className="flex gap-4 text-4xl bg-blue-100 p-6 rounded-xl">
                <div>🧥 <span className="block text-sm text-gray-500">(1 Jaket)</span></div>
                <span className="font-bold text-brand-orange">+</span>
                <div>👢👢 <span className="block text-sm text-gray-500">(2 Sepatu)</span></div>
            </div>
        ),
        options: [
            { label: '3', correct: true },
            { label: '4', correct: false },
            { label: '5', correct: false },
        ]
    },
    // Q3: Wheels
    {
        id: 5,
        type: 'question',
        question: "3. Cek Truk Pemadam 🚒",
        desc: "Budi mengecek roda truknya.",
        visual: (
            <div className="flex gap-4 text-4xl bg-gray-100 p-6 rounded-xl">
                <div>⚫⚫⚫ <span className="block text-sm text-gray-500">(3 Kiri)</span></div>
                <span className="font-bold text-brand-orange">+</span>
                <div>⚫⚫⚫ <span className="block text-sm text-gray-500">(3 Kanan)</span></div>
            </div>
        ),
        options: [
            { label: '5', correct: false },
            { label: '6', correct: true },
            { label: '7', correct: false },
        ]
    },
    // Q4: Team
    {
        id: 6,
        type: 'question',
        question: "4. Tim Budi Berkumpul 👨‍🚒",
        desc: "Teman-teman Budi mulai datang.",
        visual: (
            <div className="flex gap-4 text-4xl bg-yellow-100 p-6 rounded-xl">
                <div>👨‍🚒👨‍🚒👨‍🚒 <span className="block text-sm text-gray-500">(3 Teman)</span></div>
                <span className="font-bold text-brand-orange">+</span>
                <div>👨‍🚒👨‍🚒 <span className="block text-sm text-gray-500">(2 Teman)</span></div>
            </div>
        ),
        options: [
            { label: '4', correct: false },
            { label: '5', correct: true },
            { label: '6', correct: false },
        ]
    },
    // Q5: Traffic
    {
        id: 7,
        type: 'question',
        question: "5. Perjalanan ke Lokasi 🛣️",
        desc: "Banyak mobil minggir memberi jalan.",
        visual: (
            <div className="flex gap-4 text-4xl bg-red-100 p-6 rounded-xl">
                <div>🚗🚗🚗🚗 <span className="block text-sm text-gray-500">(4 Merah)</span></div>
                <span className="font-bold text-brand-orange">+</span>
                <div>🚙🚙🚙🚙 <span className="block text-sm text-gray-500">(4 Hijau)</span></div>
            </div>
        ),
        options: [
            { label: '7', correct: false },
            { label: '8', correct: true },
            { label: '9', correct: false },
        ]
    },
    // Ending
    {
        id: 18,
        content: ({ playSound }: { playSound: PlaySound }) => (
            <div className="text-center space-y-6">
                <h1 className="text-5xl text-brand-yellow font-bold">Hore! Hebat Sekali! 🎉</h1>
                <p className="text-xl">Kamu sudah membantu Budi menghitung semuanya.</p>
                <div className="text-9xl cursor-pointer" onClick={() => playSound('success')}>⭐</div>
                <Link to="/library" className="inline-block bg-white/10 px-8 py-3 rounded-full hover:bg-white/20 transition">
                    Kembali ke Pustaka 🏠
                </Link>
            </div>
        )
    }
];

export default function MathStory() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const { playSound } = useSound();

    const nextSlide = () => {
        playSound('click');
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(c => c + 1);
            setAnswered(false);
        }
    };

    const prevSlide = () => {
        playSound('click');
        if (currentSlide > 0) setCurrentSlide(c => c - 1);
    };

    const handleAnswer = (isCorrect: boolean) => {
        if (answered) return;
        setAnswered(true);
        if (isCorrect) {
            playSound('success');
            setScore(s => s + 1);
        } else {
            playSound('click'); // Or error sound
        }
    };

    const slide = slides[currentSlide];

    return (
        <MediaShell
            title={`Petualangan Angka | Skor: ${score}`}
            currentSlide={currentSlide}
            totalSlides={slides.length}
            bgClass={slide.bg || 'bg-brand-blue'}
            onSoundToggle={() => playSound('click')}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`w-full max-w-4xl bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center min-h-[50vh] text-gray-800`}
                >
                    {slide.type === 'question' ? (
                        <div className="text-center w-full">
                            <h2 className="text-3xl font-bold mb-2 text-brand-blue">{slide.question}</h2>
                            <p className="text-lg text-gray-500 mb-8">{slide.desc}</p>

                            <div className="mb-10 flex justify-center">
                                {slide.visual}
                            </div>

                            <div className="flex justify-center gap-6">
                                {slide.options?.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(opt.correct)}
                                        disabled={answered}
                                        className={`
                                                relative w-24 h-24 rounded-2xl text-4xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center
                                                ${answered
                                                ? (opt.correct ? 'bg-green-500 text-white' : 'bg-gray-200 opacity-50')
                                                : 'bg-white border-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
                                            }
                                            `}
                                    >
                                        {answered && opt.correct && <CheckCircle className="absolute -top-3 -right-3 text-green-500 bg-white rounded-full w-8 h-8" />}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Narrative Slide
                        // @ts-expect-error: Content is dynamic
                        slide.content({ playSound })
                    )}
                </motion.div>
            </AnimatePresence>

            <GameControls
                onNext={nextSlide}
                onPrev={prevSlide}
                canNext={slide.type !== 'question' || answered}
                canPrev={currentSlide > 0}
                nextLabel={currentSlide === 0 ? 'Mulai' : 'Lanjut'}
            />
        </MediaShell>
    );
}
