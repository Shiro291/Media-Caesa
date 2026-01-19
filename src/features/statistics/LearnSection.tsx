import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        title: "Rata-Rata (Mean) 🧮",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Rata-rata</strong> adalah hasil pembagian jumlah semua data dengan banyaknya data.
                </p>
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh: Nilai Ulangan</p>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="mb-2">Nilai 5 siswa: <span className="font-bold text-2xl">7, 8, 6, 9, 10</span></p>
                        <div className="border-t pt-3 mt-3">
                            <p className="text-lg">Jumlah = 7 + 8 + 6 + 9 + 10 = <strong className="text-brand-orange">40</strong></p>
                            <p className="text-lg">Banyak data = <strong className="text-brand-orange">5</strong> siswa</p>
                            <p className="text-2xl font-bold text-brand-blue mt-3">Rata-rata = 40 ÷ 5 = 8 ✓</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">💡 Rumus: Rata-rata = Jumlah semua data ÷ Banyak data</p>
                </div>
            </div>
        )
    },
    {
        title: "Median (Nilai Tengah) 🎯",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Median</strong> adalah nilai yang berada di tengah setelah data diurutkan.
                </p>
                <div className="bg-blue-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh: Tinggi Badan (cm)</p>
                    <div className="bg-white p-4 rounded-lg space-y-3">
                        <p>Data awal: <span className="font-bold">140, 135, 145, 138, 142</span></p>
                        <p className="text-brand-orange font-semibold">Langkah 1: Urutkan dari kecil ke besar</p>
                        <p className="text-2xl font-bold">135, 138, <span className="text-brand-blue bg-yellow-200 px-2">140</span>, 142, 145</p>
                        <p className="text-2xl font-bold text-brand-blue mt-3">Median = 140 cm ✓</p>
                        <p className="text-sm text-gray-600 italic">Nilai tengah adalah data ke-3 dari 5 data</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Modus (Mode) 🏆",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Modus</strong> adalah nilai yang <strong>paling sering muncul</strong> dalam data.
                </p>
                <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh: Warna Favorit</p>
                    <div className="bg-white p-4 rounded-lg space-y-3">
                        <p>Data: Merah, Biru, <span className="font-bold text-brand-orange">Merah</span>, Hijau, <span className="font-bold text-brand-orange">Merah</span>, Biru</p>
                        <div className="grid grid-cols-3 gap-3 my-4">
                            <div className="bg-red-100 p-3 rounded-lg text-center">
                                <p className="font-bold">🔴 Merah</p>
                                <p className="text-3xl font-black text-brand-red">3</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg text-center">
                                <p className="font-bold">🔵 Biru</p>
                                <p className="text-3xl font-black">2</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg text-center">
                                <p className="font-bold">🟢 Hijau</p>
                                <p className="text-3xl font-black">1</p>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-brand-blue">Modus = Merah ✓</p>
                        <p className="text-sm text-gray-600 italic">Merah muncul paling banyak (3 kali)</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Jangkauan (Range) 📏",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Jangkauan</strong> adalah selisih antara nilai terbesar dan nilai terkecil.
                </p>
                <div className="bg-orange-50 p-6 rounded-xl space-y-4">
                    <p className="text-lg font-semibold">Contoh: Skor Game</p>
                    <div className="bg-white p-4 rounded-lg space-y-3">
                        <p className="text-xl">Skor: <span className="font-bold">50, 75, 60, 90, 55</span></p>
                        <div className="border-t pt-3 mt-3">
                            <p className="text-lg">Nilai terbesar = <strong className="text-green-600">90</strong></p>
                            <p className="text-lg">Nilai terkecil = <strong className="text-red-600">50</strong></p>
                            <p className="text-2xl font-bold text-brand-blue mt-3">Jangkauan = 90 - 50 = 40 ✓</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">💡 Rumus: Jangkauan = Nilai terbesar - Nilai terkecil</p>
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
                            <div className="bg-blue-500 w-16 rounded-t-lg" style={{ height: '168px' }}></div>
                            <span className="text-2xl">🐶</span>
                            <span className="text-sm font-semibold">Anjing</span>
                            <span className="text-xs text-gray-600">6</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-orange-500 w-16 rounded-t-lg" style={{ height: '112px' }}></div>
                            <span className="text-2xl">🐱</span>
                            <span className="text-sm font-semibold">Kucing</span>
                            <span className="text-xs text-gray-600">4</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-green-500 w-16 rounded-t-lg" style={{ height: '56px' }}></div>
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
        title: "Diagram Garis 📈",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Diagram Garis</strong> menunjukkan perubahan data dari waktu ke waktu menggunakan garis.
                </p>
                <div className="bg-blue-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold mb-4">Contoh: Suhu Harian (°C)</p>
                    <div className="bg-white p-4 rounded-lg h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { hari: 'Sen', suhu: 28 },
                                { hari: 'Sel', suhu: 32 },
                                { hari: 'Rab', suhu: 30 },
                                { hari: 'Kam', suhu: 34 },
                                { hari: 'Jum', suhu: 31 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hari" />
                                <YAxis domain={[20, 35]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="suhu" stroke="#3B82F6" strokeWidth={3} name="Suhu (°C)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-4">
                        💡 Garis naik = suhu meningkat, Garis turun = suhu menurun
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Diagram Lingkaran (Pie Chart) 🥧",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Diagram Lingkaran</strong> menunjukkan bagian dari keseluruhan dalam bentuk lingkaran.
                </p>
                <div className="bg-green-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold mb-4">Contoh: Hobi Siswa (20 siswa)</p>
                    <div className="bg-white p-4 rounded-lg h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Membaca', value: 8, percent: '40%' },
                                        { name: 'Olahraga', value: 6, percent: '30%' },
                                        { name: 'Gaming', value: 6, percent: '30%' }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ${entry.value} (${entry.percent})`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    <Cell fill="#EF4444" />
                                    <Cell fill="#3B82F6" />
                                    <Cell fill="#10B981" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-4">
                        💡 Semakin besar bagian, semakin banyak jumlahnya!
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Tabel Data 📋",
        content: (
            <div className="space-y-6">
                <p className="text-xl text-gray-700">
                    <strong className="text-brand-blue">Tabel</strong> adalah cara menyajikan data dalam bentuk baris dan kolom.
                </p>
                <div className="bg-yellow-50 p-6 rounded-xl">
                    <p className="text-lg font-semibold mb-4">Contoh: Nilai Siswa</p>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-brand-blue text-white">
                                <tr>
                                    <th className="p-3 text-left">Nama</th>
                                    <th className="p-3 text-center">Matematika</th>
                                    <th className="p-3 text-center">IPA</th>
                                    <th className="p-3 text-center">Bahasa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3">Andi</td>
                                    <td className="p-3 text-center font-bold">85</td>
                                    <td className="p-3 text-center font-bold">90</td>
                                    <td className="p-3 text-center font-bold">88</td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3">Budi</td>
                                    <td className="p-3 text-center font-bold">90</td>
                                    <td className="p-3 text-center font-bold">85</td>
                                    <td className="p-3 text-center font-bold">92</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Citra</td>
                                    <td className="p-3 text-center font-bold">88</td>
                                    <td className="p-3 text-center font-bold">92</td>
                                    <td className="p-3 text-center font-bold">90</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-4">
                        💡 Tabel memudahkan kita membandingkan data!
                    </p>
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
