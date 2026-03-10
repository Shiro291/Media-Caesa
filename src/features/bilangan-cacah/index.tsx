import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaShell from '../../components/layout/MediaShell';
import PlaceValueChart from '../../components/features/PlaceValueChart';
import { useSound } from '../../hooks/useSound';
import { getNumberFact, placeValueData } from '../../data/bilanganCacah';
import { Link } from 'react-router-dom';

export default function BilanganCacah() {
    const [number, setNumber] = useState(1);
    const { playSound } = useSound();

    const handleNumberChange = (newVal: number) => {
        setNumber(newVal);
        const tensChanged = Math.floor(newVal / 10) !== Math.floor(number / 10);
        // Play success sound when hitting a new ten, otherwise normal click
        if (tensChanged && newVal !== 0) {
            playSound('success');
        } else {
            playSound('click');
        }
    };

    return (
        <MediaShell
            title={placeValueData.title}
            bgClass="bg-gradient-to-br from-sky-100 to-emerald-100"
            currentSlide={0}
            totalSlides={1}
            onSoundToggle={() => playSound('click')}
        >
            <div className="w-full max-w-5xl px-4 flex flex-col gap-6 md:gap-8 pb-12">

                {/* Header Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50 text-center space-y-2 mt-4"
                >
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
                        {placeValueData.intro}
                    </p>
                </motion.div>

                {/* Main Visualizer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <PlaceValueChart value={number} />
                </motion.div>

                {/* Advanced Interactive Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">

                        <div className="flex-1 w-full space-y-6">
                            <div className="flex justify-between text-emerald-700 font-bold mb-2 px-2">
                                <span>0</span>
                                <span>100</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={number}
                                onChange={(e) => handleNumberChange(Number(e.target.value))}
                                className="w-full appearance-none bg-gray-200 h-4 rounded-full outline-none focus:ring-4 focus:ring-emerald-500/30 overflow-hidden cursor-pointer thumb-emerald"
                            />

                            <div className="flex justify-center items-center gap-6 mt-6">
                                <button
                                    onClick={() => handleNumberChange(Math.max(0, number - 1))}
                                    className="w-16 h-16 rounded-full bg-red-100 text-red-600 font-bold text-3xl shadow-md hover:bg-red-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-red-500"
                                >
                                    -
                                </button>
                                <div className="text-center min-w-[120px]">
                                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 drop-shadow-sm">
                                        {number}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleNumberChange(Math.min(100, number + 1))}
                                    className="w-16 h-16 rounded-full bg-green-100 text-green-600 font-bold text-3xl shadow-md hover:bg-green-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-green-500"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Dynamics Fun Fact Display */}
                        <div className="md:w-1/3 w-full bg-blue-50/50 p-6 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-center min-h-[160px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 text-4xl opacity-10">💡</div>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={getNumberFact(number)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-xl text-blue-800 font-bold leading-relaxed z-10"
                                >
                                    {getNumberFact(number)}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                        <Link to="/bilangan-cacah-quiz" className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2">
                            Mulai Kuis Sekarang! 🚀
                        </Link>
                    </div>
                </motion.div>
            </div>
            {/* Custom CSS for slider */}
            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%; 
                    background: #10b981;
                    cursor: pointer;
                    box-shadow: 0 0 0 4px #fff, 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    border: 1px solid #059669;
                }
            `}</style>
        </MediaShell>
    );
}
