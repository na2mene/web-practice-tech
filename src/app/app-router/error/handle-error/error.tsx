'use client';

export default function HandleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <div>
      <h2>Something went wrong!(Handle Error)</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
