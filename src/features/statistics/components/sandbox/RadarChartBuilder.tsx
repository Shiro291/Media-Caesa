import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

export default function RadarChartBuilder() {
    const [radarData, setRadarData] = useState<DataPoint[]>([
        { subject: 'Math', A: 120, B: 110 },
        { subject: 'Science', A: 98, B: 130 },
        { subject: 'English', A: 86, B: 130 },
        { subject: 'History', A: 99, B: 100 },
        { subject: 'PE', A: 85, B: 90 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="px-3 py-1 border-2 border-indigo-500 rounded-lg text-gray-900" autoFocus />
                                        <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={16} /></button>
                                        <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-indigo-600">{item.subject}</span>
                                        <button onClick={() => startEdit(idx, 'subject', item.subject as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={14} className="text-gray-700" /></button>
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
                                    <label className="text-sm text-gray-800 font-medium">Student A:</label>
                                    {editingIndex === idx && editingField === 'A' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-indigo-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-indigo-600">{item.A as string}</span>
                                            <button onClick={() => startEdit(idx, 'A', item.A as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-800 font-medium">Student B:</label>
                                    {editingIndex === idx && editingField === 'B' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-indigo-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(radarData, setRadarData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-blue-600">{item.B as string}</span>
                                            <button onClick={() => startEdit(idx, 'B', item.B as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
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
