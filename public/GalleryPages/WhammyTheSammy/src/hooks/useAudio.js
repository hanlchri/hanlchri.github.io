import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio() {
    const audioCtxRef = useRef(null);
    const [unlocked, setUnlocked] = useState(false);
    const droneRef = useRef(null);

    const unlockAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioCtxRef.current = new AC();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        setUnlocked(!!audioCtxRef.current);
    }, []);

    const beep = useCallback((freq = 220, dur = 0.08, type = 'square', volume = 0.05) => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = volume;
        o.connect(g).connect(ctx.destination);
        const t = ctx.currentTime;
        o.start(t);
        o.stop(t + Math.max(0.01, dur));
    }, []);

    const noiseBurst = useCallback((dur = 0.12, volume = 0.07) => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const bufferSize = Math.max(256, Math.floor(44100 * dur));
        const buffer = ctx.createBuffer(1, bufferSize, 44100);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.6;

        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const g = ctx.createGain();
        g.gain.value = volume;
        src.connect(g).connect(ctx.destination);
        src.start();
    }, []);

    const startDrone = useCallback(() => {
        if (!audioCtxRef.current || droneRef.current) return;
        const ctx = audioCtxRef.current;
        const o1 = ctx.createOscillator();
        const o2 = ctx.createOscillator();
        const g = ctx.createGain();
        o1.type = 'sawtooth'; o2.type = 'triangle';
        o1.frequency.value = 58; o2.frequency.value = 61;
        g.gain.value = 0.0;
        o1.connect(g); o2.connect(g); g.connect(ctx.destination);
        const t = ctx.currentTime;
        g.gain.linearRampToValueAtTime(0.02, t + 1.0);
        o1.start(); o2.start();
        droneRef.current = { o1, o2, g };
    }, []);

    const stopDrone = useCallback(() => {
        if (!droneRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const t = ctx.currentTime;
        const { o1, o2, g } = droneRef.current;
        g.gain.linearRampToValueAtTime(0.0, t + 0.5);
        try { o1.stop(t + 0.6); o2.stop(t + 0.6); } catch (_) { }
        droneRef.current = null;
    }, []);

    return { unlocked, unlockAudio, beep, noiseBurst, startDrone, stopDrone };
}
