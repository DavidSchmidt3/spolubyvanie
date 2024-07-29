import Advertisement from "@/app/[locale]/_components/advertisement";
import { getAdvertisement } from "@/lib/data/advertisement";
import { type Locale } from "@/lib/utils/localization/i18n";

type Props = {
  params: {
    id: string;
    locale: Locale;
  };
};

export default async function AdvertisementPage({ params }: Props) {
  const { id, locale } = params;
  const advertisement = await getAdvertisement(id);
  if (!advertisement) {
    // return redirect("not-found"); // TODO: Create not-found page
    return <div>Not found</div>;
  }

  return <Advertisement advertisement={advertisement} locale={locale} />;
}
