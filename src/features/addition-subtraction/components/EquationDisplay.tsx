import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { getDynamicFontSize } from './utils';

export default function EquationDisplay({ num1, num2, result, mode }: { num1: number, num2: number, result: number, mode: 'addition' | 'subtraction' }) {
    return (
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
    );
}
