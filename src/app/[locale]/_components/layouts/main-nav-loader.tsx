import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function MainNavLoader() {
  return (
    <div className="flex flex-col h-full w-full pt-5">
      {/* Collapse button skeleton */}
      <div className="flex items-center justify-start">
        <div className="w-full px-3 py-0">
          <div className="flex items-center gap-3 min-w-0 w-full">
            <Skeleton className="w-5 h-5 flex-shrink-0" />
            <Skeleton className="w-20 h-5 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Navigation links skeleton */}
      <nav className="flex flex-col items-start px-3 gap-y-2 mt-4 w-full">
        {/* Home */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-24 h-5 rounded-sm" />
        </div>

        {/* Map */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-16 h-5 rounded-sm" />
        </div>

        {/* My Advertisements */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-32 h-5 rounded-sm" />
        </div>

        {/* Add Advertisement */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-28 h-5 rounded-sm" />
        </div>

        {/* Contact */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-20 h-5 rounded-sm" />
        </div>
      </nav>

      {/* User section skeleton */}
      <div className="mt-auto flex flex-col w-full px-3 pb-4 gap-y-2">
        <div className="border-t border-border mb-2" />

        {/* Settings */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-20 h-5 rounded-sm" />
        </div>

        {/* Logout */}
        <div className="flex items-center gap-x-3 min-h-8 min-w-0 w-full">
          <Skeleton className="w-5 h-5 flex-shrink-0" />
          <Skeleton className="w-16 h-5 rounded-sm" />
        </div>

        {/* Email */}
        <div className="text-xs text-muted-foreground mt-2 px-1 h-5 flex items-center">
          <Skeleton className="w-32 h-4 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
