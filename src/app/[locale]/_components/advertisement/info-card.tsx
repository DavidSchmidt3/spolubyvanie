import InfoRow from "@/app/[locale]/_components/advertisement/info-row";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { AdType, adTypeKeys } from "@/lib/data/advertisements/types";
import { formatDate } from "@/lib/utils/date";
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
    views,
    min_age,
    max_age,
  } = advertisement;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-10">
      <div className="flex flex-col gap-y-4">
        <InfoRow
          label={t("advertisement.type.label")}
          value={t(
            `advertisement.types.${adTypeKeys[type as keyof typeof adTypeKeys]}`
          )}
        />
        <InfoRow label={t("advertisement.price.label")} value={`${price} €`} />
        {type === AdType.OfferingRoom && (
          <InfoRow label={t("advertisement.street.label")} value={street} />
        )}
        <InfoRow
          label={t("advertisement.municipality.title")}
          value={municipality}
        />
        <InfoRow label={t("advertisement.district.title")} value={district} />
        <InfoRow label={t("advertisement.region.title")} value={region} />
        <InfoRow label={t("advertisement.views.title")} value={views} />
      </div>
      <div className="flex flex-col gap-y-4">
        <InfoRow
          label={t("advertisement.room_area.label")}
          value={room_area ? `${room_area} m²` : null}
        />
        <InfoRow
          label={t("advertisement.apartment_area.label")}
          value={apartment_area ? `${apartment_area} m²` : null}
        />
        <InfoRow
          label={t("advertisement.apartment_rooms.label")}
          value={apartment_rooms ?? "-"}
        />
        <InfoRow label={t("advertisement.floor.label")} value={floor} />
        <InfoRow label={t("advertisement.max_floor.label")} value={max_floor} />
        <InfoRow
          label={
            type === AdType.OfferingRoom
              ? t("advertisement.available_from.label")
              : t("advertisement.searching_from.label")
          }
          value={formatDate(available_from, locale)}
        />
        <InfoRow
          label={
            type === AdType.OfferingRoom
              ? t("advertisement.age.range.title")
              : t("advertisement.age.label")
          }
          value={
            type === AdType.OfferingRoom
              ? `${min_age ? min_age.toString() : ""} - ${
                  max_age ? max_age.toString() : ""
                }`
              : min_age
              ? min_age.toString()
              : ""
          }
        />
      </div>
    </div>
  );
}
