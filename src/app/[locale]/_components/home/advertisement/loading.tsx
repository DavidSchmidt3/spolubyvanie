import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

type Props = {
  showActions?: boolean;
};

export default function AdvertisementLoading({ showActions }: Props) {
  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2 flex-col gap-y-2 items-center relative justify-between">
        <Skeleton className="w-1/2 h-9" />
        <Skeleton className="w-48 h-11" />
        {showActions && (
          <div className="flex gap-2">
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-40 h-10" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-2 xl:p-3 pt-3 flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full">
        <div className="w- flex justify-center lg:justify-start">
          <div className="relative flex flex-shrink-0 h-min justify-center w-full lg:w-80 xl:w-96 max-w-80 xl:max-w-96">
            <Skeleton className="w-full pt-[75%] rounded-sm" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 relative w-full">
          <div className="h-52 lg:h-full w-full">
            <Skeleton className="text-wrap break-words text-justify lg:px-2 xl:px-8 md:flex-grow w-full h-full" />
          </div>
          <div className="flex flex-col gap-y-3 w-full md:w-72 lg:w-60 xl:w-72 flex-shrink-0">
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
