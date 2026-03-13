import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

export default function BarChartBuilder() {
    const [barData, setBarData] = useState<DataPoint[]>([
        { name: 'Senin', value: 5 },
        { name: 'Selasa', value: 7 },
        { name: 'Rabu', value: 3 },
        { name: 'Kamis', value: 6 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-blue-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(barData, setBarData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-blue-600">{item.name}</span>
                                        <button onClick={() => startEdit(idx, 'name', item.name as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {editingIndex === idx && editingField === 'value' ? (
                                    <div className="flex items-center gap-2">
                                        <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-20 px-3 py-1 border-2 border-blue-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(barData, setBarData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-2xl font-bold text-blue-600 w-12 text-center">{item.value as string}</span>
                                        <button onClick={() => startEdit(idx, 'value', item.value as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
                                    </>
                                )}
                                {barData.length > 1 && (
                                    <button onClick={() => removeDataPoint(barData, setBarData, idx)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"><Trash2 size={16} className="text-red-600" /></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
