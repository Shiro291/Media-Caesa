import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import MediaShell from '../../components/layout/MediaShell';
import MathArena3D from '../../components/features/MathArena3D';
import { useSound } from '../../hooks/useSound';
import LearningPanel from './components/LearningPanel';
import QuizPanel from './components/QuizPanel';

export default function AdditionSubtraction() {
    const [num1, setNum1] = useState(5);
    const [num2, setNum2] = useState(3);
    const [mode, setMode] = useState<'addition' | 'subtraction'>('addition');
    const { playSound } = useSound();

    const result = mode === 'addition' ? num1 + num2 : num1 - num2;

    const [phase, setPhase] = useState<'separate' | 'merging'>('separate');
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    // NEW: Interactive Subtraction Tracking
    const [removedIds, setRemovedIds] = useState<number[]>([]);
    const [shakeValidateBox, setShakeValidateBox] = useState(false);

    const resetArena = () => {
        setPhase('separate');
        setRemovedIds([]);
    };

    const handleModeChange = (newMode: 'addition' | 'subtraction') => {
        setMode(newMode);
        resetArena();
        playSound('click');
        if (newMode === 'subtraction' && num1 < num2) {
            setNum2(num1);
        }
    };

    const handleNum1Change = (val: number) => {
        setNum1(val);
        resetArena();
        playSound('click');
        if (mode === 'subtraction' && val < num2) {
            setNum2(val);
        }
    };

    const handleNum2Change = (val: number) => {
        if (mode === 'subtraction' && val > num1) return;
        setNum2(val);
        resetArena();
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
        resetArena();
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
        resetArena();
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
                                <LearningPanel 
                                    num1={num1}
                                    num2={num2}
                                    mode={mode}
                                    result={result}
                                    phase={phase}
                                    removedIds={removedIds}
                                    shakeValidateBox={shakeValidateBox}
                                    handleNum1Change={handleNum1Change}
                                    handleNum2Change={handleNum2Change}
                                    handleModeChange={handleModeChange}
                                    setPhase={setPhase}
                                    setRemovedIds={setRemovedIds}
                                    setShakeValidateBox={setShakeValidateBox}
                                    playSound={playSound}
                                    resetArena={resetArena}
                                />
                            ) : (
                                <QuizPanel 
                                    score={score}
                                    quizQuestion={quizQuestion}
                                    userAnswer={userAnswer}
                                    feedback={feedback}
                                    setUserAnswer={setUserAnswer}
                                    checkAnswer={checkAnswer}
                                    generateQuestion={generateQuestion}
                                />
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
                                removedIds={removedIds}
                                onToggleBall={(id) => {
                                    setRemovedIds(prev => 
                                        prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
                                    )
                                }}
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
