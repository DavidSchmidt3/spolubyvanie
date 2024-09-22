import Advertisement from "@/app/[locale]/_components/advertisement";
import NotFound from "@/app/[locale]/_components/advertisement/not-found";
import { getAdvertisement } from "@/lib/data/advertisement";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import { type Locale } from "@/lib/utils/localization/i18n";

type Props = {
  params: {
    id: string;
    locale: Locale;
  };
};

export default async function AdvertisementPage({ params }: Props) {
  const { id, locale } = params;
  const [advertisement, properties] = await Promise.all([
    getAdvertisement(id),
    getAdvertisementProperties(),
  ]);

  if (!advertisement) {
    return <NotFound />;
  }

  return (
    <Advertisement
      advertisement={advertisement}
      locale={locale}
      properties={properties}
    />
  );
}
