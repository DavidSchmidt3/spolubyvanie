import Advertisement from "@/app/[locale]/_components/home/advertisement";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement-pagination";
import { getAdvertisements } from "@/lib/data/actions/advertisements";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import { type SafeParseReturnType } from "zod";

type Props = {
  safelyParsedSearchParams: SafeParseReturnType<
    AdvertisementFilterFormValues,
    AdvertisementFilterFormValues
  >;
  page: string;
};

export default async function AdvertisementList({
  safelyParsedSearchParams,
  page,
}: Props) {
  const advertisementsActionFetchResult = await getAdvertisements(
    safelyParsedSearchParams.success
      ? { ...safelyParsedSearchParams.data, page }
      : { page }
  );

  const paginationData = advertisementsActionFetchResult?.data?.paginationData;
  const advertisements = advertisementsActionFetchResult?.data?.advertisements;
  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      {advertisements?.length ? (
        advertisements.map((advertisement) => (
          <Advertisement key={advertisement.id} advertisement={advertisement} />
        ))
      ) : (
        <AdvertisementListNoResults />
      )}
      {paginationData && (
        <AdvertisementPagination
          paginationData={paginationData}
          safelyParsedSearchParams={safelyParsedSearchParams}
          page={page}
        />
      )}
    </div>
  );
}
