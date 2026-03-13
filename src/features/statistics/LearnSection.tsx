import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from './data/learnSlides';

export default function LearnSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(c => c + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(c => c - 1);
        }
    };

    const slide = slides[currentSlide];

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{slide.title}</h2>
                    <div className="text-gray-700">{slide.content}</div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                    <ChevronLeft size={20} />
                    Sebelumnya
                </button>

                <span className="text-sm text-gray-500">
                    {currentSlide + 1} / {slides.length}
                </span>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-brand-blue hover:bg-blue-600 text-white"
                >
                    Selanjutnya
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
