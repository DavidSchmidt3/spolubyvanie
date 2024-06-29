import AdministrativeDivisionFilter from "@/app/[locale]/_components/home/administrative-division-filter";
import { AdvertisementTypeFilter } from "@/app/[locale]/_components/home/advertisement-type-filter";
import PriceFilter from "@/app/[locale]/_components/home/price-filter";
import SubmitButton from "@/app/[locale]/_components/home/submit-button";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Card, CardContent } from "@/app/[locale]/_components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/app/[locale]/_components/ui/credenza";
import { Icons } from "@/app/[locale]/_components/ui/icons";
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
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, ["translations.advertisement"])}
    >
      <Card className="rounded-none">
        <CardContent className="py-5 px-5 sm:px-10 flex flex-col sm:flex-row justify-between gap-y-2 gap-x-4 items-center">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-xl sm:text-3xl font-bold">
              {t("advertisement.title")}
            </h1>
            <h2 className="text-md sm:text-lg">
              {t("advertisement.description")}
            </h2>
          </div>
          <Credenza>
            <CredenzaTrigger asChild className="px-4 py-2 sm:py-2">
              <Button
                className="text-md flex gap-2 text-wrap h-14 w-48 bg-foreground text-background hover:bg-accent-foreground hover:text-background"
                variant="outline"
              >
                <Icons.filter className="w-8 h-8" />
                {t("advertisement.filter.title")}
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="max-w-3xl pb-8">
              <CredenzaHeader>
                <CredenzaTitle>{t("advertisement.filter.title")}</CredenzaTitle>
              </CredenzaHeader>
              <CredenzaBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
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
              </CredenzaBody>
            </CredenzaContent>
          </Credenza>
        </CardContent>
      </Card>
      <div className="mt-4 text-center">Tu budú ponuky</div>
    </NextIntlClientProvider>
  );
}
