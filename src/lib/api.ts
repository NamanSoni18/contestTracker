import type { Contest } from "./types";

const mockContests: Contest[] = [
  {
    id: "cf-1",
    name: "Codeforces Round #1010 (Div. 1, Div. 2)",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    durationMinutes: 150,
    solutionUrl: "https://codeforces.com/blog/entry/140518",
  },
  {
    id: "cf-2",
    name: "Educational Codeforces Round 155",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(Date.now() - 172800000).toISOString(), // Day after tomorrow
    durationMinutes: 120,
  },
  {
    id: "cc-1",
    name: "CodeChef Starters 100",
    platform: "codechef",
    url: "https://www.codechef.com/contests",
    startTime: new Date(Date.now() - 259200000).toISOString(), // 3 days from now
    durationMinutes: 180,
    solutionUrl: "https://discuss.codechef.com/",
  },
  {
    id: "lc-1",
    name: "LeetCode Weekly Contest 439",
    platform: "leetcode",
    url: "https://leetcode.com/contest/",
    startTime: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    durationMinutes: 90,
    solutionUrl: "https://leetcode.com/discuss/",
  },
  {
    id: "lc-2",
    name: "LeetCode Biweekly Contest 151",
    platform: "leetcode",
    url: "https://leetcode.com/contest/",
    startTime: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    durationMinutes: 90,
  },
  {
    id: "cf-3",
    name: "Codeforces Round #851 (Div. 2)",
    platform: "codeforces",
    url: "https://codeforces.com/contests",
    startTime: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
    durationMinutes: 135,
  },
  {
    id: "cc-3",
    name: "CodeChef Starters 101 (Div. 2)",
    platform: "codechef",
    url: "https://www.codechef.com/contests",
    startTime: new Date(Date.now() - 691200000).toISOString(), // 8 days from now
    durationMinutes: 180,
  },
  {
    id: "lc-3",
    name: "LeetCode Weekly Contest 369",
    platform: "leetcode",
    url: "https://leetcode.com/contest/",
    startTime: new Date(Date.now() + 777600000).toISOString(), // 9 days from now
    durationMinutes: 90,
  },
];

// In a real application, this would fetch from an API
export async function fetchContests(): Promise<Contest[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Sort contests by start time (ascending)
  return [...mockContests].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

