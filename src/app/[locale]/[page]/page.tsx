import Loading from "@/app/[locale]/[page]/loading";
import AdvertisementList from "@/app/[locale]/_components/home/advertisement/list";
import AdvertisementFilterDataFetcher from "@/app/[locale]/_components/home/filter/adverisement-filter-data-fetcher";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { createQueryStringFromObject } from "@/lib/utils/localization/navigation";
import { type ParsedUrlQuery } from "querystring";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<ParsedUrlQuery>;
  params: Promise<{
    page: string;
    locale: Locale;
  }>;
};

export default async function Home({ searchParams, params }: Props) {
  const awaitedSearchParams = await searchParams;
  const queryString = createQueryStringFromObject(
    awaitedSearchParams as Record<string, string | string[]>
  );
  const keyString = `search=${queryString}`;

  return (
    <NextIntlClientProvider
      messages={[
        "translations.advertisement",
        "translations.advertisement_list",
        "alerts.advertisement",
        "alerts.filters",
      ]}
    >
      {/* We need to suspense when search params change, therefore pass a key to suspense, so we need to explicitly use this with suspense both with loading.tsx
        https://github.com/vercel/next.js/issues/53543#issuecomment-1664793532
      */}
      <div className="flex flex-col justify-start h-full overflow-auto">
        <Suspense fallback={<Loading />} key={keyString}>
          <AdvertisementFilterDataFetcher />
          <AdvertisementList
            params={params}
            searchParams={awaitedSearchParams}
          />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
