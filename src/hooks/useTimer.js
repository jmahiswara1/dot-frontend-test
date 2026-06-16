import { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

export function useTimer() {
  const { timeRemaining, tickTimer, status } = useQuizStore();

  useEffect(() => {
    if (status !== 'playing') return;

    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [status, tickTimer]);

  return { timeRemaining };
}
