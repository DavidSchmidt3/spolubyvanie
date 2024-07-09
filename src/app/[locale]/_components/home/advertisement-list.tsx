import Advertisement from "@/app/[locale]/_components/home/advertisement";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement-pagination";
import { getAdvertisements } from "@/lib/data/actions/advertisements";
import { type AdvertisementFullSchemaValues } from "@/lib/data/actions/advertisements/schema";
import { type SafeParseReturnType } from "zod";

type Props = {
  safelyParsedSearchParams: SafeParseReturnType<
    AdvertisementFullSchemaValues,
    AdvertisementFullSchemaValues
  >;
};

export default async function AdvertisementList({
  safelyParsedSearchParams,
}: Props) {
  console.time("fetching advertisements");
  const advertisementsActionFetchResult = await getAdvertisements(
    safelyParsedSearchParams.success ? safelyParsedSearchParams.data : null
  );
  console.timeEnd("fetching advertisements");

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
        />
      )}
    </div>
  );
}
