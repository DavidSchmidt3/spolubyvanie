import AdvertisementList from "@/app/[locale]/_components/home/advertisement-list";
import AdvertisementFilterDialogTrigger from "@/app/[locale]/_components/home/filter/advertisement-filter-dialog-trigger";
import Loading from "@/app/[locale]/loading-page";
import { ADVERTISEMENTS_FULL_SCHEMA } from "@/lib/data/actions/advertisements/schema";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { createQueryStringFromObject } from "@/lib/utils/localization/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type ParsedUrlQuery } from "querystring";
import { Suspense } from "react";

type Props = {
  searchParams: ParsedUrlQuery;
};

export default async function Home({ searchParams }: Props) {
  const safelyParsedSearchParams =
    ADVERTISEMENTS_FULL_SCHEMA.safeParse(searchParams);

  const [regions, districts, municipalities, messages] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
    getMessages(),
  ]);

  const queryString = createQueryStringFromObject(
    safelyParsedSearchParams?.data ?? {}
  );
  const keyString = `search=${queryString}`;

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.advertisement",
        "alerts.advertisement",
      ])}
    >
      {/* We need to suspense when search params change, therefore pass a key to suspense, so we need to explicitly use this with suspense and not use loading.tsx
        https://github.com/vercel/next.js/issues/53543#issuecomment-1664793532
      */}
      <div className="flex flex-col justify-start h-full overflow-auto">
        <Suspense fallback={<Loading />} key={keyString}>
          <AdvertisementFilterDialogTrigger
            regions={regions}
            districts={districts}
            municipalities={municipalities}
          />
          <AdvertisementList
            safelyParsedSearchParams={safelyParsedSearchParams}
          />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}
