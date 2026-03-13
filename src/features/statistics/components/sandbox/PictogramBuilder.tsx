import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function PictogramBuilder() {
    const [pictogramData, setPictogramData] = useState({
        apel: 3,
        pisang: 2,
        jeruk: 4
    });

    const updatePictogram = (item: keyof typeof pictogramData, delta: number) => {
        setPictogramData(prev => ({
            ...prev,
            [item]: Math.max(0, Math.min(10, prev[item] + delta))
        }));
    };

    return (
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
                                <span className="text-xl font-bold text-orange-600">{emojis[key as keyof typeof emojis]} {labels[key as keyof typeof labels]}</span>
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
    );
}
