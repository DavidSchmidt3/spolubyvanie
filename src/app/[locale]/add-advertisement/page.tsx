import AddAdvertisementForm from "@/app/[locale]/_components/add-advertisement/form";
import LoginPrompt from "@/app/[locale]/_components/add-advertisement/login-prompt";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Page() {
  const [user, messages, regions, districts, municipalities] =
    await Promise.all([
      getUser(),
      getMessages(),
      getRegions(),
      getDistricts(),
      getMunicipalities(),
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
      <AddAdvertisementForm
        regions={regions}
        districts={districts}
        municipalities={municipalities}
      />
    </NextIntlClientProvider>
  );
}
