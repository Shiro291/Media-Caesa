import { useRef, useCallback } from 'react';

type SoundType = 'click' | 'siren' | 'water' | 'fire' | 'engine' | 'success';

export const useSound = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    }, []);

    const playSound = useCallback((type: SoundType) => {
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        switch (type) {
            case 'click':
                osc.frequency.setValueAtTime(600, t);
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
                osc.start(t);
                osc.stop(t + 0.1);
                break;

            case 'siren':
                osc.type = 'sawtooth';
                gain.gain.setValueAtTime(0.1, t);
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

            case 'engine':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(60, t);
                gain.gain.setValueAtTime(0.2, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 1.0);
                osc.start(t);
                osc.stop(t + 1.0);
                break;

            case 'success':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, t);
                osc.frequency.setValueAtTime(600, t + 0.1);
                osc.frequency.setValueAtTime(1000, t + 0.2);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.linearRampToValueAtTime(0, t + 0.5);
                osc.start(t);
                osc.stop(t + 0.5);
                break;

            case 'water':
                playNoise(ctx, 1.5, 'lowpass');
                break;

            case 'fire':
                playNoise(ctx, 2.0, 'highpass');
                break;
        }
    }, [initAudio]);

    return { playSound, initAudio };
};

// Helpers
function playNoise(ctx: AudioContext, duration: number, filterType: 'lowpass' | 'highpass') {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    if (filterType === 'lowpass') {
        filter.type = 'lowpass';
        filter.frequency.value = 1000;
    } else {
        filter.type = 'highpass';
        filter.frequency.value = 1000;
    }

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.start();
}


