import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Contest } from "@/lib/types";
import { cn } from "@/lib/utils";

const API_KEY = "AIzaSyCKqrCmCVyCoKkd8E1BuouiyVB83UzNdi8";
// const API_KEY = "";

interface ContestCardProps {
  contest: Contest;
}

export default function ContestCard({ contest }: ContestCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [solutionUrl, setSolutionUrl] = useState<string | null>(null);
  const [isPastContest, setIsPastContest] = useState(false);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedContests");
    if (storedBookmarks) {
      const bookmarks = JSON.parse(storedBookmarks);
      setIsBookmarked(
        bookmarks.some((bookmark: Contest) => bookmark.id === contest.id)
      );
    }
  }, [contest.id]);

  useEffect(() => {
    // Check if the contest is in the past
    const now = new Date();
    const contestEndTime = new Date(
      new Date(contest.startTime).getTime() + contest.durationMinutes * 60000
    );
    setIsPastContest(contestEndTime < now);

    // Fetch solution video only for past contests
    if (contestEndTime < now) {
      fetchSolutionVideo();
    }
  }, [contest.startTime, contest.durationMinutes]);

  const toggleBookmark = () => {
    const storedBookmarks = localStorage.getItem("bookmarkedContests");
    let bookmarks: Contest[] = storedBookmarks
      ? JSON.parse(storedBookmarks)
      : [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter(
        (bookmark: Contest) => bookmark.id !== contest.id
      );
    } else {
      bookmarks.push(contest);
    }

    localStorage.setItem("bookmarkedContests", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "codeforces":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "codechef":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
      case "leetcode":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    }
  };

  const formatDuration = (durationMinutes: number) => {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const fetchSolutionVideo = async () => {
    const contestName = contest.name; // Ensure contest.name is the full contest title (e.g., "Codeforces Round #850")
    const platform = contest.platform.toLowerCase();

    // Define playlist IDs for each platform
    const playlistIds = {
      leetcode: "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
      codeforces: "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
      codechef: "PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr",
    };

    // Get the playlist ID for the current platform
    const playlistId = playlistIds[platform as keyof typeof playlistIds];

    if (!playlistId) {
      console.error("No playlist found for platform:", platform);
      setSolutionUrl(null);
      return;
    }

    const searchQuery = `${contestName} solutions`;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      searchQuery
    )}&playlistId=${playlistId}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setSolutionUrl(
          `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`
        );
      } else {
        console.error("No videos found for:", searchQuery);
        setSolutionUrl(null);
      }
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="line-clamp-1 text-lg font-bold">
          {contest.name}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            isBookmarked && "text-primary hover:text-primary/80"
          )}
          onClick={toggleBookmark}
        >
          <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          <span className="sr-only">Bookmark</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <Badge
          variant="secondary"
          className={cn("capitalize", getPlatformColor(contest.platform))}
        >
          {contest.platform}
        </Badge>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p className="font-medium">
              {format(new Date(contest.startTime), "MMM dd, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Start Time</p>
            <p className="font-medium">
              {format(new Date(contest.startTime), "hh:mm a")}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">
              {formatDuration(contest.durationMinutes)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium">
              {new Date(contest.startTime) > new Date()
                ? "Upcoming"
                : isPastContest
                ? "Past"
                : "Ongoing"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <span>View Contest</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
        {isPastContest && (
          <Button variant="secondary" size="sm" asChild disabled={!solutionUrl}>
            <a
              href={solutionUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {solutionUrl ? "Solutions" : "Loading..."}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
