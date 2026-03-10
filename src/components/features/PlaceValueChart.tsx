import { motion, AnimatePresence } from 'framer-motion';

interface PlaceValueChartProps {
    value: number;
}

export default function PlaceValueChart({ value }: PlaceValueChartProps) {
    const hundreds = Math.floor(value / 100);
    const tens = Math.floor((value % 100) / 10);
    const units = value % 10;

    return (
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center p-4 sm:p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden">
            {/* Background decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -ml-32 -mb-20 w-64 h-64 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />

            {/* Hundreds Container */}
            <div className="flex-1 flex flex-col items-center gap-4 bg-sky-50/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-sky-100 shadow-inner z-10 transition-colors duration-300">
                <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-sky-700 tracking-wide">Ratusan</h3>
                    <div className="inline-block px-3 py-1 bg-sky-200 text-sky-800 rounded-full font-bold text-lg sm:text-xl shadow-sm">
                        {hundreds}
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2 min-h-[140px] sm:min-h-[160px] w-full p-2">
                    <AnimatePresence>
                        {Array.from({ length: hundreds }).map((_, i) => (
                            <motion.div
                                key={`hundred-${i}`}
                                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                className="w-16 sm:w-20 h-24 sm:h-32 bg-gradient-to-br from-sky-500 to-sky-400 rounded-md shadow-lg border border-sky-600 grid grid-cols-10 grid-rows-10 gap-0 transform hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden p-0.5"
                            >
                                {Array.from({ length: 100 }).map((_, j) => (
                                    <div key={j} className="bg-white/10 border border-sky-600/30 w-full h-full" />
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Tens Container */}
            <div className="flex-1 flex flex-col items-center gap-4 bg-emerald-50/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-emerald-100 shadow-inner z-10 transition-colors duration-300">
                <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-700 tracking-wide">Puluhan</h3>
                    <div className="inline-block px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full font-bold text-lg sm:text-xl shadow-sm">
                        {tens}
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2 min-h-[140px] sm:min-h-[160px] w-full p-2">
                    <AnimatePresence>
                        {Array.from({ length: tens }).map((_, i) => (
                            <motion.div
                                key={`ten-${i}`}
                                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                className="w-4 sm:w-5 h-24 sm:h-32 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm shadow-md border border-emerald-700 flex flex-col-reverse divide-y divide-emerald-500/40 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
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
            <div className="flex-1 flex flex-col items-center gap-4 bg-orange-50/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-orange-100 shadow-inner z-10 transition-colors duration-300">
                <div className="text-center space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-orange-700 tracking-wide">Satuan</h3>
                    <div className="inline-block px-3 py-1 bg-orange-200 text-orange-800 rounded-full font-bold text-lg sm:text-xl shadow-sm">
                        {units}
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-center gap-1.5 sm:gap-2 min-h-[140px] sm:min-h-[160px] w-full max-w-[200px] content-end p-2 border-2 sm:border-4 border-dashed border-orange-200/50 rounded-xl">
                    <AnimatePresence>
                        {Array.from({ length: units }).map((_, i) => (
                            <motion.div
                                key={`unit-${i}`}
                                initial={{ opacity: 0, y: -20, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-sm shadow-sm border border-orange-600 transform hover:scale-110 hover:-rotate-6 transition-all duration-200 cursor-pointer"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
