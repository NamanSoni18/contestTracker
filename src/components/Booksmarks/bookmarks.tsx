import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import ContestCard from "@/components/contest-card"
import type { Contest } from "@/lib/types"
import { EmptyState } from "@/components/empty-state"

export default function BookmarksPage() {
  const [bookmarkedContests, setBookmarkedContests] = useState<Contest[]>([])

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedContests")
    if (storedBookmarks) {
      setBookmarkedContests(JSON.parse(storedBookmarks))
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Bookmarked Contests</h1>

        {bookmarkedContests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No bookmarks yet"
            description="Bookmark contests to see them here"
            link="/"
            linkText="Browse Contests"
          />
        )}
      </div>
    </main>
  )
}

