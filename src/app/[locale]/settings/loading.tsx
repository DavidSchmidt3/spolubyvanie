import Container from "@/app/[locale]/_components/common/container";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="items-center w-full px-4 py-4 sm:px-8 sm:py-8 sm:w-auto sm:justify-center sm:flex sm:flex-col">
        <Skeleton className="w-32 h-9" />
        <div className="grid space-y-3 sm:w-96 md:w-[40rem] mt-2">
          <div className="space-y-1 mt-2">
            <Skeleton className="h-5 w-20" />
            <div className="h-[2px]"></div>
            <Skeleton className="h-9" />
          </div>

          <Skeleton className="h-5 w-16" />
          <div className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 sm:w-96 md:w-[40rem]">
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <Skeleton className="w-full px-2 h-[9rem]" />
              <Skeleton className="w-12 px-2 h-4" />
            </div>
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              <Skeleton className="w-full px-2 h-[9rem]" />
              <Skeleton className="w-12 px-2 h-4" />
            </div>
          </div>
          <div className="h-1"></div>
          <Skeleton className="w-full h-10 mt-20" />
        </div>
      </div>
    </Container>
  );
}
