import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

export default function AreaChartBuilder() {
    const [areaData, setAreaData] = useState<DataPoint[]>([
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 5000 },
        { month: 'Apr', sales: 4500 },
        { month: 'Mei', sales: 6000 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-cyan-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(areaData, setAreaData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-cyan-600">{item.month}</span>
                                        <button onClick={() => startEdit(idx, 'month', item.month as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {editingIndex === idx && editingField === 'sales' ? (
                                    <div className="flex items-center gap-2">
                                        <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-24 px-3 py-1 border-2 border-cyan-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(areaData, setAreaData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-2xl font-bold text-cyan-600 w-20 text-center">{item.sales as string}</span>
                                        <button onClick={() => startEdit(idx, 'sales', item.sales as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
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
    );
}
