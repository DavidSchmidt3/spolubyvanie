import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/price-filter";
import SubmitButton from "@/app/[locale]/_components/home/submit-button";
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
    <main>
      <NextIntlClientProvider
        messages={pickLocaleMessages(messages, ["translations.advertisement"])}
      >
        <div className="mt-2 px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-x-6 lg:gap-xl-16 gap-y-2">
            <AdministrativeDivisionFilter
              regions={regions}
              districts={districts}
              municipalities={municipalities}
            />
            <PriceFilter />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 gap-4 w-full">
            <AdvertisementTypeFilter />
            <SubmitButton />
          </div>
        </div>
      </NextIntlClientProvider>
    </main>
  );
}
