import AdvertisementLoading from "@/app/[locale]/_components/home/advertisement/preview-loading";
import { Card, CardContent } from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function AdvertisementListLoading() {
  return (
    <div className="flex flex-col justify-between h-full overflow-auto">
      <Card className="rounded-none">
        <CardContent className="flex flex-col items-center justify-between px-5 py-4 sm:px-10 sm:flex-row gap-y-4 gap-x-6">
          <div className="flex justify-start items-start flex-col w-full sm:w-auto gap-y-4 mt-2">
            <Skeleton className="w-full sm:w-[400px] h-8" />
            <Skeleton className="w-full sm:w-[500px] h-6 mt-1 mb-1" />
          </div>
          <Skeleton className="rounded-md w-48 px-2 flex items-center justify-between text-wrap h-14 bg-foreground text-background border border-input">
            <Skeleton className="w-8 ml-2 h-5" />
            <div className="w-full justify-center flex">
              <Skeleton className="w-20 h-5" />
            </div>
          </Skeleton>
        </CardContent>
      </Card>
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <AdvertisementLoading key={index} />
          ))}
      </div>
    </div>
  );
}
