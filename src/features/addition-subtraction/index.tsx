import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, Maximize2, X } from 'lucide-react';
import MediaShell from '../../components/layout/MediaShell';
import MathArena3D from '../../components/features/MathArena3D';
import { useSound } from '../../hooks/useSound';

export default function AdditionSubtraction() {
    const [num1, setNum1] = useState(5);
    const [num2, setNum2] = useState(3);
    const [mode, setMode] = useState<'addition' | 'subtraction'>('addition');
    const { playSound } = useSound();

    const result = mode === 'addition' ? num1 + num2 : num1 - num2;

    const [phase, setPhase] = useState<'separate' | 'merging'>('separate');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleModeChange = (newMode: 'addition' | 'subtraction') => {
        setMode(newMode);
        setPhase('separate'); // Reset phase on mode change
        playSound('click');
        if (newMode === 'subtraction' && num1 < num2) {
            setNum2(num1);
        }
    };

    const handleNum1Change = (val: number) => {
        setNum1(val);
        setPhase('separate');
        playSound('click');
        if (mode === 'subtraction' && val < num2) {
            setNum2(val);
        }
    };

    const handleNum2Change = (val: number) => {
        if (mode === 'subtraction' && val > num1) return;
        setNum2(val);
        setPhase('separate');
        playSound('click');
    };

    const [showQuiz, setShowQuiz] = useState(false);
    const [quizQuestion, setQuizQuestion] = useState({ a: 0, b: 0, op: '+' as '+' | '-' });
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = useState(0);

    const getDynamicFontSize = (val: string | number, isQuiz = false) => {
        const len = String(val).length;
        if (isQuiz) {
            if (len >= 6) return 'text-[clamp(0.8rem,2vw,1.5rem)]';
            if (len >= 4) return 'text-[clamp(1rem,3vw,2.5rem)]';
            if (len >= 3) return 'text-[clamp(1.2rem,4vw,3rem)]';
            return 'text-[clamp(2rem,6vw,5.5rem)]';
        }
        if (len >= 6) return 'text-[clamp(0.8rem,2vw,2rem)]';
        if (len >= 4) return 'text-[clamp(1.2rem,3vw,3rem)]';
        if (len >= 3) return 'text-[clamp(1.5rem,4vw,4rem)]';
        return 'text-[clamp(2rem,5vw,5.5rem)]';
    };

    const generateQuestion = useCallback(() => {
        const op = Math.random() > 0.5 ? '+' : '-';
        let a, b;
        if (op === '+') {
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
        } else {
            a = Math.floor(Math.random() * 15) + 5;
            b = Math.floor(Math.random() * a) + 1;
        }
        setQuizQuestion({ a, b, op });
        setUserAnswer('');
        setFeedback(null);
        setPhase('separate');
    }, []);

    const checkAnswer = () => {
        const correct = quizQuestion.op === '+' ? quizQuestion.a + quizQuestion.b : quizQuestion.a - quizQuestion.b;
        if (parseInt(userAnswer) === correct) {
            setFeedback('correct');
            setScore(s => s + 10);
            playSound('success');
            setPhase('merging');
            setTimeout(() => generateQuestion(), 1500);
        } else {
            setFeedback('wrong');
            playSound('error');
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const handleShowQuiz = (val: boolean) => {
        setShowQuiz(val);
        setPhase('separate');
        playSound('click');
        if (val) generateQuestion();
    };

    return (
        <MediaShell
            title="Penambahan & Pengurangan"
            bgClass={mode === 'addition' ? 'bg-emerald-50' : 'bg-rose-50'}
            currentSlide={0}
            totalSlides={1}
            onSoundToggle={() => playSound('click')}
        >
            <div className="w-full max-w-6xl px-4 flex flex-col gap-4 items-center pt-28 pb-12 min-h-screen overflow-x-hidden scale-90 md:scale-95 origin-top">
                
                {/* Mode Header */}
                <div className="flex gap-4 mb-2 z-10">
                    <button 
                        onClick={() => handleShowQuiz(false)}
                        className={`px-8 py-2 rounded-full font-bold transition-all shadow-md ${!showQuiz ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                    >
                        Belajar
                    </button>
                    <button 
                        onClick={() => handleShowQuiz(true)}
                        className={`px-8 py-2 rounded-full font-bold transition-all shadow-md ${showQuiz ? 'bg-orange-500 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                    >
                        Kuis Tantangan
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-start relative">
                    {/* Left Column: Interactive Controls or Quiz Question */}
                    <div className="w-full relative min-h-[500px] z-10">
                        <AnimatePresence mode="wait" initial={false}>
                            {!showQuiz ? (
                                <motion.div 
                                    key="learning-controls-panel"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border-4 border-white shadow-2xl relative">
                                        <div className="flex flex-nowrap items-center justify-between w-full">
                                            <motion.div 
                                                animate={{ scale: [0.95, 1] }}
                                                className={`w-[24%] max-w-[8rem] aspect-square flex items-center justify-center bg-white rounded-2xl md:rounded-3xl shadow-lg border-4 border-slate-100 font-black text-slate-800 font-baloo ${getDynamicFontSize(num1)}`}
                                            >
                                                {num1}
                                            </motion.div>
                                            
                                            <motion.div
                                                animate={{ rotate: mode === 'addition' ? 0 : 180 }}
                                                className="w-[10%] flex items-center justify-center text-sky-400"
                                            >
                                                {mode === 'addition' ? <Plus className="w-8 h-8 md:w-16 md:h-16" strokeWidth={5} /> : <Minus className="w-8 h-8 md:w-16 md:h-16" strokeWidth={5} />}
                                            </motion.div>

                                            <motion.div 
                                                animate={{ scale: [0.95, 1] }}
                                                className={`w-[24%] max-w-[8rem] aspect-square flex items-center justify-center bg-white rounded-2xl md:rounded-3xl shadow-lg border-4 border-slate-100 font-black text-slate-800 font-baloo ${getDynamicFontSize(num2)}`}
                                            >
                                                {num2}
                                            </motion.div>

                                            <div className="w-[10%] flex items-center justify-center text-slate-300 text-[clamp(2rem,5vw,4.5rem)] font-black font-baloo px-1">=</div>

                                            <motion.div
                                                animate={{ scale: [0.9, 1.1, 1] }}
                                                className={`w-[28%] max-w-[9rem] aspect-square flex items-center justify-center bg-orange-400 text-white rounded-2xl md:rounded-3xl shadow-xl border-4 border-orange-500 font-black font-baloo ${getDynamicFontSize(result)}`}
                                            >
                                                {result}
                                            </motion.div>
                                        </div>

                                        <div className="space-y-8 mt-4 bg-white/40 p-6 rounded-3xl border border-white/20 shadow-inner">
                                            <div className="space-y-4">
                                                <div className="flex justify-between text-base font-black text-slate-600 uppercase tracking-widest px-2">
                                                    <span>Angka Pertama</span>
                                                    <span className="bg-sky-400 text-white px-4 py-1 rounded-full shadow-md">{num1} / 20</span>
                                                </div>
                                                <input 
                                                    type="range" min="1" max="20" step="1"
                                                    value={num1}
                                                    onChange={(e) => handleNum1Change(parseInt(e.target.value))}
                                                    className="w-full h-4 bg-slate-200 rounded-2xl appearance-none cursor-pointer accent-sky-400 shadow-inner border-2 border-white"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between text-base font-black text-slate-600 uppercase tracking-widest px-2">
                                                    <span>Angka Kedua</span>
                                                    <span className="bg-orange-400 text-white px-4 py-1 rounded-full shadow-md">{num2} / {mode === 'addition' ? '20' : num1}</span>
                                                </div>
                                                <input 
                                                    type="range" min="1" max={mode === 'addition' ? 20 : num1} step="1"
                                                    value={num2}
                                                    onChange={(e) => handleNum2Change(parseInt(e.target.value))}
                                                    className="w-full h-4 bg-slate-200 rounded-2xl appearance-none cursor-pointer accent-orange-400 shadow-inner border-2 border-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-4">
                                            <button 
                                                onClick={() => handleModeChange('addition')}
                                                className={`flex-1 py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all border-b-4 ${mode === 'addition' ? 'bg-teal-400 text-white border-teal-600 shadow-lg -translate-y-1' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                                            >
                                                <Plus /> TAMBAH
                                            </button>
                                            <button 
                                                onClick={() => handleModeChange('subtraction')}
                                                className={`flex-1 py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all border-b-4 ${mode === 'subtraction' ? 'bg-rose-400 text-white border-rose-600 shadow-lg -translate-y-1' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                                            >
                                                <Minus /> KURANG
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {phase === 'separate' ? (
                                                <motion.button
                                                    key="btn-merge"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    onClick={() => {
                                                        setPhase('merging');
                                                        playSound('success');
                                                    }}
                                                    className="w-full py-5 mt-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-[30px] font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-b-4 border-black/20"
                                                >
                                                    LIHAT HASILNYA! ↓
                                                </motion.button>
                                            ) : (
                                                <motion.button
                                                    key="btn-reset"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    onClick={() => setPhase('separate')}
                                                    className="w-full py-5 mt-2 bg-slate-800 text-white rounded-[30px] font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                                                >
                                                    ULANGI LAGI
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="quiz-box"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[50px] border-4 border-white shadow-2xl w-full text-center space-y-8"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-black text-xl shadow-sm">SKOR: {score}</span>
                                        <button onClick={generateQuestion} className="p-3 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors border border-slate-100">
                                            <RotateCcw className="text-slate-400" />
                                        </button>
                                    </div>

                                    <h2 className="text-3xl font-black text-slate-400 uppercase tracking-widest">Berapa Hasilnya?</h2>
                                    
                                    <div className="flex flex-nowrap items-center justify-between w-full">
                                        <span className={`w-[22%] flex justify-center font-black text-slate-800 font-baloo ${getDynamicFontSize(quizQuestion.a, true)}`}>{quizQuestion.a}</span>
                                        <span className={`w-[12%] flex justify-center text-orange-500 font-black font-baloo ${getDynamicFontSize(quizQuestion.op, true)}`}>{quizQuestion.op}</span>
                                        <span className={`w-[22%] flex justify-center font-black text-slate-800 font-baloo ${getDynamicFontSize(quizQuestion.b, true)}`}>{quizQuestion.b}</span>
                                        <span className="w-[12%] flex justify-center text-slate-300 text-[clamp(2rem,5vw,4.5rem)] font-black font-baloo">=</span>
                                        <div className="relative w-[32%] max-w-[12rem] aspect-square">
                                            <input 
                                                type="number"
                                                value={userAnswer}
                                                onChange={(e) => setUserAnswer(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                                                autoFocus
                                                placeholder="?"
                                                className={`w-full h-full text-center bg-slate-100 rounded-2xl md:rounded-3xl border-4 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all font-black font-baloo text-slate-800 ${getDynamicFontSize(userAnswer || "?", true)} ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : feedback === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`}
                                            />
                                            {feedback === 'correct' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-emerald-500 text-white p-2 md:p-3 rounded-full shadow-lg text-sm md:text-xl z-20">✅</motion.div>}
                                            {feedback === 'wrong' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-rose-500 text-white p-2 md:p-3 rounded-full shadow-lg text-sm md:text-xl z-20">❌</motion.div>}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={checkAnswer}
                                        disabled={!userAnswer}
                                        className="w-full py-6 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white rounded-3xl font-black text-3xl shadow-xl transition-all border-b-8 border-orange-700 active:border-b-0 active:translate-y-2"
                                    >
                                        JAWAB SEKARANG!
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Persistent Arena */}
                    <div className={`w-full flex flex-col gap-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center' : ''}`}>
                        <div className={`w-full bg-white/40 p-2 shadow-2xl overflow-hidden relative group/arena transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFullscreen ? 'h-full max-w-7xl mx-auto rounded-[50px] border-8 border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_0_100px_rgba(56,189,248,0.2)]' : 'h-[400px] md:h-[500px] rounded-[40px] border-4 border-white'}`}>
                            
                            {/* Fullscreen Toggle */}
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className={`absolute top-6 left-6 p-4 rounded-2xl shadow-xl backdrop-blur-md transition-all z-20 font-black flex items-center gap-3 tracking-wider ${isFullscreen ? 'bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700 hover:scale-105 active:scale-95' : 'bg-white/90 hover:bg-white text-slate-800 border-b-4 border-slate-200 hover:scale-105 group'}`}
                                title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                            >
                                {isFullscreen ? (
                                    <>
                                        <X size={24} className="transition-transform" strokeWidth={3} /> 
                                        <span>TUTUP</span>
                                    </>
                                ) : (
                                    <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
                                )}
                            </button>
                            <MathArena3D 
                                num1={!showQuiz ? num1 : quizQuestion.a}
                                num2={!showQuiz ? num2 : quizQuestion.b}
                                mode={!showQuiz ? mode : (quizQuestion.op === '+' ? 'addition' : 'subtraction')}
                                phase={phase}
                            />
                        </div>

                </div>
            </div>
        </div>

            <style>{`
                .font-baloo { font-family: 'Baloo 2', cursive; }
            `}</style>
        </MediaShell>
    );
}
