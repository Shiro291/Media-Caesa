import { motion, AnimatePresence } from 'framer-motion';

interface PlaceValueChartProps {
    value: number;
}

export default function PlaceValueChart({ value }: PlaceValueChartProps) {
    const tens = Math.floor(value / 10);
    const units = value % 10;

    return (
        <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center p-6 sm:p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden">
            {/* Background decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />

            {/* Tens Container */}
            <div className="flex-1 flex flex-col items-center gap-6 bg-emerald-50/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-emerald-100 shadow-inner z-10 transition-colors duration-300">
                <div className="text-center space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-wide">Puluhan</h3>
                    <div className="inline-block px-4 py-1 bg-emerald-200 text-emerald-800 rounded-full font-bold text-xl shadow-sm">
                        {tens}
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4 min-h-[200px] sm:min-h-[250px] w-full p-2">
                    <AnimatePresence>
                        {Array.from({ length: tens }).map((_, i) => (
                            <motion.div
                                key={`ten-${i}`}
                                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                className="w-6 sm:w-8 h-40 sm:h-48 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm shadow-lg border border-emerald-700 flex flex-col-reverse divide-y divide-emerald-500/40 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} className="flex-1 w-full bg-white/10" />
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Units Container */}
            <div className="flex-1 flex flex-col items-center gap-6 bg-orange-50/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-orange-100 shadow-inner z-10 transition-colors duration-300">
                <div className="text-center space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-orange-700 tracking-wide">Satuan</h3>
                    <div className="inline-block px-4 py-1 bg-orange-200 text-orange-800 rounded-full font-bold text-xl shadow-sm">
                        {units}
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3 min-h-[200px] sm:min-h-[250px] w-full max-w-[240px] content-end p-2 border-4 border-dashed border-orange-200/50 rounded-xl">
                    <AnimatePresence>
                        {Array.from({ length: units }).map((_, i) => (
                            <motion.div
                                key={`unit-${i}`}
                                initial={{ opacity: 0, y: -20, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-sm shadow-md border border-orange-600 transform hover:scale-110 hover:-rotate-6 transition-all duration-200 cursor-pointer"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
