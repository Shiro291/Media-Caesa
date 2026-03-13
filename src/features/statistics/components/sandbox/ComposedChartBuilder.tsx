import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

export default function ComposedChartBuilder() {
    const [composedData, setComposedData] = useState<DataPoint[]>([
        { name: 'Jan', uv: 590, pv: 800, amt: 1400 },
        { name: 'Feb', uv: 868, pv: 967, amt: 1506 },
        { name: 'Mar', uv: 1397, pv: 1098, amt: 989 },
        { name: 'Apr', uv: 1480, pv: 1200, amt: 1228 },
        { name: 'Mei', uv: 1520, pv: 1108, amt: 1100 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-red-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-red-600">{item.name}</span>
                                        <button onClick={() => startEdit(idx, 'name', item.name as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
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
                                    <label className="text-sm text-gray-800 font-medium">UV:</label>
                                    {editingIndex === idx && editingField === 'uv' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-red-600">{item.uv as string}</span>
                                            <button onClick={() => startEdit(idx, 'uv', item.uv as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-800 font-medium">PV:</label>
                                    {editingIndex === idx && editingField === 'pv' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-blue-600">{item.pv as string}</span>
                                            <button onClick={() => startEdit(idx, 'pv', item.pv as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-800 font-medium">AMT:</label>
                                    {editingIndex === idx && editingField === 'amt' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-red-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(composedData, setComposedData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-orange-600">{item.amt as string}</span>
                                            <button onClick={() => startEdit(idx, 'amt', item.amt as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
