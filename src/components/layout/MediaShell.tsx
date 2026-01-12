import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, Volume2 } from 'lucide-react';

interface MediaShellProps {
    children: ReactNode;
    title?: string;
    bgClass?: string;
    currentSlide?: number;
    totalSlides?: number;
    onSoundToggle?: () => void;
}

export default function MediaShell({
    children,
    title,
    bgClass = 'bg-gray-900',
    currentSlide,
    totalSlides,
    onSoundToggle
}: MediaShellProps) {
    return (
        <div className={`fixed inset-0 w-full h-full flex flex-col transition-colors duration-500 overflow-hidden ${bgClass}`}>

            {/* Top Bar - Z-Index High to stay above content */}
            <div className="absolute top-0 left-0 right-0 p-4 z-50 flex justify-between items-center pointer-events-none">

                {/* Left: Home */}
                <Link
                    to="/library"
                    className="pointer-events-auto bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition shadow-lg text-white group"
                >
                    <Home size={28} className="group-hover:scale-110 transition-transform" />
                </Link>

                {/* Center: Title or Progress */}
                <div className="bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-3">
                    {title && <span className="text-white font-bold hidden md:inline">{title}</span>}
                    {currentSlide !== undefined && totalSlides && (
                        <span className="text-white font-mono text-lg">
                            {currentSlide + 1} <span className="text-white/50">/</span> {totalSlides}
                        </span>
                    )}
                </div>

                {/* Right: Sound / Actions */}
                <div className="flex gap-2 pointer-events-auto">
                    {onSoundToggle && (
                        <button
                            onClick={onSoundToggle}
                            className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition shadow-lg text-white group"
                        >
                            <Volume2 size={28} className="group-hover:scale-110 transition-transform transform group-active:rotate-12" />
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative w-full h-full flex items-center justify-center">
                {children}
            </div>

        </div>
    );
}
