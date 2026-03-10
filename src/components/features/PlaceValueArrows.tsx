import { motion } from 'framer-motion';

interface PlaceValueArrowsProps {
    value: number;
}

export default function PlaceValueArrows({ value }: PlaceValueArrowsProps) {
    const chars = value.toString().split('');

    const allPlaces = [
        {
            label: 'Ratusan', short: 'Rts',
            colorClass: 'from-sky-500 to-blue-600',
            shadow: 'shadow-blue-200/50', border: 'border-blue-200',
            hex: '#0ea5e9' // sky-500 
        },
        {
            label: 'Puluhan', short: 'Plh',
            colorClass: 'from-orange-400 to-red-500',
            shadow: 'shadow-orange-200/50', border: 'border-orange-200',
            hex: '#f97316' // orange-500
        },
        {
            label: 'Satuan', short: 'Stn',
            colorClass: 'from-emerald-400 to-green-600',
            shadow: 'shadow-emerald-200/50', border: 'border-emerald-200',
            hex: '#10b981' // emerald-500
        }
    ];

    // Slice to get correct places
    const places = allPlaces.slice(3 - chars.length);

    // Calculate X position percentage
    const getXPosition = (index: number, count: number, spread: number) => {
        if (count === 1) return 50;
        const start = (100 - spread) / 2;
        return start + (index * (spread / (count - 1)));
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden w-full">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-2xl mx-auto h-[320px] sm:h-[360px] select-none">

                {/* SVG Curves connecting digits to boxes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                    <defs>
                        {places.map((place, i) => (
                            <marker
                                key={`marker-${i}`}
                                id={`arrow-${i}`}
                                viewBox="0 0 10 10"
                                refX="5" refY="10"
                                markerWidth="6" markerHeight="6"
                                orient="auto"
                            >
                                <path d="M 0 0 L 5 10 L 10 0 Z" fill={place.hex} />
                            </marker>
                        ))}
                    </defs>

                    {chars.map((char, i) => {
                        const digitSpread = chars.length === 3 ? 90 : chars.length === 2 ? 60 : 0;
                        const boxSpread = chars.length === 3 ? 60 : chars.length === 2 ? 40 : 0;

                        const startX = getXPosition(i, chars.length, digitSpread);
                        const endX = getXPosition(i, chars.length, boxSpread);

                        // Y positions roughly mapped to the container height
                        const startY = 90; // Just below the digit
                        const endY = 220; // Just above the box (adjusted for mobile/desktop below)

                        // Cubic bezier points to make a smooth S-curve down
                        const cp1X = startX;
                        const cp1Y = startY + (endY - startY) * 0.5;
                        const cp2X = endX;
                        const cp2Y = startY + (endY - startY) * 0.5;

                        return (
                            <motion.path
                                key={`path-${i}-${char}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 + (i * 0.2), ease: "easeOut" }}
                                d={`M ${startX}% ${startY} C ${cp1X}% ${cp1Y}, ${cp2X}% ${cp2Y}, ${endX}% ${endY}`}
                                fill="none"
                                stroke={places[i].hex}
                                strokeWidth="4"
                                strokeDasharray="8 8" // dashed line for fun style
                                markerEnd={`url(#arrow-${i})`}
                            />
                        );
                    })}
                </svg>

                {/* The Main Numbers (Top Row) */}
                {chars.map((char, i) => {
                    const digitSpread = chars.length === 3 ? 90 : chars.length === 2 ? 60 : 0;
                    const xPos = getXPosition(i, chars.length, digitSpread);

                    return (
                        <div
                            key={`digit-${i}-${char}`}
                            className="absolute top-0 flex justify-center -translate-x-1/2"
                            style={{ left: `${xPos}%` }}
                        >
                            <motion.div
                                className={`text-6xl sm:text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b ${places[i].colorClass} drop-shadow-sm text-center`}
                                initial={{ y: -30, opacity: 0, scale: 0.5 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.6, delay: i * 0.1 }}
                            >
                                {char}
                            </motion.div>
                        </div>
                    );
                })}

                {/* The Value Boxes (Bottom Row) */}
                {chars.map((char, i) => {
                    const boxSpread = chars.length === 3 ? 60 : chars.length === 2 ? 40 : 0;
                    const xPos = getXPosition(i, chars.length, boxSpread);

                    return (
                        <div
                            key={`box-${i}-${char}`}
                            className="absolute top-[230px] flex justify-center -translate-x-1/2 w-[110px] sm:w-[140px]"
                            style={{ left: `${xPos}%` }}
                        >
                            <motion.div
                                initial={{ y: 30, scale: 0.5, opacity: 0 }}
                                animate={{ y: 0, scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', bounce: 0.5, delay: 0.6 + i * 0.1 }}
                                className={`w-full flex flex-col items-center justify-center py-3 px-2 sm:py-4 bg-white rounded-2xl shadow-xl ${places[i].shadow} border-y-4 border-x-2 ${places[i].border}`}
                                whileHover={{ y: -5, scale: 1.05 }}
                            >
                                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                    <span className="hidden sm:inline">{places[i].label}</span>
                                    <span className="inline sm:hidden">{places[i].short}</span>
                                </span>

                                <span className={`text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${places[i].colorClass}`}>
                                    {char}{'0'.repeat(places.length - 1 - i)}
                                </span>
                            </motion.div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
