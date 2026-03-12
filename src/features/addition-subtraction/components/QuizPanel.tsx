import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { getDynamicFontSize } from './utils';

interface QuizPanelProps {
    score: number;
    quizQuestion: { a: number; b: number; op: '+' | '-' };
    userAnswer: string;
    feedback: 'correct' | 'wrong' | null;
    setUserAnswer: (v: string) => void;
    checkAnswer: () => void;
    generateQuestion: () => void;
}

const QuizPanel = ({
    score, quizQuestion, userAnswer, feedback, setUserAnswer, checkAnswer, generateQuestion
}: QuizPanelProps) => {
    return (
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
    );
};

export default React.memo(QuizPanel);
