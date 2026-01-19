import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DiagramType = 'pictogram' | 'bar' | 'line' | 'pie';

const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];

export default function SandboxSection() {
    const [diagramType, setDiagramType] = useState<DiagramType>('pictogram');

    // Pictogram state
    const [pictogramData, setPictogramData] = useState({
        apel: 3,
        pisang: 2,
        jeruk: 4
    });

    // Bar chart state
    const [barData, setBarData] = useState([
        { hari: 'Senin', jumlah: 5 },
        { hari: 'Selasa', jumlah: 7 },
        { hari: 'Rabu', jumlah: 3 },
        { hari: 'Kamis', jumlah: 6 }
    ]);

    // Line chart state
    const [lineData, setLineData] = useState([
        { hari: 'Sen', suhu: 28 },
        { hari: 'Sel', suhu: 32 },
        { hari: 'Rab', suhu: 30 },
        { hari: 'Kam', suhu: 34 },
        { hari: 'Jum', suhu: 31 }
    ]);

    // Pie chart state
    const [pieData, setPieData] = useState([
        { name: 'Membaca', value: 8 },
        { name: 'Olahraga', value: 6 },
        { name: 'Gaming', value: 6 }
    ]);

    const updatePictogram = (item: keyof typeof pictogramData, delta: number) => {
        setPictogramData(prev => ({
            ...prev,
            [item]: Math.max(0, Math.min(10, prev[item] + delta))
        }));
    };

    const updateBar = (index: number, delta: number) => {
        setBarData(prev => prev.map((item, idx) =>
            idx === index ? { ...item, jumlah: Math.max(0, Math.min(10, item.jumlah + delta)) } : item
        ));
    };

    const updateLine = (index: number, delta: number) => {
        setLineData(prev => prev.map((item, idx) =>
            idx === index ? { ...item, suhu: Math.max(20, Math.min(40, item.suhu + delta)) } : item
        ));
    };

    const updatePie = (index: number, delta: number) => {
        setPieData(prev => prev.map((item, idx) =>
            idx === index ? { ...item, value: Math.max(0, Math.min(20, item.value + delta)) } : item
        ));
    };

    const resetPictogram = () => setPictogramData({ apel: 3, pisang: 2, jeruk: 4 });
    const resetBar = () => setBarData([
        { hari: 'Senin', jumlah: 5 },
        { hari: 'Selasa', jumlah: 7 },
        { hari: 'Rabu', jumlah: 3 },
        { hari: 'Kamis', jumlah: 6 }
    ]);
    const resetLine = () => setLineData([
        { hari: 'Sen', suhu: 28 },
        { hari: 'Sel', suhu: 32 },
        { hari: 'Rab', suhu: 30 },
        { hari: 'Kam', suhu: 34 },
        { hari: 'Jum', suhu: 31 }
    ]);
    const resetPie = () => setPieData([
        { name: 'Membaca', value: 8 },
        { name: 'Olahraga', value: 6 },
        { name: 'Gaming', value: 6 }
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Latihan Membuat Diagram 🎨</h2>
                <p className="text-gray-600">Coba buat diagram sendiri! Tambah atau kurangi nilai untuk melihat perubahannya.</p>
            </div>

            {/* Diagram Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                    onClick={() => setDiagramType('pictogram')}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${diagramType === 'pictogram'
                        ? 'bg-brand-orange text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📊 Piktogram
                </button>
                <button
                    onClick={() => setDiagramType('bar')}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${diagramType === 'bar'
                        ? 'bg-brand-blue text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📈 Diagram Batang
                </button>
                <button
                    onClick={() => setDiagramType('line')}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${diagramType === 'line'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📉 Diagram Garis
                </button>
                <button
                    onClick={() => setDiagramType('pie')}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${diagramType === 'pie'
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    🥧 Diagram Lingkaran
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
                        {Object.entries(pictogramData).map(([key, value]) => {
                            const emojis = { apel: '🍎', pisang: '🍌', jeruk: '🍊' };
                            const labels = { apel: 'Apel', pisang: 'Pisang', jeruk: 'Jeruk' };
                            return (
                                <div key={key} className="bg-white p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-bold">{emojis[key as keyof typeof emojis]} {labels[key as keyof typeof labels]}</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updatePictogram(key as keyof typeof pictogramData, -1)}
                                                className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                                disabled={value === 0}
                                            >
                                                <Minus size={20} className="text-red-600" />
                                            </button>
                                            <span className="text-2xl font-bold text-brand-orange w-12 text-center">{value}</span>
                                            <button
                                                onClick={() => updatePictogram(key as keyof typeof pictogramData, 1)}
                                                className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                                disabled={value === 10}
                                            >
                                                <Plus size={20} className="text-green-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-5xl">{emojis[key as keyof typeof emojis].repeat(value)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bar Chart Builder */}
            {diagramType === 'bar' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-brand-blue">Jumlah Siswa Hadir</h3>
                        <button onClick={resetBar} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hari" />
                                    <YAxis domain={[0, 10]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="jumlah" fill="#3B82F6" name="Jumlah Siswa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                            {barData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <span className="text-lg font-bold">{item.hari}</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateBar(idx, -1)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                            disabled={item.jumlah === 0}
                                        >
                                            <Minus size={20} className="text-red-600" />
                                        </button>
                                        <span className="text-2xl font-bold text-brand-blue w-12 text-center">{item.jumlah}</span>
                                        <button
                                            onClick={() => updateBar(idx, 1)}
                                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                            disabled={item.jumlah === 10}
                                        >
                                            <Plus size={20} className="text-green-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Line Chart Builder */}
            {diagramType === 'line' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-green-600">Suhu Harian (°C)</h3>
                        <button onClick={resetLine} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hari" />
                                    <YAxis domain={[20, 40]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="suhu" stroke="#10B981" strokeWidth={3} name="Suhu (°C)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                            {lineData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <span className="text-lg font-bold">{item.hari}</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateLine(idx, -1)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                            disabled={item.suhu === 20}
                                        >
                                            <Minus size={20} className="text-red-600" />
                                        </button>
                                        <span className="text-2xl font-bold text-green-600 w-16 text-center">{item.suhu}°C</span>
                                        <button
                                            onClick={() => updateLine(idx, 1)}
                                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                            disabled={item.suhu === 40}
                                        >
                                            <Plus size={20} className="text-green-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Pie Chart Builder */}
            {diagramType === 'pie' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-purple-600">Hobi Siswa</h3>
                        <button onClick={resetPie} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => `${entry.name}: ${entry.value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                            {pieData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                                        <span className="text-lg font-bold">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updatePie(idx, -1)}
                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                            disabled={item.value === 0}
                                        >
                                            <Minus size={20} className="text-red-600" />
                                        </button>
                                        <span className="text-2xl font-bold text-purple-600 w-12 text-center">{item.value}</span>
                                        <button
                                            onClick={() => updatePie(idx, 1)}
                                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                            disabled={item.value === 20}
                                        >
                                            <Plus size={20} className="text-green-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
