import { motion } from 'framer-motion';

interface PlaceValueArrowsProps {
    value: number;
}

export default function PlaceValueArrows({ value }: PlaceValueArrowsProps) {
    const chars = value.toString().split('');
    const allPlaces = [
        { label: 'Ratusan', short: 'Rts', color: 'from-sky-500 to-blue-600', shadow: 'shadow-blue-200/50', border: 'border-blue-100' },
        { label: 'Puluhan', short: 'Plh', color: 'from-orange-400 to-red-500', shadow: 'shadow-orange-200/50', border: 'border-orange-100' },
        { label: 'Satuan', short: 'Stn', color: 'from-emerald-400 to-green-600', shadow: 'shadow-emerald-200/50', border: 'border-emerald-100' }
    ];

    // Slice to get correct places. For 1 char, start at index 2 (Satuan). For 2 chars, start at 1 (Puluhan).
    const places = allPlaces.slice(3 - chars.length);

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden min-h-[220px] md:min-h-[280px]">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* The Main Number */}
            <div className="flex justify-center gap-4 sm:gap-8 md:gap-12 relative z-10 w-full mb-2">
                {chars.map((char, i) => (
                    <motion.div
                        key={`char-${i}-${char}`}
                        className={`text-6xl sm:text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b ${places[i].color} drop-shadow-sm flex-1 text-center`}
                        initial={{ y: -30, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.6, delay: i * 0.1 }}
                    >
                        {char}
                    </motion.div>
                ))}
            </div>

            {/* Vertical Arrows pointing down */}
            <div className="flex justify-center gap-4 sm:gap-8 md:gap-12 w-full mt-2 relative z-0">
                {chars.map((char, i) => (
                    <div key={`arrow-${i}-${char}`} className="flex-1 flex justify-center h-12 sm:h-16 md:h-20">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "100%", opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                            className="w-1.5 sm:w-2 bg-gradient-to-b from-gray-200 to-gray-400 relative rounded-full"
                        >
                            {/* Arrowhead */}
                            <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-0 h-0 
                                border-l-[8px] sm:border-l-[12px] border-l-transparent 
                                border-r-[8px] sm:border-r-[12px] border-r-transparent 
                                border-t-[10px] sm:border-t-[14px] border-t-gray-400"
                            />
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Labels and Values */}
            <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 mt-4 w-full relative z-10">
                {chars.map((char, i) => (
                    <motion.div
                        key={`label-${i}-${char}`}
                        initial={{ y: 30, scale: 0.5, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.4 + i * 0.1 }}
                        className={`flex-1 flex flex-col items-center justify-center py-3 px-2 sm:p-5 bg-white rounded-2xl shadow-xl ${places[i].shadow} border-2 ${places[i].border} max-w-[160px]`}
                        whileHover={{ y: -5, scale: 1.05 }}
                    >
                        <span className={`text-[10px] sm:text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${places[i].color} uppercase tracking-wider`}>
                            <span className="hidden sm:inline">{places[i].label}</span>
                            <span className="inline sm:hidden">{places[i].short}</span>
                        </span>

                        <span className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-800 mt-1">
                            {char}{'0'.repeat(places.length - 1 - i)}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
