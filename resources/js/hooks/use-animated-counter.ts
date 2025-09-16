import { useEffect, useState } from 'react';

export default function useAnimatedCounter(target: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.floor(target);
    if (start === end) return;

    const incrementTime = duration / end;

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
