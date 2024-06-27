import Container from "@/app/[locale]/_components/common/container";
import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/advertisement-type-filter";
import CollapsibleWrapper from "@/app/[locale]/_components/home/collapsible-wrapper";
import PriceFilter from "@/app/[locale]/_components/home/price-filter";
import SubmitButton from "@/app/[locale]/_components/home/submit-button";
import { Card } from "@/app/[locale]/_components/ui/card";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/utils/data/administrative-divisions";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function Home() {
  const [regions, districts, municipalities, messages] = await Promise.all([
    getRegions(),
    getDistricts(),
    getMunicipalities(),
    getMessages(),
  ]);
  const t = await getTranslations("translations");

  return (
    <Container fullWidth className="flex justify-center sm:py-0">
      <NextIntlClientProvider
        messages={pickLocaleMessages(messages, ["translations.advertisement"])}
      >
        <div className="flex justify-center">
          <Card className="mx-4 sm:mx-10 max-w-2xl w-full">
            <CollapsibleWrapper title={t("advertisement.filter.title")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdministrativeDivisionFilter
                  regions={regions}
                  districts={districts}
                  municipalities={municipalities}
                />
                <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
                  <PriceFilter />
                  <AdvertisementTypeFilter />
                </div>
                <SubmitButton />
              </div>
            </CollapsibleWrapper>
          </Card>
        </div>
      </NextIntlClientProvider>
    </Container>
  );
}
