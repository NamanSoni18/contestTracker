import { useEffect, useState } from "react";
import ContestCard from "@/components/contest-card";
import { PlatformFilter } from "@/components/platform-filter";
import type { Contest, Platform } from "@/lib/types";
import { fetchContests } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContestList() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
    "codeforces",
    "codechef",
    "leetcode",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContests = async () => {
      setIsLoading(true);
      try {
        const data = await fetchContests();
        setContests(data);
        setFilteredContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getContests();
  }, []);

  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      setFilteredContests([]);
    } else {
      const filtered = contests.filter((contest) =>
        selectedPlatforms.includes(contest.platform)
      );
      setFilteredContests(filtered);
    }
  }, [selectedPlatforms, contests]);

  const handlePlatformChange = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="space-y-6">
      <PlatformFilter
        selectedPlatforms={selectedPlatforms}
        onPlatformChange={handlePlatformChange}
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
}
