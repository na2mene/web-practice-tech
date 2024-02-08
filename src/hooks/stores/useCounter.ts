import { useAtom } from 'jotai';
import { counterAtom } from '@/stores/counterAtom';

export const useCounter = () => {
  const [count, setCount] = useAtom(counterAtom);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return {
    count,
    increment,
    decrement,
  };
};
