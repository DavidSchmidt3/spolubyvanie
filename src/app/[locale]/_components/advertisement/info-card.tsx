import InfoRow from "@/app/[locale]/_components/advertisement/info-row";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useGroupedProperties } from "@/hooks/grouped-properties";
import { type Property } from "@/lib/data/advertisements-properties";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { AdType, adTypeKeys } from "@/lib/data/advertisements/types";
import { formatDate } from "@/lib/utils/date";
import { type Locale } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";

type Props = {
  advertisement: Advertisement;
  locale: Locale;
  properties: Property[];
};

export default function InfoCard({ advertisement, locale, properties }: Props) {
  const t = useTranslations("translations");
  const groupedProperties = useGroupedProperties(properties);

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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {groupedProperties.map(([key, value]) => {
          return (
            <div className="flex flex-col gap-y-2" key={key}>
              <h4 className="font-bold text-lg">
                {t(`advertisement_list.properties.${key}`)}
              </h4>
              {value.map((item) => {
                return (
                  <>
                    <p>{item[`${locale}_translation`]}</p>
                    {advertisement.advertisements_properties.find(
                      (property) => property.id === item.id
                    ) ? (
                      <Icons.tick />
                    ) : (
                      <Icons.cross />
                    )}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
