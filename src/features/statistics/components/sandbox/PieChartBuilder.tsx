import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function PieChartBuilder() {
    const [pieData, setPieData] = useState<DataPoint[]>([
        { name: 'Membaca', value: 8 },
        { name: 'Olahraga', value: 6 },
        { name: 'Gaming', value: 6 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-purple-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(pieData, setPieData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-purple-600">{item.name}</span>
                                        <button onClick={() => startEdit(idx, 'name', item.name as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {editingIndex === idx && editingField === 'value' ? (
                                    <div className="flex items-center gap-2">
                                        <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-20 px-3 py-1 border-2 border-purple-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(pieData, setPieData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-2xl font-bold text-purple-600 w-12 text-center">{item.value as string}</span>
                                        <button onClick={() => startEdit(idx, 'value', item.value as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
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
    );
}
