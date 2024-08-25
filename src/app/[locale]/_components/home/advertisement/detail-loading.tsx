import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

function InfoRow() {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <Skeleton className="h-5 w-12" />
      <Skeleton className="h-5 w-full" />
    </div>
  );
}

export default function AdvertisementDetailLoading() {
  return (
    <Card className="w-full h-auto p-6 rounded-none">
      <CardHeader className="relative flex-col items-center justify-between p-0 pb-2 gap-y-2">
        <Skeleton className="w-1/2 h-8" />
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4 p-4 sm:p-8 sm:gap-6 xl:gap-8">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-10 w-full">
          <div className="flex flex-col gap-y-4">
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
          </div>
          <div className="flex flex-col gap-y-4">
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
            <InfoRow />
          </div>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="w-full max-w-4xl">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
