import Container from "@/app/[locale]/_components/common/container";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8 mt-1">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex space-y-2 w-full text-center justify-center">
            <Skeleton className="h-8 w-96" />
          </div>

          <div className="gap-4 flex justify-center mt-1">
            <div className="grid gap-3">
              <div className="space-y-1">
                <Skeleton className="h-6 w-72" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
