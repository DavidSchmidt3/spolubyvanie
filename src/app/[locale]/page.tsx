import AdvertisementFilter from "@/app/[locale]/_components/home/advertisement-filter";
import AdvertisementList from "@/app/[locale]/_components/home/advertisement-list";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement-pagination";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/utils/data/administrative-divisions";
import { getAdvertisements } from "@/lib/utils/data/advertisements";
import { ADVERTISEMENTS_FILTER_SCHEMA } from "@/lib/utils/data/advertisements/schema";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type ParsedUrlQuery } from "querystring";

type Props = {
  searchParams: ParsedUrlQuery;
};

export default async function Home({ searchParams }: Props) {
  const safelyParsedSearchParams =
    ADVERTISEMENTS_FILTER_SCHEMA.safeParse(searchParams);

  const [
    regions,
    districts,
    municipalities,
    messages,
    advertisementsActionFetchResult,
  ] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
    getMessages(),
    getAdvertisements(
      safelyParsedSearchParams.success ? safelyParsedSearchParams.data : null
    ),
  ]);

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.advertisement",
        "alerts.advertisement",
      ])}
    >
      <div className="flex flex-col justify-between h-full overflow-auto">
        <AdvertisementFilter
          regions={regions}
          districts={districts}
          municipalities={municipalities}
        />
        <AdvertisementList
          advertisementsActionFetchResult={advertisementsActionFetchResult}
        />
        <AdvertisementPagination />
      </div>
    </NextIntlClientProvider>
  );
}
