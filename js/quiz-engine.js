// Quiz Engine - Reusable Quiz Functionality
// Handles question rendering, answer validation, scoring, and navigation

class QuizEngine {
    constructor(questions, containerId) {
        this.questions = questions;
        this.containerId = containerId;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
    }

    // Initialize the quiz
    init() {
        this.renderQuestion();
        this.updateProgress();
    }

    // Render current question
    renderQuestion() {
        const container = document.getElementById(this.containerId);
        const question = this.questions[this.currentQuestionIndex];

        let html = `
            <div class="question-card">
                <span class="question-number">Soal ${this.currentQuestionIndex + 1} dari ${this.questions.length}</span>
                <div class="question-text">${question.question}</div>
        `;

        // Add image if available
        if (question.image) {
            html += `<img src="${question.image}" alt="Gambar soal" class="question-image">`;
        }

        // Add answer options
        html += '<div class="answer-options">';
        question.options.forEach((option, index) => {
            html += `
                <button class="answer-btn" onclick="quiz.checkAnswer(${index})" id="answer-${index}">
                    ${option}
                </button>
            `;
        });
        html += '</div>';

        // Feedback area
        html += '<div id="feedback"></div>';

        html += '</div>';

        // Navigation
        html += `
            <div class="quiz-nav">
                <button class="nav-btn" onclick="quiz.nextQuestion()" id="next-btn" style="display: none;">
                    Soal Berikutnya →
                </button>
            </div>
        `;

        container.innerHTML = html;
    }

    // Check answer
    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;

        // Store answer
        this.answers.push({
            questionIndex: this.currentQuestionIndex,
            selectedAnswer: selectedIndex,
            isCorrect: isCorrect
        });

        // Update score
        if (isCorrect) {
            this.score++;
        }

        // Disable all answer buttons
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach(btn => btn.disabled = true);

        // Highlight correct/incorrect
        const selectedButton = document.getElementById(`answer-${selectedIndex}`);
        const correctButton = document.getElementById(`answer-${question.correctAnswer}`);

        if (isCorrect) {
            selectedButton.classList.add('correct');
            this.showFeedback(true, question.explanation);
        } else {
            selectedButton.classList.add('incorrect');
            correctButton.classList.add('correct');
            this.showFeedback(false, question.explanation);
        }

        // Show next button
        document.getElementById('next-btn').style.display = 'inline-block';
    }

    // Show feedback message
    showFeedback(isCorrect, explanation) {
        const feedbackDiv = document.getElementById('feedback');
        const emoji = isCorrect ? '🎉' : '💪';
        const message = isCorrect ? 'Benar!' : 'Belum tepat!';

        feedbackDiv.innerHTML = `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${emoji}</div>
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${message}</div>
                <div style="font-size: 1rem; opacity: 0.9;">${explanation}</div>
            </div>
        `;
    }

    // Move to next question
    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    // Update progress bar
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        const progressBar = document.getElementById('progress-bar');

        if (progressBar) {
            progressBar.style.width = progress + '%';
            progressBar.textContent = `${this.currentQuestionIndex + 1}/${this.questions.length}`;
        }
    }

    // Show final results
    showResults() {
        const container = document.getElementById(this.containerId);
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = Math.round((Date.now() - this.startTime) / 1000);

        // Determine emoji and message based on score
        let emoji, title, message;
        if (percentage >= 90) {
            emoji = '🏆';
            title = 'Luar Biasa!';
            message = 'Kamu adalah pemadam kebakaran super! Semua jawaban hampir sempurna!';
        } else if (percentage >= 70) {
            emoji = '⭐';
            title = 'Hebat Sekali!';
            message = 'Kamu pemadam kebakaran yang handal! Pertahankan semangat belajarmu!';
        } else if (percentage >= 50) {
            emoji = '👍';
            title = 'Bagus!';
            message = 'Kamu sudah berusaha dengan baik! Terus berlatih ya!';
        } else {
            emoji = '💪';
            title = 'Semangat!';
            message = 'Jangan menyerah! Coba lagi dan kamu pasti bisa lebih baik!';
        }

        const html = `
            <div class="results-container">
                <div class="results-emoji">${emoji}</div>
                <h2 class="results-title">${title}</h2>
                <div class="results-score">${this.score} / ${this.questions.length}</div>
                <div class="results-message">${message}</div>
                
                <div class="results-stats">
                    <div class="stat-box">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Skor</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${this.score}</div>
                        <div class="stat-label">Benar</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${this.questions.length - this.score}</div>
                        <div class="stat-label">Salah</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${timeTaken}s</div>
                        <div class="stat-label">Waktu</div>
                    </div>
                </div>

                <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; margin-top: var(--spacing-xl);">
                    <button class="btn btn-secondary btn-large" onclick="location.reload()">
                        🔄 Coba Lagi
                    </button>
                    <a href="../../index.html" class="btn btn-primary btn-large">
                        🏠 Kembali ke Beranda
                    </a>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Hide progress bar
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
    }

    // Shuffle array (for randomizing questions/options if needed)
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
