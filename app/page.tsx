import React from 'react'
import Link from "next/link";

const page = () => {
  return (
    <div className="text-2xl flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <div>Welcome to Fraction Finder</div>
        <div className="space-y-2">
          <Link href="/selector" className="block hover:underline">Start Searching</Link>
        </div>
    </div>
  )
}

export default page
