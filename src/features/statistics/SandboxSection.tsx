import { useState } from 'react';
import { Plus, Minus, RotateCcw, Trash2, Edit2, Check, X } from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ComposedChart,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis
} from 'recharts';

type DiagramType = 'pictogram' | 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'radar' | 'composed';

const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

interface DataPoint {
    [key: string]: string | number;
}

export default function SandboxSection() {
    const [diagramType, setDiagramType] = useState<DiagramType>('pictogram');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingField, setEditingField] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');

    // Pictogram state (simplest - Grade 1-3)
    const [pictogramData, setPictogramData] = useState({
        apel: 3,
        pisang: 2,
        jeruk: 4
    });

    // Bar chart state (Grade 4-5)
    const [barData, setBarData] = useState<DataPoint[]>([
        { name: 'Senin', value: 5 },
        { name: 'Selasa', value: 7 },
        { name: 'Rabu', value: 3 },
        { name: 'Kamis', value: 6 }
    ]);

    // Line chart state (Grade 5-6)
    const [lineData, setLineData] = useState<DataPoint[]>([
        { name: 'Jan', value: 28 },
        { name: 'Feb', value: 32 },
        { name: 'Mar', value: 30 },
        { name: 'Apr', value: 34 },
        { name: 'Mei', value: 31 }
    ]);

    // Area chart state (Grade 7-8)
    const [areaData, setAreaData] = useState<DataPoint[]>([
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 5000 },
        { month: 'Apr', sales: 4500 },
        { month: 'Mei', sales: 6000 }
    ]);

    // Pie chart state (Grade 6-7)
    const [pieData, setPieData] = useState<DataPoint[]>([
        { name: 'Membaca', value: 8 },
        { name: 'Olahraga', value: 6 },
        { name: 'Gaming', value: 6 }
    ]);

    // Scatter plot state (Grade 9-10)
    const [scatterData, setScatterData] = useState<DataPoint[]>([
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 }
    ]);

    // Radar chart state (Grade 10-11)
    const [radarData, setRadarData] = useState<DataPoint[]>([
        { subject: 'Math', A: 120, B: 110 },
        { subject: 'Science', A: 98, B: 130 },
        { subject: 'English', A: 86, B: 130 },
        { subject: 'History', A: 99, B: 100 },
        { subject: 'PE', A: 85, B: 90 }
    ]);

    // Composed chart state (Grade 11-12)
    const [composedData, setComposedData] = useState<DataPoint[]>([
        { name: 'Jan', uv: 590, pv: 800, amt: 1400 },
        { name: 'Feb', uv: 868, pv: 967, amt: 1506 },
        { name: 'Mar', uv: 1397, pv: 1098, amt: 989 },
        { name: 'Apr', uv: 1480, pv: 1200, amt: 1228 },
        { name: 'Mei', uv: 1520, pv: 1108, amt: 1100 }
    ]);

    // Generic update functions
    const updateData = (data: DataPoint[], setData: React.Dispatch<React.SetStateAction<DataPoint[]>>, index: number, field: string, value: string | number) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
    };

    const addDataPoint = (data: DataPoint[], setData: React.Dispatch<React.SetStateAction<DataPoint[]>>, template: DataPoint) => {
        setData([...data, template]);
    };

    const removeDataPoint = (data: DataPoint[], setData: React.Dispatch<React.SetStateAction<DataPoint[]>>, index: number) => {
        if (data.length > 1) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    const startEdit = (index: number, field: string, value: string | number) => {
        setEditingIndex(index);
        setEditingField(field);
        setEditValue(String(value));
    };

    const saveEdit = (data: DataPoint[], setData: React.Dispatch<React.SetStateAction<DataPoint[]>>) => {
        if (editingIndex !== null && editingField) {
            const isNumeric = !isNaN(Number(editValue));
            updateData(data, setData, editingIndex, editingField, isNumeric ? Number(editValue) : editValue);
        }
        setEditingIndex(null);
        setEditingField('');
        setEditValue('');
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditingField('');
        setEditValue('');
    };

    const updatePictogram = (item: keyof typeof pictogramData, delta: number) => {
        setPictogramData(prev => ({
            ...prev,
            [item]: Math.max(0, Math.min(10, prev[item] + delta))
        }));
    };

    const diagrams = [
        { id: 'pictogram', name: '📊 Piktogram', grade: 'SD 1-3', color: 'bg-orange-500' },
        { id: 'bar', name: '📈 Diagram Batang', grade: 'SD 4-5', color: 'bg-blue-500' },
        { id: 'line', name: '📉 Diagram Garis', grade: 'SD 5-6', color: 'bg-green-500' },
        { id: 'pie', name: '🥧 Diagram Lingkaran', grade: 'SD 6-7', color: 'bg-purple-500' },
        { id: 'area', name: '🌊 Diagram Area', grade: 'SMP 7-8', color: 'bg-cyan-500' },
        { id: 'scatter', name: '⚫ Diagram Titik', grade: 'SMP 9-10', color: 'bg-pink-500' },
        { id: 'radar', name: '🎯 Diagram Radar', grade: 'SMA 10-11', color: 'bg-indigo-500' },
        { id: 'composed', name: '🔀 Diagram Gabungan', grade: 'SMA 11-12', color: 'bg-red-500' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Latihan Membuat Diagram 🎨</h2>
                <p className="text-gray-600">Pilih jenis diagram dan sesuaikan datanya! Klik Edit untuk mengubah nama dan nilai.</p>
            </div>

            {/* Diagram Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {diagrams.map(diagram => (
                    <button
                        key={diagram.id}
                        onClick={() => setDiagramType(diagram.id as DiagramType)}
                        className={`px-3 py-3 rounded-xl font-bold transition-all text-sm ${diagramType === diagram.id
                                ? `${diagram.color} text-white shadow-lg scale-105`
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <div>{diagram.name}</div>
                        <div className="text-xs opacity-75 mt-1">{diagram.grade}</div>
                    </button>
                ))}
            </div>

            {/* Pictogram Builder */}
            {diagramType === 'pictogram' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-orange-600">Piktogram - Buah Favorit</h3>
                        <button onClick={() => setPictogramData({ apel: 3, pisang: 2, jeruk: 4 })} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
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
                                            <button onClick={() => updatePictogram(key as keyof typeof pictogramData, -1)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition" disabled={value === 0}>
                                                <Minus size={20} className="text-red-600" />
                                            </button>
                                            <span className="text-2xl font-bold text-orange-600 w-12 text-center">{value}</span>
                                            <button onClick={() => updatePictogram(key as keyof typeof pictogramData, 1)} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition" disabled={value === 10}>
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
                        <h3 className="text-2xl font-bold text-blue-600">Diagram Batang</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(barData, setBarData, { name: 'Baru', value: 5 })} className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setBarData([{ name: 'Senin', value: 5 }, { name: 'Selasa', value: 7 }, { name: 'Rabu', value: 3 }, { name: 'Kamis', value: 6 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#3B82F6" name="Nilai" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {barData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        {editingIndex === idx && editingField === 'name' ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="px-3 py-1 border-2 border-blue-500 rounded-lg"
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEdit(barData, setBarData)} className="p-1 bg-green-500 text-white rounded">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.name}</span>
                                                <button onClick={() => startEdit(idx, 'name', item.name)} className="p-1 hover:bg-gray-100 rounded">
                                                    <Edit2 size={14} className="text-gray-500" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {editingIndex === idx && editingField === 'value' ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="w-20 px-3 py-1 border-2 border-blue-500 rounded-lg"
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEdit(barData, setBarData)} className="p-1 bg-green-500 text-white rounded">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-blue-600 w-12 text-center">{item.value}</span>
                                                <button onClick={() => startEdit(idx, 'value', item.value)} className="p-1 hover:bg-gray-100 rounded">
                                                    <Edit2 size={14} className="text-gray-500" />
                                                </button>
                                            </>
                                        )}
                                        {barData.length > 1 && (
                                            <button onClick={() => removeDataPoint(barData, setBarData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
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
                        <h3 className="text-2xl font-bold text-green-600">Diagram Garis</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(lineData, setLineData, { name: 'Baru', value: 30 })} className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setLineData([{ name: 'Jan', value: 28 }, { name: 'Feb', value: 32 }, { name: 'Mar', value: 30 }, { name: 'Apr', value: 34 }, { name: 'Mei', value: 31 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} name="Nilai" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {lineData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        {editingIndex === idx && editingField === 'name' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-green-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(lineData, setLineData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.name}</span>
                                                <button onClick={() => startEdit(idx, 'name', item.name)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {editingIndex === idx && editingField === 'value' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-20 px-3 py-1 border-2 border-green-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(lineData, setLineData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-green-600 w-16 text-center">{item.value}</span>
                                                <button onClick={() => startEdit(idx, 'value', item.value)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </>
                                        )}
                                        {lineData.length > 1 && (
                                            <button onClick={() => removeDataPoint(lineData, setLineData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
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
                        <h3 className="text-2xl font-bold text-purple-600">Diagram Lingkaran</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(pieData, setPieData, { name: 'Baru', value: 5 })} className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setPieData([{ name: 'Membaca', value: 8 }, { name: 'Olahraga', value: 6 }, { name: 'Gaming', value: 6 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                                        {pieData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {pieData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                        {editingIndex === idx && editingField === 'name' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-purple-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(pieData, setPieData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.name}</span>
                                                <button onClick={() => startEdit(idx, 'name', item.name)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {editingIndex === idx && editingField === 'value' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-20 px-3 py-1 border-2 border-purple-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(pieData, setPieData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-purple-600 w-12 text-center">{item.value}</span>
                                                <button onClick={() => startEdit(idx, 'value', item.value)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </>
                                        )}
                                        {pieData.length > 1 && (
                                            <button onClick={() => removeDataPoint(pieData, setPieData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Area Chart Builder */}
            {diagramType === 'area' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-cyan-600">Diagram Area</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(areaData, setAreaData, { month: 'Baru', sales: 4500 })} className="flex items-center gap-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setAreaData([{ month: 'Jan', sales: 4000 }, { month: 'Feb', sales: 3000 }, { month: 'Mar', sales: 5000 }, { month: 'Apr', sales: 4500 }, { month: 'Mei', sales: 6000 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={areaData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="sales" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} name="Penjualan" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {areaData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        {editingIndex === idx && editingField === 'month' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-cyan-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(areaData, setAreaData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.month}</span>
                                                <button onClick={() => startEdit(idx, 'month', item.month)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {editingIndex === idx && editingField === 'sales' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-24 px-3 py-1 border-2 border-cyan-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(areaData, setAreaData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-cyan-600 w-20 text-center">{item.sales}</span>
                                                <button onClick={() => startEdit(idx, 'sales', item.sales)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </>
                                        )}
                                        {areaData.length > 1 && (
                                            <button onClick={() => removeDataPoint(areaData, setAreaData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Scatter Plot Builder */}
            {diagramType === 'scatter' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-pink-600">Diagram Titik (Scatter Plot)</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(scatterData, setScatterData, { x: 150, y: 300, z: 350 })} className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setScatterData([{ x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 }, { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 }, { x: 150, y: 400, z: 500 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" name="X" />
                                    <YAxis type="number" dataKey="y" name="Y" />
                                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Size" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Legend />
                                    <Scatter name="Data Points" data={scatterData} fill="#EC4899" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {scatterData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-700">Point {idx + 1}</span>
                                        {scatterData.length > 1 && (
                                            <button onClick={() => removeDataPoint(scatterData, setScatterData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mt-3">
                                        <div>
                                            <label className="text-sm text-gray-600">X:</label>
                                            {editingIndex === idx && editingField === 'x' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-pink-600">{item.x}</span>
                                                    <button onClick={() => startEdit(idx, 'x', item.x)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Y:</label>
                                            {editingIndex === idx && editingField === 'y' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-pink-600">{item.y}</span>
                                                    <button onClick={() => startEdit(idx, 'y', item.y)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Z (Size):</label>
                                            {editingIndex === idx && editingField === 'z' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-pink-600">{item.z}</span>
                                                    <button onClick={() => startEdit(idx, 'z', item.z)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Radar Chart Builder */}
            {diagramType === 'radar' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-indigo-600">Diagram Radar</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(radarData, setRadarData, { subject: 'Baru', A: 100, B: 100 })} className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setRadarData([{ subject: 'Math', A: 120, B: 110 }, { subject: 'Science', A: 98, B: 130 }, { subject: 'English', A: 86, B: 130 }, { subject: 'History', A: 99, B: 100 }, { subject: 'PE', A: 85, B: 90 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={radarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Student A" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                                    <Radar name="Student B" dataKey="B" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {radarData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        {editingIndex === idx && editingField === 'subject' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-indigo-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.subject}</span>
                                                <button onClick={() => startEdit(idx, 'subject', item.subject)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </div>
                                        )}
                                        {radarData.length > 1 && (
                                            <button onClick={() => removeDataPoint(radarData, setRadarData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm text-gray-600">Student A:</label>
                                            {editingIndex === idx && editingField === 'A' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-indigo-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-indigo-600">{item.A}</span>
                                                    <button onClick={() => startEdit(idx, 'A', item.A)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Student B:</label>
                                            {editingIndex === idx && editingField === 'B' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-indigo-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-blue-600">{item.B}</span>
                                                    <button onClick={() => startEdit(idx, 'B', item.B)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Composed Chart Builder */}
            {diagramType === 'composed' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-red-600">Diagram Gabungan (Composed)</h3>
                        <div className="flex gap-2">
                            <button onClick={() => addDataPoint(composedData, setComposedData, { name: 'Baru', uv: 1000, pv: 1000, amt: 1000 })} className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-semibold transition">
                                <Plus size={16} />
                                Tambah Data
                            </button>
                            <button onClick={() => setComposedData([{ name: 'Jan', uv: 590, pv: 800, amt: 1400 }, { name: 'Feb', uv: 868, pv: 967, amt: 1506 }, { name: 'Mar', uv: 1397, pv: 1098, amt: 989 }, { name: 'Apr', uv: 1480, pv: 1200, amt: 1228 }, { name: 'Mei', uv: 1520, pv: 1108, amt: 1100 }])} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition">
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
                        <div className="bg-white p-4 rounded-lg mb-6 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={composedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="amt" fill="#F59E0B" stroke="#F59E0B" fillOpacity={0.3} name="Amount" />
                                    <Bar dataKey="pv" barSize={20} fill="#3B82F6" name="Page Views" />
                                    <Line type="monotone" dataKey="uv" stroke="#EF4444" strokeWidth={2} name="Unique Visitors" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {composedData.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        {editingIndex === idx && editingField === 'name' ? (
                                            <div className="flex items-center gap-2">
                                                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-red-500 rounded-lg" autoFocus />
                                                <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{item.name}</span>
                                                <button onClick={() => startEdit(idx, 'name', item.name)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-500" /></button>
                                            </div>
                                        )}
                                        {composedData.length > 1 && (
                                            <button onClick={() => removeDataPoint(composedData, setComposedData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-sm text-gray-600">UV:</label>
                                            {editingIndex === idx && editingField === 'uv' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-red-600">{item.uv}</span>
                                                    <button onClick={() => startEdit(idx, 'uv', item.uv)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">PV:</label>
                                            {editingIndex === idx && editingField === 'pv' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-blue-600">{item.pv}</span>
                                                    <button onClick={() => startEdit(idx, 'pv', item.pv)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">AMT:</label>
                                            {editingIndex === idx && editingField === 'amt' ? (
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded" autoFocus />
                                                    <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                                    <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-orange-600">{item.amt}</span>
                                                    <button onClick={() => startEdit(idx, 'amt', item.amt)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-500" /></button>
                                                </div>
                                            )}
                                        </div>
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
