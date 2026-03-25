import { useEffect, useRef } from 'react';

export function useGameLoop(callback, running = true) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const animate = time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        const dt = Math.min(0.05, deltaTime / 1000);
        cbRef.current(dt, time);
      }
      previousTimeRef.current = time;
      if (running) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    };
  }, [running]);
}
