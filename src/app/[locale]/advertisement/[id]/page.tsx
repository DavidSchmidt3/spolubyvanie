import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/[locale]/_components/ui/card";
import { getAdvertisement } from "@/lib/data/advertisement";
import { adTypeKeys } from "@/lib/data/advertisements/types";
import { getImageFullUrl } from "@/lib/utils/supabase";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function Advertisement({ params }: Props) {
  const { id } = params;
  const t = await getTranslations("translations.advertisement");
  const advertisement = await getAdvertisement(id);
  if (!advertisement) {
    // return redirect("not-found"); // TODO: Create not-found page
    return <div>Not found</div>;
  }

  const {
    price,
    title,
    description,
    type,
    street,
    primary_photo_url,
    municipality,
    district,
    region,
  } = advertisement;

  return (
    <Card className="w-full h-auto p-6">
      <CardHeader className="p-0 pb-2 flex-col gap-y-2  items-center relative justify-between">
        <h3 className="text-3xl font-bold text-center">{title}</h3>
      </CardHeader>
      <CardContent className="p-2 xl:p-3 pt-3 flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full">
        <div className="relative flex flex-shrink-0 h-min justify-center w-full lg:w-80 xl:w-96">
          <Image
            src={
              primary_photo_url
                ? getImageFullUrl(primary_photo_url)
                : "/room.webp"
            }
            alt="Advertisement"
            width={1440}
            height={1080}
            className="rounded-sm w-full max-w-80 xl:max-w-96"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 relative">
          <p className="text-wrap break-words text-center xl:px-8 md:flex-grow">
            {description}
          </p>
          <div className="flex flex-col gap-y-3 w-full md:w-auto md:max-w-96 flex-shrink-0">
            <div className="flex justify-center text-base md:text-lg gap-x-8">
              <span className="font-bold text-right text-2xl">
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
