import Container from "@/app/[locale]/_components/common/container";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          {/* Title Skeleton */}
          <div className="flex space-y-2 w-full text-center justify-center">
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Form Skeleton */}
          <div className="grid gap-4">
            {/* Email and Password Fields Skeleton */}
            <div className="grid gap-3">
              {/* Email Field Skeleton */}
              <div className="space-y-1">
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Password Field Skeleton */}
              <div className="space-y-1">
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Submit Button Skeleton */}
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Divider Skeleton */}
            <div className="flex w-full justify-center">
              <Skeleton className="h-4 my-2 w-48" />
            </div>

            {/* Google Sign-Up Button Skeleton */}
            <Skeleton className="h-10 w-full" />

            {/* Divider Skeleton */}
            <div className="flex w-full justify-center">
              <Skeleton className="h-4 my-2 w-32" />
            </div>

            {/* Already Have Account Button Skeleton */}
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
