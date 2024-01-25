'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(`GlobalError: ${error}`);

  return (
    <html>
      <body>
        <h2>Something went wrong!(Global Error)</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
