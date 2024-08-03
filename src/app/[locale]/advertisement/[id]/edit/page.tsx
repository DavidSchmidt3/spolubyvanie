import AdvertisementForm from "@/app/[locale]/_components/advertisement/form";
import NotFound from "@/app/[locale]/_components/advertisement/not-found";
import LoginPrompt from "@/app/[locale]/_components/edit-advertisement/login-prompt";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import { getAdvertisement } from "@/lib/data/advertisement";
import { getUser } from "@/lib/data/user";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdvertisementEdit({ params: { id } }: Props) {
  const [user, regions, districts, municipalities, messages, advertisement] =
    await Promise.all([
      getUser(),
      getRegions(),
      getDistricts(),
      getMunicipalities(),
      getMessages(),
      getAdvertisement(id),
    ]);

  if (!user) {
    return <LoginPrompt />;
  }

  if (!advertisement) {
    return <NotFound />;
  }

  return (
    <NextIntlClientProvider
      messages={pickLocaleMessages(messages, [
        "translations.advertisement",
        "translations.add_advertisement",
        "translations.edit_advertisement",
        "alerts.add_advertisement",
      ])}
    >
      <AdvertisementForm
        regions={regions}
        districts={districts}
        municipalities={municipalities}
        // isEdit
        // defaultValues={advertisement}
      />
    </NextIntlClientProvider>
  );
}
