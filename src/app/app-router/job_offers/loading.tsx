 export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-gray-50 rounded-full" />
    </div>
  )
}
