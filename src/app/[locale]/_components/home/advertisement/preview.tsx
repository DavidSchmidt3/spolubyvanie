import AdvertisementPreviewContent from "@/app/[locale]/_components/advertisement/preview-content";
import type { Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";
import type { Locale } from "@/lib/utils/localization/i18n";

type Props = {
  advertisement: AdvertisementType;
  locale: Locale;
};

export default function AdvertisementPreview({ advertisement, locale }: Props) {
  return (
    <AdvertisementPreviewContent
      advertisement={advertisement}
      locale={locale}
    />
  );
}
