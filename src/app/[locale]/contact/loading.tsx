import Container from "@/app/[locale]/_components/common/container";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex space-y-2 w-full text-center justify-center">
            <Skeleton className="h-7 w-[350px]" />
          </div>
        </div>
      </div>
    </Container>
  );
}
