import { useState, lazy, Suspense } from 'react';
import type { DiagramType } from './types';

const PictogramBuilder = lazy(() => import('./components/sandbox/PictogramBuilder'));
const BarChartBuilder = lazy(() => import('./components/sandbox/BarChartBuilder'));
const LineChartBuilder = lazy(() => import('./components/sandbox/LineChartBuilder'));
const PieChartBuilder = lazy(() => import('./components/sandbox/PieChartBuilder'));
const AreaChartBuilder = lazy(() => import('./components/sandbox/AreaChartBuilder'));
const ScatterPlotBuilder = lazy(() => import('./components/sandbox/ScatterPlotBuilder'));
const RadarChartBuilder = lazy(() => import('./components/sandbox/RadarChartBuilder'));
const ComposedChartBuilder = lazy(() => import('./components/sandbox/ComposedChartBuilder'));

export default function SandboxSection() {
    const [diagramType, setDiagramType] = useState<DiagramType>('pictogram');

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

            <Suspense fallback={
                <div className="flex flex-col items-center justify-center p-12 h-64 gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-indigo-600 font-medium animate-pulse">Memuat modul diagram...</p>
                </div>
            }>
                {diagramType === 'pictogram' && <PictogramBuilder />}
                {diagramType === 'bar' && <BarChartBuilder />}
                {diagramType === 'line' && <LineChartBuilder />}
                {diagramType === 'pie' && <PieChartBuilder />}
                {diagramType === 'area' && <AreaChartBuilder />}
                {diagramType === 'scatter' && <ScatterPlotBuilder />}
                {diagramType === 'radar' && <RadarChartBuilder />}
                {diagramType === 'composed' && <ComposedChartBuilder />}
            </Suspense>
        </div>
    );
}
