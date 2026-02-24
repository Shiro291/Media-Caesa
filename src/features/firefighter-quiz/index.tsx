import QuizEngine from '../../components/features/QuizEngine';
import { firefighterQuestions } from '../../data/quizzes';

export default function FirefighterQuiz() {
    return (
        <QuizEngine
            title="Kuis Pemadam"
            questions={firefighterQuestions}
            bgClass="bg-gray-100"
            resultConfig={{
                title: "Kuis Selesai! 🎉",
                perfectMessage: "Wow! Sempurna! Kamu Hebat!",
                goodMessage: "Kerja bagus! Belajar lagi yuk!",
                bgClass: "bg-brand-bg",
                textClass: "text-brand-red"
            }}
        />
    );
}
