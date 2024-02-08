'use client';

import { WrapLink } from '@/components/shared/WrapLink';
import { useCounter } from '@/hooks/stores/useCounter';

export const CounterScreen = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <>
      <h1>カウンターページ</h1>
      <p>現在のカウント: {count}</p>
      <div>
        <button onClick={increment}>increment button</button>
      </div>
      <div>
        <button onClick={decrement}>decrement button</button>
      </div>
      <WrapLink href='/app-router/counter-2'>カウンター2ページへ</WrapLink>
    </>
  );
};
