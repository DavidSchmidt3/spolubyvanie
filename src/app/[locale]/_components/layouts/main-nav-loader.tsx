import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function MainNavLoader() {
  return (
    <div className="flex items-center gap-2 space-x-2 sm:space-x-6 sm:gap-5 lg:space-x-6 sm:mx-6">
      <div className="text-base sm:text-lg">
        <Skeleton className="w-20 sm:w-24 h-5 sm:h-6 rounded-sm" />
      </div>
      <div className="text-base text-center sm:text-lg">
        <Skeleton className="w-32 sm:w-36 h-5 sm:h-6 rounded-sm" />
      </div>
      <div className="text-base text-center sm:text-lg hidden sm:block">
        <Skeleton className="w-28 sm:w-36 h-5 sm:h-6 rounded-sm" />
      </div>
      <div className="hidden text-lg sm:block">
        <Skeleton className="w-20 sm:w-24 h-5 sm:h-6 rounded-sm" />
      </div>
    </div>
  );
}
