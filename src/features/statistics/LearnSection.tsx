import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        title: "Apa itu Statistik? 📊",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Statistik</strong> adalah ilmu yang mempelajari cara mengumpulkan, mengolah, dan menyajikan data.
                </p>
                <div className="bg-blue-50 p-6 rounded-xl">
                    <p className="text-lg">
                        Contoh: Menghitung berapa banyak siswa yang suka buah apel di kelasmu!
                    </p>
                    <div className="text-6xl mt-4">🍎📊</div>
                </div>
            </div>
        )
    },
    {
        title: "Populasi 👥",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Populasi</strong> adalah <strong>seluruh</strong> anggota dari kelompok yang ingin kita pelajari.
                </p>
                <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh Populasi:</p>
                    <ul className="space-y-2 text-lg">
                        <li>✅ Semua siswa di sekolahmu</li>
                        <li>✅ Semua pohon di taman</li>
                        <li>✅ Semua ikan di akuarium</li>
                    </ul>
                    <div className="text-6xl mt-4">👨‍🎓👩‍🎓👨‍🎓👩‍🎓👨‍🎓👩‍🎓</div>
                    <p className="text-sm text-gray-600 italic">Ini adalah SEMUA siswa (populasi)</p>
                </div>
            </div>
        )
    },
    {
        title: "Sampel 🎯",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-orange">Sampel</strong> adalah <strong>sebagian</strong> dari populasi yang kita pilih untuk dipelajari.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh Sampel:</p>
                    <ul className="space-y-2 text-lg">
                        <li>✅ Siswa kelas 4A saja (dari semua siswa)</li>
                        <li>✅ 10 pohon yang dipilih (dari semua pohon)</li>
                        <li>✅ 5 ikan yang diukur (dari semua ikan)</li>
                    </ul>
                    <div className="text-6xl mt-4">👨‍🎓👩‍🎓👨‍🎓</div>
                    <p className="text-sm text-gray-600 italic">Ini adalah SEBAGIAN siswa (sampel)</p>
                </div>
            </div>
        )
    },
    {
        title: "Perbedaan Populasi & Sampel 🔍",
        content: (
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-6 rounded-xl">
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Populasi</h3>
                        <p className="text-lg mb-2">= SEMUA anggota</p>
                        <div className="text-5xl my-4">🍎🍎🍎🍎🍎🍎🍎🍎</div>
                        <p className="text-sm text-gray-600">8 apel (semua)</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl">
                        <h3 className="text-2xl font-bold text-brand-orange mb-4">Sampel</h3>
                        <p className="text-lg mb-2">= SEBAGIAN anggota</p>
                        <div className="text-5xl my-4">🍎🍎🍎</div>
                        <p className="text-sm text-gray-600">3 apel (sebagian)</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Piktogram 🎨",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Piktogram</strong> adalah diagram yang menggunakan gambar atau simbol untuk menunjukkan data.
                </p>
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh: Buah Favorit Siswa</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Apel:</span>
                            <span className="text-4xl">🍎🍎🍎🍎🍎</span>
                            <span className="text-gray-600">(5 siswa)</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pisang:</span>
                            <span className="text-4xl">🍌🍌🍌</span>
                            <span className="text-gray-600">(3 siswa)</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Jeruk:</span>
                            <span className="text-4xl">🍊🍊🍊🍊🍊🍊🍊</span>
                            <span className="text-gray-600">(7 siswa)</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-4">
                        💡 Setiap gambar = 1 siswa
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Cara Membaca Piktogram 👀",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    Untuk membaca piktogram, <strong>hitung jumlah gambar</strong> pada setiap baris!
                </p>
                <div className="bg-blue-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Olahraga Favorit:</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="w-32 font-semibold">Sepak Bola:</span>
                            <span className="text-4xl">⚽⚽⚽⚽⚽⚽</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-32 font-semibold">Basket:</span>
                            <span className="text-4xl">🏀🏀🏀🏀</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-32 font-semibold">Voli:</span>
                            <span className="text-4xl">🏐🏐</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg mt-4">
                        <p className="font-semibold text-brand-blue">Pertanyaan: Berapa siswa suka basket?</p>
                        <p className="text-2xl font-bold text-brand-orange mt-2">Jawaban: 4 siswa ✓</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Diagram Batang 📊",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Diagram Batang</strong> menggunakan batang (persegi panjang) untuk menunjukkan data.
                </p>
                <div className="bg-purple-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold mb-4">Contoh: Hewan Peliharaan</p>
                    <div className="flex items-end justify-around h-64 bg-white p-4 rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-blue-500 w-16 rounded-t-lg" style={{ height: '60%' }}></div>
                            <span className="text-2xl">🐶</span>
                            <span className="text-sm font-semibold">Anjing</span>
                            <span className="text-xs text-gray-600">6</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-orange-500 w-16 rounded-t-lg" style={{ height: '40%' }}></div>
                            <span className="text-2xl">🐱</span>
                            <span className="text-sm font-semibold">Kucing</span>
                            <span className="text-xs text-gray-600">4</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-green-500 w-16 rounded-t-lg" style={{ height: '20%' }}></div>
                            <span className="text-2xl">🐟</span>
                            <span className="text-sm font-semibold">Ikan</span>
                            <span className="text-xs text-gray-600">2</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-4">
                        💡 Semakin tinggi batang, semakin banyak jumlahnya!
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Cara Membaca Diagram Batang 👀",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    Untuk membaca diagram batang, lihat <strong>tinggi batang</strong> dan cocokkan dengan angka di samping!
                </p>
                <div className="bg-green-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold mb-4">Nilai Ulangan Matematika:</p>
                    <div className="flex items-end justify-around h-72 bg-white p-6 rounded-lg relative">
                        {/* Y-axis labels */}
                        <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-6">
                            <span>10</span>
                            <span>8</span>
                            <span>6</span>
                            <span>4</span>
                            <span>2</span>
                            <span>0</span>
                        </div>

                        <div className="flex items-end justify-around w-full pl-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-red-500 w-20 rounded-t-lg" style={{ height: '80%' }}></div>
                                <span className="text-sm font-semibold">Senin</span>
                                <span className="text-xs text-gray-600">8 siswa</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-blue-500 w-20 rounded-t-lg" style={{ height: '60%' }}></div>
                                <span className="text-sm font-semibold">Selasa</span>
                                <span className="text-xs text-gray-600">6 siswa</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-green-500 w-20 rounded-t-lg" style={{ height: '100%' }}></div>
                                <span className="text-sm font-semibold">Rabu</span>
                                <span className="text-xs text-gray-600">10 siswa</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg mt-4">
                        <p className="font-semibold text-brand-blue">Pertanyaan: Hari apa paling banyak siswa dapat nilai bagus?</p>
                        <p className="text-2xl font-bold text-brand-orange mt-2">Jawaban: Rabu (10 siswa) ✓</p>
                    </div>
                </div>
            </div>
        )
    }
];

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
