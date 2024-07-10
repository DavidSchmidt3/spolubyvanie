import AdvertisementList from "@/app/[locale]/_components/home/advertisement-list";
import AdvertisementFilterDataFetcher from "@/app/[locale]/_components/home/filter/adverisement-filter-data-fetcher";
import Loading from "@/app/[locale]/loading";
import { ADVERTISEMENTS_FILTER_SCHEMA } from "@/lib/data/actions/advertisements/schema";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { createQueryStringFromObject } from "@/lib/utils/localization/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type ParsedUrlQuery } from "querystring";
import { Suspense } from "react";

type Props = {
  searchParams: ParsedUrlQuery;
  params: {
    page: string;
  };
};

export default async function Home({ params, searchParams }: Props) {
  const safelyParsedSearchParams =
    ADVERTISEMENTS_FILTER_SCHEMA.safeParse(searchParams);

  const messages = await getMessages();
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
      {/* We need to suspense when search params change, therefore pass a key to suspense, so we need to explicitly use this with suspense both with loading.tsx
        https://github.com/vercel/next.js/issues/53543#issuecomment-1664793532
      */}
      <div className="flex flex-col justify-start h-full overflow-auto">
        <Suspense fallback={<Loading />} key={keyString}>
          <AdvertisementFilterDataFetcher />
          <AdvertisementList
            page={params.page}
            safelyParsedSearchParams={safelyParsedSearchParams}
          />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}
