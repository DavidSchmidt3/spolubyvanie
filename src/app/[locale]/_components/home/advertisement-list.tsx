import Advertisement from "@/app/[locale]/_components/home/advertisement";
import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement-list-no-results";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement-pagination";
import { getAdvertisements } from "@/lib/data/advertisements";
import { getTranslations } from "next-intl/server";
import { type ParsedUrlQuery } from "querystring";

type Props = {
  searchParams: ParsedUrlQuery;
  page: string;
};

export default async function AdvertisementList({ searchParams, page }: Props) {
  const advertisementsFetchResult = await getAdvertisements(searchParams, page);
  const { advertisements, paginationData } = advertisementsFetchResult;
  const t = await getTranslations("translations.advertisement_list");

  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      {advertisements?.length ? (
        advertisements.map((advertisement) => (
          <Advertisement key={advertisement.id} advertisement={advertisement} />
        ))
      ) : (
        <AdvertisementListNoResults title={t("no_results.title")} />
      )}
      {paginationData && (
        <AdvertisementPagination
          paginationData={paginationData}
          searchParams={searchParams}
          page={page}
        />
      )}
    </div>
  );
}
