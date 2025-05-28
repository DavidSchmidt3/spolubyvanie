import Advertisement from "@/app/[locale]/_components/advertisement";
import NotFound from "@/app/[locale]/_components/advertisement/not-found";
import { getAdvertisement } from "@/lib/data/advertisement";
import { getAdvertisementProperties } from "@/lib/data/advertisements-properties";
import { getUser } from "@/lib/data/user";
import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";

type Props = {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
};

export default async function AdvertisementPage({ params }: Props) {
  const { id, locale } = await params;
  const [advertisement, properties, user] = await Promise.all([
    getAdvertisement(id),
    getAdvertisementProperties(),
    getUser(),
  ]);

  if (!advertisement) {
    return <NotFound />;
  }

  return (
    <Advertisement
      user={user}
      advertisement={advertisement}
      locale={locale}
      properties={properties}
    />
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale: locale.code }));
}
