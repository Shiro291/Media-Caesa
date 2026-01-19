import { useState } from 'react';
import { BookOpen, Palette, FileText } from 'lucide-react';
import MediaShell from '../../components/layout/MediaShell';
import LearnSection from './LearnSection';
import SandboxSection from './SandboxSection';
import QuizSection from './QuizSection';

type Tab = 'learn' | 'sandbox' | 'quiz';

export default function Statistics() {
    const [activeTab, setActiveTab] = useState<Tab>('learn');

    return (
        <MediaShell
            title="Belajar Statistik - Kelas 4 SD"
            bgClass="bg-gradient-to-br from-purple-50 to-blue-50"
        >
            <div className="w-full max-w-6xl px-4">
                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2">
                    <button
                        onClick={() => setActiveTab('learn')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'learn'
                                ? 'bg-brand-blue text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <BookOpen size={20} />
                        <span className="hidden md:inline">Belajar</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('sandbox')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'sandbox'
                                ? 'bg-brand-orange text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Palette size={20} />
                        <span className="hidden md:inline">Latihan</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('quiz')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'quiz'
                                ? 'bg-brand-red text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <FileText size={20} />
                        <span className="hidden md:inline">Kuis</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    {activeTab === 'learn' && <LearnSection />}
                    {activeTab === 'sandbox' && <SandboxSection />}
                    {activeTab === 'quiz' && <QuizSection />}
                </div>
            </div>
        </MediaShell>
    );
}
