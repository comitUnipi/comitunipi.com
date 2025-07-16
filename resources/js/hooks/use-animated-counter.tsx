import { useEffect, useState } from 'react';

export function useAnimatedCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target, 10);
        if (start === end) return;

        const incrementTime = (duration / end) * 1;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
}
