import AdvertisementActions from "@/app/[locale]/_components/home/advertisement-actions";
import AdvertisementImage from "@/app/[locale]/_components/home/advertisement-image";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";
import { adTypeKeys } from "@/lib/data/advertisements/types";
import { Link } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

type Props = {
  advertisement: AdvertisementType;
  myAdvertisement?: boolean;
};

export default function AdvertisementPreview({
  advertisement,
  myAdvertisement,
}: Props) {
  const t = useTranslations("translations.advertisement");
  const {
    price,
    title,
    type,
    description,
    street,
    primary_photo_url,
    municipality,
    district,
    region,
  } = advertisement;

  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2 flex-col gap-y-2 items-center relative justify-between">
        <h3 className="text-3xl font-bold text-center px-6 sm:px-8">{title}</h3>
        <Link
          href={{
            pathname: "/advertisement/[id]",
            params: { id: advertisement.id },
          }}
          prefetch={false}
        >
          <Button className="flex items-center gap-x-2" variant="ringHover">
            <Icons.magnifier className="w-8 sm:w-10 h-8 sm:h-10" />
            <p className="font-bold">{t("detail.link")}</p>
          </Button>
        </Link>
        {myAdvertisement && (
          <AdvertisementActions advertisement={advertisement} />
        )}
      </CardHeader>
      <CardContent className="p-2 xl:p-3 pt-3 flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full">
        <div className="relative flex flex-shrink-0 h-min justify-center w-full lg:w-80 xl:w-96">
          <AdvertisementImage
            primary_photo_url={primary_photo_url}
            type={type}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 relative">
          <p className="text-wrap break-words text-justify lg:px-2 xl:px-8 md:flex-grow">
            {description}
          </p>
          <div className="flex flex-col gap-y-3 w-full md:w-72 lg:w-60 xl:w-72 flex-shrink-0">
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("type.label")}</p>
              <span className="font-bold text-right">
                {t(`types.${adTypeKeys[type as keyof typeof adTypeKeys]}`)}
              </span>
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("price.label")}</p>
              <span className="font-bold text-right">{price} €</span>
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("street.label")}</p>
              <span className="font-bold text-right">{street}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("municipality.title")}</p>
              <span className="font-bold text-right">{municipality}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("district.title")}</p>
              <span className="font-bold text-right">{district}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg gap-x-8">
              <p>{t("region.title")}</p>
              <div className="font-bold text-right break-words overflow-hidden">
                {region}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
