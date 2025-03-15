import { Link } from "react-router-dom"; 
import { BookmarkX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export function EmptyState({
  title,
  description,
  link,
  linkText,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <BookmarkX className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Button asChild className="mt-6">
        <Link to={link}>{linkText}</Link>
      </Button>
    </div>
  );
}
