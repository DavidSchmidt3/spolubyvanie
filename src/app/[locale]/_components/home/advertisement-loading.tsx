import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function AdvertisementLoading() {
  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2 justify-center items-center pr-3">
        <Skeleton className="w-1/2 h-9" />
      </CardHeader>
      <CardContent className="grid relative p-3 pt-3 grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full">
        <div className="relative w-full pt-[75%]">
          <div className="absolute top-0 left-0 w-full h-full flex bg-card items-start justify-center">
            <Skeleton className="w-full pt-[75%] rounded-lg" />
          </div>
        </div>
        <div className="grid grid-rows-1 xl:grid-cols-2 gap-4">
          <div className="w-full h-full">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-4 mt-2" />
              ))}
          </div>
          <div className="flex flex-col gap-y-4 justify-start">
            <div className="flex justify-between text-xl gap-x-8">
              <Skeleton className="w-24 px-2" />
              <Skeleton className="w-full px-2 h-6" />
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <Skeleton className="w-24 px-2" />
              <Skeleton className="w-full px-2 h-6" />
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <Skeleton className="w-24 px-2" />
              <Skeleton className="w-full px-2 h-6" />
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <Skeleton className="w-24 px-2" />
              <Skeleton className="w-full px-2 h-6" />
            </div>
            <div className="flex justify-between text-xl gap-x-8">
              <Skeleton className="w-24 px-2" />
              <Skeleton className="w-full px-2 h-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
