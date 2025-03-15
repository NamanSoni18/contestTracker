import type { Platform } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PlatformFilterProps {
  selectedPlatforms: Platform[]
  onPlatformChange: (platform: Platform) => void
}

export function PlatformFilter({ selectedPlatforms, onPlatformChange }: PlatformFilterProps) {
  const platforms: { id: Platform; name: string; color: string }[] = [
    {
      id: "codeforces",
      name: "Codeforces",
      color: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30",
    },
    {
      id: "codechef",
      name: "CodeChef",
      color:
        "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30",
    },
    {
      id: "leetcode",
      name: "LeetCode",
      color:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30",
    },
  ]

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Platform</h2>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Badge
            key={platform.id}
            variant="outline"
            className={cn(
              "cursor-pointer border-2 px-3 py-1 text-sm font-medium transition-colors",
              selectedPlatforms.includes(platform.id)
                ? platform.color
                : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
            onClick={() => onPlatformChange(platform.id)}
          >
            {platform.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

