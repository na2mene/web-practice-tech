'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800">
      <Link href="#">
        <BriefcaseIcon className="h-6 w-6" />
        <span className="sr-only">JobSite</span>
      </Link>
      <div className="flex-1 mx-4">
        <Input
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search for jobs..."
          type="search"
        />
      </div>
      <nav className="flex items-center space-x-4">
        <Link
          className={`${pathname === '/app-router' ? 'bg-sky-100 text-blue-600' : ''}text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`} href="/app-router">
          Home
        </Link>
        <Link className={`${pathname === '/app-router/job_offers' ? 'bg-sky-100 text-blue-600' : ''}text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`} href="/app-router/job_offers">
          Jobs
        </Link>
        <Link className={`${pathname === '/app-router/dashboard' ? 'bg-sky-100 text-blue-600' : ''}text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`} href="/app-router/dashboard">
          Dashboard
        </Link>
        <Link className={`${pathname === '/app-router/about' ? 'bg-sky-100 text-blue-600' : ''}text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`} href="#">
          About
        </Link>
        <Link className={`${pathname === '/app-router/contact' ? 'bg-sky-100 text-blue-600' : ''}text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`} href="#">
          Contact
        </Link>
      </nav>
    </header>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
