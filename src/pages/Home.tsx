import { Link } from 'react-router-dom';
import { Play, Rocket, Calculator } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-brand-orange selection:text-white">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">
                        MeCa
                    </div>
                    <nav className="hidden md:flex gap-8 text-gray-400">
                        <a href="#" className="hover:text-white transition">Beranda</a>
                        <a href="#media" className="hover:text-white transition">Media</a>
                        <a href="#" className="hover:text-white transition">Tentang</a>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Belajar itu <span className="text-brand-orange">Seru!</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    Platform edukasi interaktif untuk anak-anak Indonesia. Jelajahi cerita, permainan, dan petualangan seru.
                </p>
                <a href="#media" className="inline-flex items-center gap-2 bg-brand-blue px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition shadow-lg shadow-blue-500/20">
                    <Play fill="currentColor" /> Mulai Belajar
                </a>
            </section>

            {/* Media Grid */}
            <section id="media" className="py-20 bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Pustaka Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Firefighter Card */}
                        <div className="group bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-brand-red/50 transition duration-500 hover:shadow-2xl hover:shadow-red-900/20">
                            <div className="relative h-48 bg-brand-bg flex items-center justify-center p-6 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <img
                                    src="/assets/firefighter/character.png"
                                    alt="Budi"
                                    className="h-full object-contain transform group-hover:scale-110 transition duration-500"
                                />
                                <span className="absolute top-4 right-4 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    BARU
                                </span>
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">TK B</span>
                                    <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full">Cerita</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition">Budi si Pemadam</h3>
                                <p className="text-gray-400 mb-6 line-clamp-2">
                                    Ikuti petualangan Budi memadamkan api! Cerita interaktif dengan suara dan animasi.
                                </p>
                                <Link
                                    to="/firefighter"
                                    className="block w-full text-center bg-gray-800 hover:bg-brand-red py-3 rounded-xl font-bold transition-colors"
                                >
                                    Mainkan Sekarang
                                </Link>
                            </div>
                        </div>

                        {/* Coming Soon Card */}
                        <div className="opacity-50 grayscale hover:grayscale-0 transition duration-500 bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 p-8 flex flex-col items-center justify-center text-center gap-6">
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
                                <Rocket className="text-gray-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Segera Hadir</h3>
                                <p className="text-gray-500">Modul pembelajaran baru sedang dibuat.</p>
                            </div>
                        </div>

                        {/* Coming Soon Card 2 */}
                        <div className="opacity-50 grayscale hover:grayscale-0 transition duration-500 bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 p-8 flex flex-col items-center justify-center text-center gap-6">
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
                                <Calculator className="text-gray-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Matematika Seru</h3>
                                <p className="text-gray-500">Nantikan update selanjutnya!</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center text-gray-600 border-t border-gray-800 mt-20">
                <p>&copy; 2026 MeCa (Media Caesa). Built with React & Vite.</p>
            </footer>
        </div>
    );
}
