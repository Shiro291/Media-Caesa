import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowRight } from 'lucide-react';

const mediaList = [
    {
        id: 'firefighter-story',
        title: 'Budi si Pemadam',
        type: 'Cerita',
        age: 'TK B',
        desc: 'Ikuti petualangan Budi memadamkan api! Cerita interaktif dengan suara.',
        img: '/assets/firefighter/character.png',
        link: '/firefighter',
        color: 'red'
    },
    {
        id: 'math-story',
        title: 'Petualangan Angka',
        type: 'Matematika',
        age: 'TK B',
        desc: 'Bantu Budi menghitung peralatan sebelum bertugas!',
        img: '/assets/firefighter/character.png', // Reusing asset for now, ideal to have specific one
        link: '/math-story',
        color: 'blue'
    },
    {
        id: 'firefighter-quiz',
        title: 'Kuis Pemadam',
        type: 'Kuis',
        age: 'TK B',
        desc: 'Uji kemampuan berhitungmu dengan 15 soal seru!',
        img: '/assets/firefighter/character.png',
        link: '/quiz',
        color: 'orange'
    },
    {
        id: 'simple-quiz',
        title: 'Kuis Warna & Bentuk',
        type: 'Kuis',
        age: 'TK B',
        desc: 'Belajar mengenal warna dan bentuk dengan 10 soal seru!',
        img: '/assets/firefighter/character.png',
        link: '/simple-quiz',
        color: 'purple'
    },
    {
        id: 'statistics',
        title: 'Belajar Statistik',
        type: 'Pembelajaran',
        age: 'Kelas 4 SD',
        desc: 'Pelajari populasi, sampel, piktogram, dan diagram batang dengan cara yang menyenangkan!',
        img: '/assets/firefighter/character.png',
        link: '/statistics',
        color: 'indigo'
    }
];

export default function MediaLibrary() {
    const [filter, setFilter] = useState('');

    const filteredMedia = mediaList.filter(m =>
        m.title.toLowerCase().includes(filter.toLowerCase()) ||
        m.type.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-6 md:p-12">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition">
                        <Home size={20} /> Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">
                        Pustaka Media
                    </h1>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari cerita atau permainan..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMedia.map((media) => (
                    <Link
                        key={media.id}
                        to={media.link}
                        className="group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-brand-blue hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className={`h-48 relative overflow-hidden bg-brand-bg flex items-center justify-center p-6 bg-${media.color}-100`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <img
                                src={media.img}
                                alt={media.title}
                                className="h-full object-contain transform group-hover:scale-110 transition duration-500"
                            />
                            <span className={`absolute top-4 right-4 bg-${media.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                                {media.type}
                            </span>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-blue transition">{media.title}</h3>
                            <p className="text-gray-400 mb-6 line-clamp-2 text-sm">
                                {media.desc}
                            </p>
                            <div className="flex items-center gap-2 text-brand-blue font-bold group-hover:gap-4 transition-all">
                                Mainkan <ArrowRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Coming Soon Placeholder */}
                <div className="opacity-50 border-2 border-dashed border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 text-gray-600">
                    <div className="text-4xl">🚀</div>
                    <p>Lebih banyak media akan segera hadir!</p>
                </div>
            </div>

        </div>
    );
}
