import QuizEngine from '../../components/features/QuizEngine';
import { simpleQuizQuestions } from '../../data/quizzes';

export default function SimpleQuiz() {
    return (
        <QuizEngine
            title="Kuis Warna & Bentuk"
            questions={simpleQuizQuestions}
            bgClass="bg-blue-50"
            resultConfig={{
                title: "Hore! Selesai! 🎉",
                perfectMessage: "Hebat! Kamu tahu semua warna & bentuk!",
                goodMessage: "Bagus! Ayo belajar lagi!",
                bgClass: "bg-yellow-50",
                textClass: "text-brand-orange"
            }}
        />
    );
}
