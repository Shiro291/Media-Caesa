import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const questions = [
    // 1. Pictogram (Mangoes)
    {
        q: "Perhatikan data berikut!\nJika satu gambar mangga mewakili 3 buah mangga, berapa banyak mangga yang dimiliki Rio?",
        visual: (
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center gap-4 border-b py-2">
                    <span className="w-20 font-bold text-gray-800">Rio</span>
                    <div className="flex gap-1 text-2xl">
                        <span>🥭</span><span>🥭</span><span>🥭</span><span>🥭</span>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 bg-yellow-50 p-2 rounded inline-block">
                    ℹ️ 🥭 = 3 buah mangga
                </div>
            </div>
        ),
        opts: ["4", "7", "12", "15"],
        ans: 2, // 4 * 3 = 12
        explanation: "Benar! Ada 4 gambar mangga. 4 x 3 = 12 buah mangga."
    },

    // 2. Bar Chart (Professions) - Based on textbook image
    {
        q: "Perhatikan diagram batang Profesi Orang Tua Siswa berikut.\nBerapa banyak orang tua yang berprofesi sebagai PNS?",
        visual: (() => {
            const data = [
                { name: 'PNS', value: 8 },
                { name: 'TNI', value: 5 },
                { name: 'Petani', value: 12 },
                { name: 'Guru', value: 6 },
                { name: 'Wiraswasta', value: 4 }
            ];
            return (
                <div className="bg-white p-4 rounded-lg h-64">
                    <p className="text-center text-sm font-bold text-gray-700 mb-2">Data Profesi Orang Tua Siswa</p>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0, 14]} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#9333EA" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        })(),
        opts: ["5", "8", "10", "12"],
        ans: 1, // 8
        explanation: "Tepat! Batang untuk PNS menunjukkan angka 8."
    },

    // 3. Bar Chart Logic (Most Frequent)
    {
        q: "Berdasarkan diagram sebelumnya, profesi apa yang PALING BANYAK dilakukan orang tua siswa?",
        visual: (() => {
            const data = [
                { name: 'PNS', value: 8 },
                { name: 'TNI', value: 5 },
                { name: 'Petani', value: 12 },
                { name: 'Guru', value: 6 },
                { name: 'Wiraswasta', value: 4 }
            ];
            return (
                <div className="bg-white p-4 rounded-lg h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0, 14]} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#9333EA" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        })(),
        opts: ["PNS", "Petani", "TNI", "Guru"],
        ans: 1, // Petani
        explanation: "Benar! Batang 'Petani' adalah yang paling tinggi."
    },

    // 4. Data Table (Min Value)
    {
        q: "Perhatikan tabel 'Warna Kesukaan' berikut.\nWarna apa yang paling sedikit disukai siswa?",
        visual: (
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Warna</th>
                            <th className="px-4 py-3 text-center">Jumlah Siswa</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr><td className="px-4 py-2 text-gray-800">Merah</td><td className="px-4 py-2 text-center text-gray-800">10</td></tr>
                        <tr><td className="px-4 py-2 text-gray-800">Kuning</td><td className="px-4 py-2 text-center text-gray-800">7</td></tr>
                        <tr className="bg-green-50"><td className="px-4 py-2 text-gray-800">Hijau</td><td className="px-4 py-2 text-center font-bold text-gray-800">15</td></tr>
                        <tr><td className="px-4 py-2 text-gray-800">Hitam</td><td className="px-4 py-2 text-center font-bold text-red-600">4</td></tr>
                    </tbody>
                </table>
            </div>
        ),
        opts: ["Kuning", "Hitam", "Merah", "Hijau"],
        ans: 1, // Hitam (4)
        explanation: "Benar! Hitam hanya disukai 4 siswa, paling sedikit dibanding warna lain."
    },

    // 5. Pictogram Calculation
    {
        q: "Rahma memiliki koleksi buku seperti pada gambar.\nJika satu buku mewakili 5 buku, berapa total buku Rahma?",
        visual: (
            <div className="bg-blue-50 p-6 rounded-xl border-dashed border-2 border-blue-200">
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {/* 7 books */}
                    {[...Array(7)].map((_, i) => (
                        <span key={i} className="text-3xl filter drop-shadow-sm">📘</span>
                    ))}
                </div>
                <div className="text-center bg-white py-1 px-3 rounded-full text-xs font-bold text-blue-600 inline-block">
                    Keterangan: 📘 = 5 buku
                </div>
            </div>
        ),
        opts: ["7", "12", "30", "35"],
        ans: 3, // 7 * 5 = 35
        explanation: "Tepat! 7 gambar buku x 5 = 35 buku."
    },

    // 6. Bar Chart (Lomba) - Based on textbook image 2
    {
        q: "Berapa selisih siswa yang mengikuti lomba Matematika dan Bahasa Inggris?",
        visual: (() => {
            const data = [
                { name: 'Matematika', value: 15 },
                { name: 'IPA', value: 8 },
                { name: 'B. Inggris', value: 12 },
                { name: 'Puisi', value: 5 },
                { name: 'P. Umum', value: 10 }
            ];
            const colors = ['#3B82F6', '#9CA3AF', '#818CF8', '#FCD34D', '#60A5FA'];
            return (
                <div className="bg-white p-4 rounded-lg h-64">
                    <p className="text-center text-sm font-bold text-gray-700 mb-2">Data Siswa yang Mengikuti Lomba</p>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                            <YAxis domain={[0, 16]} />
                            <Tooltip />
                            <Bar dataKey="value">
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        })(),
        opts: ["2 siswa", "3 siswa", "5 siswa", "8 siswa"],
        ans: 1, // 15 - 12 = 3
        explanation: "Benar! Matematika (15) - Bahasa Inggris (12) = 3 siswa."
    },

    // 7. Bar Chart (Harvest) - Reading Value
    {
        q: "Berapa kuintal hasil panen Singkong Desa Jaya Makmur?",
        visual: (() => {
            const data = [
                { name: 'Jagung', value: 25 },
                { name: 'Cabai', value: 15 },
                { name: 'Singkong', value: 20 },
                { name: 'Bawang', value: 10 }
            ];
            // Using different colors but not highlighting the specific answer row specially
            const colors = ['#FDBA74', '#F87171', '#D97706', '#D8B4FE'];
            return (
                <div className="bg-white p-4 rounded-lg h-64">
                    <p className="text-center text-sm font-bold text-gray-700 mb-2">Hasil Panen Desa Jaya Makmur</p>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0, 30]} />
                            <Tooltip />
                            <Bar dataKey="value">
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        })(),
        opts: ["15 kuintal", "20 kuintal", "25 kuintal", "30 kuintal"],
        ans: 1, // 20
        explanation: "Tepat! Batang untuk Singkong menunjukkan angka 20."
    },

    // 8. Bar Chart (Visitors) - Max Value
    {
        q: "Berdasarkan diagram, pada hari apa jumlah pengunjung objek wisata PALING BANYAK?",
        visual: (() => {
            const data = [
                { name: 'Ming', value: 95 },
                { name: 'Sen', value: 60 },
                { name: 'Sel', value: 50 },
                { name: 'Rab', value: 80 },
                { name: 'Kam', value: 70 },
                { name: 'Jum', value: 35 },
                { name: 'Sab', value: 100 }
            ];
            return (
                <div className="bg-white p-4 rounded-lg h-64">
                    <p className="text-center text-sm font-bold text-gray-700 mb-2">Jumlah Pengunjung Objek Wisata</p>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        })(),
        opts: ["Ahad/Minggu", "Rabu", "Jumat", "Sabtu"],
        ans: 3, // Sabtu
        explanation: "Benar! Batang hari Sabtu paling tinggi (1000 pengunjung)."
    },

    // 9. Data Table (Weight)
    {
        q: "Perhatikan tabel 'Berat Badan Siswa Kls IV' berikut.\nBerapa banyak siswa yang memiliki berat badan 39 kg?",
        visual: (
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm text-center">
                    <thead className="bg-purple-100 text-purple-900 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-r border-purple-200">Berat (kg)</th>
                            <th className="px-4 py-2">Banyak Siswa</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        <tr><td className="py-2 border-r text-gray-800">35</td><td className="text-gray-800">15</td></tr>
                        <tr><td className="py-2 border-r text-gray-800">37</td><td className="text-gray-800">10</td></tr>
                        <tr><td className="py-2 border-r text-gray-800">38</td><td className="text-gray-800">4</td></tr>
                        <tr><td className="py-2 border-r text-gray-800">39</td><td className="text-gray-800">13</td></tr>
                        <tr><td className="py-2 border-r text-gray-800">40</td><td className="text-gray-800">8</td></tr>
                    </tbody>
                </table>
            </div>
        ),
        opts: ["4 siswa", "8 siswa", "13 siswa", "15 siswa"],
        ans: 2, // 13
        explanation: "Benar! Lihat baris 39 kg, jumlah siswanya adalah 13."
    },

    // 10. Pictogram (Flowers) - Scale 10
    {
        q: "Diagram berikut menunjukkan data bunga di taman.\nJika satu gambar bunga mewakili 10 tangkai, berapa jumlah bunga Mawar?",
        visual: (
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-bold text-gray-800">Anggrek</span>
                        <div className="flex text-xl">🌸🌸🌸</div>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-bold text-gray-800">Mawar</span>
                        <div className="flex text-xl">🌹🌹🌹🌹</div>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-xs font-bold text-gray-800">Melati</span>
                        <div className="flex text-xl">🌼🌼🌼</div>
                    </div>
                </div>
                <div className="mt-3 text-[10px] text-center font-bold text-green-800 bg-green-200 rounded py-1">
                    Keterangan: 1 Gambar = 10 Tangkai
                </div>
            </div>
        ),
        opts: ["4 tangkai", "14 tangkai", "40 tangkai", "44 tangkai"],
        ans: 2, // 4 * 10 = 40
        explanation: "Tepat! Ada 4 gambar mawar. 4 x 10 = 40 tangkai."
    }
];

export default function QuizSection() {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const { playSound } = useSound();

    const currentQ = questions[qIndex];

    const handleAnswer = (optIndex: number) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(optIndex);

        if (optIndex === currentQ.ans) {
            playSound('success');
            setScore((s: number) => s + 1);
        } else {
            playSound('click');
        }

        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex((i: number) => i + 1);
                setSelectedOpt(null);
            } else {
                setIsFinished(true);
                playSound('success');
            }
        }, 2000);
    };

    if (isFinished) {
        return (
            <div className="text-center space-y-6 py-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-8xl"
                >
                    {score === questions.length ? '🏆' : score >= 7 ? '⭐' : '📚'}
                </motion.div>
                <h2 className="text-4xl font-bold text-brand-blue">Kuis Selesai!</h2>
                <div className="text-6xl font-black text-brand-orange">
                    {score} / {questions.length}
                </div>
                <p className="text-xl text-gray-600">
                    {score === questions.length
                        ? "Sempurna! Kamu menguasai statistik!"
                        : score >= 7
                            ? "Hebat! Kamu sudah paham statistik!"
                            : "Bagus! Coba belajar lagi ya!"}
                </p>
                <button
                    onClick={() => {
                        setQIndex(0);
                        setScore(0);
                        setSelectedOpt(null);
                        setIsFinished(false);
                    }}
                    className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition"
                >
                    Ulangi Kuis
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Soal {qIndex + 1} dari {questions.length}
                </h2>
                <div className="text-lg font-semibold text-brand-blue">
                    Skor: {score}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                        <p className="text-xl font-semibold text-gray-800 whitespace-pre-line mb-4">
                            {currentQ.q}
                        </p>
                        {currentQ.visual && (
                            <div className="my-6">
                                {currentQ.visual}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.opts.map((opt, idx) => {
                            let statusClass = 'bg-white border-2 border-gray-200 hover:border-brand-blue text-gray-700';

                            if (selectedOpt !== null) {
                                if (idx === currentQ.ans) {
                                    statusClass = 'bg-green-500 text-white border-green-500 shadow-lg';
                                } else if (idx === selectedOpt) {
                                    statusClass = 'bg-red-500 text-white border-red-500';
                                } else {
                                    statusClass = 'bg-gray-50 text-gray-400 border-transparent';
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selectedOpt !== null}
                                    className={`relative p-4 rounded-xl text-lg font-semibold transition-all ${statusClass} ${selectedOpt === null ? 'hover:scale-[1.02]' : ''
                                        }`}
                                >
                                    {selectedOpt !== null && idx === currentQ.ans && (
                                        <CheckCircle className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full" size={24} />
                                    )}
                                    {selectedOpt !== null && idx === selectedOpt && idx !== currentQ.ans && (
                                        <XCircle className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full" size={24} />
                                    )}
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {selectedOpt !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl ${selectedOpt === currentQ.ans ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'
                                }`}
                        >
                            <p className="font-semibold">{currentQ.explanation}</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
