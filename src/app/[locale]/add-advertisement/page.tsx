import LoginPrompt from "@/app/[locale]/_components/add-advertisement/login-prompt";
import AdvertisementForm from "@/app/[locale]/_components/advertisement/form";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { type Locale } from "@/lib/utils/localization/i18n";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const [user, messages, regions, districts, municipalities, properties] =
    await Promise.all([
      getUser(),
      getMessages(),
      getRegions(),
      getDistricts(),
      getMunicipalities(),
      getAdvertisementProperties(),
    ]);

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.advertisement",
        "translations.add_advertisement",
        "translations.advertisement_list",
        "alerts.add_advertisement",
      ])}
    >
      <AdvertisementForm
        locale={locale}
        regions={regions}
        districts={districts}
        municipalities={municipalities}
        properties={properties}
      />
    </NextIntlClientProvider>
  );
}
