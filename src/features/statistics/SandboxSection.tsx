import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

type DiagramType = 'pictogram' | 'bar';

export default function SandboxSection() {
    const [diagramType, setDiagramType] = useState<DiagramType>('pictogram');

    // Pictogram state
    const [pictogramData, setPictogramData] = useState({
        apel: 3,
        pisang: 2,
        jeruk: 4
    });

    // Bar chart state
    const [barData, setBarData] = useState({
        senin: 5,
        selasa: 7,
        rabu: 3,
        kamis: 6
    });

    const updatePictogram = (item: keyof typeof pictogramData, delta: number) => {
        setPictogramData(prev => ({
            ...prev,
            [item]: Math.max(0, Math.min(10, prev[item] + delta))
        }));
    };

    const updateBar = (day: keyof typeof barData, delta: number) => {
        setBarData(prev => ({
            ...prev,
            [day]: Math.max(0, Math.min(10, prev[day] + delta))
        }));
    };

    const resetPictogram = () => {
        setPictogramData({ apel: 3, pisang: 2, jeruk: 4 });
    };

    const resetBar = () => {
        setBarData({ senin: 5, selasa: 7, rabu: 3, kamis: 6 });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Latihan Membuat Diagram 🎨</h2>
                <p className="text-gray-600">Coba buat diagram sendiri! Tambah atau kurangi nilai untuk melihat perubahannya.</p>
            </div>

            {/* Diagram Type Selector */}
            <div className="flex gap-4">
                <button
                    onClick={() => setDiagramType('pictogram')}
                    className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${diagramType === 'pictogram'
                            ? 'bg-brand-orange text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📊 Piktogram
                </button>
                <button
                    onClick={() => setDiagramType('bar')}
                    className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${diagramType === 'bar'
                            ? 'bg-brand-blue text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📈 Diagram Batang
                </button>
            </div>

            {/* Pictogram Builder */}
            {diagramType === 'pictogram' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-brand-orange">Buah Favorit Siswa</h3>
                        <button
                            onClick={resetPictogram}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl space-y-6">
                        {/* Apel */}
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xl font-bold">🍎 Apel</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updatePictogram('apel', -1)}
                                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                        disabled={pictogramData.apel === 0}
                                    >
                                        <Minus size={20} className="text-red-600" />
                                    </button>
                                    <span className="text-2xl font-bold text-brand-orange w-12 text-center">
                                        {pictogramData.apel}
                                    </span>
                                    <button
                                        onClick={() => updatePictogram('apel', 1)}
                                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                        disabled={pictogramData.apel === 10}
                                    >
                                        <Plus size={20} className="text-green-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-5xl">
                                {'🍎'.repeat(pictogramData.apel)}
                            </div>
                        </div>

                        {/* Pisang */}
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xl font-bold">🍌 Pisang</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updatePictogram('pisang', -1)}
                                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                        disabled={pictogramData.pisang === 0}
                                    >
                                        <Minus size={20} className="text-red-600" />
                                    </button>
                                    <span className="text-2xl font-bold text-brand-orange w-12 text-center">
                                        {pictogramData.pisang}
                                    </span>
                                    <button
                                        onClick={() => updatePictogram('pisang', 1)}
                                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                        disabled={pictogramData.pisang === 10}
                                    >
                                        <Plus size={20} className="text-green-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-5xl">
                                {'🍌'.repeat(pictogramData.pisang)}
                            </div>
                        </div>

                        {/* Jeruk */}
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xl font-bold">🍊 Jeruk</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updatePictogram('jeruk', -1)}
                                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                        disabled={pictogramData.jeruk === 0}
                                    >
                                        <Minus size={20} className="text-red-600" />
                                    </button>
                                    <span className="text-2xl font-bold text-brand-orange w-12 text-center">
                                        {pictogramData.jeruk}
                                    </span>
                                    <button
                                        onClick={() => updatePictogram('jeruk', 1)}
                                        className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                        disabled={pictogramData.jeruk === 10}
                                    >
                                        <Plus size={20} className="text-green-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-5xl">
                                {'🍊'.repeat(pictogramData.jeruk)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            💡 <strong>Tips:</strong> Setiap gambar buah mewakili 1 siswa yang menyukai buah tersebut.
                        </p>
                    </div>
                </div>
            )}

            {/* Bar Chart Builder */}
            {diagramType === 'bar' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-brand-blue">Jumlah Siswa Hadir</h3>
                        <button
                            onClick={resetBar}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                        {/* Bar Chart Visualization */}
                        <div className="bg-white p-6 rounded-lg mb-6">
                            <div className="flex items-end justify-around h-80 relative">
                                {/* Y-axis */}
                                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-500 pr-2">
                                    <span>10</span>
                                    <span>8</span>
                                    <span>6</span>
                                    <span>4</span>
                                    <span>2</span>
                                    <span>0</span>
                                </div>

                                <div className="flex items-end justify-around w-full pl-8 gap-4">
                                    {Object.entries(barData).map(([day, value], idx) => {
                                        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                                        return (
                                            <div key={day} className="flex flex-col items-center gap-2 flex-1">
                                                <div
                                                    className={`${colors[idx]} w-full rounded-t-lg transition-all duration-300`}
                                                    style={{ height: `${value * 10}%` }}
                                                ></div>
                                                <span className="text-sm font-semibold capitalize">{day}</span>
                                                <span className="text-xs text-gray-600">{value} siswa</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                            {Object.entries(barData).map(([day, value]) => (
                                <div key={day} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <span className="text-lg font-bold capitalize">{day}</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateBar(day as keyof typeof barData, -1)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                            disabled={value === 0}
                                        >
                                            <Minus size={20} className="text-red-600" />
                                        </button>
                                        <span className="text-2xl font-bold text-brand-blue w-12 text-center">
                                            {value}
                                        </span>
                                        <button
                                            onClick={() => updateBar(day as keyof typeof barData, 1)}
                                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                            disabled={value === 10}
                                        >
                                            <Plus size={20} className="text-green-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            💡 <strong>Tips:</strong> Semakin tinggi batang, semakin banyak jumlah siswa yang hadir!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
