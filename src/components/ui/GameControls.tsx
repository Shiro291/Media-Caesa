import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface GameControlsProps {
    onNext?: () => void;
    onPrev?: () => void;
    canNext?: boolean;
    canPrev?: boolean;
    nextLabel?: string;
    prevLabel?: string;
    isFinished?: boolean;
    onRestart?: () => void;
}

export default function GameControls({
    onNext,
    onPrev,
    canNext = true,
    canPrev = true,
    nextLabel = 'Selanjutnya',
    prevLabel = 'Kembali',
    isFinished = false,
    onRestart
}: GameControlsProps) {

    // Floating container at the bottom
    return (
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 px-6 md:px-12 flex justify-between items-end pointer-events-none z-50">

            {/* Left Action (Prev) */}
            <div className="pointer-events-auto">
                {onPrev && (
                    <button
                        onClick={onPrev}
                        disabled={!canPrev}
                        className={`
                    flex items-center gap-2 px-6 py-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 shadow-xl
                    ${!canPrev ? 'opacity-0 scale-90 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60 text-white hover:scale-105 active:scale-95'}
                `}
                    >
                        <ArrowLeft size={24} />
                        <span className="hidden md:inline font-medium">{prevLabel}</span>
                    </button>
                )}
            </div>

            {/* Right Action (Next / Restart) */}
            <div className="pointer-events-auto">
                {isFinished && onRestart ? (
                    <button
                        onClick={onRestart}
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green text-white font-bold shadow-xl hover:scale-105 active:scale-95 hover:bg-green-600 transition-all"
                    >
                        <RotateCcw size={24} />
                        Main Lagi
                    </button>
                ) : (
                    onNext && (
                        <button
                            onClick={onNext}
                            disabled={!canNext}
                            className={`
                        flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-xl transition-all duration-300
                        ${!canNext ? 'opacity-50 grayscale cursor-not-allowed bg-gray-500' : 'bg-brand-blue text-white hover:bg-blue-600 hover:scale-105 active:scale-95 hover:shadow-blue-500/30'}
                    `}
                        >
                            <span className="font-medium">{nextLabel}</span>
                            <ArrowRight size={24} />
                        </button>
                    )
                )}
            </div>

        </div>
    );
}
