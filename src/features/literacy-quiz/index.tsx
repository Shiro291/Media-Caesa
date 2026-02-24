import QuizEngine from '../../components/features/QuizEngine';
import { literacyQuizQuestions } from '../../data/quizzes';

// UI/UX Pro Max Colors & Text styles
// Inspiration: Playful and vibrant "Kids Literacy" theme
// Colors: bg-emerald-50, soft green gradients for success.

const resultConfig = {
    title: "Hebat Sekali!",
    perfectMessage: "Bintang 5! Kamu pandai membaca dan mengenal kata! 🎉",
    goodMessage: "Bagus! Terus berlatih membaca ya! 📚",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-500"
};

export default function LiteracyQuiz() {
    return (
        <QuizEngine
            title="Kuis Literasi"
            questions={literacyQuizQuestions}
            bgClass="bg-emerald-50"
            resultConfig={resultConfig}
        />
    );
}
