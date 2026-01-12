let currentSlide = 1;
const totalSlides = 10;
let audioCtx;

// Initialize Audio Context on first interaction
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

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

    // Init audio on any click
    document.body.addEventListener('click', initAudio, { once: true });
});

function showSlide(n) {
    if (n > totalSlides) return;
    if (n < 1) return;

    // Remove active class from current slide
    const currentActive = document.querySelector(`.slide.active`);
    if (currentActive) {
        currentActive.classList.remove('active');
        // Stop any looping sounds if we were playing them (not implemented for simple version but good practice)
    }

    // Add active class to new slide
    currentSlide = n;
    const nextActive = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (nextActive) {
        nextActive.classList.add('active');
    }

    updateSlideCounter();
    updateNavigationButtons();

    // Auto play background ambience based on slide? (Maybe later)
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        playSound('click');
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        playSound('click');
        showSlide(currentSlide - 1);
    }
}

function updateSlideCounter() {
    document.getElementById('slide-indicator').textContent = `Halaman ${currentSlide} / ${totalSlides}`;
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

// --- Sound Synthesis (Web Audio API) ---
// This allows us to have cool sounds without external files!

async function playSound(type) {
    initAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    switch (type) {
        case 'click':
            osc.frequency.setValueAtTime(600, t);
            osc.className = 'sine';
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
            osc.start(t);
            osc.stop(t + 0.1);
            break;

        case 'siren':
            // Nguing Nguing
            osc.type = 'sawtooth';
            gain.gain.setValueAtTime(0.1, t);

            // Modulation
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.linearRampToValueAtTime(800, t + 0.3);
            osc.frequency.linearRampToValueAtTime(600, t + 0.6);
            osc.frequency.linearRampToValueAtTime(800, t + 0.9);
            osc.frequency.linearRampToValueAtTime(600, t + 1.2);

            gain.gain.linearRampToValueAtTime(0.1, t + 1.2);
            gain.gain.linearRampToValueAtTime(0, t + 1.5);

            osc.start(t);
            osc.stop(t + 1.5);
            break;

        case 'water':
            // White noise for water hiss
            playNoise(1.5, 'lowpass');
            break;

        case 'fire':
            // Crackling noise
            playNoise(2.0, 'highpass');
            createCrackles(10);
            break;

        case 'engine':
            // Low rumble
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(60, t);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 1.0);
            osc.start(t);
            osc.stop(t + 1.0);
            break;

        case 'success':
            // Ta-da!
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, t);
            osc.frequency.setValueAtTime(600, t + 0.1);
            osc.frequency.setValueAtTime(1000, t + 0.2); // Ding!
            gain.gain.setValueAtTime(0.1, t);
            gain.gain.linearRampToValueAtTime(0, t + 0.5);
            osc.start(t);
            osc.stop(t + 0.5);
            break;
    }
}

function playNoise(duration, filterType) {
    if (!audioCtx) return;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.15;

    // Filter to make it sound like water or fire
    const filter = audioCtx.createBiquadFilter();
    if (filterType === 'lowpass') {
        filter.type = 'lowpass';
        filter.frequency.value = 1000; // Muffled water sound
    } else {
        filter.type = 'highpass';
        filter.frequency.value = 1000; // Thin cracking fire sound
    }

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    // Envelope
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    noise.start();
}

function createCrackles(count) {
    if (!audioCtx) return;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.value = 800 + Math.random() * 500;
            gain.gain.value = 0.1;
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + 0.05); // Short pop
        }, Math.random() * 1000);
    }
}
