import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import EquationDisplay from './EquationDisplay';
import type { SoundType } from '../../../hooks/useSound';

interface LearningPanelProps {
    num1: number;
    num2: number;
    mode: 'addition' | 'subtraction';
    result: number;
    phase: 'separate' | 'merging';
    removedIds: number[];
    shakeValidateBox: boolean;
    handleNum1Change: (v: number) => void;
    handleNum2Change: (v: number) => void;
    handleModeChange: (m: 'addition' | 'subtraction') => void;
    setPhase: (p: 'separate' | 'merging') => void;
    setRemovedIds: (ids: number[] | []) => void;
    setShakeValidateBox: (b: boolean) => void;
    playSound: (s: SoundType) => void;
    resetArena: () => void;
}

export default function LearningPanel({
    num1, num2, mode, result, phase, removedIds, shakeValidateBox,
    handleNum1Change, handleNum2Change, handleModeChange,
    setPhase, setRemovedIds, setShakeValidateBox, playSound, resetArena
}: LearningPanelProps) {
    return (
        <motion.div 
            key="learning-controls-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
        >
            <div className="flex flex-col gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-[40px] border-4 border-white shadow-2xl relative">
                <EquationDisplay num1={num1} num2={num2} result={result} mode={mode} />

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
                        mode === 'addition' ? (
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
                            <motion.div
                                key="btn-validate"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1, x: shakeValidateBox ? [-10, 10, -10, 10, 0] : 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: shakeValidateBox ? 0.4 : 0.2 }}
                                className="w-full mt-2 flex flex-col gap-3"
                            >
                                <div className={`p-4 rounded-2xl border-2 text-center text-slate-600 font-bold ${shakeValidateBox ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-sky-50 border-sky-100'}`}>
                                    {shakeValidateBox ? 'Wah, jumlahnya belum tepat! Coba lagi.' : `Pencet ${num2} bola untuk dikurangkan!`}
                                </div>
                                <button
                                    onClick={() => {
                                        if (removedIds.length === num2) {
                                            setPhase('merging');
                                            playSound('success');
                                        } else {
                                            playSound('error');
                                            setShakeValidateBox(true);
                                            setTimeout(() => setShakeValidateBox(false), 500);
                                            setTimeout(() => setRemovedIds([]), 1000);
                                        }
                                    }}
                                    className="w-full py-5 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-[30px] font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-b-4 border-black/20"
                                >
                                    KIRIM JAWABAN
                                </button>
                            </motion.div>
                        )
                    ) : (
                        <motion.button
                            key="btn-reset"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={resetArena}
                            className="w-full py-5 mt-2 bg-slate-800 text-white rounded-[30px] font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            ULANGI LAGI
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
