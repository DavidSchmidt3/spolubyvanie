import DetailButton from "@/app/[locale]/_components/home/advertisement/detail-button";
import AdvertisementImages from "@/app/[locale]/_components/home/advertisement/images";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import type { Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";
import { AD_TYPE_KEYS, AdType } from "@/lib/data/advertisements/types";
import { formatDate } from "@/lib/utils/date";
import type { Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

// Shared InfoRow subcomponent
function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between text-left text-base md:text-lg gap-x-8">
      <p>{label}</p>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
}

type Props = {
  advertisement: AdvertisementType;
  locale: Locale;
  actions?: ReactNode;
};

export default function AdvertisementPreviewContent({
  advertisement,
  locale,
  actions,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const {
    price,
    title,
    type,
    description,
    street,
    room_area,
    apartment_rooms,
    municipality,
    district,
    region,
    updated_at,
    views,
    min_age,
    available_from,
    max_age,
    id,
  } = advertisement;

  function formatAgeRange(
    type: AdType,
    minAge: number | null,
    maxAge: number | null
  ): string {
    if (type === AdType.OfferingRoom) {
      const minAgeStr = minAge?.toString() ?? "";
      const maxAgeStr = maxAge?.toString() ?? "";
      return `${minAgeStr} - ${maxAgeStr}`;
    }
    return minAge?.toString() ?? "-";
  }

  return (
    <Card className="w-full h-auto p-6 px-6 sm:px-8">
      <CardHeader className="p-0 pb-2 flex-col gap-y-2 items-center relative justify-between">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-left w-full">
          {title}
        </h3>
        {actions}
      </CardHeader>
      <CardContent className="p-0 pt-3 flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full">
        <div className="relative flex flex-shrink-0 flex-col items-center gap-y-4 h-min justify-center w-full lg:w-80 xl:w-96">
          <AdvertisementImages advertisement={advertisement} />
          <DetailButton id={id} text={t("detail.link")} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 relative">
          <p className="text-wrap break-words text-justify lg:px-2 xl:px-8 md:flex-grow overflow-auto">
            {description}
          </p>
          <div className="flex flex-col gap-y-3 w-full md:w-72 lg:w-60 xl:w-72 flex-shrink-0">
            <InfoRow
              label={t("type.label")}
              value={t(
                `types.${AD_TYPE_KEYS[type as keyof typeof AD_TYPE_KEYS]}`
              )}
            />
            <InfoRow label={t("price.label")} value={`${price} €`} />
            <InfoRow label={t("street.label")} value={street} />
            <InfoRow label={t("municipality.title")} value={municipality} />
            <InfoRow label={t("district.title")} value={district} />
            <InfoRow label={t("region.title")} value={region} />
            <InfoRow
              label={t("date_upserted.title")}
              value={formatDate(updated_at, locale)}
            />
            <InfoRow
              label={
                type === AdType.OfferingRoom
                  ? t("available_from.label")
                  : t("searching_from.label")
              }
              value={formatDate(available_from, locale)}
            />
            {type === AdType.OfferingRoom && (
              <>
                <InfoRow
                  label={t("room_area.label")}
                  value={`${room_area ?? "-"} m²`}
                />
                <InfoRow
                  label={t("apartment_rooms.label")}
                  value={apartment_rooms?.toString() ?? "-"}
                />
              </>
            )}
            <InfoRow
              label={
                type === AdType.OfferingRoom
                  ? t("age.range.title")
                  : t("age.label")
              }
              value={formatAgeRange(type, min_age, max_age)}
            />
            <div className="flex justify-end text-base md:text-lg items-center gap-x-2">
              {views}
              <Icons.eye className="w-6 h-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
