import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import { Home, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-red animate-bounce">
                    👨‍🚒 Halo Teman-Teman!
                </h1>
                <img
                    src="/assets/firefighter/character.png"
                    alt="Budi Pemadam"
                    className="h-64 md:h-96 mx-auto drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => playSound('success')}
                />
                <h2 className="text-2xl md:text-3xl text-brand-orange font-medium">
                    Aku Budi, si Pemadam Kebakaran.
                </h2>
                <p className="text-gray-400 text-sm">(Klik Budi untuk menyapa!)</p>
            </div>
        )
    },
    {
        id: 2,
        bg: 'bg-gray-800',
        content: ({ playSound }: any) => (
            <div className="text-center space-y-8">
                <h2 className="text-3xl text-brand-yellow">Di Kantor Pemadam 🔥</h2>
                <div
                    className="text-8xl cursor-pointer animate-shake inline-block"
                    onClick={() => playSound('siren')}
                >
                    ☎️
                </div>
                <p className="text-2xl text-white bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <span className="text-brand-red font-bold cursor-pointer hover:underline" onClick={() => playSound('siren')}>Kring! Kring!</span> Ada telepon darurat!
                </p>
            </div>
        )
    },
    {
        id: 3,
        bg: 'bg-red-900', // Fire scene
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h1 className="text-5xl text-red-500 font-black tracking-widest animate-pulse">
                    KEBAKARAN!
                </h1>
                <div className="text-9xl animate-ping opacity-75">🚨</div>
                <p className="text-xl text-white">
                    Alarm berbunyi! <strong className="text-yellow-400 cursor-pointer" onClick={() => playSound('siren')}>NGUING! NGUING!</strong>
                </p>
            </div>
        )
    },
    {
        id: 4,
        content: ({ playSound }: any) => (
            <div className="text-center space-y-4">
                <h2 className="text-3xl text-brand-blue">Ayo Bersiap! 🧥</h2>
                <div className="flex justify-center gap-4">
                    <img src="/assets/firefighter/character.png" className="h-48" />
                </div>
                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                    <button className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition" onClick={() => playSound('click')}>
                        ⛑️ Pakai Helm
                    </button>
                    <button className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition" onClick={() => playSound('click')}>
                        🧥 Pakai Jaket
                    </button>
                    <button className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition" onClick={() => playSound('click')}>
                        👢 Pakai Sepatu Bot
                    </button>
                </div>
            </div>
        )
    },
    {
        id: 5,
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h2 className="text-3xl text-brand-red">Berangkat! 🚒</h2>
                <div
                    className="text-9xl cursor-pointer hover:translate-x-10 transition-transform duration-1000"
                    onClick={() => playSound('engine')}
                >
                    🚒
                </div>
                <button
                    className="bg-brand-blue px-8 py-3 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition"
                    onClick={() => playSound('engine')}
                >
                    Nyalakan Sirine! 🔊
                </button>
                <p className="text-xl italic">Wuuuuzzzz!</p>
            </div>
        )
    },
    {
        id: 6,
        bg: 'bg-orange-900',
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h2 className="text-4xl text-orange-400">Api Besar! 🔥</h2>
                <div className="flex justify-center gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="text-6xl animate-pulse cursor-pointer" onClick={() => playSound('fire')}>🔥</div>
                    ))}
                </div>
                <p className="text-xl">
                    Apinya panas sekali!<br />
                    Dengar suaranya... <span className="text-orange-300 font-bold italic" onClick={() => playSound('fire')}>Kretek kretek!</span>
                </p>
            </div>
        )
    },
    {
        id: 7,
        bg: 'bg-blue-900',
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h2 className="text-3xl text-blue-300">Semprotkan Air! 💦</h2>
                <div className="flex items-center justify-center gap-8">
                    <img src="/assets/firefighter/character.png" className="h-32" />
                    <div className="text-6xl">🚿</div>
                    <div className="text-4xl text-orange-500 animate-pulse">🔥</div>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white text-2xl px-10 py-6 rounded-3xl shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all"
                    onMouseDown={() => playSound('water')}
                    onMouseUp={() => playSound('click')}
                    onTouchStart={() => playSound('water')}
                >
                    💦 SEMPROT AIR! 💦
                </button>
                <p className="text-sm opacity-70">Tahan tombol untuk menyemprot!</p>
            </div>
        )
    },
    {
        id: 8,
        bg: 'bg-green-900',
        content: ({ playSound }: any) => (
            <div className="text-center space-y-6">
                <h2 className="text-4xl text-green-400">Api Padam! 💨</h2>
                <div className="text-8xl animate-pulse opacity-50">🌫️</div>
                <p className="text-xl">
                    Hore! Toko roti selamat.<br />
                    Terima kasih Budi!
                </p>
                <button
                    className="bg-green-600 px-6 py-2 rounded-full font-bold animate-bounce"
                    onClick={() => playSound('success')}
                >
                    Hore! 🎉
                </button>
            </div>
        )
    },
    {
        id: 9, // End
        content: () => (
            <div className="text-center space-y-6">
                <h1 className="text-5xl text-brand-red font-bold">TAMAT</h1>
                <div className="text-6xl">👋 🚒</div>
                <p className="text-xl">Ingat ya, jangan bermain api! 🔥❌</p>
                <Link to="/" className="inline-block bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20 transition">
                    Kembali ke Menu Utama 🏠
                </Link>
            </div>
        )
    }
];

export default function FirefighterStory() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { playSound, initAudio } = useSound();

    const nextSlide = () => {
        playSound('click');
        if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
    };

    const prevSlide = () => {
        playSound('click');
        if (currentSlide > 0) setCurrentSlide(c => c - 1);
    };

    // Init audio on mount interaction
    useEffect(() => {
        const handleInteract = () => initAudio();
        window.addEventListener('click', handleInteract, { once: true });
        return () => window.removeEventListener('click', handleInteract);
    }, [initAudio]);

    const CurrentContent = slides[currentSlide].content;


    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 ${currentSlide === 2 || currentSlide === 5 ? 'bg-black' : 'bg-gray-900'}`}>

            {/* Aspect Ratio Container for Presentation Feel */}
            <div className="relative w-full max-w-5xl aspect-video bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-700 flex flex-col">

                {/* Top Controls */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                    <Link to="/" className="pointer-events-auto bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/30 transition">
                        <Home size={24} />
                    </Link>
                    <div className="bg-black/50 px-4 py-1 rounded-full text-sm font-mono backdrop-blur">
                        {currentSlide + 1} / {slides.length}
                    </div>
                    <div className="pointer-events-auto bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/30 transition cursor-pointer" onClick={() => playSound('siren')}>
                        <Volume2 size={24} />
                    </div>
                </div>

                {/* Slide Content */}
                <div className={`flex-1 flex items-center justify-center relative overflow-hidden ${currentSlide === 0 ? 'bg-brand-bg' : ''}`}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${slides[currentSlide].bg || ''}`}
                        >
                            <CurrentContent playSound={playSound} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Nav */}
                <div className="h-20 bg-gray-900/50 backdrop-blur-md flex items-center justify-between px-8">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                        <ArrowLeft size={20} /> Sebelumnya
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-brand-blue hover:bg-blue-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg hover:shadow-blue-500/50"
                    >
                        {currentSlide === 0 ? 'Mulai Cerita' : 'Selanjutnya'} <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <p className="mt-4 text-gray-500 text-sm">Gunakan tombol panah untuk navigasi</p>
        </div>
    );
}
