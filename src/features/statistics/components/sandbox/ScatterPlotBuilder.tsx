import { useState } from 'react';
import { Plus, RotateCcw, Check, X, Edit2, Trash2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartEditor } from './useChartEditor';
import type { DataPoint } from '../../types';

export default function ScatterPlotBuilder() {
    const [scatterData, setScatterData] = useState<DataPoint[]>([
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 }
    ]);
    const { editingIndex, editingField, editValue, setEditValue, startEdit, saveEdit, cancelEdit, addDataPoint, removeDataPoint } = useChartEditor<DataPoint>();

    return (
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
                                    <label className="text-sm text-gray-800 font-medium">X:</label>
                                    {editingIndex === idx && editingField === 'x' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-pink-600">{item.x as string}</span>
                                            <button onClick={() => startEdit(idx, 'x', item.x as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-800 font-medium">Y:</label>
                                    {editingIndex === idx && editingField === 'y' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-pink-600">{item.y as string}</span>
                                            <button onClick={() => startEdit(idx, 'y', item.y as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-800 font-medium">Z (Size):</label>
                                    {editingIndex === idx && editingField === 'z' ? (
                                        <div className="flex items-center gap-1">
                                            <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full px-2 py-1 border-2 border-pink-500 rounded text-gray-900" autoFocus />
                                            <button onClick={() => saveEdit(scatterData, setScatterData)} className="p-1 bg-green-500 text-white rounded"><Check size={12} /></button>
                                            <button onClick={cancelEdit} className="p-1 bg-red-500 text-white rounded"><X size={12} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-pink-600">{item.z as string}</span>
                                            <button onClick={() => startEdit(idx, 'z', item.z as string)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={12} className="text-gray-700" /></button>
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
