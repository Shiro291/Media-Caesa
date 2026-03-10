import QuizEngine from '../../components/features/QuizEngine';
import MediaShell from '../../components/layout/MediaShell';
import { bilanganCacahQuiz } from '../../data/bilanganCacah';
import { useNavigate } from 'react-router-dom';

export default function BilanganCacahQuiz() {
    const navigate = useNavigate();

    return (
        <MediaShell
            title="Kuis Bilangan Cacah"
            bgClass="bg-gradient-to-br from-orange-50 to-amber-100"
            currentSlide={0}
            totalSlides={1}
            onBack={() => navigate('/bilangan-cacah')}
        >
            <div className="w-full max-w-4xl px-4 py-8">
                <QuizEngine
                    questions={bilanganCacahQuiz}
                    onComplete={(score) => {
                        // In a real app we might save the score somewhere
                        console.log('Quiz completed with score:', score);
                    }}
                />
            </div>
        </MediaShell>
    );
}
