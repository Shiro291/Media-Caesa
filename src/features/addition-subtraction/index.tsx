import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import MediaShell from '../../components/layout/MediaShell';
import MathArena3D from '../../components/features/MathArena3D';
import { useSound } from '../../hooks/useSound';

export default function AdditionSubtraction() {
    const [num1, setNum1] = useState(5);
    const [num2, setNum2] = useState(3);
    const [mode, setMode] = useState<'addition' | 'subtraction'>('addition');
    const { playSound } = useSound();

    const result = mode === 'addition' ? num1 + num2 : num1 - num2;

    const handleModeChange = (newMode: 'addition' | 'subtraction') => {
        setMode(newMode);
        playSound('click');
        if (newMode === 'subtraction' && num1 < num2) {
            setNum2(num1);
        }
    };

    const handleNum1Change = (val: number) => {
        setNum1(val);
        playSound('click');
        if (mode === 'subtraction' && val < num2) {
            setNum2(val);
        }
    };

    const handleNum2Change = (val: number) => {
        if (mode === 'subtraction' && val > num1) return;
        setNum2(val);
        playSound('click');
    };

    const [showQuiz, setShowQuiz] = useState(false);
    const [quizQuestion, setQuizQuestion] = useState({ a: 0, b: 0, op: '+' as '+' | '-' });
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = useState(0);

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
    }, []);

    const checkAnswer = () => {
        const correct = quizQuestion.op === '+' ? quizQuestion.a + quizQuestion.b : quizQuestion.a - quizQuestion.b;
        if (parseInt(userAnswer) === correct) {
            setFeedback('correct');
            setScore(s => s + 10);
            playSound('success');
            setTimeout(() => generateQuestion(), 1500);
        } else {
            setFeedback('wrong');
            playSound('error');
        }
    };

    const handleShowQuiz = (val: boolean) => {
        setShowQuiz(val);
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
                <div className="flex gap-4 mb-2">
                    <button 
                        onClick={() => handleShowQuiz(false)}
                        className={`px-8 py-2 rounded-full font-bold transition-all ${!showQuiz ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                    >
                        Belajar
                    </button>
                    <button 
                        onClick={() => handleShowQuiz(true)}
                        className={`px-8 py-2 rounded-full font-bold transition-all ${showQuiz ? 'bg-orange-500 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                    >
                        Kuis Tantangan
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-start">
                    {/* Left Column: Interactive Controls or Quiz Question */}
                    <div className="w-full">
                        <AnimatePresence mode="popLayout">
                            {!showQuiz ? (
                                <motion.div 
                                    key="learning-controls"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border-4 border-white shadow-2xl relative">
                                        <div className="flex items-center justify-center gap-6 text-6xl md:text-8xl font-black text-slate-800 font-baloo">
                                            <motion.div 
                                                animate={{ scale: [0.95, 1] }}
                                                className="w-24 md:w-32 h-24 md:h-32 flex items-center justify-center bg-white rounded-3xl shadow-lg border-4 border-slate-100"
                                            >
                                                {num1}
                                            </motion.div>
                                            
                                            <motion.div
                                                animate={{ rotate: mode === 'addition' ? 0 : 180 }}
                                                className="text-sky-400"
                                            >
                                                {mode === 'addition' ? <Plus size={64} strokeWidth={4} /> : <Minus size={64} strokeWidth={4} />}
                                            </motion.div>

                                            <motion.div 
                                                animate={{ scale: [0.95, 1] }}
                                                className="w-24 md:w-32 h-24 md:h-32 flex items-center justify-center bg-white rounded-3xl shadow-lg border-4 border-slate-100"
                                            >
                                                {num2}
                                            </motion.div>

                                            <div className="text-slate-300">=</div>

                                            <motion.div
                                                animate={{ scale: [0.9, 1.1, 1] }}
                                                className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center bg-orange-400 text-white rounded-3xl shadow-xl border-4 border-orange-500"
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
                                    
                                    <div className="flex items-center justify-center gap-4 text-6xl md:text-8xl font-black text-slate-800 font-baloo">
                                        <span>{quizQuestion.a}</span>
                                        <span className="text-orange-500">{quizQuestion.op}</span>
                                        <span>{quizQuestion.b}</span>
                                        <span className="text-slate-300">=</span>
                                        <div className="relative">
                                            <input 
                                                type="number"
                                                value={userAnswer}
                                                onChange={(e) => setUserAnswer(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                                                autoFocus
                                                placeholder="?"
                                                className={`w-24 h-24 md:w-32 md:h-32 text-center bg-slate-100 rounded-3xl border-4 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : feedback === 'wrong' ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`}
                                            />
                                            {feedback === 'correct' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg">✅</motion.div>}
                                            {feedback === 'wrong' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg">❌</motion.div>}
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
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full h-[400px] md:h-[500px] bg-white/40 p-2 rounded-[40px] border-4 border-white shadow-xl overflow-hidden relative">
                            <MathArena3D 
                                count={!showQuiz ? result : (userAnswer === '' ? (quizQuestion.op === '+' ? quizQuestion.a + quizQuestion.b : quizQuestion.a - quizQuestion.b) : (parseInt(userAnswer) || 0))} 
                                color={!showQuiz ? (mode === 'addition' ? '#10b981' : '#f43f5e') : '#f97316'} 
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
