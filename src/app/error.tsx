'use client';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(`AppError: ${error}`);

  return (
    <html>
      <body>
        <h2>Something went wrong!(App Error)</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
