import InfoRow from "@/app/[locale]/_components/advertisement/info-row";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { adTypeKeys } from "@/lib/data/advertisements/types";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

type Props = {
  advertisement: Advertisement;
  locale: Locale;
};

export default function InfoCard({ advertisement, locale }: Props) {
  const t = useTranslations("translations");

  const {
    price,
    type,
    street,
    room_area,
    apartment_area,
    floor,
    available_from,
    max_floor,
    apartment_rooms,
    municipality,
    district,
    region,
  } = advertisement;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-10 w-full">
      <div className="flex flex-col gap-y-4">
        <InfoRow
          label={t("advertisement.type.label")}
          value={t(
            `advertisement.types.${adTypeKeys[type as keyof typeof adTypeKeys]}`
          )}
        />
        <InfoRow label={t("advertisement.price.label")} value={`${price} €`} />
        <InfoRow label={t("advertisement.street.label")} value={street} />
        <InfoRow
          label={t("advertisement.municipality.title")}
          value={municipality}
        />
        <InfoRow label={t("advertisement.district.title")} value={district} />
        <InfoRow label={t("advertisement.region.title")} value={region} />
      </div>
      <div className="flex flex-col gap-y-4">
        <InfoRow
          label={t("advertisement.room_area.label")}
          value={`${room_area} m²`}
        />
        <InfoRow
          label={t("advertisement.apartment_area.label")}
          value={`${apartment_area} m²`}
        />
        <InfoRow
          label={t("advertisement.apartment_rooms.label")}
          value={apartment_rooms}
        />
        <InfoRow label={t("advertisement.floor.label")} value={floor} />
        <InfoRow label={t("advertisement.max_floor.label")} value={max_floor} />
        <InfoRow
          label={t("advertisement.available_from.label")}
          value={available_from?.toLocaleDateString(locale)}
        />
      </div>
    </div>
  );
}
