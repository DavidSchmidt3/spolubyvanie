"use client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

// This file is intentionally not named "loading.tsx" to not wrap whole page in suspense
// We need to suspense when search params change, therefore pass a key to suspense, so we need to explicitly use this with suspense
export default function Loading() {
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
            <Card key={index} className="w-full h-auto p-6">
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
          ))}
      </div>
    </div>
  );
}
