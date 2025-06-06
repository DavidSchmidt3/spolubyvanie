import AdvertisementListNoResults from "@/app/[locale]/_components/home/advertisement/list-no-results";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement/pagination";
import AdvertisementPreview from "@/app/[locale]/_components/home/advertisement/preview";
import { getAdvertisements } from "@/lib/data/advertisements";
import { type Locale } from "@/lib/utils/localization/i18n";
import { getTranslations } from "next-intl/server";
import { type ParsedUrlQuery } from "querystring";

type Props = {
  searchParams: ParsedUrlQuery;
  params: Promise<{
    page: string;
    locale: Locale;
  }>;
};

export default async function AdvertisementList({
  searchParams,
  params,
}: Props) {
  const { page, locale } = await params;
  const advertisementsFetchResult = await getAdvertisements(searchParams, page);
  const { advertisements, paginationData } = advertisementsFetchResult;
  const t = await getTranslations("translations.advertisement_list");

  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      {advertisements?.length ? (
        advertisements.map((advertisement) => (
          <AdvertisementPreview
            key={advertisement.id}
            advertisement={advertisement}
            locale={locale}
          />
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
