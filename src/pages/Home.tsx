import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function Home() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-brand-orange selection:text-white flex flex-col">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/meca_logo.png" alt="MeCa Logo" className="h-10 w-10 object-contain" />
                        <div className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">
                            MeCa
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8 text-gray-400">
                        <a href="#" className="text-white font-bold transition">Beranda</a>
                        <Link to="/library" className="hover:text-white transition">Pustaka Media</Link>
                        <button onClick={() => scrollToSection('tentang')} className="hover:text-white transition">Tentang</button>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
                <div className="mb-8 relative">
                    <div className="absolute -inset-4 bg-brand-blue rounded-full opacity-20 blur-3xl animate-pulse"></div>
                    <img src="/assets/firefighter/character.png" alt="Meca Mascot" className="relative h-48 md:h-64 object-contain animate-float" />
                </div>

                <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                    Belajar itu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Seru!</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Platform edukasi interaktif untuk anak-anak Indonesia.<br />
                    Jelajahi cerita, permainan, dan petualangan seru sekarang.
                </p>

                <div className="flex gap-6">
                    <Link
                        to="/library"
                        className="inline-flex items-center gap-3 bg-brand-blue px-10 py-5 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition shadow-lg shadow-blue-500/20 group"
                    >
                        <Play fill="currentColor" size={24} className="group-hover:translate-x-1 transition" />
                        Mulai Belajar
                    </Link>

                    <button
                        onClick={() => scrollToSection('tentang')}
                        className="hidden md:inline-flex items-center gap-3 bg-white/5 border border-white/10 px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition"
                    >
                        Pelajari Lebih Lanjut
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="tentang" className="py-20 bg-gray-800/50">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Tentang MeCa</h2>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                        <strong className="text-brand-blue">Media Caesa (MeCa)</strong> adalah platform edukasi interaktif yang dirancang khusus untuk anak-anak Indonesia.
                        Kami menyediakan berbagai media pembelajaran yang menyenangkan, edukatif, dan mudah digunakan.
                    </p>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        Setiap media pembelajaran dirancang dengan tema yang menarik dan interaktif,
                        membantu anak-anak belajar sambil bermain dengan pengalaman yang menyenangkan.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center border-t border-gray-800 bg-gray-900 z-10">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <img src="/meca_logo.png" alt="MeCa Logo" className="h-8 w-8 object-contain opacity-80" />
                        <span className="text-xl font-bold text-gray-300">MeCa</span>
                    </div>
                    <p className="text-gray-500 mb-2">Media Caesa - Platform Edukasi Anak Indonesia</p>
                    <p className="text-gray-600 text-sm">
                        © 2026 MeCa (Media Caesa). Built with React & Vite.
                    </p>
                </div>
            </footer>
        </div>
    );
}
