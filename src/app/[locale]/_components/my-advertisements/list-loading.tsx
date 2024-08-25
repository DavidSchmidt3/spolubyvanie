import AdvertisementLoading from "@/app/[locale]/_components/home/advertisement/preview-loading";
import { Skeleton } from "@/app/[locale]/_components/ui/skeleton";

export default function MyAdvertisementsListLoading() {
  return (
    <div className="flex flex-col justify-between h-full overflow-auto">
      <div className="flex flex-col w-full gap-y-3 items-center text-center mt-12">
        <Skeleton className="w-52 h-10" />
        <Skeleton className="w-44 h-10" />
      </div>
      <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8 mt-6">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <AdvertisementLoading key={index} showActions={true} />
          ))}
      </div>
    </div>
  );
}
