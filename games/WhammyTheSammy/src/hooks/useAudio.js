import { useRef, useCallback } from 'react';

export function useAudio() {
  const audioCtxRef = useRef(null);
  const droneRef = useRef(null);
  const heartbeatRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  };

  const unlockAudio = useCallback(() => {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }, []);

  const beep = useCallback((freq = 220, dur = 0.08, type = 'square', volume = 0.05) => {
    const ctx = getCtx();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = volume;
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.stop(ctx.currentTime + dur + 0.01);
  }, []);

  const noiseBurst = useCallback((dur = 0.12, volume = 0.07) => {
    const ctx = getCtx();
    if (!ctx) return;
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
    const ctx = getCtx();
    if (!ctx || droneRef.current) return;
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.type = 'sawtooth'; o2.type = 'triangle';
    o1.frequency.value = 58; o2.frequency.value = 61;
    g.gain.value = 0.0;
    o1.connect(g); o2.connect(g); g.connect(ctx.destination);
    g.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.5);
    o1.start(); o2.start();
    droneRef.current = { o1, o2, g };
  }, []);

  const stopDrone = useCallback(() => {
    const ctx = getCtx();
    if (!droneRef.current || !ctx) return;
    const { o1, o2, g } = droneRef.current;
    g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.5);
    try { o1.stop(ctx.currentTime + 0.6); o2.stop(ctx.currentTime + 0.6); } catch (_) {}
    droneRef.current = null;
  }, []);

  const startHeartbeat = useCallback((rate = 1.0) => {
    const ctx = getCtx();
    if (!ctx) return;
    if (heartbeatRef.current) return;

    let running = true;
    const beat = () => {
      if (!running || !ctx) return;
      // Double thump
      beep(55, 0.06, 'sine', 0.08);
      setTimeout(() => {
        if (!running) return;
        beep(45, 0.08, 'sine', 0.06);
      }, 120);
    };

    const intervalId = { id: null };
    const schedule = () => {
      const currentRate = heartbeatRef.current?.rate || 1.0;
      const ms = Math.max(200, 800 / currentRate);
      intervalId.id = setTimeout(() => {
        beat();
        if (running) schedule();
      }, ms);
    };
    schedule();

    heartbeatRef.current = {
      rate,
      stop: () => {
        running = false;
        clearTimeout(intervalId.id);
        heartbeatRef.current = null;
      }
    };
  }, [beep]);

  const setHeartbeatRate = useCallback((rate) => {
    if (heartbeatRef.current) heartbeatRef.current.rate = rate;
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) heartbeatRef.current.stop();
  }, []);

  const whisper = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const bufferSize = Math.floor(44100 * 0.6);
    const buffer = ctx.createBuffer(1, bufferSize, 44100);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.sin((i / bufferSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * 0.15 * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 2;
    const g = ctx.createGain();
    g.gain.value = 0.04;
    src.connect(filter).connect(g).connect(ctx.destination);
    src.start();
  }, []);

  return { unlockAudio, beep, noiseBurst, startDrone, stopDrone, startHeartbeat, stopHeartbeat, setHeartbeatRate, whisper };
}
