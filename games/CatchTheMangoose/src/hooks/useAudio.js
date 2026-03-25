import { useRef, useCallback } from 'react';

export function useAudio() {
  const ctxRef = useRef(null);
  const musicRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    const ctx = ctxRef.current;
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const beep = useCallback((freq = 440, dur = 0.08, type = 'square', vol = 0.04) => {
    const ctx = getCtx();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.stop(ctx.currentTime + dur + 0.01);
  }, []);

  const pop = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    // Satisfying pop sound
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(300, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.2);
  }, []);

  const dig = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const bufSize = Math.floor(44100 * 0.05);
    const buf = ctx.createBuffer(1, bufSize, 44100);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.3 * (1 - i / bufSize);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.03;
    src.connect(g).connect(ctx.destination);
    src.start();
  }, []);

  // Simple chiptune loop that can be detuned
  const startMusic = useCallback((detune = 0) => {
    const ctx = getCtx();
    if (!ctx || musicRef.current) return;

    const melody = [262, 294, 330, 349, 392, 349, 330, 294]; // C major scale up and down
    let noteIdx = 0;
    let running = true;

    const playNote = () => {
      if (!running || !ctx) return;
      const freq = melody[noteIdx % melody.length];
      const currentDetune = musicRef.current?.detune || 0;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = freq + currentDetune;
      g.gain.value = 0.02;
      o.connect(g).connect(ctx.destination);
      const t = ctx.currentTime;
      o.start(t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.stop(t + 0.25);
      noteIdx++;
    };

    const id = setInterval(playNote, 300);
    playNote();

    musicRef.current = {
      detune,
      stop: () => { running = false; clearInterval(id); musicRef.current = null; }
    };
  }, []);

  const setDetune = useCallback((d) => {
    if (musicRef.current) musicRef.current.detune = d;
  }, []);

  const stopMusic = useCallback(() => {
    if (musicRef.current) musicRef.current.stop();
  }, []);

  const noiseBurst = useCallback((dur = 0.1, vol = 0.06) => {
    const ctx = getCtx();
    if (!ctx) return;
    const bufSize = Math.floor(44100 * dur);
    const buf = ctx.createBuffer(1, bufSize, 44100);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = vol;
    src.connect(g).connect(ctx.destination);
    src.start();
  }, []);

  return { beep, pop, dig, startMusic, stopMusic, setDetune, noiseBurst };
}
