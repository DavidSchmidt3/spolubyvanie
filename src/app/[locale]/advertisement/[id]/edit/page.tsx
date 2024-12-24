import AdvertisementForm from "@/app/[locale]/_components/advertisement/form";
import NotFound from "@/app/[locale]/_components/advertisement/not-found";
import LoginPrompt from "@/app/[locale]/_components/edit-advertisement/login-prompt";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import {
  getDistricts,
  getMunicipalities,
  getRegions,
} from "@/lib/data/administrative-divisions";
import {
  getAdvertisement,
  getAdvertisementPhotosFiles,
} from "@/lib/data/advertisement";
import { getFormDefaultValues } from "@/lib/data/advertisement/format";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import { getUser } from "@/lib/data/user";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { redirect } from "@/lib/utils/localization/navigation";

type Props = {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
};

export default async function AdvertisementEdit({ params }: Props) {
  const { id, locale } = await params;

  const [user, regions, districts, municipalities, advertisement, properties] =
    await Promise.all([
      getUser(),
      getRegions(),
      getDistricts(),
      getMunicipalities(),
      getAdvertisement(id, true),
      getAdvertisementProperties(),
    ]);

  if (!user) {
    return <LoginPrompt />;
  }

  if (!advertisement) {
    return <NotFound />;
  }

  if (user.id !== advertisement.user_id) {
    return redirect({
      locale,
      href: {
        pathname: "/my-advertisements/[page]",
        params: { page: "1" },
      },
    });
  }

  const defaultValues = getFormDefaultValues(locale, properties, advertisement);
  const photos = await getAdvertisementPhotosFiles(
    advertisement.advertisement_photos?.map((photo) => photo.url) ?? []
  );

  return (
    <NextIntlClientProvider
      messages={[
        "translations.advertisement",
        "translations.add_advertisement",
        "translations.advertisement_list",
        "translations.edit_advertisement",
        "alerts.add_advertisement",
      ]}
    >
      <AdvertisementForm
        locale={locale}
        regions={regions}
        districts={districts}
        municipalities={municipalities}
        properties={properties}
        isEdit
        photos={photos}
        initialDefaultValues={defaultValues}
      />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
