import AdvertisementFilter from "@/app/[locale]/_components/home/advertisement-filter";
import AdvertisementList from "@/app/[locale]/_components/home/advertisement-list";
import AdvertisementPagination from "@/app/[locale]/_components/home/advertisement-pagination";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/utils/data/administrative-divisions";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Home() {
  const [regions, districts, municipalities, messages] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
    getMessages(),
  ]);

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, ["translations.advertisement"])}
    >
      <div className="flex flex-col justify-between h-full overflow-auto">
        <AdvertisementFilter
          regions={regions}
          districts={districts}
          municipalities={municipalities}
        />
        <AdvertisementList />
        <AdvertisementPagination />
      </div>
    </NextIntlClientProvider>
  );
}
