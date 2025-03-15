export type Platform = "codeforces" | "codechef" | "leetcode";

export interface Contest {
  id: string;
  name: string;
  platform: Platform;
  url: string;
  startTime: string;
  durationMinutes: number;
  solutionUrl?: string;
}
