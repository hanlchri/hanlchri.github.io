import { useEffect, useRef } from 'react';

export function useGameLoop(callback, running = true) {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            // Cap dt to avoid huge jumps if tab is inactive
            const dt = Math.min(0.05, deltaTime / 1000);
            callback(dt, time);
        }
        previousTimeRef.current = time;
        if (running) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (running) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
            previousTimeRef.current = undefined;
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [running, callback]);
}
