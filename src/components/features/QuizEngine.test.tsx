import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import QuizEngine from './QuizEngine';
import { BrowserRouter } from 'react-router-dom';

// Mock useSound
const mockPlaySound = vi.fn();
vi.mock('../../hooks/useSound', () => ({
    useSound: () => ({
        playSound: mockPlaySound
    })
}));

const mockQuestions = [
    {
        q: "Question 1",
        opts: ["A", "B", "C", "D"],
        ans: 0
    },
    {
        q: "Question 2",
        opts: ["E", "F", "G", "H"],
        ans: 1
    }
];

const mockConfig = {
    title: "Test Quiz",
    perfectMessage: "Perfect!",
    goodMessage: "Good!",
    bgClass: "bg-test",
    textClass: "text-test"
};

describe('QuizEngine', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the first question', () => {
        render(
            <BrowserRouter>
                <QuizEngine
                    title="Test Quiz"
                    questions={mockQuestions}
                    bgClass="bg-white"
                    resultConfig={mockConfig}
                />
            </BrowserRouter>
        );
        expect(screen.getByText("Question 1")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
    });

    it('handles correct answer and advances', async () => {
        render(
            <BrowserRouter>
                <QuizEngine
                    title="Test Quiz"
                    questions={mockQuestions}
                    bgClass="bg-white"
                    resultConfig={mockConfig}
                />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("A"));
        expect(mockPlaySound).toHaveBeenCalledWith('success');

        // Wait for timeout
        await waitFor(() => {
            expect(screen.getByText("Question 2")).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    it('shows result screen after last question', async () => {
        render(
            <BrowserRouter>
                <QuizEngine
                    title="Test Quiz"
                    questions={[mockQuestions[0]]}
                    bgClass="bg-white"
                    resultConfig={mockConfig}
                />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("A"));

        await waitFor(() => {
            // Result screen checks
            // We look for parts of the result screen
            expect(screen.getByText(/Test Quiz/)).toBeInTheDocument();
            expect(screen.getByText("Perfect!")).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});
