import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/utils/data/administrative-divisions";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AdministrativeDivisionFilter from "./_components/home/administrative-division-filter";

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
        messages={pickLocaleMessages(messages, ["translations.filter"])}
      >
        <AdministrativeDivisionFilter
          regions={regions}
          districts={districts}
          municipalities={municipalities}
        />
      </NextIntlClientProvider>
    </main>
  );
}
