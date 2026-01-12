let currentSlide = 1;
const totalSlides = 18;
let score = 0;
const totalQuestions = 15;

// Sound effects (using standard browser beeps/speech synthesis or silent visual cues for simplicity)
// We will focus on Visual cues as audio files might not be present.

document.addEventListener('DOMContentLoaded', () => {
    updateSlideCounter();
    updateNavigationButtons();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Button Listeners
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
});

function showSlide(n) {
    if (n > totalSlides) return;
    if (n < 1) return;

    // Remove active class from current slide
    const currentActive = document.querySelector(`.slide.active`);
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    // Add active class to new slide
    currentSlide = n;
    const nextActive = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (nextActive) {
        nextActive.classList.add('active');
    }

    updateSlideCounter();
    updateNavigationButtons();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

function updateSlideCounter() {
    document.getElementById('slide-indicator').textContent = `Slide ${currentSlide} / ${totalSlides}`;
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
    
    // Optional: Hide Next button on question slides until answered? 
    // For this simple version, we let them skip if they want (like a real PPT).
}

function checkAnswer(btn, answer, isCorrect = false) {
    // Prevent multiple clicks on the same question
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');
    
    // Disable all buttons in this group
    buttons.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        score++;
        // Play simple success animation or sound if possible
        confettiEffect(btn);
    } else {
        btn.classList.add('wrong');
        // Highlight the correct one
        buttons.forEach(b => {
             // We can't easily know which is correct from here without parsing onclick
             // But we can check the onclick attribute string if needed, or better:
             // Let's just visually show "Wrong" and let them move on.
             // Or, simpler: Highlight the correct one visually if we had marked it.
             // Since we passed isCorrect only to the correct one, we assume the user learns by trying.
             // But to be helpful, let's find the correct button.
             if (b.getAttribute('onclick').includes('true')) {
                 setTimeout(() => b.classList.add('correct'), 500);
             }
        });
    }

    // Update final score text if on last question (or we can just update it dynamically)
    document.getElementById('final-score').textContent = `Skor Kamu: ${score} / ${totalQuestions}`;

    // Auto advance after short delay
    setTimeout(() => {
        nextSlide();
    }, 1500);
}

// Simple confetti text effect
function confettiEffect(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['✨', '🎉', '⭐', '🎈'][Math.floor(Math.random() * 4)];
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.fontSize = '2rem';
        particle.style.pointerEvents = 'none';
        particle.style.transition = 'all 1s ease-out';
        document.body.appendChild(particle);

        // Animate
        setTimeout(() => {
            const x = (Math.random() - 0.5) * 100;
            const y = -100 - Math.random() * 100;
            particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            particle.style.opacity = '0';
        }, 50);

        setTimeout(() => particle.remove(), 1000);
    }
}
