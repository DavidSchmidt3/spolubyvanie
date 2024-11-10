import Container from "@/app/[locale]/_components/common/container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function AddAdvertisementLoading() {
  return (
    <Container className="p-1 sm:py-3" fullWidth>
      <div className="flex justify-center w-full space-y-2 text-center">
        <Skeleton className="w-48 h-8" />
      </div>
      <div className="grid grid-cols-1 gap-2 mx-4 mt-4 gap-y-4 sm:gap-4 md:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-24 h-6" />
            </CardTitle>
            <span>
              <Skeleton className="w-48 h-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="relative flex flex-col justify-center w-full gap-1">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10 mt-4" />
            </div>
            <div className="mt-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10 mt-4" />
            </div>
            <div className="mt-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10 mt-4" />
            </div>
            <div className="mt-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10 mt-4" />
            </div>
            <div className="mt-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-40 mt-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-24 h-6" />
            </CardTitle>
            <span>
              <Skeleton className="w-48 h-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4 gap-x-4 sm:gap-x-8">
              <div className="mt-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-full h-10 mt-4" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-full h-10 mt-4" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-full h-10 mt-4" />
                <Skeleton className="w-full h-4 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-24 h-6" />
            </CardTitle>
            <span>
              <Skeleton className="w-48 h-4" />
            </span>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-72" />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col mx-4 mt-8">
        <Skeleton className="w-full h-10" />
      </div>
    </Container>
  );
}
