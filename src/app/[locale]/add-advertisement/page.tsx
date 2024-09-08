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
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Page() {
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
        "alerts.add_advertisement",
      ])}
    >
      <AdvertisementForm
        regions={regions}
        districts={districts}
        municipalities={municipalities}
        properties={properties}
      />
    </NextIntlClientProvider>
  );
}
